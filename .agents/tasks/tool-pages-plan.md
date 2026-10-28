# Implementation Plan: Tool Page Restructure

## Decisions Made During Exploration

**Real-world experience strip background tint approach:** Add a `.rwe-strip` CSS class to `globals.css` with per-page background rules keyed off the existing `.support-page`, `.escalation-page`, `.analytics-page` root classes. The hardcoded per-page `rgba()` values live only in `globals.css`, never in JSX. The `borderLeft: '4px solid var(--accent)'` in JSX uses the CSS variable correctly. This satisfies the spec constraint while keeping hex out of component files.

**Accordion state key scheme:**
- Support (single group): `useState<Set<string>>` initialized `new Set(['0'])`. Keys are string indices `'0'`, `'1'`, etc.
- Escalation / Analytics (two groups): `useState<Set<string>>` initialized `new Set(['core-0', 'wins-0'])`. Keys are `'core-{i}'` and `'wins-{i}'`.
- Toggle via a shared helper that clones the Set and flips membership. This avoids mutating state in place.

**Accordion open/close animation:** Use `overflow: hidden` + `maxHeight` transition. Closed: `maxHeight: '0'`. Open: `maxHeight: '500px'` (generous enough for any body text). Transition: `max-height 0.2s ease-out`. No extra dependencies.

**Accordion chevron:** Use the existing `ChevronRight` icon already imported on every page, rotated 90deg inline when open (`transform: 'rotate(90deg)'`, `transition: 'transform 0.2s ease-out'`). No new icon import needed.

**Hero container width:** Expand from `maxWidth: 860px` to `maxWidth: 1100px` to accommodate the 4-card use case grid without tight wrapping. This matches the existing demo section container width and gives each card ~263px at desktop (vs. ~202px at 860px, which is too cramped for the card body text).

**My Thinking cards in standalone section:** Cards use white background (`#fff`) to contrast the `#F9FAFB` section background. Card spec: `borderRadius: 16px`, `padding: 24px`, `border: '1px solid #E5E7EB'`, `borderTop: '4px solid var(--accent)'`. Numbered labels (01-04) are preserved. On analytics, the per-card contextual icons (`MessageSquareHeart`, `ScanSearch`, `Tickets`, `Languages`) are preserved in card layout.

**Scroll-to-top investigation:** `Nav.tsx` Link components lack the `scroll` prop. In Next.js 14 App Router, `scroll={true}` is the default — but adding it explicitly is harmless and the spec requires it. The real fix is the `useEffect(() => { window.scrollTo(0, 0) }, [])` on each tool page mount, which ensures the page starts at the top even if the browser restored a previous scroll position during client-side navigation. Both changes are required by spec; implement both.

---

## Plan

- [ ] 1. Add `.rwe-strip` background-tint CSS rules to `globals.css`.
      Append three rules to the end of `src/app/globals.css` keyed off the existing page-class scope:
      ```css
      .support-page    .rwe-strip { background: rgba(96, 165, 250, 0.08); }
      .escalation-page .rwe-strip { background: rgba(45, 212, 191, 0.08); }
      .analytics-page  .rwe-strip { background: rgba(167, 139, 250, 0.08); }
      ```
      No other changes to this file.
      Files: `src/app/globals.css`
      Verify: `npm run build` — zero TypeScript or CSS errors (full build check deferred to item 6; this is structural).

- [ ] 2. Fix scroll-to-top in `Nav.tsx`.
      Locate the `{links.map(...)}` block that renders the four page-navigation `<Link>` components (`/`, `/support`, `/escalation`, `/analytics`).
      Add `scroll={true}` to each of those four `<Link>` elements. Do NOT touch the anchor-tab `<a>` elements in Row 2 — those use `handleAnchorClick` which handles scrollIntoView and must remain unchanged.
      Files: `src/components/Nav.tsx`
      Verify: `npm run build` — no TypeScript errors.

- [ ] 3. Restructure `src/app/support/page.tsx`.

      ### 3a. Imports
      Add `import { useState, useEffect } from 'react'` at the top.
      Update the lucide-react import line — add `ChevronDown` if a distinct icon is wanted for the open state; if sticking with the rotate-ChevronRight approach (recommended), no new icon is needed. Keep `Radio, Lightbulb, ChevronRight`.

      ### 3b. New data constants (add before the component function)
      Add `useCaseCards` array:
      ```ts
      const useCaseCards = [
        {
          label: 'PROBLEM',
          body: 'Customers want an answer so they can move on. Outside business hours or after three support articles, that friction is where carts get abandoned and contacts pile up.',
        },
        {
          label: 'IMPACT',
          body: 'Thirty to forty percent of incoming contacts are repeatable questions that still cost full agent time. Shedding just 10-20% at scale saves hundreds of thousands of dollars and extends into conversion and retention. The impact is even more significant in a startup environment where Opex is paramount and runway is limited.',
        },
        {
          label: 'SOLUTION',
          body: 'One conversational agent for both service deflection and sales assist. Grounded in your help center and product catalog. Hands off to a human the moment a customer requests it, intent gets ambiguous, or sentiment shifts.',
        },
        {
          label: 'HOW I MEASURE IT',
          body: 'Deflection rate tracked weekly. Assisted conversion rate vs. baseline. Post-chat CSAT to catch quality drift early.',
        },
      ]
      ```
      Add `realWorldText` string:
      ```ts
      const realWorldText = 'Built a self-service system at Amazon that deflected over 35% of incoming contacts, freeing agent capacity for higher-complexity cases.'
      ```
      Add `techBadges` array:
      ```ts
      const techBadges = ['RAG Architecture', 'OpenAI GPT-4o', 'Pinecone Vector Search', 'Next.js App Router', 'Kiro']
      ```

      ### 3c. Component function — scroll-to-top effect
      Inside `SupportPage()`, add as the first statement:
      ```ts
      useEffect(() => { window.scrollTo(0, 0) }, [])
      ```

      ### 3d. Component function — accordion state
      ```ts
      const [openBP, setOpenBP] = useState<Set<string>>(new Set(['0']))
      const toggleBP = (key: string) => {
        setOpenBP(prev => {
          const next = new Set(prev)
          next.has(key) ? next.delete(key) : next.add(key)
          return next
        })
      }
      ```

      ### 3e. HERO section — replace long `<p>` with use case grid + rwe strip
      The hero's inner container `maxWidth` changes from `860px` to `1100px`.
      Delete the existing `<p style={{ fontSize: '16px', color: '#4B5563' ... }}>Built in hours...</p>`.
      In its place insert, between the H1 and the badges div:
      1. Use case grid:
         ```tsx
         <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4" style={{ marginBottom: '20px' }}>
           {useCaseCards.map(card => (
             <div key={card.label} style={{
               border: '1px solid #E5E7EB',
               borderTop: '4px solid var(--accent)',
               borderRadius: '16px',
               padding: '24px',
               background: '#fff',
             }}>
               <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                 {card.label}
               </div>
               <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: 1.65 }}>{card.body}</p>
             </div>
           ))}
         </div>
         ```
      2. Real-world experience strip (immediately after the grid, before the badges div):
         ```tsx
         <div className="rwe-strip" style={{
           borderLeft: '4px solid var(--accent)',
           borderRadius: '12px',
           padding: '20px 24px',
           marginBottom: '24px',
         }}>
           <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
             REAL-WORLD EXPERIENCE
           </div>
           <p style={{ fontSize: '15px', color: '#111827', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
             {realWorldText}
           </p>
         </div>
         ```
      The capability badges div stays AFTER the rwe strip (no content change, just position).

      ### 3f. DEMO section — go full-width
      Remove the 2-column grid wrapper: delete `display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start'` from the inner div styles. Replace with a plain full-width `div`.
      Delete the entire right-column `<div id="thinking" style={{ position: 'sticky', top: '112px' }}>` block (including all myThinking rendering inside it). The `id="thinking"` attribute is removed here; it will be placed on the new standalone section in 3g.
      The left-column chat content remains unchanged EXCEPT:
        - Remove the wrapping `<div>` that was the left column.
        - The ChatPanel wrapper, label, instructions, and prompt chips all stay at the top level of the demo section's container div.
        - After the `<p style={{ fontSize: '12px', color: '#9CA3AF' ... }}>Use "New conversation"...</p>` reset hint, add the tech stack badges row:
          ```tsx
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Built with</span>
            {techBadges.map(t => (
              <span key={t} style={{ padding: '4px 12px', borderRadius: '20px', background: '#F3F4F6', color: '#374151', fontSize: '12px', fontWeight: 500 }}>
                {t}
              </span>
            ))}
          </div>
          ```

      ### 3g. NEW My Thinking standalone section
      Insert a new `<section id="thinking">` between the closing `</section>` of the demo section and the opening `<section id="best-practices">`:
      ```tsx
      <section id="thinking" style={{ background: '#F9FAFB', padding: '80px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '32px' }}>
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
            My Thinking
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {myThinking.map((item, i) => (
              <div key={item.title} style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderTop: '4px solid var(--accent)',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#D1D5DB', display: 'block', marginBottom: '12px' }}>
                  0{i + 1}
                </span>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      ```
      The `myThinking` array data is unchanged.

      ### 3h. BEST PRACTICES section — convert to accordion
      Replace the static `.map()` list with an accordion. The section element, heading, and intro text stay unchanged.
      Accordion item markup pattern (applied inside `bestPractices.map((bp, i) => ...)`):
      ```tsx
      <div key={bp.title} style={{ borderTop: '1px solid #E5E7EB' }}>
        {/* Header row — always visible, clickable */}
        <div
          role="button"
          aria-expanded={openBP.has(String(i))}
          onClick={() => toggleBP(String(i))}
          style={{
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flex: 1 }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#D1D5DB', flexShrink: 0, paddingTop: '2px', minWidth: '24px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>{bp.title}</h3>
          </div>
          <ChevronRight
            className="h-3.5 w-3.5"
            style={{
              color: '#D1D5DB',
              flexShrink: 0,
              marginTop: '3px',
              transform: openBP.has(String(i)) ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-out',
            }}
            aria-hidden="true"
          />
        </div>
        {/* Collapsible body */}
        <div style={{
          overflow: 'hidden',
          maxHeight: openBP.has(String(i)) ? '500px' : '0',
          transition: 'max-height 0.2s ease-out',
        }}>
          <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 20px 48px', lineHeight: 1.7 }}>{bp.body}</p>
        </div>
      </div>
      ```
      After the `.map()`, add a closing border rule: `<div style={{ borderTop: '1px solid #E5E7EB' }} />`.
      Remove the old static `<div>` wrapper with `display: 'flex', flexDirection: 'column'` — the items are now rendered directly inside the `<div style={{ maxWidth: '760px' }}>` block.

      Files: `src/app/support/page.tsx`
      Verify: `npm run build` — no TypeScript errors.

- [ ] 4. Restructure `src/app/escalation/page.tsx`.

      ### 4a. Imports
      Add `import { useState, useEffect } from 'react'` at the top.
      Existing lucide-react import (`Radio, Lightbulb, Database, ChevronRight, Gauge`) requires no additions — ChevronRight rotate covers the accordion chevron.

      ### 4b. New data constants
      Add `useCaseCards`:
      ```ts
      const useCaseCards = [
        {
          label: 'PROBLEM',
          body: 'Frontline agents hit a wall mid-ticket. The only option is to escalate. That ticket joins a backed-up tier-2 queue and the customer waits 12-48 hours while context gets rebuilt from scratch.',
        },
        {
          label: 'IMPACT',
          body: 'Escalations cost 3-5x more than first-touch resolutions and are a primary driver of frontline burnout. At scale, even a modest escalation rate is a significant recurring cost and a compounding retention problem.',
        },
        {
          label: 'SOLUTION',
          body: 'An in-workflow assistant agents query in plain language mid-ticket. Pulls from runbooks, resolved tickets, and product docs. Gives a recommended resolution path in the 90 seconds they have before the customer\'s patience runs out.',
        },
        {
          label: 'HOW I MEASURE IT',
          body: 'Escalation rate before and after rollout. FCR on previously high-escalation ticket types. Handle time on assisted vs. unassisted tickets.',
        },
      ]
      ```
      Add `realWorldText`:
      ```ts
      const realWorldText = 'Built from ideation through release at Amazon. Result: 30% reduction in escalation rates and a 5-point increase in customer satisfaction.'
      ```
      Add `techBadges` (same across all three pages):
      ```ts
      const techBadges = ['RAG Architecture', 'OpenAI GPT-4o', 'Pinecone Vector Search', 'Next.js App Router', 'Kiro']
      ```

      ### 4c. Component function — scroll-to-top + accordion state
      Inside `EscalationPage()`:
      ```ts
      useEffect(() => { window.scrollTo(0, 0) }, [])
      const [openBP, setOpenBP] = useState<Set<string>>(new Set(['core-0', 'wins-0']))
      const toggleBP = (key: string) => {
        setOpenBP(prev => {
          const next = new Set(prev)
          next.has(key) ? next.delete(key) : next.add(key)
          return next
        })
      }
      ```

      ### 4d. HERO section — same pattern as support
      Change inner container `maxWidth` from `860px` to `1100px`.
      Delete the existing long `<p>` paragraph (`Built in hours, not days, against five internal SOP files...`).
      Insert use case grid and rwe strip in the same positions as item 3e (using the escalation `useCaseCards` and `realWorldText`).

      ### 4e. DEMO section — go full-width
      Same structural change as item 3f: remove 2-column grid, delete the right-column sticky thinking div with `id="thinking"`, keep left chat content full-width, add tech badges row after the reset hint.

      ### 4f. NEW My Thinking standalone section
      Same structure as item 3g. The `myThinking` array is already defined for escalation — no content changes. Cards use the same white-bg, top-accent, 16px radius style.

      ### 4g. BEST PRACTICES section — two-group accordion
      The section has two groups: Core Foundation and Quick Wins. Both use the same `openBP` Set with prefixed keys.

      Core Foundation group markup: Preserve the `<Database>` section label. Replace the static `.map()` for `bestPractices.core`:
      ```tsx
      {bestPractices.core.map((bp, i) => {
        const key = `core-${i}`
        const isOpen = openBP.has(key)
        return (
          <div key={bp.title} style={{ borderTop: '1px solid #E5E7EB' }}>
            <div
              role="button"
              aria-expanded={isOpen}
              onClick={() => toggleBP(key)}
              style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flex: 1 }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#D1D5DB', flexShrink: 0, paddingTop: '2px', minWidth: '24px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>{bp.title}</h3>
              </div>
              <ChevronRight className="h-3.5 w-3.5" style={{ color: '#D1D5DB', flexShrink: 0, marginTop: '3px', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease-out' }} aria-hidden="true" />
            </div>
            <div style={{ overflow: 'hidden', maxHeight: isOpen ? '500px' : '0', transition: 'max-height 0.2s ease-out' }}>
              <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 20px 48px', lineHeight: 1.7 }}>{bp.body}</p>
            </div>
          </div>
        )
      })}
      <div style={{ borderTop: '1px solid #E5E7EB' }} />
      ```

      Quick Wins group markup: Preserve the `<Gauge>` label and the "Things you can action this week..." sub-text. Replace `bestPractices.quickWins` `.map()` using `key = \`wins-${i}\`` and the same accordion item pattern. The number span uses `color: 'var(--accent)'` (existing Quick Wins styling).
      Remove the old static wrapper `div` with `display: 'flex', flexDirection: 'column'` from both groups.

      Files: `src/app/escalation/page.tsx`
      Verify: `npm run build` — no TypeScript errors.

- [ ] 5. Restructure `src/app/analytics/page.tsx`.

      ### 5a. Imports
      Add `import { useState, useEffect } from 'react'` at the top.
      Existing lucide-react import (`Radio, Lightbulb, Database, ChevronRight, Languages, MessageSquareHeart, ScanSearch, Tickets, Gauge`) requires no additions.
      `AnalyticsBarChartIcon` import stays unchanged.

      ### 5b. New data constants
      Add `useCaseCards`:
      ```ts
      const useCaseCards = [
        {
          label: 'PROBLEM',
          body: 'Customer data is in the ticketing system, the CRM, NPS surveys, and spreadsheets three teams own. Nobody has time to cross-reference them. By the time an analyst finishes a pull, the trend it describes is already stale.',
        },
        {
          label: 'IMPACT',
          body: 'Teams spend an estimated 40+ hours per week on data gathering instead of analysis. Emerging pain points sit in the data for weeks before anyone notices. That delay is revenue that does not come back.',
        },
        {
          label: 'SOLUTION',
          body: 'Ask a question in plain English. Get the trend, the why, and a suggested action back in seconds. Conversational because dashboards tell you what happened. This closes the loop to what to do next.',
        },
        {
          label: 'HOW I MEASURE IT',
          body: 'Time-to-insight in hours vs. the pre-tool baseline in days. Actionable recommendations implemented within 30 days. Stakeholder weekly active usage.',
        },
      ]
      ```
      Add `realWorldText`:
      ```ts
      const realWorldText = 'Led Voice of Customer programs at Amazon that surfaced a cross-source product pain point no individual team had connected. A single fix reduced that contact driver by 80%.'
      ```
      Add `techBadges` (same as other pages).

      ### 5c. Component function — scroll-to-top + accordion state
      Inside `AnalyticsPage()`:
      ```ts
      useEffect(() => { window.scrollTo(0, 0) }, [])
      const [openBP, setOpenBP] = useState<Set<string>>(new Set(['core-0', 'wins-0']))
      const toggleBP = (key: string) => {
        setOpenBP(prev => {
          const next = new Set(prev)
          next.has(key) ? next.delete(key) : next.add(key)
          return next
        })
      }
      ```

      ### 5d. HERO section — same pattern as support/escalation
      Change inner container `maxWidth` from `860px` to `1100px`.
      The H1 retains its `<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>` wrapper that holds the `<AnalyticsBarChartIcon>` — do NOT remove this.
      Delete the existing long `<p>` paragraph (`Built in hours, not days, against 500 tickets...`).
      Insert use case grid and rwe strip after the H1 wrapper div and before the badges div, using the analytics `useCaseCards` and `realWorldText`.

      ### 5e. KPI strip section — NO CHANGES
      The `<section style={{ background: '#F9FAFB', padding: '32px 24px' ... }}>` KPI strip stays exactly as-is.

      ### 5f. DEMO section — go full-width
      Same structural change as items 3f and 4e. Remove the 2-column grid, delete the right-column sticky div with `id="thinking"`, keep left chat content full-width, add tech badges row after the reset hint.

      ### 5g. NEW My Thinking standalone section
      Same section structure as items 3g and 4f, BUT the analytics page has per-card contextual icons. In the new card layout, preserve the icon below the number inside each card:
      ```tsx
      const thinkingIcons = [MessageSquareHeart, ScanSearch, Tickets, Languages]
      // ...
      {myThinking.map((item, i) => {
        const ThinkIcon = thinkingIcons[i]
        return (
          <div key={item.title} style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderTop: '4px solid var(--accent)',
            borderRadius: '16px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#D1D5DB' }}>0{i + 1}</span>
              {ThinkIcon && <ThinkIcon style={{ width: '12px', height: '12px', color: 'var(--accent)', opacity: 0.6 }} aria-hidden="true" />}
            </div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.65 }}>{item.body}</p>
          </div>
        )
      })}
      ```
      The `thinkingIcons` array and `myThinking` data are unchanged.

      ### 5h. BEST PRACTICES section — two-group accordion
      Identical pattern to item 4g (escalation). Core Foundation uses `<Database>` label, Quick Wins uses `<Gauge>` label — both already in the file. Apply the same two-group accordion with `core-{i}` / `wins-{i}` keys and `isOpen` local variable pattern.

      Files: `src/app/analytics/page.tsx`
      Verify: `npm run build` — no TypeScript errors.

- [ ] 6. Run full production build to confirm zero errors.
      From the workspace root:
      ```
      npm run build
      ```
      Expected: build completes with 0 TypeScript errors, 0 ESLint errors (warnings acceptable), and all three tool-page routes compile successfully. No dev server should be started.
      Files: no changes — this is verification only.
      Verify: `npm run build` exits with code 0.

---

## Cross-cutting notes for the coder

**Remove `id="thinking"` from the old location.** In all three pages, `id="thinking"` currently sits on the inner `<div>` inside the demo section's grid (the sticky right column). That attribute must be removed from the old div and placed only on the new standalone `<section id="thinking">`. Having the ID in two places will break scroll-spy.

**`scroll-margin-top` for `#thinking` is already set in `globals.css`** as `scroll-margin-top: 112px` (covers `#demo`, `#thinking`, `#best-practices`). No globals.css change needed for this.

**Capability badge pill styles** (the hero badges like "RAG Architecture", "Intent Classification") are existing and keep their current accent-tinted background/color — they are NOT changed to the tech badge style. The tech badges below the chat widget use the new neutral pill style (`#F3F4F6` bg, `#374151` text).

**No changes to `ChatPanel.tsx` or any API route.**

**Hero `<section>` background gradient** (`linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)`) stays unchanged on all three pages.

**Analytics `kpis` and `kpis.map()` in the KPI strip** stay completely unchanged.

**`ACCENT` constant** at the top of each file stays unchanged — it is passed to `ChatPanel` only and is not used for the new structural elements (those use `var(--accent)` via CSS).
