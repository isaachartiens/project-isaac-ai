---
inclusion: always
---

# Code Conventions

## Naming
- API routes: `src/app/api/<tool>/route.ts`
- Pages: `src/app/<tool>/page.tsx`
- Prompts: `src/prompts/<tool>-prompt.txt`
- KB data: `data/<tool>-kb/`

## Config-driven design
Company name, colors, and branding come from `config/company.json`.
Tool metadata (name, description, sample questions) comes from `config/tools.json`.
No hardcoded company names or colors in component files.

## Styling
Use inline styles for layout-critical properties (not Tailwind classes alone).
Always add explicit width/height to SVG elements.
overflow-x: hidden on body to prevent mobile bleed.
