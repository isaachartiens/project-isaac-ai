# Project Isaac AI - Technical Design

> This project uses Next.js 14, Vercel AI SDK v2, OpenAI, and Pinecone v9.
> See `.kiro/steering/tech.md` for full implementation details and critical rules.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                     │
│  Home Page  │  Support Page  │  Escalation  │  Analytics │
│             │  + HelpCenter  │  + TicketUI  │  + Dash UI │
│             │    Background  │  Background  │  Background│
└──────────────────────────────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────┐
│                    CHAT WIDGET LAYER                      │
│         Floating ChatWidget (per-tool context)            │
│         useChat (Vercel AI SDK v2 / ai/react)             │
└──────────────────────────────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js)                  │
│  /api/support     /api/escalation     /api/analytics      │
│  (RAG pipeline)   (RAG pipeline)      (NL2Data pipeline)  │
└──────────────────────────────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────┐
│                       DATA LAYER                          │
│  Pinecone (support) │ Pinecone (escalation) │  JSON file  │
│  isaac-support-kb   │ isaac-escalation-kb   │  tickets    │
└──────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| Framework | Next.js App Router | 14.0.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS + inline styles | Requires postcss.config.js |
| AI SDK | Vercel AI SDK | ai@2.2.x — NOT v3 |
| LLM | OpenAI GPT-4o | gpt-4o for all three agents |
| Embeddings | OpenAI text-embedding-3-small | 1536 dimensions |
| Vector DB | Pinecone v9 | Two named indexes |
| Hosting | Vercel | Free hobby tier |

---

## File Structure

```
Project Isaac AI/
├── config/
│   ├── company.json          ← brand: name, colors, URLs
│   └── tools.json            ← tool metadata, sample questions
├── data/
│   ├── support-kb/           ← markdown KB files (drop & ingest)
│   ├── escalation-kb/        ← markdown KB files (drop & ingest)
│   └── analytics/
│       └── tickets.json      ← synthetic CX ticket dataset
├── scripts/
│   ├── ingest-support.ts     ← npm run ingest:support
│   └── ingest-escalation.ts  ← npm run ingest:escalation
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── support/route.ts
│   │   │   ├── escalation/route.ts
│   │   │   └── analytics/route.ts
│   │   ├── support/page.tsx
│   │   ├── escalation/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            ← Home page
│   ├── lib/
│   │   ├── pinecone.ts         ← lazy getPineconeIndex(name) factory
│   │   ├── embeddings.ts       ← lazy getEmbedding / getEmbeddings
│   │   └── utils.ts            ← chunkText, cn
│   └── prompts/
│       ├── support-prompt.txt
│       ├── escalation-prompt.txt
│       └── analytics-prompt.txt
├── .kiro/
│   ├── specs/project-isaac-ai/
│   └── steering/
├── postcss.config.js           ← REQUIRED for Tailwind in production
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## RAG Pipeline (Support & Escalation)

```
User message
    │
    ▼
getEmbedding(message)           ← text-embedding-3-small
    │
    ▼
getPineconeIndex(indexName)
  .query({ vector, topK: 3, includeMetadata: true })
    │
    ▼
Filter: score > 0.3             ← NOT 0.75 (see PLAYBOOK #2)
    │
    ▼
Build context string from matching chunks
    │
    ▼
Inject into system prompt       ← {CONTEXT} placeholder
    │
    ▼
gpt-4o streaming completion
    │
    ▼
OpenAIStream(response as any)   ← cast needed (see PLAYBOOK #6)
StreamingTextResponse(stream)
```

---

## Analytics Pipeline (NL2Data)

```
User message
    │
    ▼
Load tickets.json from data/analytics/
    │
    ▼
Compute summary stats           ← pre-computed in route handler
(total, escalation rate, avg CSAT, FCR %, avg handle time)
    │
    ▼
Build system prompt with:
  - {DATA_SUMMARY}              ← pre-computed stats
  - {TICKET_DATA}               ← full JSON dataset
    │
    ▼
gpt-4o streaming completion     ← 128K context handles 500+ records
    │
    ▼
StreamingTextResponse
```

---

## Data Models

### Ticket Record (analytics dataset)
```typescript
interface TicketRecord {
  ticket_id: string           // "TKT-0001"
  date: string                // "2024-10-15"
  channel: 'chat' | 'phone' | 'email'
  contact_reason: string      // "item_not_received" etc.
  issue_category: string      // "shipping", "billing", etc.
  handle_time_mins: number
  csat: 1 | 2 | 3 | 4 | 5
  first_contact_resolution: boolean
  escalated: boolean
  escalation_reason: string | null
  seller_tier: 'below_standard' | 'standard' | 'top_rated'
  resolution_type: string
  sentiment: 'positive' | 'neutral' | 'negative'
  agent_id: string
  region: 'US' | 'UK' | 'DE' | 'AU' | 'CA'
}
```

### Company Config
```typescript
interface CompanyConfig {
  name: string          // "eBay"
  tagline: string
  primaryColor: string  // "#3665F3"
  secondaryColor: string
  accentColor: string
  logoText: string
  supportUrl: string
  footerNote: string
}
```

### Tool Config
```typescript
interface ToolConfig {
  id: string
  name: string
  shortName: string
  description: string
  icon: string          // Lucide icon name
  color: string         // Tool accent color
  sampleQuestions: string[]
  kbPath?: string       // For RAG tools
  pineconeIndex?: string
  dataPath?: string     // For analytics tool
}
```

---

## Color System

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#3665F3` | Navigation, support tool |
| `--color-secondary` | `#F5AF02` | eBay yellow accent |
| `--color-accent` | `#E53238` | eBay red accent |
| `--color-escalation` | `#10B981` | Escalation tool |
| `--color-analytics` | `#8B5CF6` | Analytics tool |
| `--color-surface` | `#F8FAFC` | Page/card background |
| `--color-border` | `rgba(0,0,0,0.08)` | Borders |
| `--color-text` | `#0F172A` | Primary text |
| `--color-text-secondary` | `#64748B` | Secondary text |

---

## Critical Implementation Notes (from PLAYBOOK.md)

1. All API clients (OpenAI, Pinecone) MUST be lazy-initialized — module-level init crashes Vercel build
2. All responses MUST use `StreamingTextResponse` — plain JSON renders as raw text in useChat
3. `postcss.config.js` MUST exist in project root or Tailwind breaks in production
4. Pinecone v9 upsert: `index.upsert({ records: vectors })` not `index.upsert(vectors)`
5. Similarity threshold: 0.3 (not 0.75) for FAQ-style content
6. OpenAI stream cast: `OpenAIStream(response as any)` — type mismatch between openai@4.x and ai@2.x
7. Vercel env vars must be added to BOTH production and preview environments
8. `getSystemPrompt()` must be called inside the handler, not at module level
