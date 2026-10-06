# Project Isaac AI

A modular AI toolkit for CX operations, built as an interview portfolio demo.

## Tools
1. **Customer Support Chatbot** — RAG over help center KB (/support)
2. **Agent Escalation Assistant** — RAG over internal procedures (/escalation)
3. **Gen BI Analytics Bot** — NL queries over ticket data (/analytics)

## Quick Start

```bash
npm install

cp .env.local.example .env.local
# Add your OpenAI and Pinecone keys

# After adding KB files to data/support-kb/ and data/escalation-kb/
npm run ingest:all

npm run dev
```

## Knowledge Base
- Add markdown files to `data/support-kb/` for the support chatbot
- Add markdown files to `data/escalation-kb/` for the escalation assistant
- Add `data/analytics/tickets.json` for the analytics bot
- Run `npm run ingest:all` to embed and push to Pinecone

## Config
- `config/company.json` — company name, colors, URLs
- `config/tools.json` — tool metadata, sample questions

## Deployment
```bash
npx vercel --prod --yes
```
See PLAYBOOK.md for full deployment guide and troubleshooting.
