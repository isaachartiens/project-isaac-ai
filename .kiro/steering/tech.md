---
inclusion: always
---

# Tech Stack

- **Next.js 14** (App Router) — framework + API routes
- **TypeScript** — type safety
- **Tailwind CSS** — styling (postcss.config.js required in production)
- **Vercel AI SDK v2** — streaming responses, useChat hook
  - Import: `import { OpenAIStream, StreamingTextResponse } from 'ai'`
  - Import: `import { useChat } from 'ai/react'`
- **OpenAI** — `text-embedding-3-small` embeddings, `gpt-4o` chat
- **Pinecone v9** — two separate indexes: `isaac-support-kb`, `isaac-escalation-kb`
- **Vercel** — hosting (free hobby tier)

## Key Files
- `src/app/page.tsx` — Homepage (hero, expertise tiles, AI lab, operating principles, build vs. buy)
- `src/app/support/page.tsx` — Customer Support tool page (product case study template)
- `src/app/escalation/page.tsx` — Agent Escalation tool page
- `src/app/analytics/page.tsx` — Gen BI Analytics tool page
- `src/components/Nav.tsx` — Shared navigation with active route state
- `src/components/ChatPanel.tsx` — Reusable embedded chat component (useChat, markdown rendering, reset)
- `src/app/api/support/route.ts` — RAG pipeline for support KB
- `src/app/api/escalation/route.ts` — RAG pipeline for escalation KB
- `src/app/api/analytics/route.ts` — NL2Data pipeline (pre-aggregated, not raw JSON)
- `src/lib/pinecone.ts` — Lazy Pinecone factory (supports multiple named indexes)
- `src/lib/embeddings.ts` — Lazy OpenAI embeddings client
- `src/prompts/` — System prompts per tool (support, escalation, analytics)
- `config/company.json` — Company name, colors, URLs (swap to change branding)
- `config/tools.json` — Tool metadata and sample questions
- `data/support-kb/` — Support knowledge base markdown files (7 files)
- `data/escalation-kb/` — Escalation KB markdown files (5 SOPs)
- `data/analytics/tickets.json` — 500 synthetic CX tickets

## Critical Implementation Rules
- All API clients (OpenAI, Pinecone) must be lazy-initialized — module-level init crashes Vercel build at page-data-collection time
- All API responses must use `StreamingTextResponse` — plain JSON renders as raw text in useChat
- `postcss.config.js` must exist in project root or Tailwind breaks in production build
- Pinecone v9 upsert syntax: `index.upsert({ records: vectors })` not `index.upsert(vectors)`
- Similarity threshold: 0.3 for FAQ-style content (0.75 is too aggressive)
- OpenAI stream requires cast: `OpenAIStream(response as any)` — type mismatch between openai@4.x and ai@2.x
- Analytics route pre-aggregates ticket data before sending to GPT — sending raw JSON exceeds TPM limits
- Vercel env vars must be added to both production and preview environments
