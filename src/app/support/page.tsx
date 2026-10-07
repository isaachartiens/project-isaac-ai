'use client'

import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'
import { Radio, Lightbulb, ChevronRight } from 'lucide-react'

const ACCENT = '#60A5FA'

const badges = [
  'RAG Architecture',
  'Intent Classification',
  'Guardrail Implementation',
  'A2A / MCP Ready',
  'Sample Knowledge Base',
]

const prompts = [
  'How do I return an item?',
  'What is the Money Back Guarantee?',
  'Why was my payment declined?',
  'What happens if my item never arrives?',
]

const myThinking = [
  {
    title: 'Foundation before features',
    body: 'I audit the data before writing a single line of code. A system built on poor or incomplete data will fail at scale regardless of how sophisticated the model is. Getting the knowledge base right is the first deliverable, not an afterthought.',
  },
  {
    title: 'Build for the person who maintains it',
    body: 'AI systems are only as good as the team that supports them after launch. I architect for clarity and maintainability, not just day-one performance. If the person who inherits the system cannot understand it, it will eventually fail.',
  },
  {
    title: 'Treat user feedback as a data source',
    body: 'I build feedback loops into every deployment. How users interact with the system and where they abandon it are the most accurate signals for where things are breaking. Silence is not success, and it usually means nobody trusts the tool enough to use it.',
  },
  {
    title: 'Analytics from day one',
    body: 'Blind spots start as paper cuts and turn into serious tech debt. I instrument logging and monitoring before launch so that when something breaks, I know exactly where and why, and how long before the fix ships.',
  },
]

const bestPractices = [
  {
    title: 'Start with the data',
    body: 'The choice of model matters far less than the quality of the knowledge base. Clean, structured, and current data is the foundation of a trustworthy AI system.',
  },
  {
    title: 'Implement strict guardrails',
    body: 'Set clear boundaries on what the assistant can and cannot discuss. Scope control prevents prompt injection, off-brand responses, and the kind of hallucinations that erode user trust.',
  },
  {
    title: 'Measure deflection, not usage',
    body: 'The goal is not high session counts. The goal is fewer tickets reaching live agents. If usage is high but ticket volume is unchanged, the system is not working.',
  },
  {
    title: 'Maintain human escalation',
    body: 'AI should be a filter, not a wall. There must always be a clear path from the assistant to a human when complexity exceeds the system\'s capability. Removing that path destroys trust.',
  },
]

export default function SupportPage() {
  return (
    <main className="support-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '120px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Tool 01 - Customer Support
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Customer Support Assistant
          </h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.75, margin: '0 0 28px', maxWidth: '65ch' }}>
            Built in hours, not days, against a real knowledge base; answers with citations, stops when confidence drops, hands to human when unsure. A team could hand this to a new hire Monday morning, ticket count drops, agent load drops, nothing else required. The RAG, guardrails, and A2A/MCP layer underneath is where ten years of system integrations makes &lsquo;wire it up and hand it off&rsquo; the obvious next step.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {badges.map(b => (
              <span key={b} style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                background: 'rgba(96,165,250,0.1)', color: '#2563EB',
                border: '1px solid rgba(96,165,250,0.2)',
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
                Try a suggested prompt or type your own question.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {prompts.map(p => (
                  <span key={p} style={{
                    padding: '6px 14px', borderRadius: '20px', border: '1px solid #E5E7EB',
                    background: '#F9FAFB', color: '#374151', fontSize: '13px', fontWeight: 400,
                    cursor: 'default',
                  }}>{p}</span>
                ))}
              </div>
            </div>
            <div style={{ maxHeight: '560px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
              <ChatPanel
                apiEndpoint="/api/support"
                accentColor={ACCENT}
                title="Support Assistant"
                subtitle="Answers from verified knowledge base only"
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
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 40px', letterSpacing: '-0.025em' }}>
            Universal standards for AI support systems.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {bestPractices.map((bp, i) => (
              <div key={bp.title} style={{
                padding: '24px 0',
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
      </section>
    </main>
  )
}
