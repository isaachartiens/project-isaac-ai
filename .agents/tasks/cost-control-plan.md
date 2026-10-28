# Implementation Plan: API Cost Control and Abuse Prevention

## Codebase Findings (Pre-plan Exploration)

### max_tokens — already satisfied, no changes needed
All three routes already set `max_tokens`:
- `api/support/route.ts` → `max_tokens: 600`
- `api/escalation/route.ts` → `max_tokens: 700`
- `api/analytics/route.ts` → `max_tokens: 800`

**Do not alter these values.** Item 3 from the task spec is done; it is documented here only to prevent inadvertent changes.

### Request body shape
All three routes parse the body identically at the top of `POST(req)`:
```ts
const { messages } = await req.json()
const lastMessage = messages[messages.length - 1].content
```
Input validation (length + injection) must go immediately after `const lastMessage = ...` and before any `getEmbedding` or OpenAI call.

### ChatPanel error state — not present
The current `useChat` destructure is:
```ts
const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat({ api: apiEndpoint })
```
No `error` state is captured, no error is displayed anywhere. Error display must be added from scratch.

### "New chat" button — only clears messages
```ts
onClick={() => setMessages([])}
```
No session counter reset. Counter reset must be added here.

### Suggested question chips — bypass handleSubmit
```ts
onClick={() => append({ role: 'user', content: q })}
```
These call `append` directly and bypass any custom submit wrapper. The session limit gate must also be applied here.

---

## Edge Runtime Constraints and Flags

**In-memory rate limiter is per-worker-instance.** Vercel's Edge Network distributes workers across global POPs; each instance has its own `Map`. The 10 req/min limit is enforced per-instance, not globally. For a portfolio demo this is appropriate and was explicitly approved in the task spec. Document this in a comment inside `middleware.ts`.

**No Node.js built-ins in middleware.** `fs`, `path`, `Buffer` (from Node), `require` are all off-limits. Only Web APIs: `Map`, `Date.now()`, `Response`, `Request`, `Headers`. `process.env` is fine — Next.js injects it into the Edge runtime.

**Error body parsing from `useChat`.** When `useChat` v2 (`ai@2.2.31`) receives a non-2xx response, it reads the body as text and throws an error. The error message format in this SDK version includes the raw body inline, roughly: `"Failed to fetch the chat response... Received status 429 with error message {"error":"..."}"`. The `onError` handler must parse this string to extract the `error` field. The plan specifies a regex-extract-then-JSON-parse approach with a fallback. **The coder should test the actual error message string emitted by this SDK version and adjust the parser if the format differs.**

**400 responses use `Response` not `StreamingTextResponse`.** Input validation errors are returned before the streaming pipeline starts, so they use plain `new Response(JSON.stringify({error: '...'}), { status: 400, headers: {'Content-Type':'application/json'} })`. This is a different return type than the rest of the route. It is intentional and correct — `useChat` handles non-2xx responses separately from streaming content.

**Visible-behavior flag — soft gate does NOT block the API.** Per task spec, the 20-message client-side limit is a UI gate only. A technically savvy visitor can reset `localStorage` or call the API directly. This is acknowledged as intentional. The plan does not add server-side enforcement of the session limit.

**Visible-behavior flag — error message appears below the input form.** When a 429 or 400 fires, the user sees an inline error line below the text input rather than an assistant bubble. This is the correct design-system pattern ("single inline text-xs line below the chat input in accent color"). The user message that triggered the error will still appear in the chat as a user bubble; there will be no assistant reply bubble for that turn. This is acceptable behavior for error cases. Flag this to the user if they want a different treatment.

---

## Implementation Plan

- [ ] 1. Create `middleware.ts` in the project root (next to `next.config.js`).
      Implement an Edge-compatible sliding window rate limiter using a module-scoped `Map<string, number[]>`. Each key is the requester's IP address; the value is an array of request timestamps within the last 60 seconds. On each request: filter the array to remove entries older than 60 000 ms, check if the length is >= 10 (deny with 429), otherwise push `Date.now()` and allow. Extract IP from `x-forwarded-for` header first, fall back to `request.ip`, then `'127.0.0.1'`. Return 429 with `Content-Type: application/json` and body `{"error":"Too many requests. Please wait a moment before trying again."}` when exceeded. Export a `config` object with `matcher: ['/api/support', '/api/escalation', '/api/analytics']` so no other routes are affected. Add a comment noting the per-instance memory limitation.

      Files: `/Users/isaachartiens/Kiro Development/Project Isaac AI/middleware.ts`

      Verify: `npm run build` in project root — build must complete with no errors. Check the build output for a line referencing middleware compilation (Next.js 14 logs middleware in the build output).

- [ ] 2. Add input length and prompt injection validation to `api/support/route.ts`.
      Inside `POST`, immediately after `const lastMessage = messages[messages.length - 1].content`, add two early-return guards before any other logic:

      **Guard A — length check:**
      ```ts
      if (lastMessage.length > 500) {
        return new Response(
          JSON.stringify({ error: 'Message too long. Please keep questions under 500 characters.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
      ```

      **Guard B — injection check:**
      ```ts
      const INJECTION_PATTERNS = [
        'ignore previous instructions',
        'ignore all previous',
        'you are now',
        'disregard your',
        'forget your instructions',
        'new instructions:',
      ]
      if (INJECTION_PATTERNS.some(p => lastMessage.toLowerCase().includes(p))) {
        return new Response(
          JSON.stringify({ error: 'Invalid input.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
      ```

      Both guards go inside the outer `try` block, after `const lastMessage` but before `getEmbedding`. The existing catch block and `StreamingTextResponse` error handling remain unchanged.

      Files: `src/app/api/support/route.ts`

      Verify: `npm run build` — no TypeScript errors.

- [ ] 3. Add the same two guards to `api/escalation/route.ts` and `api/analytics/route.ts`.
      Apply identical Guard A and Guard B from item 2. Placement:
      - `escalation/route.ts`: after `const lastMessage = messages[messages.length - 1].content`, before `getEmbedding`
      - `analytics/route.ts`: after `const { messages } = await req.json()` — add `const lastMessage = messages[messages.length - 1].content` (this line does not currently exist in analytics/route.ts; add it), then add Guard A and Guard B, then continue with the existing data loading logic

      The `INJECTION_PATTERNS` array can be defined inline in each file (duplicate is fine given the three-file scope) or extracted to a shared utility. Given the existing codebase style (no shared utilities directory is referenced), inline is preferred unless the coder wants to create `src/lib/validation.ts` — either is acceptable but inline requires zero new files.

      Files: `src/app/api/escalation/route.ts`, `src/app/api/analytics/route.ts`

      Verify: `npm run build` — no TypeScript errors.

- [ ] 4. Update `ChatPanel.tsx` with session counter, error state, and error display.
      This item has four sub-changes that must all be applied together.

      **4a — Add state and helpers at the top of the component:**
      ```ts
      const STORAGE_KEY = 'isaac_msg_count'
      const SOFT_LIMIT = 20
      const LIMIT_MESSAGE =
        "You've reached the demo limit for this session. Refresh the page to start a new conversation, or reach out directly via LinkedIn."

      const [chatError, setChatError] = useState<string | null>(null)

      const getCount = () =>
        parseInt(typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) ?? '0' : '0', 10)
      const incrementCount = () =>
        localStorage.setItem(STORAGE_KEY, String(getCount() + 1))
      const resetCount = () =>
        localStorage.removeItem(STORAGE_KEY)
      ```
      Guard `localStorage` access with `typeof window !== 'undefined'` to prevent SSR crashes, even though ChatPanel is `'use client'`.

      **4b — Add `onFinish` and `onError` to the `useChat` call:**
      ```ts
      const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat({
        api: apiEndpoint,
        onFinish: () => {
          incrementCount()
        },
        onError: (error) => {
          // ai@2.2.31 embeds the response body in the error message string.
          // Attempt to extract the JSON error field; fall back to a generic message.
          const bodyMatch = error.message.match(/\{[^}]*"error"\s*:\s*"([^"]+)"[^}]*\}/)
          if (bodyMatch?.[1]) {
            setChatError(bodyMatch[1])
          } else if (error.message.toLowerCase().includes('429') ||
                     error.message.toLowerCase().includes('too many')) {
            setChatError('Too many requests. Please wait a moment before trying again.')
          } else {
            setChatError('Something went wrong. Please try again.')
          }
        },
      })
      ```
      **NOTE:** The coder must test the actual error message string produced by `ai@2.2.31` for 429 and 400 responses and adjust the regex/fallback if the format differs from the pattern above.

      **4c — Replace `handleSubmit` usage with a custom wrapper:**
      Add this function inside the component, below the `useChat` call:
      ```ts
      const customHandleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setChatError(null)
        if (getCount() >= SOFT_LIMIT) {
          setChatError(LIMIT_MESSAGE)
          return
        }
        handleSubmit(e)
      }
      ```
      In the JSX, replace `onSubmit={handleSubmit}` on the `<form>` with `onSubmit={customHandleSubmit}`.

      Also wrap the suggested question chip `onClick` handlers to gate on session limit:
      ```ts
      onClick={() => {
        setChatError(null)
        if (getCount() >= SOFT_LIMIT) {
          setChatError(LIMIT_MESSAGE)
          return
        }
        append({ role: 'user', content: q })
      }}
      ```

      **4d — Add error display and update the "New chat" button:**
      Update the "New chat" button's `onClick`:
      ```ts
      onClick={() => {
        setMessages([])
        resetCount()
        setChatError(null)
      }}
      ```

      Add the error display as a new `<div>` immediately after the closing `</form>` tag, still inside the outer flex container:
      ```tsx
      {chatError && (
        <div
          style={{
            padding: '4px 14px 8px',
            fontSize: '12px',
            color: accentColor,
            background: '#fff',
            flexShrink: 0,
          }}
        >
          {chatError}
        </div>
      )}
      ```
      Per the design system: "Error: Single inline text-xs line below chat input in accent color - no modal, no toast."

      Files: `src/components/ChatPanel.tsx`

      Verify: `npm run build` — no TypeScript errors.

- [ ] 5. Run `npm run build` and fix any TypeScript or compilation errors.
      The build command is `npm run build` in the project root. `next.config.js` has `typescript: { ignoreBuildErrors: true }` and `eslint: { ignoreDuringBuilds: true }`, so the build will not fail on TS errors — but the middleware is compiled by a separate step that enforces Edge runtime compatibility. Any use of Node.js built-ins in `middleware.ts` will surface as a hard build error. Fix all reported issues before marking this item done.

      Files: any files flagged by the build
      Verify: `npm run build` exits with code 0 and no error output. Do not start the dev server.

---

## Summary of Changes by File

| File | What changes |
|---|---|
| `middleware.ts` (new) | Edge rate limiter, 10 req/min per IP, covers all three AI routes |
| `src/app/api/support/route.ts` | Input length guard + injection guard before embedding call |
| `src/app/api/escalation/route.ts` | Same two guards before embedding call |
| `src/app/api/analytics/route.ts` | Add `lastMessage` extraction + same two guards before data loading |
| `src/components/ChatPanel.tsx` | Session counter, onError/onFinish hooks, custom submit wrapper, chip gate, error display, New Chat reset |

## What is NOT changing
- Pinecone query logic (untouched)
- Embeddings logic (untouched)
- Streaming response format (all successful responses still use `StreamingTextResponse`)
- System prompts
- Any page files
- `max_tokens` values (all already set — leave them as-is)
