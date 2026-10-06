#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = (msg, color = 'reset') => console.log(`${colors[color]}${msg}${colors.reset}`);

// ─── File structure ───────────────────────────────────────────────────────────

const structure = {

  // ── .kiro steering ──────────────────────────────────────────────────────────
  '.kiro/steering': {
    'product.md': `---
inclusion: always
---

# Project Isaac AI — Product Overview

A modular, config-driven AI toolkit built as an interview portfolio demo.
Three distinct tools powered by the same RAG + streaming engine:

1. **Customer Support Chatbot** — answers buyer/seller questions from a help center KB
2. **Internal Escalation Assistant** — guides Tier 1 agents to resolve issues and avoid escalations
3. **Gen BI Analytics Bot** — answers natural language questions about CX ticket data

**Core value prop:** Demonstrates AI applied to real CX operations problems —
support deflection, agent empowerment, and data-driven insight.

**Audience:** Hiring managers and technical recruiters evaluating AI/product capability.
`,
    'tech.md': `---
inclusion: always
---

# Tech Stack

Identical to the Base Power chatbot (proven, documented in PLAYBOOK.md):

- **Next.js 14** (App Router) — framework + API routes
- **TypeScript** — type safety
- **Tailwind CSS** — styling (requires postcss.config.js in production)
- **Vercel AI SDK v2** — streaming, useChat hook
  - Import: \`import { OpenAIStream, StreamingTextResponse } from 'ai'\`
  - Import: \`import { useChat } from 'ai/react'\`
- **OpenAI** — \`text-embedding-3-small\` embeddings, \`gpt-4o\` chat
- **Pinecone v9** — two indexes: \`isaac-support-kb\`, \`isaac-escalation-kb\`
- **Vercel** — hosting (free hobby tier)

## Key Files
- \`src/app/api/support/route.ts\` — Support RAG endpoint
- \`src/app/api/escalation/route.ts\` — Escalation RAG endpoint
- \`src/app/api/analytics/route.ts\` — Analytics NL2Data endpoint
- \`src/lib/pinecone.ts\` — lazy Pinecone factory (supports multiple indexes)
- \`src/lib/embeddings.ts\` — lazy OpenAI embeddings client
- \`src/prompts/\` — system prompts per tool
- \`data/support-kb/\` — support markdown files
- \`data/escalation-kb/\` — escalation markdown files
- \`data/analytics/tickets.json\` — synthetic ticket dataset

## Critical Rules (from PLAYBOOK)
- ALL API clients must be lazy-initialized (module-level init crashes Vercel build)
- ALL responses must use StreamingTextResponse (plain JSON renders as raw text)
- postcss.config.js MUST exist or Tailwind breaks in production
- Pinecone v9 upsert: \`index.upsert({ records: vectors })\` not \`index.upsert(vectors)\`
- Similarity threshold: 0.3 (not 0.75) for FAQ-style content
- OpenAI stream cast: \`OpenAIStream(response as any)\`
`,
    'conventions.md': `---
inclusion: always
---

# Code Conventions

## Naming
- API routes: \`src/app/api/<tool>/route.ts\`
- Pages: \`src/app/<tool>/page.tsx\`
- Prompts: \`src/prompts/<tool>-prompt.txt\`
- KB data: \`data/<tool>-kb/\`

## Config-driven design
Company name, colors, and branding come from \`config/company.json\`.
Tool metadata (name, description, sample questions) comes from \`config/tools.json\`.
No hardcoded company names or colors in component files.

## Styling
Use inline styles for layout-critical properties (not Tailwind classes alone).
Always add explicit width/height to SVG elements.
overflow-x: hidden on body to prevent mobile bleed.
`
  },

  // ── Config ──────────────────────────────────────────────────────────────────
  'config': {
    'company.json': JSON.stringify({
      name: 'eBay',
      tagline: 'Buy. Sell. Discover.',
      primaryColor: '#3665F3',
      secondaryColor: '#F5AF02',
      accentColor: '#E53238',
      logoText: 'eBay',
      supportUrl: 'https://www.ebay.com/help',
      footerNote: 'AI tools powered by Project Isaac AI'
    }, null, 2),

    'tools.json': JSON.stringify({
      support: {
        id: 'support',
        name: 'Customer Support Assistant',
        shortName: 'Support Bot',
        description: 'Answers buyer and seller questions using help center knowledge. Reduces contact volume and improves self-service.',
        icon: 'MessageCircle',
        color: '#3665F3',
        sampleQuestions: [
          'How do I return an item?',
          'Why was my payment declined?',
          'How do I contact a seller?',
          'What is eBay Money Back Guarantee?',
          'How do I track my order?'
        ],
        kbPath: 'data/support-kb',
        pineconeIndex: process.env.PINECONE_SUPPORT_INDEX || 'isaac-support-kb'
      },
      escalation: {
        id: 'escalation',
        name: 'Agent Escalation Assistant',
        shortName: 'Escalation Bot',
        description: 'Guides Tier 1 agents through troubleshooting steps and resolution paths. Reduces escalations and compresses onboarding.',
        icon: 'Shield',
        color: '#10B981',
        sampleQuestions: [
          'Buyer claims item not received, tracking shows delivered',
          'Seller is asking how to appeal an INAD case',
          'Account restricted due to low seller metrics',
          'Buyer opened a chargeback — what are the steps?',
          'When do I escalate to Trust & Safety?'
        ],
        kbPath: 'data/escalation-kb',
        pineconeIndex: process.env.PINECONE_ESCALATION_INDEX || 'isaac-escalation-kb'
      },
      analytics: {
        id: 'analytics',
        name: 'Gen BI Analytics Assistant',
        shortName: 'Analytics Bot',
        description: 'Answers natural language questions about CX ticket data. Surfaces trends, drivers, and opportunities without SQL.',
        icon: 'BarChart2',
        color: '#8B5CF6',
        sampleQuestions: [
          'What is driving escalations this month?',
          'Which contact reason has the lowest FCR?',
          'How does CSAT vary by channel?',
          'What are the top issues for new sellers?',
          'Show me resolution time trends over the last 30 days'
        ],
        dataPath: 'data/analytics/tickets.json'
      }
    }, null, 2)
  },

  // ── Data directories ────────────────────────────────────────────────────────
  'data/support-kb': {
    'README.md': `# Support Knowledge Base

Drop markdown files here. Each file should cover a single topic (returns, payments, shipping, etc.).
Run \`npm run ingest:support\` after adding or updating files.

## File naming convention
- \`returns-and-refunds.md\`
- \`payments-and-billing.md\`
- \`shipping-and-tracking.md\`
- \`account-and-security.md\`
- \`buying-basics.md\`
- \`selling-basics.md\`
- \`ebay-money-back-guarantee.md\`

## Format
Use clear headings (##), bullet points, and short paragraphs.
The chunker splits on paragraphs — keep each section self-contained.
`
  },

  'data/escalation-kb': {
    'README.md': `# Escalation Knowledge Base

Internal procedures and resolution guidance for Tier 1 support agents.
Run \`npm run ingest:escalation\` after adding or updating files.

## Recommended files
- \`tier1-resolution-guide.md\` — step-by-step resolution paths
- \`escalation-criteria.md\` — when and how to escalate
- \`inad-cases.md\` — Item Not As Described handling
- \`inr-cases.md\` — Item Not Received handling
- \`seller-performance.md\` — seller metric issues
- \`trust-and-safety.md\` — policy violations and T&S referrals
- \`agent-scripts.md\` — approved language and scripts

## Format
Use numbered steps for procedures. Include decision trees as bullet points.
Bold escalation triggers.
`
  },

  'data/analytics': {
    'README.md': `# Analytics Dataset

Place your synthetic ticket data here as \`tickets.json\`.

## Expected schema (500 records minimum)
\`\`\`json
{
  "ticket_id": "TKT-0001",
  "date": "2024-10-15",
  "channel": "chat",
  "contact_reason": "item_not_received",
  "issue_category": "shipping",
  "handle_time_mins": 12,
  "csat": 4,
  "first_contact_resolution": true,
  "escalated": false,
  "escalation_reason": null,
  "seller_tier": "top_rated",
  "resolution_type": "refund_issued",
  "sentiment": "neutral",
  "agent_id": "AGT-042",
  "region": "US"
}
\`\`\`

## Field values
- channel: chat | phone | email
- contact_reason: item_not_received | item_not_as_described | return_request | payment_issue | account_access | policy_question | shipping_delay | feedback
- seller_tier: below_standard | standard | top_rated
- sentiment: positive | neutral | negative
- csat: 1-5
- region: US | UK | DE | AU | CA
`
  },

  // ── Prompts ─────────────────────────────────────────────────────────────────
  'src/prompts': {
    'support-prompt.txt': `You are a helpful customer support assistant for {COMPANY_NAME}.

You help buyers and sellers by answering questions based strictly on the knowledge base provided.
If the answer is not in the knowledge base, say so honestly and suggest contacting support directly.

TONE: Friendly, clear, and concise. Get to the answer quickly.

FORMATTING:
- Use **bold** for key terms and important information
- Use bullet points for steps or lists
- Keep responses under 200 words unless the question requires more detail
- End with a soft CTA when relevant (e.g., "Need more help? Visit {SUPPORT_URL}")

GUARDRAILS:
- Only answer questions about {COMPANY_NAME} products, policies, and services
- Never provide legal, financial, or medical advice
- Never make up information not in the knowledge base
- If asked about account-specific issues, direct to official support

KNOWLEDGE BASE CONTEXT:
{CONTEXT}

CONVERSATION HISTORY:
{CHAT_HISTORY}
`,
    'escalation-prompt.txt': `You are an internal AI assistant for {COMPANY_NAME} Tier 1 support agents.

Your job is to help agents resolve customer issues quickly and avoid unnecessary escalations.
You have access to internal procedures, resolution guides, and escalation criteria.

TONE: Direct, professional, and action-oriented. Agents are busy — be concise.

RESPONSE FORMAT:
**Situation:** Brief restatement of the issue
**Recommended Steps:** Numbered resolution path
**Escalate If:** Specific criteria that require escalation
**Required Info:** What to gather before escalating (if applicable)

CORE PRINCIPLE: Empower agents to resolve issues at Tier 1 whenever possible.
Only recommend escalation when criteria are clearly met.

GUARDRAILS:
- Only provide guidance based on documented procedures in the knowledge base
- Never advise agents to take actions outside their authority
- Always include escalation criteria even for resolvable cases
- Flag safety or legal risks immediately

KNOWLEDGE BASE CONTEXT:
{CONTEXT}

CONVERSATION HISTORY:
{CHAT_HISTORY}
`,
    'analytics-prompt.txt': `You are a Gen BI analytics assistant for {COMPANY_NAME} customer experience operations.

You analyze CX ticket data and answer natural language questions about performance, trends, and drivers.
You have access to a dataset of {TICKET_COUNT} support tickets.

TONE: Data-driven and insightful. Lead with the numbers, then explain the "so what."

RESPONSE FORMAT:
- Start with a direct answer (the key metric or finding)
- Support with 2-3 specific data points
- Highlight trends, outliers, or actionable insights
- Suggest a follow-up question when relevant
- When describing charts: "This would display as a [chart type] showing [what]..."

CAPABILITIES:
- Calculate averages, totals, percentages, and trends
- Compare segments (by channel, tier, region, reason, etc.)
- Identify top/bottom performers
- Surface correlations (e.g., "high handle time correlates with...")

GUARDRAILS:
- Only use data from the provided dataset — never fabricate metrics
- State confidence level if sample size is small
- Flag data quality issues if present

DATASET SUMMARY:
{DATA_SUMMARY}

FULL DATASET (use for calculations):
{TICKET_DATA}

CONVERSATION HISTORY:
{CHAT_HISTORY}
`
  },

  // ── Scripts ─────────────────────────────────────────────────────────────────
  'scripts': {
    'ingest-support.ts': `import { getEmbeddings } from '../src/lib/embeddings'
import { getPineconeIndex } from '../src/lib/pinecone'
import * as fs from 'fs'
import * as path from 'path'
import { chunkText } from '../src/lib/utils'
import * as crypto from 'crypto'

const dataDir = path.join(process.cwd(), 'data/support-kb')
const indexName = process.env.PINECONE_SUPPORT_INDEX || 'isaac-support-kb'

async function ingest() {
  console.log('🚀 Ingesting Support KB into Pinecone index:', indexName)
  const index = getPineconeIndex(indexName)

  const files = fs.readdirSync(dataDir).filter(f =>
    (f.endsWith('.md') || f.endsWith('.txt')) && f !== 'README.md'
  )

  if (files.length === 0) {
    console.log('⚠️  No KB files found in data/support-kb/. Add markdown files and re-run.')
    process.exit(0)
  }

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf-8')
    const chunks = chunkText(content, 500, 100)
    console.log(\`📄 \${file}: \${chunks.length} chunks\`)

    const embeddings = await getEmbeddings(chunks)
    const vectors = chunks.map((chunk, i) => ({
      id: crypto.createHash('md5').update(\`support-\${file}-\${i}\`).digest('hex'),
      values: embeddings[i],
      metadata: { text: chunk, source: file, tool: 'support', chunkIndex: i }
    }))

    await index.upsert({ records: vectors })
    console.log(\`   ✅ Upserted \${vectors.length} vectors\`)
  }

  console.log('\\n✨ Support KB ingestion complete!')
}

ingest().catch(err => { console.error('❌ Failed:', err); process.exit(1) })
`,
    'ingest-escalation.ts': `import { getEmbeddings } from '../src/lib/embeddings'
import { getPineconeIndex } from '../src/lib/pinecone'
import * as fs from 'fs'
import * as path from 'path'
import { chunkText } from '../src/lib/utils'
import * as crypto from 'crypto'

const dataDir = path.join(process.cwd(), 'data/escalation-kb')
const indexName = process.env.PINECONE_ESCALATION_INDEX || 'isaac-escalation-kb'

async function ingest() {
  console.log('🚀 Ingesting Escalation KB into Pinecone index:', indexName)
  const index = getPineconeIndex(indexName)

  const files = fs.readdirSync(dataDir).filter(f =>
    (f.endsWith('.md') || f.endsWith('.txt')) && f !== 'README.md'
  )

  if (files.length === 0) {
    console.log('⚠️  No KB files found in data/escalation-kb/. Add markdown files and re-run.')
    process.exit(0)
  }

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf-8')
    const chunks = chunkText(content, 500, 100)
    console.log(\`📄 \${file}: \${chunks.length} chunks\`)

    const embeddings = await getEmbeddings(chunks)
    const vectors = chunks.map((chunk, i) => ({
      id: crypto.createHash('md5').update(\`escalation-\${file}-\${i}\`).digest('hex'),
      values: embeddings[i],
      metadata: { text: chunk, source: file, tool: 'escalation', chunkIndex: i }
    }))

    await index.upsert({ records: vectors })
    console.log(\`   ✅ Upserted \${vectors.length} vectors\`)
  }

  console.log('\\n✨ Escalation KB ingestion complete!')
}

ingest().catch(err => { console.error('❌ Failed:', err); process.exit(1) })
`
  },

  // ── Lib ─────────────────────────────────────────────────────────────────────
  'src/lib': {
    'pinecone.ts': `import { Pinecone } from '@pinecone-database/pinecone'

// Lazy initialization — prevents build-time crashes (see PLAYBOOK.md #5)
let _pinecone: Pinecone | null = null

function getPinecone(): Pinecone {
  if (!_pinecone) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('Missing PINECONE_API_KEY environment variable')
    }
    _pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
  }
  return _pinecone
}

// Factory: get a named index — supports multiple indexes in one app
export function getPineconeIndex(indexName: string) {
  return getPinecone().index(indexName)
}

export interface DocumentChunk {
  id: string
  text: string
  metadata: {
    source: string
    tool: string
    chunkIndex: number
  }
}
`,
    'embeddings.ts': `import OpenAI from 'openai'

// Lazy initialization — prevents build-time crashes (see PLAYBOOK.md #5)
let _openai: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY environment variable')
    }
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return _openai
}

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await getOpenAI().embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await getOpenAI().embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })
  return response.data.map(d => d.embedding)
}
`,
    'utils.ts': `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function chunkText(text: string, maxChunkSize = 500, overlap = 100): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    let end = start + maxChunkSize
    if (end < text.length) {
      const sentenceBreak = text.lastIndexOf('. ', end)
      const wordBreak = text.lastIndexOf(' ', end)
      end = sentenceBreak > start ? sentenceBreak + 1 : wordBreak > start ? wordBreak : end
    }
    chunks.push(text.slice(start, end).trim())
    start = end - overlap
  }

  return chunks.filter(c => c.length > 0)
}
`
  },

  // ── App CSS + Layout ────────────────────────────────────────────────────────
  'src/app': {
    'globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --color-primary: #3665F3;
  --color-secondary: #F5AF02;
  --color-accent: #E53238;
  --color-bg: #FFFFFF;
  --color-surface: #F8FAFC;
  --color-border: rgba(0, 0, 0, 0.08);
  --color-text: #0F172A;
  --color-text-secondary: #64748B;
  --color-support: #3665F3;
  --color-escalation: #10B981;
  --color-analytics: #8B5CF6;
}

body {
  font-family: var(--font);
  background: var(--color-bg);
  color: var(--color-text);
  margin: 0;
  overflow-x: hidden;
}
`,
    'layout.tsx': `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Isaac AI',
  description: 'AI-powered CX toolkit — support, escalation, and analytics',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`,
    'page.tsx': `export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a' }}>Project Isaac AI</h1>
        <p style={{ color: '#64748b', marginTop: '8px' }}>Scaffold complete. Build in progress.</p>
      </div>
    </main>
  )
}
`
  },

  // ── API Routes ───────────────────────────────────────────────────────────────
  'src/app/api/support': {
    'route.ts': `import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { getEmbedding } from '@/lib/embeddings'
import { getPineconeIndex } from '@/lib/pinecone'
import * as fs from 'fs'
import * as path from 'path'

// Lazy OpenAI client (see PLAYBOOK.md #5)
let _openai: OpenAI | null = null
function getOpenAI(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _openai
}

function getSystemPrompt(): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/prompts/support-prompt.txt'), 'utf-8')
  const company = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config/company.json'), 'utf-8'))
  return raw
    .replace(/{COMPANY_NAME}/g, company.name)
    .replace(/{SUPPORT_URL}/g, company.supportUrl)
}

function staticStream(text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    }
  })
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content
    const indexName = process.env.PINECONE_SUPPORT_INDEX || 'isaac-support-kb'

    // Embed + retrieve
    let queryEmbedding: number[]
    try {
      queryEmbedding = await getEmbedding(lastMessage)
    } catch {
      return new StreamingTextResponse(staticStream("I'm having trouble processing your request. Please try again."))
    }

    const index = getPineconeIndex(indexName)
    const results = await index.query({ vector: queryEmbedding, topK: 3, includeMetadata: true })
    const relevant = results.matches?.filter(m => (m.score ?? 0) > 0.3) ?? []

    if (relevant.length === 0) {
      return new StreamingTextResponse(
        staticStream("I don't have specific information about that. For the most accurate answer, please contact support directly.")
      )
    }

    const context = relevant.map(m => m.metadata?.text).filter(Boolean).join('\\n\\n---\\n\\n')
    const chatHistory = messages.slice(0, -1).map((m: any) => \`\${m.role}: \${m.content}\`).join('\\n')

    const systemPrompt = getSystemPrompt()
      .replace('{CONTEXT}', context)
      .replace('{CHAT_HISTORY}', chatHistory)

    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 600,
    })

    return new StreamingTextResponse(OpenAIStream(response as any))
  } catch (error) {
    console.error('[support] Error:', error)
    return new StreamingTextResponse(
      staticStream("Something went wrong. Please try again or contact support directly.")
    )
  }
}
`
  },

  'src/app/api/escalation': {
    'route.ts': `import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { getEmbedding } from '@/lib/embeddings'
import { getPineconeIndex } from '@/lib/pinecone'
import * as fs from 'fs'
import * as path from 'path'

let _openai: OpenAI | null = null
function getOpenAI(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _openai
}

function getSystemPrompt(): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/prompts/escalation-prompt.txt'), 'utf-8')
  const company = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config/company.json'), 'utf-8'))
  return raw.replace(/{COMPANY_NAME}/g, company.name)
}

function staticStream(text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    }
  })
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content
    const indexName = process.env.PINECONE_ESCALATION_INDEX || 'isaac-escalation-kb'

    let queryEmbedding: number[]
    try {
      queryEmbedding = await getEmbedding(lastMessage)
    } catch {
      return new StreamingTextResponse(staticStream("I'm having trouble processing your request. Please try again."))
    }

    const index = getPineconeIndex(indexName)
    const results = await index.query({ vector: queryEmbedding, topK: 3, includeMetadata: true })
    const relevant = results.matches?.filter(m => (m.score ?? 0) > 0.3) ?? []

    if (relevant.length === 0) {
      return new StreamingTextResponse(
        staticStream("I don't have specific guidance on that scenario. Please consult your team lead or supervisor.")
      )
    }

    const context = relevant.map(m => m.metadata?.text).filter(Boolean).join('\\n\\n---\\n\\n')
    const chatHistory = messages.slice(0, -1).map((m: any) => \`\${m.role}: \${m.content}\`).join('\\n')

    const systemPrompt = getSystemPrompt()
      .replace('{CONTEXT}', context)
      .replace('{CHAT_HISTORY}', chatHistory)

    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.5,
      max_tokens: 700,
    })

    return new StreamingTextResponse(OpenAIStream(response as any))
  } catch (error) {
    console.error('[escalation] Error:', error)
    return new StreamingTextResponse(
      staticStream("Something went wrong. Please consult your team lead.")
    )
  }
}
`
  },

  'src/app/api/analytics': {
    'route.ts': `import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import * as fs from 'fs'
import * as path from 'path'

let _openai: OpenAI | null = null
function getOpenAI(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _openai
}

function staticStream(text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    }
  })
}

function getTicketData(): { data: any[]; summary: string } {
  const dataPath = path.join(process.cwd(), 'data/analytics/tickets.json')

  if (!fs.existsSync(dataPath)) {
    return { data: [], summary: 'No ticket data available yet.' }
  }

  const raw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  const data = Array.isArray(raw) ? raw : raw.tickets || []

  // Compute a summary so the prompt is more efficient
  const total = data.length
  const escalated = data.filter((t: any) => t.escalated).length
  const avgCsat = (data.reduce((s: number, t: any) => s + (t.csat || 0), 0) / total).toFixed(2)
  const avgHandle = (data.reduce((s: number, t: any) => s + (t.handle_time_mins || 0), 0) / total).toFixed(1)
  const fcrRate = ((data.filter((t: any) => t.first_contact_resolution).length / total) * 100).toFixed(1)

  const summary = \`Dataset: \${total} tickets | Escalation rate: \${((escalated/total)*100).toFixed(1)}% | Avg CSAT: \${avgCsat}/5 | FCR: \${fcrRate}% | Avg handle time: \${avgHandle} mins\`

  return { data, summary }
}

function getSystemPrompt(ticketCount: number, dataSummary: string, chatHistory: string): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/prompts/analytics-prompt.txt'), 'utf-8')
  const company = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config/company.json'), 'utf-8'))
  return raw
    .replace(/{COMPANY_NAME}/g, company.name)
    .replace('{TICKET_COUNT}', String(ticketCount))
    .replace('{DATA_SUMMARY}', dataSummary)
    .replace('{CHAT_HISTORY}', chatHistory)
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const { data, summary } = getTicketData()

    if (data.length === 0) {
      return new StreamingTextResponse(
        staticStream("The analytics dataset isn't loaded yet. Please add tickets.json to data/analytics/ and restart.")
      )
    }

    const chatHistory = messages.slice(0, -1).map((m: any) => \`\${m.role}: \${m.content}\`).join('\\n')
    const systemPrompt = getSystemPrompt(data.length, summary, chatHistory)

    // Include full dataset in context (gpt-4o handles up to 128K tokens)
    const ticketData = JSON.stringify(data)

    const finalPrompt = systemPrompt.replace('{TICKET_DATA}', ticketData)

    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: finalPrompt },
        ...messages
      ],
      temperature: 0.3,
      max_tokens: 800,
    })

    return new StreamingTextResponse(OpenAIStream(response as any))
  } catch (error) {
    console.error('[analytics] Error:', error)
    return new StreamingTextResponse(
      staticStream("Something went wrong with the analytics query. Please try again.")
    )
  }
}
`
  },

  // ── Tool pages (stubs — full UI built after KB + data are ready) ────────────
  'src/app/support': {
    'page.tsx': `export default function SupportPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#3665F3' }}>Customer Support Assistant</h1>
        <p style={{ color: '#64748b', marginTop: '8px' }}>UI coming soon. API route ready at /api/support</p>
      </div>
    </main>
  )
}
`
  },

  'src/app/escalation': {
    'page.tsx': `export default function EscalationPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#10B981' }}>Agent Escalation Assistant</h1>
        <p style={{ color: '#64748b', marginTop: '8px' }}>UI coming soon. API route ready at /api/escalation</p>
      </div>
    </main>
  )
}
`
  },

  'src/app/analytics': {
    'page.tsx': `export default function AnalyticsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#8B5CF6' }}>Gen BI Analytics Assistant</h1>
        <p style={{ color: '#64748b', marginTop: '8px' }}>UI coming soon. API route ready at /api/analytics</p>
      </div>
    </main>
  )
}
`
  }
}

// ─── Root files ───────────────────────────────────────────────────────────────

const rootFiles = {
  'package.json': JSON.stringify({
    name: 'project-isaac-ai',
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'ingest:support': 'tsx scripts/ingest-support.ts',
      'ingest:escalation': 'tsx scripts/ingest-escalation.ts',
      'ingest:all': 'npm run ingest:support && npm run ingest:escalation'
    },
    dependencies: {
      next: '14.0.4',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      ai: '^2.2.31',
      openai: '^4.24.1',
      '@pinecone-database/pinecone': '^1.1.3',
      'lucide-react': '^0.294.0',
      clsx: '^2.0.0',
      'tailwind-merge': '^2.2.0'
    },
    devDependencies: {
      '@types/node': '^20',
      '@types/react': '^18',
      '@types/react-dom': '^18',
      autoprefixer: '^10.0.1',
      eslint: '^8',
      'eslint-config-next': '14.0.4',
      postcss: '^8',
      tailwindcss: '^3.3.0',
      tsx: '^4.7.0',
      typescript: '^5'
    }
  }, null, 2),

  'tsconfig.json': JSON.stringify({
    compilerOptions: {
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: { '@/*': ['./src/*'] }
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules']
  }, null, 2),

  'tailwind.config.ts': `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3665F3',
        secondary: '#F5AF02',
        accent: '#E53238',
        support: '#3665F3',
        escalation: '#10B981',
        analytics: '#8B5CF6',
      },
    },
  },
  plugins: [],
}
export default config
`,

  // CRITICAL — Tailwind won't work in Vercel production without this (PLAYBOOK #7)
  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`,

  'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}
module.exports = nextConfig
`,

  '.env.local.example': `# Copy to .env.local and fill in your keys
OPENAI_API_KEY=sk-...

# Pinecone — create two indexes in your existing account
PINECONE_API_KEY=...
PINECONE_SUPPORT_INDEX=isaac-support-kb
PINECONE_ESCALATION_INDEX=isaac-escalation-kb

# Note: Analytics uses GPT directly (no Pinecone index needed)
`,

  '.gitignore': `node_modules
.next/
out/
build
.DS_Store
.env*.local
.env
.vercel
*.tsbuildinfo
next-env.d.ts
data/*.pdf
data/*.docx
`,

  'README.md': `# Project Isaac AI

A modular AI toolkit for CX operations, built as an interview portfolio demo.

## Tools
1. **Customer Support Chatbot** — RAG over help center KB (/support)
2. **Agent Escalation Assistant** — RAG over internal procedures (/escalation)
3. **Gen BI Analytics Bot** — NL queries over ticket data (/analytics)

## Quick Start

\`\`\`bash
npm install

cp .env.local.example .env.local
# Add your OpenAI and Pinecone keys

# After adding KB files to data/support-kb/ and data/escalation-kb/
npm run ingest:all

npm run dev
\`\`\`

## Knowledge Base
- Add markdown files to \`data/support-kb/\` for the support chatbot
- Add markdown files to \`data/escalation-kb/\` for the escalation assistant
- Add \`data/analytics/tickets.json\` for the analytics bot
- Run \`npm run ingest:all\` to embed and push to Pinecone

## Config
- \`config/company.json\` — company name, colors, URLs
- \`config/tools.json\` — tool metadata, sample questions

## Deployment
\`\`\`bash
npx vercel --prod --yes
\`\`\`
See PLAYBOOK.md for full deployment guide and troubleshooting.
`
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    log(`  📁 ${dirPath}`, 'blue')
  }
}

function writeFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content)
    log(`  📄 ${path.basename(filePath)}`, 'green')
  } else {
    log(`  ⏭️  Skipped (exists): ${path.basename(filePath)}`, 'yellow')
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  log('\n🏗️  Project Isaac AI — Scaffold\n', 'blue')

  Object.entries(structure).forEach(([dirPath, files]) => {
    const fullDirPath = path.join(process.cwd(), dirPath)
    createDir(fullDirPath)
    Object.entries(files).forEach(([fileName, content]) => {
      writeFile(path.join(fullDirPath, fileName), content)
    })
  })

  log('\nCreating root files...\n', 'blue')
  Object.entries(rootFiles).forEach(([fileName, content]) => {
    writeFile(path.join(process.cwd(), fileName), content)
  })

  log('\n✅ Scaffold complete!\n', 'green')
  log('Next steps:', 'yellow')
  log('  1. npm install', 'reset')
  log('  2. cp .env.local.example .env.local  (add your keys)', 'reset')
  log('  3. Create two Pinecone indexes: isaac-support-kb, isaac-escalation-kb', 'reset')
  log('  4. Add KB markdown files to data/support-kb/ and data/escalation-kb/', 'reset')
  log('  5. Add tickets.json to data/analytics/', 'reset')
  log('  6. npm run ingest:all', 'reset')
  log('  7. npm run dev\n', 'reset')
}

main()
