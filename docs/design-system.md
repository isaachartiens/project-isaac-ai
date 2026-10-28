# Project Isaac AI — Design System Reference

**Version:** V2  
**Aesthetic:** Minimalist, High-Trust, Executive, "Apple-esque" Depth  
**Core Principle:** Whitespace and subtle dimension instead of loud colors or heavy borders.

---

## Hard Rules

- No emojis anywhere on the site
- No emdashes. Use commas, colons, or hyphens where needed
- No icon fonts or decorative flourishes
- Every hex color, border, and spacing value must match this document exactly

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background (Main) | `#FFFFFF` | Primary page background |
| Background (Secondary) | `#F9FAFB` | Subtle section backgrounds |
| Text (Primary) | `#111827` | Headlines, bold titles |
| Text (Secondary) | `#4B5563` | Body text, descriptions, sub-headers |
| Border / Divider | `#E5E7EB` | Card borders, thin lines, dividers |
| Accent - Support | `#60A5FA` | Support page accent |
| Accent - Escalation | `#2DD4BF` | Escalation page accent |
| Accent - Analytics | `#A78BFA` | Analytics page accent |
| Accent - Home | `#60A5FA` | Homepage default accent |

---

## Page Accent Variables

Each page sets one `--accent` CSS variable at its root. All tiles, borders, and chips inherit it. Never hard-code an accent hex inline.

```css
.support-page    { --accent: #60A5FA; }
.escalation-page { --accent: #2DD4BF; }
.analytics-page  { --accent: #A78BFA; }
.home-page       { --accent: #60A5FA; }
```

If a future page or section needs its own accent, give it its own `--accent` scope.

---

## Typography

| Role | Weight | Size | Color |
|---|---|---|---|
| Hero headline | 700 | 48-64px | `#111827` |
| Section header | 700 | 24-32px | `#111827` |
| Body text | 400 | 16px / 1.6 lh | `#4B5563` |
| Metric chips | 600 | 12px | `#111827` |

- Font stack: `font-sans` (Inter, pinned in `layout.tsx` / `globals.css`)
- Text selection: `bg-[var(--accent)]/20`
- Body copy max width: `max-w-[65ch]` per paragraph/block

---

## Layout and Container

```
mx-auto max-w-6xl px-6
```

- All page content lives inside this wrapper
- Wide tile rows (4-up) live at the container level
- Vertical section padding: `80px`
- Hero: center-aligned
- `overflow-x: hidden` on body to prevent mobile bleed

---

## Responsive Grid

Consistent across every page - no bespoke column counts.

```
grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4
```

---

## Intro Block Rule

Every page header/intro block is strictly:

1. Eyebrow label
2. H1
3. Maximum 3 body lines at `max-w-[65ch]`

No padding paragraphs. Full stop.

---

## Experience / Tile Cards

| Property | Value |
|---|---|
| Border radius | `16px` |
| Border | `1px solid #E5E7EB` |
| Padding | `24px` |
| Top accent | `4px solid var(--accent)` |
| Shadow (default) | `0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)` |
| Hover transform | `translateY(-4px)` |
| Hover shadow | `0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.05)` |
| Transition | `0.2s ease-in-out` |

**Tile row rule:** Every card in one row shares ONE accent via `var(--accent)` - never mixed hues. Differentiation between cards comes from label, number, and icon slot - not color.

---

## Named UI Components

### Primary Button

```tsx
<button className="rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent)] transition-colors duration-150">
```

### Secondary Button (bare link-style)

```tsx
<button className="text-[var(--accent)] hover:opacity-80 text-sm font-medium transition-opacity duration-150">
```

### Capability Pill / Chip

```tsx
<span className="rounded-full border border-[#E5E7EB] px-3 py-1.5 text-xs">
```

Pills are text-only on every page. No icons inside pills.

### Live Demo Badge

```tsx
<div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
  <Radio className="h-3.5 w-3.5" />  {/* optional */}
  LIVE DEMO
</div>
```

---

## State and Motion

| Interaction | Spec |
|---|---|
| Transitions | `colors`, `opacity`, `background-color` at `150ms ease-out` |
| Smooth scroll | `~300ms ease-out` |
| Focus visible | `ring-2 ring-[var(--accent)] ring-offset-2` (buttons: `ring-offset-0`) |
| Nav link idle | `text-[#4B5563]` |
| Nav link hover | `text-[#111827]` |
| Nav link active | `text-[var(--accent)]` |
| Anchor tab active | accent underline + accent text |
| Button primary hover | `bg-[var(--accent)]` |
| Button/link secondary hover | `opacity-80` |

---

## Chat Widget (all three tool pages)

| Property | Value |
|---|---|
| Widget shell max-height | `~560px` |
| Message region height | `~320px` fixed, scrollable |
| Empty state | Compact, centered - not a tall blank |
| Chip gap and padding | Tighter than default |

Must fit the demo section in the first viewport without scroll on all three tool pages.

### Async States

| State | Spec |
|---|---|
| Streaming | `<Loader className="h-4 w-4 animate-spin" />` in accent color inside message pane |
| Reply complete | `<Check className="h-4 w-4" />` micro-state in accent color (optional) |
| Error | Single inline `text-xs` line below chat input in accent color - no modal, no toast |
| Scroll pane scrollbar | Thin, hairline thumb `#E5E7EB` via webkit scrollbar styles |

---

## Icon System

**Package:** `lucide-react` (latest) - single icon source for the entire site.

### Placement Map

| Location | Icon | Size |
|---|---|---|
| Nav - Home | `Home` | `size={16}` |
| Nav - Support | `Headphones` | `size={16}` |
| Nav - Escalation | `TriangleAlert` | `size={16}` |
| Nav - Analytics | `ChartColumn` | `size={16}` |
| Nav / Footer - LinkedIn | `Linkedin` | `size={18}` |
| Hero accent | `Sparkles` | contextual |
| Section label - Live Demo | `Radio` | `size={12}` |
| Section label - My Thinking | `Lightbulb` | `size={12}` |
| Section label - Core Foundation | `Database` | `size={12}` |
| Best practice row marker | `ChevronRight` | `size={14}` (optional) |
| Chat input | `MessageSquare` | `size={14}` |
| Streaming loader | `Loader` | `size={16}` |
| Reply complete | `Check` | `size={16}` |
| Analytics page header | Custom `AnalyticsBarChartIcon` from `@/components/icons` | `h-8 w-8`, color `#A78BFA` |

### Capability Pills
Text-only on every page. No icons.

---

## Navigation

### Row 1 - Main Nav Links

- Logo/name left, LinkedIn icon right
- Links: Home, Support, Escalation, Analytics - each with icon + label
- Link states: idle `text-secondary`, hover `text-primary`, active `text-[var(--accent)]`

### Row 2 - Anchor Tabs (tool pages only)

- Part of the sticky header, not a separate bar
- Anchors: `#demo`, `#thinking`, `#best-practices` (+ `#about` if present)
- Active state: accent underline + accent text
- Scroll-spy via `IntersectionObserver`
- Smooth-scroll on click

---

## Page Accent Quick Reference

| Page | Accent | CSS Class |
|---|---|---|
| Homepage | `#60A5FA` | `.home-page` |
| Support | `#60A5FA` | `.support-page` |
| Escalation | `#2DD4BF` | `.escalation-page` |
| Analytics | `#A78BFA` | `.analytics-page` |
