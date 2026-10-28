'use client'

import { useEffect } from 'react'
import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'
import { Radio, Lightbulb } from 'lucide-react'

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

const useCaseItems = [
  {
    label: 'Problem',
    body: 'Customers want an answer so they can move on. Outside business hours or after three support articles, that friction is where carts get abandoned and contacts pile up.',
  },
  {
    label: 'Impact',
    body: 'Thirty to forty percent of incoming contacts are repeatable questions that still cost full agent time. Shedding just 10-20% at scale saves hundreds of thousands of dollars and extends into conversion and retention. The impact is even more significant in a startup environment where Opex is paramount and runway is limited.',
  },
  {
    label: 'Solution',
    body: 'One conversational agent for both service deflection and sales assist. Grounded in your help center and product catalog. Hands off to a human the moment a customer requests it, intent gets ambiguous, or sentiment shifts.',
  },
  {
    label: 'How I measure it',
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

export default function SupportPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main className="support-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '120px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            TOOL 01 · CUSTOMER SUPPORT
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#111827', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Customer Support Assistant
          </h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.7, margin: '0 0 32px' }}>
            Customer support assistants are an effective way to empower customers to solve their own problems while increasing operational efficiency. The key is understanding customer needs, evaluating the impact before committing to initiatives, defining a solution, and ensuring you have the data to track KPIs and measure success.
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
                background: 'rgba(96,165,250,0.1)', color: '#2563EB',
                border: '1px solid rgba(96,165,250,0.2)',
              }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ background: '#F9FAFB', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            Live Demo
          </div>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px' }}>
            Ask what a customer might send on a Monday morning.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {prompts.map(p => (
              <span key={p} style={{
                padding: '6px 14px', borderRadius: '20px', border: '1px solid #E5E7EB',
                background: '#fff', color: '#374151', fontSize: '13px',
                cursor: 'default',
              }}>{p}</span>
            ))}
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
      <section id="thinking" style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
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
      <section id="best-practices" style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Best Practices
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 32px', letterSpacing: '-0.025em' }}>
            Universal standards for AI support systems.
          </h2>
          {bestPractices.map((bp, i) => numberedListItem(i, bp.title, bp.body))}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
        </div>
      </section>
    </main>
  )
}
