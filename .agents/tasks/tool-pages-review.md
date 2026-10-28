# Tool Page Restructure: Hero Grid, Standalone Thinking, Accordion BP

All three tool pages (support, escalation, analytics) were restructured from a two-column demo+sidebar layout to a single-column flow with four distinct sections. The hero now leads with a 4-card use case grid and a real-world experience strip, the demo section goes full-width, My Thinking becomes a standalone `#thinking` section between demo and best practices, and best practices converts to a click-toggled accordion. Nav.tsx gets `scroll={true}` and each page gets a mount-time `window.scrollTo(0,0)` to fix the scroll position bug.

**Watch for:** Accordion `<div role="button">` elements lack `tabIndex={0}` and keyboard event handlers on all three pages — confirmed. Screen readers will announce these as buttons but keyboard users cannot reach or activate them via Tab/Enter/Space. Not a blocking issue for a portfolio demo, but it is a WCAG 2.1 Level A regression introduced by this PR.

**Verdict**: APPROVED

---

## High-level view

Each `id` attribute (`#demo`, `#thinking`, `#best-practices`) appears exactly once per page, with `id="thinking"` correctly moved from its old sticky right-column position to the new standalone section. The anchor tabs will work correctly now. The `scroll-margin-top: 112px` in globals.css covers the new section without any CSS additions.

The `.rwe-strip` tint approach is well-executed: per-page background values live entirely in `globals.css` scoped under `.support-page`, `.escalation-page`, `.analytics-page`, with `borderLeft: '4px solid var(--accent)'` in JSX. No accent hex is hardcoded in JSX for the new structural elements. The hero capability badges retain their pre-existing hardcoded rgba pill styles — those are unchanged.

The keyboard accessibility gap is the only issue: `role="button"` on a `<div>` requires `tabIndex={0}` and `onKeyDown` to satisfy WCAG 2.1 SC 2.1.1. Without them, keyboard users cannot reach or activate accordion items even though the role signals they should be able to.

---

<details>
<summary>Issues (1)</summary>

1. **Accordion keyboard inaccessibility** — `<div role="button">` without `tabIndex={0}` and `onKeyDown` means keyboard users cannot tab to or activate accordion items. Add `tabIndex={0}` and an `onKeyDown` handler that calls `toggleBP` on Enter/Space to all accordion header divs across the three pages.

</details>

<details>
<summary>Details</summary>

### Accordion role/keyboard gap

The accordion header on all three pages uses `<div role="button" aria-expanded={isOpen} onClick={...}>`. The `tabIndex={0}` is absent, which removes the element from the tab order entirely. A keyboard-only user pressing Tab skips every accordion item. A screen reader user navigating by element type will encounter the "button" role but pressing Enter or Space does nothing — there is no `onKeyDown` handler.

The fix for each accordion header div:

```tsx
tabIndex={0}
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggleBP(key)
  }
}}
```

This applies to the single group on support, both groups on escalation, and both groups on analytics — nine accordion group instances total.

This is a confirmed WCAG 2.1 Level A regression (SC 2.1.1 Keyboard) introduced by this PR. For a portfolio demo it is non-blocking, but a hiring manager reviewing code quality will notice it.

</details>

---

## File map

<details>
<summary>Changed files</summary>

- `src/app/support/page.tsx` — full restructure: use case grid, rwe strip, full-width demo, standalone thinking section, accordion best practices (single group)
- `src/app/escalation/page.tsx` — same restructure; two-group accordion with `core-{i}` / `wins-{i}` keys
- `src/app/analytics/page.tsx` — same restructure; KPI strip unchanged; per-card thinking icons preserved; two-group accordion
- `src/components/Nav.tsx` — added `scroll={true}` to all four main nav `<Link>` elements
- `src/app/globals.css` — added three `.rwe-strip` background-tint rules keyed off per-page class scopes

Full diff: `git diff 627758e HEAD`

</details>
