---
inclusion: always
---

# Site Design Guidelines: Isaac Hartiens Portfolio (V2)

**Aesthetic:** Minimalist, High-Trust, Executive, "Apple-esque" Depth.
**Core Principle:** Use whitespace and subtle dimension instead of loud colors or heavy borders.

## CRITICAL UX CONSTRAINTS

- **NO EMOJIS:** Do not use any emojis or icons that resemble emojis anywhere on the site.
- **NO EMDASHES:** Do not use emdashes (--). Use commas, colons, or simple hyphens (-) where appropriate.
- **STRICT CONSISTENCY:** Every component, margin, and color must adhere to the guidelines below.

## Color Palette

| Element | Hex | Usage |
|---|---|---|
| Background (Main) | `#FFFFFF` | Primary page background |
| Background (Secondary) | `#F9FAFB` | Subtle sections (AI Lab gray area) |
| Text (Primary) | `#111827` | Headers, hero text, bold titles |
| Text (Secondary) | `#4B5563` | Body text, descriptions, sub-headers |
| Border/Divider | `#E5E7EB` | Card borders, thin lines, dividers |
| Accent - CX Operations | `#60A5FA` | Top-border accent, metric chips |
| Accent - Product Management | `#2DD4BF` | Top-border accent, metric chips |
| Accent - Program Management | `#818CF8` | Top-border accent, metric chips |
| Accent - AI Transformation | `#A78BFA` | Top-border accent, metric chips |

## Typography

- Font stack: `font-sans` (Inter; must be pinned in layout/globals)
- Text selection highlight: `bg-[accent]/20`
- Hero headline: 700 weight, 48-64px, `#111827`
- Section headers: 700 weight, 24-32px, `#111827`
- Body text: 400 weight, 16px, line-height 1.6, `#4B5563`
- Metric chips: 600 weight, 12px, `#111827`

## Experience Card Specs

- Border radius: `16px`
- Border: `1px solid #E5E7EB`
- Padding: `24px`
- Shadow (default): `0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)`
- Top accent: 4px solid top-border using category accent color
- Hover transform: `translateY(-4px)`
- Hover shadow: `0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.05)`
- Transition: `0.2s ease-in-out`

## Layout

- Whitespace: generous margins between sections (80px vertical padding)
- Hero: center-aligned
- Card grids: balanced auto-fit grid
- No emojis, no icon fonts, no decorative flourishes

## Page Accent Variables

Each page sets a single `--accent` CSS variable at its root. All tiles, borders, and chips on that page inherit it. Never hard-code a hex color where `var(--accent)` should be used.

```css
.support-page    { --accent: #60A5FA; }
.escalation-page { --accent: #2DD4BF; }
.analytics-page  { --accent: #A78BFA; }
.home-page       { --accent: #60A5FA; } /* override per-section if a hero band earns a different accent */
```

If a future page or section needs its own accent, give it its own `--accent` scope - never a new hex inline.

## Icon System

### Package
- Use `lucide-react` (latest) as the single icon source across the entire site
- No `@simple-icons/react` or other icon packages - lucide's `Linkedin` covers the LinkedIn mark

### Capability Pills (global rule)
- Pills are text-only on every page - no icons inside pills
- Differentiation between pills comes from label text only
- This applies to all three tool pages (support, escalation, analytics)

### Icon Sizing Reference
- Nav icons: `size={16}` beside link labels
- Section label icons: `size={12}` (e.g. Radio, Lightbulb, Database)
- Best practice row markers: `size={14}` (ChevronRight, optional)
- Input area icons: `size={14}` (MessageSquare)
- LinkedIn footer/CTA: `size={18}`

## Tile Row Rule (global - applies to every card row on every page)

- Every card in one row shares ONE accent color, taken from `var(--accent)` for the current page
- Never mix hues within a row
- Differentiation between cards comes from label, number, and icon slot - not color
- `border-top-color: var(--accent)` on every tile - inherited, never hard-coded
- One card type per page - do not create different classes per row

## Chat Widget Height Clamp (global - all three tool pages)

- Widget shell: `max-height: ~560px`
- Message region: fixed-height scroll pane, `~320px`
- Empty state: compact and centered - not a tall blank
- Chip gap and padding: tighter than default
- Must fit the demo section in the first viewport without scroll on all three tool pages

## Intro Block Verbosity Target (global - every page)

- Header/intro block = eyebrow label + h1 + no more than 3 body lines
- Body text constrained to `max-w-[65ch]`
- Full stop - no padding paragraphs

## Anchor Tabs in Sticky Header (tool pages only)

- Part of the sticky header, not a separate bar
- Anchors: `#demo`, `#thinking`, `#best-practices` (add `#about` if that section is present)
- Scroll-spy implemented via `IntersectionObserver`
- Smooth-scroll on click

## Page Content Container (every page)

```
mx-auto max-w-6xl px-6
```

- All page content lives inside this wrapper
- Wide tile rows (4-up) live at the container level
- Body copy paragraphs are still capped at `max-w-[65ch]` within the container

## Responsive Grid (tile rows, stat rows, card rows - global)

```
grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4
```

- Consistent across all pages - no bespoke column counts per page
- Gap stays on scale (`gap-4`)

## State and Motion

- Transitions: `colors`, `opacity`, `background-color` at `150ms ease-out`
- Smooth scroll: `~300ms ease-out`
- Focus visible (all interactive elements): `ring-2 ring-[accent] ring-offset-2` (use `ring-offset-0` on buttons)
- Nav link (row 1): idle = `text-secondary`, hover = `text-primary`, active = `text-[accent]`
- Anchor tab active: accent underline + accent text
- Button primary hover: `bg-[accent]`
- Button/link secondary hover: `opacity-80`

## Async State (all three tool pages)

- Streaming loader: `<Loader className="h-4 w-4 animate-spin text-[accent]" />` inside the message pane while streaming
- Reply complete (optional): `<Check className="h-4 w-4 text-[accent]" />` micro-state
- Error: single inline text line `text-[accent] text-xs` below the chat input - no modal, no toast
- Scroll pane scrollbar: thin, hairline thumb `#E5E7EB` via webkit scrollbar styles

## Named UI Components

Keep markup consistent by always using these patterns:

```tsx
// Primary button
<button className="rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent)] transition-colors duration-150">

// Secondary button (bare link-style, no background)
<button className="text-[var(--accent)] hover:opacity-80 text-sm font-medium transition-opacity duration-150">

// Capability pill / chip
<span className="rounded-full border border-[#E5E7EB] px-3 py-1.5 text-xs">

// Live Demo label badge (optional Radio icon head)
<div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
  <Radio className="h-3.5 w-3.5" />  {/* optional */}
  LIVE DEMO
</div>
```
