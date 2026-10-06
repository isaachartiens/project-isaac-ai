import Nav from '@/components/Nav'
import Link from 'next/link'

const tools = [
  {
    id: 'support',
    name: 'Customer Support Assistant',
    tagline: 'Answers buyer and seller questions from a curated knowledge base',
    context: 'Mirrors the self-service knowledge architecture I built at Amazon to reduce live agent contact volume and compress new agent onboarding time.',
    color: '#3665F3',
    href: '/support',
  },
  {
    id: 'escalation',
    name: 'Agent Escalation Assistant',
    tagline: 'Guides Tier 1 agents through resolution paths to prevent escalations',
    context: 'Inspired by the AI escalation guidance tool I deployed at Amazon. The same pattern reduced Tier 2 escalation rates by 30% and put expert-level knowledge at every agent\'s fingertips.',
    color: '#10B981',
    href: '/escalation',
  },
  {
    id: 'analytics',
    name: 'Gen BI Analytics Bot',
    tagline: 'Ask natural language questions about CX ticket data',
    context: 'Demonstrates the conversational analytics layer I built on top of operational data, giving managers instant answers without needing SQL or BI tools.',
    color: '#8B5CF6',
    href: '/analytics',
  },
]

const expertise = [
  {
    label: 'CX Operations',
    body: 'Built customer support organizations from scratch to a global operation of 400+ agents across five sites. I have held every role in the stack, from frontline to managing a multi-million dollar P&L.',
    achievement: '400+ agents · 5 sites · $1M+ P&L',
  },
  {
    label: 'Product Management',
    body: 'I focus on the tools and systems that power a business. From major infrastructure migrations to AI integrations, I build the operational backbone that removes friction for employees and elevates the customer experience.',
    achievement: '43% CRM cost reduction · 60% telephony savings',
  },
  {
    label: 'Program Management',
    body: 'I run the complex, cross-functional projects that fall between the cracks. Engineering, legal, security, marketing, and the customer voice all on one roadmap, moving in the same direction.',
    achievement: 'First major eero program delivered 2 months early',
  },
  {
    label: 'AI Transformation',
    body: 'I help companies move from AI curiosity to AI utility. Internal tools, customer-facing systems, and Gen BI platforms that let employees stop data mining and start making decisions. The result: a 30% reduction in escalation rates.',
    achievement: '30% escalation reduction · AI deployed at scale',
  },
]

const personal = [
  {
    title: 'The Musician',
    copy: '40 years of professional recording and performance. I bring the same discipline and harmony found in music to the way I architect operational systems.',
  },
  {
    title: 'The Rider',
    copy: 'Passionate mountain biker and outdoor explorer. I find my clarity on the trail and my resilience in the climb.',
  },
  {
    title: 'The Human',
    copy: 'Dedicated to mental health, spirituality, and wellbeing. I believe the strongest systems are those that support and empower the people within them.',
  },
]

export default function Home() {
  return (
    <main style={{ background: '#F5F5FA', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '120px', paddingBottom: '100px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(135deg, #EEEEF6 0%, #F5F5FA 50%, #EBEBF5 100%)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '20px',
            background: 'rgba(54,101,243,0.08)', color: '#3665F3',
            fontSize: '13px', fontWeight: 500, marginBottom: '28px', letterSpacing: '0.02em',
          }}>
            Product Manager · AI Transformation Lead · CX Operations
          </div>
          <h1 style={{ fontSize: '54px', fontWeight: 700, color: '#111012', margin: '0 0 8px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Operational Rigor.
          </h1>
          <h1 style={{ fontSize: '54px', fontWeight: 700, color: '#111012', margin: '0 0 28px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Human-Centric Scale.
          </h1>
          <p style={{ fontSize: '18px', color: '#64748B', lineHeight: 1.7, margin: '0 0 40px', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
            Seasoned operational leader with 10+ years of experience across Customer Experience,
            Software Services, and complex system integrations. I specialize in architecting the
            foundational systems that drive customer satisfaction, maximize agent productivity,
            and move the needle on the KPIs that actually matter.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/experience" style={{
              padding: '14px 28px', background: '#111012', color: '#fff',
              borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
            }}>
              View My Experience
            </Link>
            <a href="#tools" style={{
              padding: '14px 28px', background: 'transparent', color: '#111012',
              border: '1px solid #D5D5DC', borderRadius: '8px',
              textDecoration: 'none', fontSize: '15px', fontWeight: 500,
            }}>
              See the AI Lab
            </a>
          </div>
        </div>
      </section>

      {/* EXPERTISE TILES */}
      <section style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#3665F3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Expertise
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111012', margin: 0, letterSpacing: '-0.02em' }}>
              A decade of building things that work.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
            {expertise.map(tile => (
              <div key={tile.label} style={{
                background: '#fff', borderRadius: '14px', padding: '28px 24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#111012' }}>{tile.label}</span>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0, lineHeight: 1.7 }}>{tile.body}</p>
                <div style={{
                  marginTop: '4px', padding: '8px 12px', borderRadius: '8px',
                  background: '#F5F5FA', color: '#64748B', fontSize: '12px', fontWeight: 600,
                }}>
                  {tile.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI LAB */}
      <section id="tools" style={{ background: '#F5F5FA', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#3665F3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              AI Transformation
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111012', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              AI Transformation: Built to Work.
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
              I don&apos;t believe in AI for the sake of novelty. I build tools that solve root-cause problems.
              Below are three working prototypes demonstrating how I apply intelligence to eliminate systemic friction.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {tools.map(tool => (
              <div key={tool.id} style={{
                background: '#fff', borderRadius: '12px', padding: '28px 24px',
                borderTop: `3px solid ${tool.color}`,
                border: '1px solid #D5D5DC',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#111012', margin: 0 }}>{tool.name}</h3>
                <p style={{ fontSize: '14px', color: '#A0A0A8', margin: 0, lineHeight: 1.5 }}>{tool.tagline}</p>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.6, flex: 1 }}>{tool.context}</p>
                <Link href={tool.href} style={{
                  color: tool.color, fontWeight: 500, fontSize: '14px',
                  textDecoration: 'none', marginTop: '4px',
                }}>
                  Try it →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND THE SPREADSHEET */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#3665F3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Beyond the Spreadsheet
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111012', margin: 0, letterSpacing: '-0.02em' }}>
              The person behind the work.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {personal.map(p => (
              <div key={p.title} style={{ background: '#F5F5FA', borderRadius: '16px', padding: '32px 24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111012', margin: '0 0 12px' }}>{p.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0, lineHeight: 1.7 }}>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #EEEEF6 0%, #F5F5FA 50%, #EBEBF5 100%)',
        padding: '80px 24px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111012', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Ready to build something meaningful?
          </h2>
          <p style={{ fontSize: '16px', color: '#A0A0A8', margin: '0 0 28px' }}>
            Isaac Hartiens · Austin, TX
          </p>
          <a href="https://www.linkedin.com/in/isaachartiens/" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px', background: '#0A66C2', color: '#fff',
              borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Let&apos;s Connect
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#F5F5FA', padding: '24px', textAlign: 'center', borderTop: '1px solid #D5D5DC' }}>
        <p style={{ fontSize: '13px', color: '#A0A0A8', margin: 0 }}>
          &copy; 2024 Isaac Hartiens · Built with Next.js + OpenAI + Pinecone
        </p>
      </footer>
    </main>
  )
}
