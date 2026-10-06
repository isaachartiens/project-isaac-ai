---
inclusion: always
---

# Tech Stack

Identical to the Base Power chatbot (proven, documented in PLAYBOOK.md):

- **Next.js 14** (App Router) — framework + API routes
- **TypeScript** — type safety
- **Tailwind CSS** — styling (requires postcss.config.js in production)
- **Vercel AI SDK v2** — streaming, useChat hook
  - Import: `import { OpenAIStream, StreamingTextResponse } from 'ai'`
  - Import: `import { useChat } from 'ai/react'`
- **OpenAI** — `text-embedding-3-small` embeddings, `gpt-4o` chat
- **Pinecone v9** — two indexes: `isaac-support-kb`, `isaac-escalation-kb`
- **Vercel** — hosting (free hobby tier)

## Key Files
- `src/app/api/support/route.ts` — Support RAG endpoint
- `src/app/api/escalation/route.ts` — Escalation RAG endpoint
- `src/app/api/analytics/route.ts` — Analytics NL2Data endpoint
- `src/lib/pinecone.ts` — lazy Pinecone factory (supports multiple indexes)
- `src/lib/embeddings.ts` — lazy OpenAI embeddings client
- `src/prompts/` — system prompts per tool
- `data/support-kb/` — support markdown files
- `data/escalation-kb/` — escalation markdown files
- `data/analytics/tickets.json` — synthetic ticket dataset

## Critical Rules (from PLAYBOOK)
- ALL API clients must be lazy-initialized (module-level init crashes Vercel build)
- ALL responses must use StreamingTextResponse (plain JSON renders as raw text)
- postcss.config.js MUST exist or Tailwind breaks in production
- Pinecone v9 upsert: `index.upsert({ records: vectors })` not `index.upsert(vectors)`
- Similarity threshold: 0.3 (not 0.75) for FAQ-style content
- OpenAI stream cast: `OpenAIStream(response as any)`
