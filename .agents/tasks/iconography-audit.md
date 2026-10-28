# Iconography Audit — Project Isaac AI

**Audit date:** 2025-01
**Status: Zero icons currently implemented from the agreed spec.** Every icon location is either a raw text label, a numeric counter, or a custom inline SVG. Nothing from lucide-react is imported in any page or shared component.

---

## Package Gaps

| Package | Status | Notes |
|---|---|---|
| `lucide-react` | Installed at `^0.294.0` | Most spec icons available — see gaps below |
| `@simple-icons/react` | NOT installed | Not needed; lucide `Linkedin` exists and works |

### Missing icons in lucide-react v0.294

These spec icons do NOT exist at the installed version:

| Spec Name | Status | Replacement |
|---|---|---|
| `TriangleAlert` | MISSING | Use `AlertTriangle` (identical visual, renamed in later versions) |
| `ChartColumn` | MISSING | Use `BarChart2` or `BarChart3` (same column chart shape) |
| `MessageSquareHeart` | MISSING | Use `MessageSquarePlus` as closest substitute, or upgrade lucide-react |
| `Tickets` | MISSING | Use `Ticket` (singular, exists at v0.294) |

All other spec icons (`Home`, `Headphones`, `Linkedin`, `Sparkles`, `Radio`, `Lightbulb`, `Database`, `ChevronRight`, `MessageSquare`, `Gauge`, `Languages`, `ScanSearch`, `BarChart`) exist and are importable.

---

## File-by-File Audit

---

### Nav.tsx

**What is implemented:**
- LinkedIn icon: custom inline `<svg>` path in the top-right link. Functionally correct and visually accurate — it renders the LinkedIn logomark in fill mode.
- Layout and structure are ready to accept icon components alongside nav link labels.

**What is missing / wrong:**
- No lucide-react import exists at all.
- Nav link items have text labels only. No `Home`, `Headphones`, `TriangleAlert`/`AlertTriangle`, or `ChartColumn`/`BarChart2` icons beside them.
- The LinkedIn SVG is a hardcoded inline path rather than the lucide `Linkedin` component. This works visually but is inconsistent with the icon system — it should be swapped to `<Linkedin />` from lucide-react for consistency.

**Changes needed:**
1. Add lucide-react import: `Home`, `Headphones`, `AlertTriangle`, `BarChart2`, `Linkedin`
2. Update `links` array to include an icon per route and render it beside the label
3. Replace the inline SVG LinkedIn link with `<Linkedin size={18} />`

---

### page.tsx (Homepage)

**What is implemented:**
- LinkedIn icon in closing CTA section: custom inline `<svg>` (same hardcoded path as Nav, renders correctly).
- No icon library imports of any kind.

**What is missing / wrong:**
- No `Sparkles` icon in the hero section accent area.
- LinkedIn SVG in the CTA button is a hardcoded inline path — should use `<Linkedin />` from lucide-react for consistency (though it renders fine as-is).
- No lucide-react import exists in this file.

**Changes needed:**
1. Add lucide-react import: `Sparkles`, `Linkedin`
2. Add `<Sparkles />` as a subtle accent near or above the hero headline
3. Replace the inline SVG in the CTA button with `<Linkedin size={18} />`

---

### src/app/support/page.tsx

**What is implemented:**
- Nothing. No lucide-react import. All section labels ("Live Demo", "My Thinking", "Best Practices") are text-only `<div>` elements.
- Capability pills (badges) are plain text spans: `RAG Architecture`, `Intent Classification`, `Guardrail Implementation`, `A2A / MCP Ready`, `Sample Knowledge Base`. No icons.
- Best practice rows use a numeric counter (`01`, `02`...) instead of any icon.

**What is missing / wrong:**
- No `Radio` icon on "Live Demo" section label
- No `Lightbulb` icon on "My Thinking" section label
- No `Database` or "Core Foundation" sub-section label at all (this page has only "Best Practices", no Core Foundation sub-header)
- No `ChevronRight` on best practice rows
- No icons on capability pills (spec did not mandate specific icons for support pills — see note below)

**Note on Support page capability pills:** The spec did not define specific icons for the support page pills. Confirm whether icons are desired or if text-only is acceptable here.

**Changes needed:**
1. Add lucide-react import: `Radio`, `Lightbulb`, `ChevronRight`
2. Add `<Radio size={12} />` beside the "Live Demo" uppercase label
3. Add `<Lightbulb size={12} />` beside the "My Thinking" uppercase label
4. Optionally add `<ChevronRight size={14} />` to each best practice row in place of or alongside the numeric counter

---

### src/app/escalation/page.tsx

**What is implemented:**
- Nothing. No lucide-react import. All section labels are text-only.
- Capability pills are plain text spans: `RAG Architecture`, `Tier 1 Empowerment`, `Escalation Criteria`, `Internal Knowledge Base`, `KPI Ready`. No icons.
- "Core Foundation" sub-section label exists as text (`Core Foundation`) with no icon.
- Best practice rows use a numeric counter only.

**What is missing / wrong:**
- No `Radio` icon on "Live Demo" section label
- No `Lightbulb` icon on "My Thinking" section label
- No `Database` icon on "Core Foundation" section label
- No `ChevronRight` on best practice rows
- `KPI Ready` pill has no `Gauge` icon

**Changes needed:**
1. Add lucide-react import: `Radio`, `Lightbulb`, `Database`, `ChevronRight`, `Gauge`
2. Add `<Radio size={12} />` beside "Live Demo" label
3. Add `<Lightbulb size={12} />` beside "My Thinking" label
4. Add `<Database size={12} />` beside "Core Foundation" label
5. Add `<Gauge size={10} />` inside the `KPI Ready` pill
6. Optionally add `<ChevronRight />` to best practice rows

---

### src/app/analytics/page.tsx

**What is implemented:**
- Nothing. No lucide-react import. All section labels are text-only.
- Capability pills are plain text spans: `NL2Data`, `Sentiment Analysis`, `Pattern Detection`, `500 Ticket Dataset`, `KPI Instrumentation`. No icons.
- "Core Foundation" sub-section label exists as text with no icon.
- Best practice rows use a numeric counter only.

**What is missing / wrong:**
- No `Radio` icon on "Live Demo" section label
- No `Lightbulb` icon on "My Thinking" section label
- No `Database` icon on "Core Foundation" section label
- No `ChevronRight` on best practice rows
- No icon on `NL2Data` pill (spec: `Languages`)
- No icon on `Sentiment Analysis` pill (spec: `MessageSquareHeart` — **MISSING from v0.294**)
- No icon on `Pattern Detection` pill (spec: `ScanSearch` — exists)
- No icon on `500 Ticket Dataset` pill (spec: `Tickets` — **MISSING**, use `Ticket` singular instead)
- No icon on `KPI Instrumentation` pill (spec: `Gauge` — exists)
- Custom `BarChart` SVG component at `@/components/icons` does NOT exist (file not found at `src/components/icons.tsx` or `.ts`)

**Changes needed:**
1. Create `src/components/icons.tsx` with a custom `AnalyticsBarChart` SVG component, tinted `text-[#A78BFA]` / `color: '#A78BFA'`
2. Add lucide-react import: `Radio`, `Lightbulb`, `Database`, `ChevronRight`, `Languages`, `ScanSearch`, `Ticket`, `Gauge`
3. Add `<Radio size={12} />` beside "Live Demo" label
4. Add `<Lightbulb size={12} />` beside "My Thinking" label
5. Add `<Database size={12} />` beside "Core Foundation" label
6. Add icons to pills: `Languages` (NL2Data), `MessageSquarePlus` as substitute for `MessageSquareHeart` (Sentiment Analysis), `ScanSearch` (Pattern Detection), `Ticket` as substitute for `Tickets` (500 Ticket Dataset), `Gauge` (KPI Instrumentation)
7. Optionally add `<ChevronRight />` to best practice rows
8. Use the new `AnalyticsBarChart` component in the page header area

---

### src/components/ChatPanel.tsx

**What is implemented:**
- Send button: custom inline `<svg>` (paper plane/arrow) — no lucide-react, but works fine visually.
- New conversation button: custom inline `<svg>` (refresh/undo arrow) — no lucide-react.
- No `MessageSquare` icon in the input area.

**What is missing / wrong:**
- No lucide-react import.
- No `MessageSquare` icon in the chat input area (spec calls for it).

**Changes needed:**
1. Add lucide-react import: `MessageSquare`
2. Add `<MessageSquare size={14} />` to the input area — most natural placement is as a leading icon inside the input field or as a label beside it

---

### src/components/icons.tsx

**What is implemented:** File does not exist.

**What is missing / wrong:**
- The spec calls for a custom `BarChart` SVG component here, tinted `#A78BFA`, used in the analytics page header.

**Changes needed:**
1. Create `src/components/icons.tsx`
2. Export a `AnalyticsBarChartIcon` (or similar) component — a simple SVG bar chart using `fill: #A78BFA` or accepting a `color` prop

---

## Consolidated Change List (Grouped by File)

### Package changes
- No new packages needed. All spec icons are available in the installed `lucide-react@0.294.0` with two substitutions:
  - `TriangleAlert` -> use `AlertTriangle`
  - `ChartColumn` -> use `BarChart2`
  - `MessageSquareHeart` -> use `MessageSquarePlus` (or upgrade lucide-react to ~0.400+ where `MessageSquareHeart` was added)
  - `Tickets` -> use `Ticket` (singular)

### src/components/icons.tsx (CREATE)
- [ ] Create file with a custom `AnalyticsBarChartIcon` SVG component, color `#A78BFA`

### src/components/Nav.tsx
- [ ] Import `Home`, `Headphones`, `AlertTriangle`, `BarChart2`, `Linkedin` from lucide-react
- [ ] Add icon to each nav link item (Home, Headphones, AlertTriangle, BarChart2)
- [ ] Replace inline LinkedIn SVG with `<Linkedin size={18} />`

### src/app/page.tsx
- [ ] Import `Sparkles`, `Linkedin` from lucide-react
- [ ] Add `<Sparkles />` accent in hero section
- [ ] Replace inline LinkedIn SVG in CTA button with `<Linkedin size={18} />`

### src/app/support/page.tsx
- [ ] Import `Radio`, `Lightbulb`, `ChevronRight` from lucide-react
- [ ] Add `<Radio size={12} />` to "Live Demo" label
- [ ] Add `<Lightbulb size={12} />` to "My Thinking" label
- [ ] Optionally add `<ChevronRight size={14} />` to best practice rows

### src/app/escalation/page.tsx
- [ ] Import `Radio`, `Lightbulb`, `Database`, `ChevronRight`, `Gauge` from lucide-react
- [ ] Add `<Radio size={12} />` to "Live Demo" label
- [ ] Add `<Lightbulb size={12} />` to "My Thinking" label
- [ ] Add `<Database size={12} />` to "Core Foundation" label
- [ ] Add `<Gauge size={10} />` inside the `KPI Ready` pill
- [ ] Optionally add `<ChevronRight size={14} />` to best practice rows

### src/app/analytics/page.tsx
- [ ] Import `Radio`, `Lightbulb`, `Database`, `ChevronRight`, `Languages`, `ScanSearch`, `Ticket`, `Gauge` from lucide-react
- [ ] Import `AnalyticsBarChartIcon` from `@/components/icons`
- [ ] Add `<Radio size={12} />` to "Live Demo" label
- [ ] Add `<Lightbulb size={12} />` to "My Thinking" label
- [ ] Add `<Database size={12} />` to "Core Foundation" label
- [ ] Add icons to all five capability pills
- [ ] Add `AnalyticsBarChartIcon` to the page header
- [ ] Optionally add `<ChevronRight size={14} />` to best practice rows

### src/components/ChatPanel.tsx
- [ ] Import `MessageSquare` from lucide-react
- [ ] Add `<MessageSquare size={14} />` as a leading icon in the input area

---

## Icon Substitution Summary

| Spec Name | Replacement | Reason |
|---|---|---|
| `TriangleAlert` | `AlertTriangle` | Renamed in later lucide versions; same shape |
| `ChartColumn` | `BarChart2` | Same column chart shape; ChartColumn added post-v0.294 |
| `MessageSquareHeart` | `MessageSquarePlus` | Added post-v0.294; MessageSquarePlus is visually similar |
| `Tickets` | `Ticket` (singular) | Tickets plural not in v0.294; singular is identical icon |

To get the exact spec names, upgrade: `npm install lucide-react@latest`
