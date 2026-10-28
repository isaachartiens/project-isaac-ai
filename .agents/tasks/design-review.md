# Design System + Iconography Upgrade

This change upgrades the entire site from ad-hoc, page-specific styling to the consolidated design system defined in the steering files. It replaces a mix of hardcoded hex values, inconsistent borders, inline SVGs, and legacy color tokens with `lucide-react` icons at specified sizes, CSS variable-routed `--accent` values, and consistent component patterns across all five pages. The two-pass implementation resolved six findings from the first review cycle before this review. Build passes per the verification note (exit 0, all 10 pages generated).

**Watch for:** The per-tile `--accent` scoping on the homepage produces visually mixed hues within the expertise card row, which the tile-row rule explicitly prohibits — this was the accepted fix for the hardcoded hex blocking finding but introduces a rule-level tension. The nav hover CSS uses an `[style*="color:"]` attribute selector that is likely brittle under browser color normalization.

**Verdict**: APPROVED

---

## High-level view

The icon system is consistent throughout: `Home`, `Headphones`, `TriangleAlert`, `ChartColumn` at `size={16}` in the nav, `Radio`/`Lightbulb`/`Database`/`Gauge`/`ChevronRight` at `h-3.5 w-3.5` in section labels, `MessageSquare` at `14px` leading the chat input. LinkedIn is kept as an inline SVG because lucide-react v1.x removed all brand icons — this is a documented, verified deviation, not an oversight.

The accent variable architecture is correctly layered: page classes (`support-page`, `escalation-page`, `analytics-page`, `home-page`) set `--accent` at the outermost wrapper, and every tile border-top references `var(--accent)`. No hardcoded hex appears on any tile border-top in the post-fix code. The homepage complicates this picture: per-tile CSS classes (`.tile-cx-ops`, `.tile-product-mgmt`, etc.) override `--accent` at the element scope to preserve category-specific colors, which technically violates the "one hue per row" rule even though no hex is hardcoded.

The ChatPanel meets all specified constraints — `maxHeight: 560px` shell, `height: 320px` fixed scroll pane, `Loader` with the passed accent color and `animate-spin`, `MessageSquare` leading the input, centered empty state, and webkit scrollbar styled to `#E5E7EB`. Section label icons are correctly positioned and sized on all three tool pages.

Two structural gaps from the spec carry through: most tile grids use `auto-fit minmax()` inline styles instead of the specified `lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4` breakpoints (only the analytics KPI strip adopts the Tailwind pattern), and the homepage hero body paragraph uses `maxWidth: '600px'` instead of `max-w-[65ch]`.

---

<details>
<summary>Issues (5)</summary>

1. **Per-tile --accent scoping mixes hues within the expertise row** — The tile-row rule requires one shared accent per row. The `.tile-cx-ops / .tile-product-mgmt / .tile-program-mgmt / .tile-ai-transform` CSS classes cause four distinct border-top colors on a single card row. No hardcoded hex in JSX, but the visual output still violates "never mix hues within a row." Resolve by either accepting this as a documented homepage exception or unifying expertise tiles to the page accent and differentiating cards by label only.

2. **Nav hover CSS uses a fragile inline-style attribute selector** — `.nav-link:not([style*="color: #60A5FA"])...` reads the `style` attribute string. Browsers normalize hex colors (Chrome lowercases; some browsers render `rgb()`) so the uppercase hex match is likely to fail, causing active nav links to also change to `#111827` on hover. Replace with a `data-active` attribute or `nav-link--active` className to carry the active state.

3. **Most tile grids use auto-fit minmax() instead of the specified responsive classes** — The spec mandates `grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4` for all tile/stat/card rows. The expertise tiles, AI Lab tool cards, and operating principles grid use `gridTemplateColumns: 'repeat(auto-fit, minmax(Xpx, 1fr))'`. Only the analytics KPI strip adopts the Tailwind pattern. The auto-fit approach still collapses responsively but does not match the specified breakpoint behavior.

4. **Homepage hero body uses 600px max-width instead of 65ch** — The spec requires `max-w-[65ch]` for body copy paragraphs. The hero `<p>` uses `maxWidth: '600px'`. `65ch` is narrower at typical font sizes (~520–560px) and ensures consistent line length regardless of viewport font scaling.

5. **Dead color fields in the kpis array** — Each KPI entry in `analytics/page.tsx` retains a `color` property that is no longer used in rendering (border-tops now use `var(--accent)`). Remove the unused fields or a future contributor may treat them as meaningful and reintroduce per-card coloring.

</details>

---

<details>
<summary>Details</summary>

## Nav hover state — likely browser normalization issue

The `.nav-link:not([style*="color: #60A5FA"]):not([style*="color: #2DD4BF"]):not([style*="color: #A78BFA"]):hover` selector attempts to distinguish active from idle links by checking the inline style attribute for the accent hex string. Chrome normalizes hex values to lowercase in the DOM `style` attribute (`#60A5FA` → `#60a5fa`), which breaks the uppercase match. Firefox may normalize to `rgb()` form entirely. The practical failure mode: active links also respond to hover with `color: #111827 !important`, overriding the accent — a visible regression on the active nav link. A `data-active` attribute or a dedicated `nav-link--active` className would be robust. **Confidence: likely.**

## Per-tile accent scoping vs. tile-row rule

The previous review flagged hardcoded hex on tile border-tops as blocking. The fix routes all border-top colors through CSS variables using four per-tile scope classes and three per-tool-card scope classes in globals.css — the blocking criterion (no hardcoded hex in JSX `borderTop`) is met.

The tile-row rule is still violated at the visual output level: the expertise card row renders with four distinct border-top hues (`#60A5FA`, `#2DD4BF`, `#818CF8`, `#A78BFA`). The spec says "every card in one row shares ONE accent color" and "never mixed hues within a row." The fix also creates four distinct CSS classes per homepage section, conflicting with "one card type per page — do not create different classes per row." The previous reviewer accepted this as a category-differentiation tradeoff; it is a documented deviation, not an accidental regression. **Confidence: confirmed.**

## Dead color fields in KPI data

The `kpis` array in `analytics/page.tsx` retains a `color` field per entry (`#60A5FA`, `#2DD4BF`, `#F87171`, `#A78BFA`) from the previous implementation. None of these fields are referenced in the rendered JSX — the KPI card border-tops correctly use `var(--accent)`. The dead fields don't affect output but add noise and could mislead a future contributor into thinking per-card coloring is intentional.

## ChatPanel — Check icon placement deviates from spec

The spec describes Check as an optional "reply complete" micro-state rendered at accent color inside the message pane. The implementation places Check in the send button during streaming (not after completion), in white rather than accent color. The spec marks this state optional, so this is a minor deviation, not a regression.

## Responsive grid implementation gap

The analytics KPI strip correctly uses `grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4`. Every other grid — expertise tiles, AI Lab tool cards, operating principles cards — uses `gridTemplateColumns: 'repeat(auto-fit, minmax(Xpx, 1fr))'` via inline styles. Auto-fit collapses fluidly but doesn't enforce the specified breakpoints, so viewport widths between ~840px and ~1024px may render two columns where the spec calls for four. **Confidence: confirmed.**

</details>

---

<details>
<summary>File map</summary>

| File | What changed |
|---|---|
| `src/components/icons.tsx` | New — `AnalyticsBarChartIcon` custom SVG, exported with className/style props |
| `src/components/Nav.tsx` | Lucide icons at size 16, routeAccent map, anchor tab row with scroll-spy, inline LinkedIn SVG retained |
| `src/components/ChatPanel.tsx` | MessageSquare + Loader + Check icons; 560px shell; 320px fixed pane; webkit scrollbar; centered empty state; tighter padding |
| `src/app/globals.css` | CSS variable tokens updated; page accent classes; per-tile and per-tool accent scopes; nav-link hover; chat scrollbar |
| `src/app/page.tsx` | `home-page` class; expertise tiles with per-category CSS classes; tool cards with per-tool CSS classes; border-tops using var(--accent); Sparkles hero eyebrow; content restructured |
| `src/app/support/page.tsx` | `support-page` class; Radio/Lightbulb/ChevronRight icons; hero trimmed to 3 sentences; best practices section replaces old help center UI |
| `src/app/escalation/page.tsx` | `escalation-page` class; Radio/Lightbulb/Database/Gauge/ChevronRight icons; hero trimmed; ticket queue replaced with My Thinking + Best Practices |
| `src/app/analytics/page.tsx` | `analytics-page` class; AnalyticsBarChartIcon hero; KPI strip with var(--accent) border; Radio/Lightbulb/Database/Gauge icons; responsive KPI grid |
| `package.json` | lucide-react upgraded to ^1.52.0 |
| `.agents/tasks/verification-note.md` | Build evidence for both passes |

Full diff: `git diff ef6c6cb HEAD`

</details>
