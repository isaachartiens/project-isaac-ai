# API cost control and abuse prevention layer

This change adds three coordinated defense layers to the three AI API routes: an Edge-compatible sliding-window rate limiter in middleware, per-request input validation (length + injection) in all three route handlers, and a client-side session counter with soft gate and error display in ChatPanel. All seven requirements from the task spec are satisfied. Build confirmed: commit message records `npm run build` exited 0, compiled successfully, all 10 pages generated.

**Watch for:** The `requestLog` Map in middleware accumulates IP keys indefinitely — timestamps older than 60 s are filtered out but the Map entry itself is never deleted. Benign for demo traffic, worth knowing if this is adapted for a higher-volume deployment. (possible; no eviction mechanism for zero-entry IPs)

**Verdict**: APPROVED

---

## High-level view

The middleware uses a module-scoped `Map<string, number[]>`. Each request filters the stored timestamps for that IP to the last 60 s, checks the count against 10, then pushes the current timestamp and calls `NextResponse.next()`. The matcher is exactly `['/api/support', '/api/escalation', '/api/analytics']`, leaving all other routes unaffected. IP extraction uses `x-forwarded-for` first (multi-value; takes the first segment), falls back to `request.ip`, then `'127.0.0.1'`.

All three route handlers place Guard A (length > 500 → 400) and Guard B (injection patterns → 400, opaque) immediately after `const lastMessage = messages[messages.length - 1].content` and before any embedding or data-loading call. The analytics route adds the `lastMessage` extraction line (it did not previously exist in that route) and places both guards before the `fs.existsSync` check. Order is length-first then injection, matching the spec.

ChatPanel wires `onFinish` → `incrementCount()` and `onError` → error parse → `setChatError()`. The `customHandleSubmit` wrapper and chip `onClick` blocks both gate on `getCount() >= SOFT_LIMIT` before calling `handleSubmit`/`append`. The New Chat button resets the counter, clears messages, and clears `chatError`. The `onError` regex (`/\{[^}]*"error"\s*:\s*"([^"]+)"[^}]*\}/`) extracts the `error` field from ai@2.x's embedded-JSON error string, falling back to a status-code heuristic then a generic message. This works for all three error strings in this change — none contain `}` — but would silently fall back to the generic message if a future error string did.

<details>
<summary>Issues (0)</summary>

No blocking issues found.

</details>

<details>
<summary>Details</summary>

### Map key accumulation in middleware

After filtering old timestamps, the implementation always writes the entry back with the current timestamp appended (`requestLog.set(ip, timestamps)`). An IP key is therefore never removed from the Map — only its timestamp array shrinks when old entries age out. Under sustained unique-IP traffic in a long-lived worker instance, the Map grows without bound. For Vercel Edge the worker lifecycle is typically short enough that this is negligible, and the plan acknowledged the per-instance tradeoff explicitly. Not blocking.

### onError regex fragility

`[^}]*` will not capture an error string that contains `}`. The current set of API error messages ("Too many requests. Please wait a moment before trying again.", "Message too long. Please keep questions under 500 characters.", "Invalid input.") are safe. A future error string containing `}` would cause silent fallback to the generic message instead of surfacing the actual API error text.

</details>

---

## File map

<details>
<summary>Changed files</summary>

- `middleware.ts` (new) — Edge sliding-window rate limiter; 10 req/min/IP combined across the three AI routes; 429 on exceed
- `src/app/api/support/route.ts` — Guard A (length) + Guard B (injection) before embedding call; `INJECTION_PATTERNS` constant at module scope
- `src/app/api/escalation/route.ts` — Same two guards before `getEmbedding`; `INJECTION_PATTERNS` constant
- `src/app/api/analytics/route.ts` — `lastMessage` extraction added; same two guards before data-file loading; `INJECTION_PATTERNS` constant
- `src/components/ChatPanel.tsx` — `STORAGE_KEY`/`SOFT_LIMIT`/`LIMIT_MESSAGE` constants; `getCount`/`incrementCount`/`resetCount` helpers; `chatError` state; `onFinish`/`onError` hooks; `customHandleSubmit` wrapper; chip click gates; New Chat button reset; inline error display below input

Full diff: `git diff eb788d1..HEAD`

</details>
