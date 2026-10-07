'use client'

import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'
import { Radio, Lightbulb, Database, ChevronRight, Languages, MessageSquareHeart, ScanSearch, Tickets, Gauge } from 'lucide-react'
import { AnalyticsBarChartIcon } from '@/components/icons'

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

const myThinking = [
  {
    title: 'Sentiment data tells you how customers feel',
    body: 'CSAT scores are lagging indicators. By the time a survey goes out, the moment has passed. Sentiment analysis at scale gives you real-time signal on how customers actually feel during and after each interaction, before the formal score ever lands.',
  },
  {
    title: 'Purchase decisions tell you what lands',
    body: 'The questions customers ask before they commit, and the objections they raise along the way, are some of the most valuable signals in your support system. Most organizations ignore this data entirely. It tells you exactly what messaging is working and what is creating friction.',
  },
  {
    title: 'Issue detection tells you what to fix',
    body: 'Recurring contact reasons are product and process failures in disguise. Every ticket is a data point pointing back to something that should be addressed upstream. Treating support volume as a signal rather than just a workload changes how you prioritize the roadmap.',
  },
  {
    title: 'Tie it all together to forecast and stay aligned',
    body: 'When sentiment, purchase signals, and issue patterns are unified in one view, you stop reacting to problems and start anticipating them. That is the difference between a support cost center and a customer intelligence engine that drives growth and stays aligned with company principles.',
  },
]

const bestPractices = {
  core: [
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
  ],
  quickWins: [
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
  ],
}

const kpis = [
  { label: 'Avg CSAT', value: '3.78', sub: 'out of 5', color: '#60A5FA' },
  { label: 'FCR Rate', value: '70.4%', sub: 'first contact resolution', color: '#2DD4BF' },
  { label: 'Escalation Rate', value: '10.0%', sub: 'of total tickets', color: '#F87171' },
  { label: 'Avg Handle Time', value: '13.7m', sub: 'per ticket', color: '#A78BFA' },
]

export default function AnalyticsPage() {
  return (
    <main className="analytics-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '96px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Tool 03 - Gen BI Analytics
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <AnalyticsBarChartIcon className="h-8 w-8" style={{ color: '#A78BFA', flexShrink: 0 }} />
            <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Gen BI Analytics Bot
            </h1>
          </div>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#6B7280', margin: '0 0 20px' }}>
            Conversational Intelligence for CX Operations
          </p>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.75, margin: '0 0 28px', maxWidth: '65ch' }}>
            This prototype demonstrates how natural language queries can replace manual data analysis for CX teams.
            Built over a synthetic dataset of 500 support tickets, the assistant surfaces patterns in sentiment,
            escalation behavior, agent performance, and contact drivers on demand, without SQL or BI tooling.
            Sentiment data tells you how customers feel. Purchase and decision signals tell you what is working.
            Issue detection tells you what to fix. Together, they give leaders a connected view of the customer
            experience that supports forecasting, roadmap alignment, and sustained growth.
          </p>
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
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {kpis.map(k => (
            <div key={k.label} style={{
              background: '#fff', borderRadius: '12px', padding: '18px 20px',
              border: '1px solid #E5E7EB', borderTop: '3px solid var(--accent)',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>{k.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', margin: '4px 0 2px' }}>{k.label}</div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{k.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO + THINKING */}
      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>

          {/* LEFT: Chat */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                Live Demo
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 12px' }}>
                Ask a question in plain language. The assistant queries 500 synthetic CX tickets to surface the answer.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {prompts.map(p => (
                  <span key={p} style={{
                    padding: '6px 14px', borderRadius: '20px', border: '1px solid #E5E7EB',
                    background: '#F9FAFB', color: '#374151', fontSize: '13px',
                    cursor: 'default',
                  }}>{p}</span>
                ))}
              </div>
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
          </div>

          {/* RIGHT: My Thinking */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
              My Thinking
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {myThinking.map((item, i) => {
                // Each thinking card gets a contextual icon
                const thinkingIcons = [MessageSquareHeart, ScanSearch, Tickets, Languages]
                const ThinkIcon = thinkingIcons[i]
                return (
                  <div key={item.title} style={{
                    background: '#F9FAFB', borderRadius: '12px', padding: '18px 20px',
                    border: '1px solid #E5E7EB',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#D1D5DB', paddingTop: '3px' }}>
                          0{i + 1}
                        </span>
                        {ThinkIcon && <ThinkIcon style={{ width: '12px', height: '12px', color: 'var(--accent)', opacity: 0.6 }} aria-hidden="true" />}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>{item.title}</h3>
                        <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.65 }}>{item.body}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section style={{ background: '#F9FAFB', padding: '80px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Best Practices
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.025em' }}>
            Universal standards for CX analytics.
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', margin: '0 0 48px', lineHeight: 1.6 }}>
            Core foundations to build on, and quick wins you can action immediately.
          </p>

          {/* Core */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              <Database className="h-3.5 w-3.5" aria-hidden="true" />
              Core Foundation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {bestPractices.core.map((bp, i) => (
                <div key={bp.title} style={{
                  padding: '22px 0',
                  borderTop: '1px solid #E5E7EB',
                  display: 'flex', gap: '24px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#D1D5DB', flexShrink: 0, paddingTop: '2px', minWidth: '24px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>
                      <ChevronRight className="h-3.5 w-3.5" style={{ color: '#D1D5DB', flexShrink: 0 }} aria-hidden="true" />
                      {bp.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: 1.7 }}>{bp.body}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #E5E7EB' }} />
            </div>
          </div>

          {/* Quick Wins */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
              Quick Wins
            </div>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 4px' }}>
              Things you can action this week, before any new tooling is in place.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {bestPractices.quickWins.map((bp, i) => (
                <div key={bp.title} style={{
                  padding: '22px 0',
                  borderTop: '1px solid #E5E7EB',
                  display: 'flex', gap: '24px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', flexShrink: 0, paddingTop: '2px', minWidth: '24px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>
                      <ChevronRight className="h-3.5 w-3.5" style={{ color: '#D1D5DB', flexShrink: 0 }} aria-hidden="true" />
                      {bp.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: 1.7 }}>{bp.body}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #E5E7EB' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
