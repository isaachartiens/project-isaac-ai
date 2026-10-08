'use client'

import { useState, useEffect } from 'react'
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

const useCaseCards = [
  {
    label: 'PROBLEM',
    body: 'Customers want an answer so they can move on. Outside business hours or after three support articles, that friction is where carts get abandoned and contacts pile up.',
  },
  {
    label: 'IMPACT',
    body: 'Thirty to forty percent of incoming contacts are repeatable questions that still cost full agent time. Shedding just 10-20% at scale saves hundreds of thousands of dollars and extends into conversion and retention. The impact is even more significant in a startup environment where Opex is paramount and runway is limited.',
  },
  {
    label: 'SOLUTION',
    body: 'One conversational agent for both service deflection and sales assist. Grounded in your help center and product catalog. Hands off to a human the moment a customer requests it, intent gets ambiguous, or sentiment shifts.',
  },
  {
    label: 'HOW I MEASURE IT',
    body: 'Deflection rate tracked weekly. Assisted conversion rate vs. baseline. Post-chat CSAT to catch quality drift early.',
  },
]

const realWorldText = 'Built a self-service system at Amazon that deflected over 35% of incoming contacts, freeing agent capacity for higher-complexity cases.'

const techBadges = ['RAG Architecture', 'OpenAI GPT-4o', 'Pinecone Vector Search', 'Next.js App Router', 'Kiro']

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
    body: "AI should be a filter, not a wall. There must always be a clear path from the assistant to a human when complexity exceeds the system's capability. Removing that path destroys trust.",
  },
]

export default function SupportPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [openBP, setOpenBP] = useState<Set<string>>(new Set(['0']))
  const toggleBP = (key: string) => {
    setOpenBP(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <main className="support-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '120px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            TOOL 01 · CUSTOMER SUPPORT
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#111827', margin: '0 0 28px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Customer Support Assistant
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4" style={{ marginBottom: '20px' }}>
            {useCaseCards.map(card => (
              <div key={card.label} style={{
                border: '1px solid #E5E7EB',
                borderTop: '4px solid var(--accent)',
                borderRadius: '16px',
                padding: '24px',
                background: '#fff',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {card.label}
                </div>
                <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: 1.65 }}>{card.body}</p>
              </div>
            ))}
          </div>
          <div className="rwe-strip" style={{
            borderLeft: '4px solid var(--accent)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '24px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              REAL-WORLD EXPERIENCE
            </div>
            <p style={{ fontSize: '15px', color: '#111827', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
              {realWorldText}
            </p>
          </div>
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

      {/* DEMO */}
      <section id="demo" style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              Live Demo
            </div>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 12px' }}>
              Ask what a customer might send on a Monday morning.
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
      <section id="thinking" style={{ background: '#F9FAFB', padding: '80px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '32px' }}>
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
            My Thinking
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {myThinking.map((item, i) => (
              <div key={item.title} style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderTop: '4px solid var(--accent)',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#D1D5DB', display: 'block', marginBottom: '12px' }}>
                  0{i + 1}
                </span>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
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
          {bestPractices.map((bp, i) => {
            const key = String(i)
            const isOpen = openBP.has(key)
            return (
              <div key={bp.title} style={{ borderTop: '1px solid #E5E7EB' }}>
                <div
                  role="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleBP(key)}
                  style={{
                    padding: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#D1D5DB', flexShrink: 0, paddingTop: '2px', minWidth: '24px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>{bp.title}</h3>
                  </div>
                  <ChevronRight
                    className="h-3.5 w-3.5"
                    style={{
                      color: '#D1D5DB',
                      flexShrink: 0,
                      marginTop: '3px',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease-out',
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '500px' : '0',
                  transition: 'max-height 0.2s ease-out',
                }}>
                  <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 20px 48px', lineHeight: 1.7 }}>{bp.body}</p>
                </div>
              </div>
            )
          })}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
        </div>
      </section>
    </main>
  )
}
