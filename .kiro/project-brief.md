# Project Isaac AI — Project Brief

## What This Is

Project Isaac AI is a professional portfolio site and AI demo toolkit built by Isaac Hartiens.
It serves two purposes simultaneously:

1. A professional landing page establishing Isaac's identity as an operational leader with a decade of experience in CX, Product Management, Program Management, and AI Transformation.
2. A working AI demonstration toolkit with three fully functional tools that showcase how AI can be applied to real CX operations problems.

The site is built to be used as a live demo asset during job interviews and applications, particularly for AI Transformation Lead, Product Manager, and CX Operations leadership roles.

---

## Who It Is For

**Primary audience:** Hiring managers, technical recruiters, and executives evaluating AI transformation or product leadership candidates.

**Secondary audience:** Anyone building or considering AI tooling for CX operations who wants a concrete, working example of what these systems look like in practice.

---

## The Three Tools

### Tool 01: Customer Support Assistant
A RAG-powered chatbot grounded in a curated knowledge base of support documentation. Demonstrates how AI can deflect support volume, improve self-service, and maintain guardrails to prevent hallucination. Built to mirror the self-service knowledge architecture deployed at Amazon to reduce live agent contact volume.

- Architecture: RAG (Retrieval-Augmented Generation)
- KB: 7 markdown files covering returns, payments, shipping, buying, selling, MBG, account security
- Pinecone index: `isaac-support-kb`
- API route: `/api/support`

### Tool 02: Agent Escalation Assistant
An internal-facing AI guide for Tier 1 support agents. Surfaces troubleshooting steps, resolution paths, and escalation criteria on demand. Inspired by the AI escalation guidance tool deployed at Amazon that reduced Tier 2 escalation rates by 30%.

- Architecture: RAG over internal SOP documentation
- KB: 5 markdown SOPs covering INR, INAD, escalation criteria, seller performance, account restrictions
- Pinecone index: `isaac-escalation-kb`
- API route: `/api/escalation`

### Tool 03: Gen BI Analytics Bot
A natural language analytics interface over a synthetic CX ticket dataset. Allows managers to query operational data without SQL or BI tools. Demonstrates the conversational analytics layer built to give teams instant answers from operational data.

- Architecture: NL2Data (pre-aggregated statistics sent to gpt-4o)
- Dataset: 500 synthetic tickets with 15 fields (agent, team, channel, reason, CSAT, FCR, escalation, etc.)
- API route: `/api/analytics`

---

## The Argument the Site Makes

The site argues one central thesis across all three tools:

> "These systems are only as good as the foundation you put in place. The bottleneck is almost never the technology. It is knowing what you are trying to solve."

This is expressed through:
- The "Build vs. Buy" section on the homepage
- The "My Thinking" panels on each tool page
- The "Best Practices" sections (Core Foundation + Quick Wins) on each tool page

---

## Design System

The site uses a minimalist, professional aesthetic called "V2":
- Background: white (#FFFFFF) and soft gray (#F9FAFB) sections
- Text: near-black (#111827) primary, medium gray (#4B5563) secondary
- Borders: light gray (#E5E7EB)
- Cards: 16px radius, 1px border, subtle shadow, 4px colored top border
- Tool accent colors: Support = #60A5FA, Escalation = #2DD4BF, Analytics = #A78BFA
- Hero gradient: blue-to-violet (linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%))
- No emojis, no em dashes, no decorative flourishes

---

## Tech Stack

Next.js 14, TypeScript, Tailwind CSS, Vercel AI SDK v2, OpenAI (embeddings + gpt-4o), Pinecone v9, Vercel hosting.

See `.kiro/steering/tech.md` for full implementation details and critical rules.

---

## Status

- Homepage: complete (hero, expertise tiles, AI lab, build vs. buy, operating principles)
- Support page: complete (product case study template)
- Escalation page: complete (product case study template)
- Analytics page: complete (product case study template)
- Experience page: not yet built
- Vercel deployment: pending

---

## Key Differentiators vs. a Standard Portfolio

1. The tools actually work — recruiters can use them live, not view screenshots
2. The "My Thinking" panels show reasoning, not just deliverables
3. The "Build vs. Buy" section is useful to visitors regardless of hiring intent
4. The Best Practices sections (Core + Quick Wins) provide takeaways for practitioners
5. Config-driven branding means the KB and company context can be swapped per interview
