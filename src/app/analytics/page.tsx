'use client'

import { useEffect } from 'react'
import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'
import { Radio, Lightbulb } from 'lucide-react'

const ACCENT = '#A78BFA'

const badges = [
  'NL2Data',
  'Sentiment Analysis',
  'Pattern Detection',
  '500 Ticket Dataset',
  'KPI Instrumentation',
]

const prompts = [
  'What is driving escalations this month?',
  'Which contact reason has the lowest FCR?',
  'How does CSAT vary by channel?',
  'Which agent has the highest handle time?',
]

const useCaseItems = [
  {
    label: 'Problem',
    body: 'Customer data is in the ticketing system, the CRM, NPS surveys, and spreadsheets three teams own. Nobody has time to cross-reference them. By the time an analyst finishes a pull, the trend it describes is already stale.',
  },
  {
    label: 'Impact',
    body: 'Teams spend an estimated 40+ hours per week on data gathering instead of analysis. Emerging pain points sit in the data for weeks before anyone notices. That delay is revenue that does not come back.',
  },
  {
    label: 'Solution',
    body: 'Ask a question in plain English. Get the trend, the why, and a suggested action back in seconds. Conversational because dashboards tell you what happened. This closes the loop to what to do next.',
  },
  {
    label: 'How I measure it',
    body: 'Time-to-insight in hours vs. the pre-tool baseline in days. Actionable recommendations implemented within 30 days. Stakeholder weekly active usage.',
  },
]

const realWorldText = 'Led Voice of Customer programs at Amazon that surfaced a cross-source product pain point no individual team had connected. A single fix reduced that contact driver by 80%.'

const techBadges = ['RAG Architecture', 'OpenAI GPT-4o', 'Pinecone Vector Search', 'Next.js App Router', 'Kiro']

const kpis = [
  { label: 'Avg CSAT', value: '3.78', sub: 'out of 5' },
  { label: 'FCR Rate', value: '70.4%', sub: 'first contact resolution' },
  { label: 'Escalation Rate', value: '10.0%', sub: 'of total tickets' },
  { label: 'Avg Handle Time', value: '13.7m', sub: 'per ticket' },
]

const myThinking = [
  {
    title: 'Sentiment data tells you how customers feel',
    body: 'CSAT scores are lagging indicators. By the time a survey goes out, the moment has passed. Sentiment analysis at scale gives you real-time signal on how customers actually feel during and after each interaction, before the formal score ever lands.',
  },
  {
    title: 'Purchase decisions tell you what lands',
    body: 'The questions customers ask before they commit, and the objections they raise along the way, are some of the most valuable signals in your support system. Most teams never connect it back to their support data. It tells you exactly what messaging is working and what is creating friction.',
  },
  {
    title: 'Issue detection tells you what to fix',
    body: 'Recurring contact reasons are product and process failures in disguise. Every ticket is a data point pointing back to something that should be addressed upstream. Treating support volume as a signal rather than just a workload changes how you prioritize the roadmap.',
  },
  {
    title: 'Tie it all together to forecast and stay aligned',
    body: 'When sentiment, purchase signals, and issue patterns are unified in one view, you stop reacting to problems and start anticipating them. That is the difference between a support cost center and a business asset that tells you what to fix next.',
  },
]

const bestPractices = [
  {
    title: 'Define your metrics before you build',
    body: 'Know exactly which KPIs you are trying to move before you instrument anything. A dashboard built around unclear goals produces insights nobody acts on.',
  },
  {
    title: 'Make data accessible to decision-makers',
    body: 'The best analytics tools are the ones your managers and team leads actually use. If the data lives in a system only analysts can access, the organization is making decisions on instinct anyway.',
  },
  {
    title: 'Connect operational data to business outcomes',
    body: 'Ticket volume alone means nothing in isolation. Connect it to revenue impact, churn risk, and NPS trends. Data that ties to outcomes gets acted on. Data that does not gets ignored.',
  },
  {
    title: 'Treat data gaps as signals',
    body: 'Missing, inconsistent, or low-quality data is a finding, not an excuse. Every gap points to either a process failure or an instrumentation gap. Both are worth fixing before adding more reporting layers on top.',
  },
  {
    title: 'Audit your current data structure first',
    body: 'You likely have more usable data than you think, just not in the right format or in the right place. A one-hour data audit often surfaces the inputs needed to answer the three most important questions your team is asking.',
  },
  {
    title: 'Start with the metrics your team already tracks',
    body: 'Do not redesign reporting from scratch. Identify what your team checks today and extend it. Familiar data in a better format is more likely to get used than a new system that requires behavioral change.',
  },
  {
    title: 'Answer three questions before building anything',
    body: 'What is our escalation rate? What is our top contact reason? What is our CSAT trend over the last 30 days? If you cannot answer these in under five minutes, that is your starting point and your quick win.',
  },
  {
    title: 'Build one excellent dashboard before building ten',
    body: 'Identify the single view your team opens every morning and make it exceptional. One high-quality, consistently used dashboard generates more organizational value than ten dashboards nobody trusts.',
  },
]

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  border: '1px solid #E5E7EB',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
}

const numberedListItem = (i: number, title: string, body: string) => (
  <div key={title} style={{ borderTop: '1px solid #E5E7EB', padding: '24px 0', display: 'flex', gap: '24px' }}>
    <span style={{ fontSize: '13px', fontWeight: 700, color: '#D1D5DB', flexShrink: 0, paddingTop: '2px', minWidth: '28px' }}>
      {String(i + 1).padStart(2, '0')}
    </span>
    <div>
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: 1.7 }}>{body}</p>
    </div>
  </div>
)

export default function AnalyticsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main className="analytics-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '120px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            TOOL 03 · GEN BI ANALYTICS
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#111827', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Gen BI Analytics Bot
          </h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.7, margin: '0 0 32px' }}>
            Conversational analytics tools let teams ask questions in plain language and get answers in seconds, without waiting on an analyst. The key is having clean, structured data, defining the KPIs that matter, building a query layer that returns trusted results, and measuring whether teams actually change their behavior as a result.
          </p>
          {useCaseItems.map((item, i) => numberedListItem(i, item.label, item.body))}
          <div style={{ borderTop: '1px solid #E5E7EB', marginBottom: '32px' }} />
          <div style={{ ...cardStyle, padding: '20px 24px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Real-World Experience
            </div>
            <p style={{ fontSize: '15px', color: '#111827', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
              {realWorldText}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {badges.map(b => (
              <span key={b} style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                background: 'rgba(167,139,250,0.1)', color: '#7C3AED',
                border: '1px solid rgba(167,139,250,0.25)',
              }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* KPI STRIP */}
      <section style={{ background: '#F9FAFB', padding: '32px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Dataset Snapshot · 500 Synthetic Tickets
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {kpis.map(k => (
              <div key={k.label} style={{ ...cardStyle, padding: '18px 20px' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>{k.value}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', margin: '4px 0 2px' }}>{k.label}</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            Live Demo
          </div>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px' }}>
            Ask a question in plain language. The assistant queries 500 synthetic CX tickets to surface the answer.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {prompts.map(p => (
              <span key={p} style={{
                padding: '6px 14px', borderRadius: '20px', border: '1px solid #E5E7EB',
                background: '#F9FAFB', color: '#374151', fontSize: '13px',
                cursor: 'default',
              }}>{p}</span>
            ))}
          </div>
          <div style={{ maxHeight: '560px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <ChatPanel
              apiEndpoint="/api/analytics"
              accentColor={ACCENT}
              title="Analytics Assistant"
              subtitle="500 synthetic CX tickets"
              suggestedQuestions={prompts}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '10px', textAlign: 'center' }}>
            Use &ldquo;New conversation&rdquo; in the chat header to reset.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Built with</span>
            {techBadges.map(t => (
              <span key={t} style={{ padding: '4px 12px', borderRadius: '20px', background: '#F3F4F6', color: '#374151', fontSize: '12px', fontWeight: 500 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MY THINKING */}
      <section id="thinking" style={{ background: '#F9FAFB', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
            My Thinking
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 32px', letterSpacing: '-0.025em' }}>
            How I approach building this.
          </h2>
          {myThinking.map((item, i) => numberedListItem(i, item.title, item.body))}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section id="best-practices" style={{ background: '#F9FAFB', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Best Practices
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 32px', letterSpacing: '-0.025em' }}>
            Universal standards for CX analytics.
          </h2>
          {bestPractices.map((bp, i) => numberedListItem(i, bp.title, bp.body))}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
        </div>
      </section>
    </main>
  )
}
