# Project Isaac AI - Implementation Tasks

## Status Key
- [ ] Not started
- [ ] In progress
- [x] Complete

---

## Phase 1: Foundation (Complete)

### Task 1.1: Scaffold project ✅
- [x] Next.js 14 project initialized
- [x] TypeScript, Tailwind, postcss.config.js configured
- [x] Project structure created
- [x] npm install complete

### Task 1.2: Core libraries ✅
- [x] Lazy Pinecone client (getPineconeIndex factory)
- [x] Lazy OpenAI embeddings client
- [x] chunkText utility
- [x] 3 API routes scaffolded (support, escalation, analytics)
- [x] 3 system prompt files created
- [x] 2 ingest scripts created
- [x] config/company.json + config/tools.json

---

## Phase 2: Data & KB

### Task 2.1: Create Pinecone indexes
- [ ] Create `isaac-support-kb` index (1536 dims, cosine)
- [ ] Create `isaac-escalation-kb` index (1536 dims, cosine)
- [ ] Add index names to .env.local

### Task 2.2: Support KB content
- [ ] Add help center markdown files to data/support-kb/
  - [ ] returns-and-refunds.md
  - [ ] payments-and-billing.md
  - [ ] shipping-and-tracking.md
  - [ ] buying-basics.md
  - [ ] selling-basics.md
  - [ ] ebay-money-back-guarantee.md
  - [ ] account-and-security.md
- [ ] Run `npm run ingest:support`
- [ ] Verify vectors in Pinecone dashboard

### Task 2.3: Escalation KB content
- [ ] Add internal procedure markdown files to data/escalation-kb/
  - [ ] tier1-resolution-guide.md
  - [ ] escalation-criteria.md
  - [ ] inr-cases.md (item not received)
  - [ ] inad-cases.md (item not as described)
  - [ ] seller-performance.md
  - [ ] trust-and-safety.md
- [ ] Run `npm run ingest:escalation`
- [ ] Verify vectors in Pinecone dashboard

### Task 2.4: Analytics dataset
- [ ] Add tickets.json to data/analytics/ (500 records minimum)
- [ ] Verify schema matches expected format
- [ ] Test analytics route returns data

---

## Phase 3: UI — Home Page

### Task 3.1: Navigation
- [ ] Fixed top nav with links to all 4 pages
- [ ] Active state per route
- [ ] Mobile hamburger menu
- [ ] Company logo/name from config

### Task 3.2: Hero section
- [ ] Isaac's background and role summary
- [ ] Skills/expertise tags
- [ ] Project purpose statement
- [ ] CTA buttons to each tool

### Task 3.3: Tool cards
- [ ] Three cards in responsive grid
- [ ] Icon, title, description, color per tool
- [ ] Hover effect + link to tool page
- [ ] Data driven from config/tools.json

### Task 3.4: Instructions section
- [ ] How to use each tool
- [ ] Sample questions listed per tool

---

## Phase 4: UI — Tool Pages

### Task 4.1: Shared ChatWidget component
- [ ] Floating button (bottom-right, fixed)
- [ ] "Ask Base" style label below button
- [ ] Expand/collapse animation
- [ ] Messages area with markdown rendering
- [ ] Input + send button
- [ ] Suggested questions (from config/tools.json)
- [ ] Tool-specific accent color
- [ ] Routes to correct API endpoint per page

### Task 4.2: Support page background
- [ ] Help center aesthetic (search bar, category cards, article list)
- [ ] Uses company primary color (#3665F3)
- [ ] Does not interfere with chat widget

### Task 4.3: Escalation page background
- [ ] Ticketing system aesthetic (queue, status badges, priority)
- [ ] Uses escalation color (#10B981)
- [ ] Sample dummy tickets displayed

### Task 4.4: Analytics page background
- [ ] Dashboard aesthetic (KPI cards, chart placeholders, date filter)
- [ ] Uses analytics color (#8B5CF6)
- [ ] KPI values sourced from tickets.json summary stats

---

## Phase 5: Polish & Deploy

### Task 5.1: Markdown rendering in chat
- [ ] Bold (**text**) renders correctly
- [ ] Bullet points render correctly
- [ ] Links render correctly
- [ ] Code blocks styled if needed

### Task 5.2: Responsive design
- [ ] Mobile layout for all pages (375px+)
- [ ] Chat widget fits within screen on mobile
- [ ] Grid stacks to single column on mobile
- [ ] Navigation collapses to hamburger

### Task 5.3: Error states
- [ ] Empty KB graceful message
- [ ] API error graceful message
- [ ] Missing tickets.json graceful message

### Task 5.4: .env.local + Vercel env vars
- [ ] OPENAI_API_KEY set
- [ ] PINECONE_API_KEY set
- [ ] PINECONE_SUPPORT_INDEX set
- [ ] PINECONE_ESCALATION_INDEX set
- [ ] Same vars added to Vercel (production + preview)

### Task 5.5: Deploy
- [ ] Local build passes (`npm run build`)
- [ ] Deploy to Vercel: `npx vercel --prod --yes`
- [ ] Live URL tested end-to-end
- [ ] All three tools working on live URL

---

## Phase 6: Demo Prep (Optional)

### Task 6.1: Demo script
- [ ] Sample questions per tool documented
- [ ] Key features and talking points noted
- [ ] Technical architecture explanation ready

### Task 6.2: Company swap test
- [ ] Update config/company.json with a different company
- [ ] Verify branding updates throughout UI
- [ ] Swap KB files, re-ingest, verify new content

---

## Dependencies Summary

```
Phase 1 (done) → Phase 2 (data) → Phase 3 (home UI) → Phase 4 (tool UI)
                                 → Phase 4 (tool UI) → Phase 5 (deploy)
Phase 2.4 (tickets) → Phase 4.4 (analytics dashboard KPIs)
```

## Notes
- Phase 1 complete — scaffold done, deps installed
- Phase 2 unblocked — waiting on KB content and ticket data from user
- Phases 3-5 can start before Phase 2 is complete (UI doesn't need real data)
