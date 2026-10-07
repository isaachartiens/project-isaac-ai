'use client'

import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'
import { Radio, Lightbulb, Database, ChevronRight, Gauge } from 'lucide-react'

const ACCENT = '#2DD4BF'

const badges = [
  'RAG Architecture',
  'Tier 1 Empowerment',
  'Escalation Criteria',
  'Internal Knowledge Base',
  'KPI Ready',
]

const prompts = [
  'Buyer claims item not received, tracking shows delivered',
  'Seller asking how to appeal an INAD case',
  'Account restricted due to low seller metrics',
  'When do I escalate to Trust and Safety?',
]

const myThinking = [
  {
    title: 'Start with the pain points',
    body: 'Long call times and high escalation rates are not problems to accept, they are data. I start by analyzing where agents are struggling most and use those patterns to prioritize what goes into the knowledge base. The pain points are the roadmap.',
  },
  {
    title: 'AI does not have to solve every problem',
    body: 'Some friction is better removed with automation than conversation. When I identify laborious escalation workflows, I ask whether a bot response is the right tool or whether the process itself needs to change. AI is most effective when it is paired with the right solution for each specific problem.',
  },
  {
    title: 'Integrate systems wherever the foundation allows',
    body: 'When AI is connected to the tools your agents already use, conversational AI becomes agentic AI. The assistant moves from providing answers to taking controlled actions within your systems, compressing resolution time and reducing the manual steps agents take on every contact.',
  },
  {
    title: 'Track every KPI that matters',
    body: 'You cannot improve what you cannot measure. I build data tooling into every deployment that connects usage to escalation rates, handle time, CSAT, agent satisfaction, and first contact resolution. These are the signals that drive continuous improvement and validate the investment over time.',
  },
]

const bestPractices = {
  core: [
    {
      title: 'Build from real escalation data',
      body: 'Before writing a line of KB content, analyze your top escalation reasons from the past 90 days. The most common reasons are the most important to address first. Let the data set the priorities.',
    },
    {
      title: 'Design for empowerment, not replacement',
      body: 'The goal is to make Tier 1 agents more capable, not redundant. Framing matters both in how the tool is built and how it is communicated to the team. Agent buy-in drives adoption, and adoption drives results.',
    },
    {
      title: 'Keep escalation paths clear and fast',
      body: 'When a situation genuinely requires Tier 2, the handoff should be seamless and pre-populated with context. A slow or unclear escalation path is as damaging as no guidance at all.',
    },
    {
      title: 'Update the KB on a regular cycle',
      body: 'Agent feedback is the best source of missing knowledge. Build a lightweight process for agents to flag gaps in real time, and schedule a monthly KB review to incorporate what the data and the team are telling you.',
    },
  ],
  quickWins: [
    {
      title: 'Document your top 10 escalation reasons',
      body: 'Most teams have never written this list down in a structured format. Just creating it is immediately actionable — it tells you exactly where to build first and gives Tier 2 a baseline to compare against.',
    },
    {
      title: 'Create a "Tier 1 can resolve" list',
      body: 'Defining what agents are empowered to handle is as valuable as defining what needs to escalate. A clear resolution authority list reduces unnecessary escalations before any AI tooling is in place.',
    },
    {
      title: 'Standardize your escalation handoff template',
      body: 'Consistent escalation notes — contact reason, steps taken, customer sentiment — reduce Tier 2 processing time immediately. This is a process win that costs nothing and pays off the same day it is implemented.',
    },
    {
      title: 'Pilot with 3 to 5 scenarios before expanding',
      body: 'Do not try to build the entire KB at once. Pick your highest-frequency issues, deploy guidance for those, measure the impact, and then expand. A focused pilot generates proof points that justify the broader investment.',
    },
  ],
}

export default function EscalationPage() {
  return (
    <main className="escalation-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '120px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Tool 02 · Agent Escalation
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Agent Escalation Assistant
          </h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.75, margin: '0 0 28px', maxWidth: '65ch' }}>
            Built in hours, not days, against five internal SOP files. A Tier 1 agent asks in plain English and gets the decision tree, the resolve-or-escalate line, and the exact steps back in seconds. A team could have this running next morning. Escalation rate drops. Tier 2 queue drops. Nothing else required. The SOP routing underneath is where ten years of system integrations makes point-it-at-the-wiki-and-go the obvious next step.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {badges.map(b => (
              <span key={b} style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                background: 'rgba(45,212,191,0.1)', color: '#0D9488',
                border: '1px solid rgba(45,212,191,0.25)',
              }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO + THINKING */}
      <section id="demo" style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>

          {/* LEFT: Chat */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                Live Demo
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 12px' }}>
                Try a suggested scenario or describe your own. Each prompt tests a different resolution path.
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
                apiEndpoint="/api/escalation"
                accentColor={ACCENT}
                title="Escalation Assistant"
                subtitle="Internal Tier 1 guidance tool"
                suggestedQuestions={prompts}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '10px', textAlign: 'center' }}>
              Use &ldquo;New conversation&rdquo; in the chat header to reset.
            </p>
          </div>

          {/* RIGHT: My Thinking */}
          <div id="thinking" style={{ position: 'sticky', top: '112px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
              My Thinking
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {myThinking.map((item, i) => (
                <div key={item.title} style={{
                  background: '#F9FAFB', borderRadius: '12px', padding: '18px 20px',
                  border: '1px solid #E5E7EB',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#D1D5DB', flexShrink: 0, paddingTop: '3px' }}>
                      0{i + 1}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>{item.title}</h3>
                      <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.65 }}>{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section id="best-practices" style={{ background: '#F9FAFB', padding: '80px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Best Practices
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.025em' }}>
            Universal standards for agent escalation tools.
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
              Things you can action this week, before any AI tooling is in place.
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
