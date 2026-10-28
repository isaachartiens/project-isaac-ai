import Nav from '@/components/Nav'
import Link from 'next/link'

const tools = [
  {
    id: 'support',
    name: 'Customer Support',
    tagline: 'Triage and drafting that keeps a human in the loop.',
    href: '/support',
  },
  {
    id: 'escalation',
    name: 'Escalation Assistant',
    tagline: 'Context assembled before the customer repeats themselves.',
    href: '/escalation',
  },
  {
    id: 'analytics',
    name: 'Gen BI Analytics',
    tagline: 'Plain-language questions, auditable answers.',
    href: '/analytics',
  },
]

const expertise = [
  {
    label: 'CX Operations',
    cssClass: 'tile-cx-ops',
    accent: '#60A5FA',
    body: 'Built customer support organizations from scratch to a global operation of 400+ agents across five sites. I have held every role in the stack, from frontline to managing a multi-million dollar P&L.',
    achievement: '400+ agents · 5 sites · $1M+ P&L',
  },
  {
    label: 'Product Management',
    cssClass: 'tile-product-mgmt',
    accent: '#2DD4BF',
    body: 'I focus on the tools and systems that power a business. From major infrastructure migrations to AI integrations, I build the operational backbone that removes friction for employees and elevates the customer experience.',
    achievement: '43% CRM cost reduction · 60% telephony savings',
  },
  {
    label: 'Program Management',
    cssClass: 'tile-program-mgmt',
    accent: '#818CF8',
    body: 'I run the complex, cross-functional projects that fall between the cracks. Engineering, legal, security, marketing, and the customer voice all on one roadmap, moving in the same direction.',
    achievement: '100+ processes authored · Voice of the Customer program',
  },
  {
    label: 'AI Transformation',
    cssClass: 'tile-ai-transform',
    accent: '#A78BFA',
    body: 'I help companies move from AI curiosity to AI utility. Internal tools, customer-facing systems, and Gen BI platforms that let employees stop data mining and start making decisions.',
    achievement: '30% escalation reduction · AI deployed at scale',
  },
]

const personal = [
  {
    title: 'Data and Defined Goals',
    copy: 'I start by finding what\'s actually broken and what success looks like before anything gets built. Data without a goal is noise.',
  },
  {
    title: 'Collaboration',
    copy: 'Working in a vacuum is a liability. I believe in close collaboration with stakeholders across all levels of the organization. The best ideas often come from the people closest to the problem, regardless of their tenure or title.',
  },
  {
    title: 'Organizational Structure',
    copy: 'I build structure into messy environments: clear ownership, documented processes, defined success criteria. Not because it looks clean, but because it\'s the only way to scale without losing speed.',
  },
]

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  border: '1px solid #E5E7EB',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
}

export default function Home() {
  return (
    <main className="home-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '96px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '60px', fontWeight: 700, color: '#111827', margin: '0 0 6px',
            lineHeight: 1.05, letterSpacing: '-0.035em',
          }}>
            Empathy for customers.
          </h1>
          <h1 style={{
            fontSize: '60px', fontWeight: 700, color: '#111827', margin: '0 0 40px',
            lineHeight: 1.05, letterSpacing: '-0.035em',
          }}>
            Rigor for the systems that serve them.
          </h1>
          <p style={{
            fontSize: '18px', color: '#4B5563', lineHeight: 1.7,
            margin: '0 auto 20px', maxWidth: '600px',
          }}>
            I spent years on the front line before I ever touched the organizational structure and systems behind it. With over two decades in the industry, I&apos;m where I am today through hands-on experience, not just studying the manual.
          </p>
          <p style={{
            fontSize: '18px', color: '#4B5563', lineHeight: 1.7,
            margin: '0 auto', maxWidth: '600px',
          }}>
            Frontline support, service delivery, program and product management. Every seat in CX. This site is a working demo: three AI systems, live, and the thinking behind each.
          </p>
        </div>
      </section>

      {/* EXPERTISE TILES */}
      <section style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Expertise
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111827', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
              A decade of building things that work.
            </h2>
            <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: '0 auto', maxWidth: '65ch' }}>
              Ten years of building things, some that worked, a lot that didn&apos;t go as planned, all of them worth something. Led teams, made calls with incomplete data, changed my mind when the numbers said I was wrong. Came up from frontline tech support into product, programs, and CX operations at Amazon.
            </p>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {expertise.map(tile => (
              <div
                key={tile.label}
                className={`expertise-card ${tile.cssClass}`}
                style={{
                  ...cardStyle,
                  padding: '28px',
                  display: 'flex', flexDirection: 'column', gap: '14px',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>{tile.label}</span>
                <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: 1.7 }}>{tile.body}</p>
                <div style={{
                  padding: '8px 12px', borderRadius: '8px',
                  background: `${tile.accent}14`,
                  fontSize: '12px', fontWeight: 600, color: '#111827',
                  letterSpacing: '0.01em',
                }}>
                  {tile.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTHING ON THIS SITE IS A MOCKUP */}
      <section style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Live Demos
            </div>
            <h2 style={{
              fontSize: '32px', fontWeight: 700, color: '#111827',
              margin: '0 0 16px', letterSpacing: '-0.025em', lineHeight: 1.2,
            }}>
              Nothing on this site is a mockup.
            </h2>
            <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.7, margin: '0 auto', maxWidth: '65ch' }}>
              Each of these is live and doing real work. Each page shows the architecture, the tradeoffs I made, and what I&apos;d change now. Judge the thinking, not just the output.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4" style={{ marginBottom: '36px' }}>
            {tools.map(tool => (
              <Link key={tool.id} href={tool.href} style={{ textDecoration: 'none' }}>
                <div style={{ ...cardStyle, padding: '24px', height: '100%' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{tool.name}</h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, lineHeight: 1.6 }}>{tool.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.7, margin: 0, textAlign: 'center' }}>
            If you&apos;re hiring for CX, building the function from zero, or just curious, start anywhere. Take what&apos;s useful.
          </p>
        </div>
      </section>

      {/* OPERATING PRINCIPLES */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Operating Principles
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111827', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
              How I work.
            </h2>
            <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: '0 auto', maxWidth: '65ch' }}>
              Not roadmaps and demos. Finding root cause first, then the smallest system that actually fixes it, so a year out it still holds. Collaborate more than hand off. If someone has the sharper read on why something breaks, that&apos;s what we ship, not whoever filed the ticket.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {personal.map(p => (
              <div key={p.title} style={{ ...cardStyle, padding: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>{p.title}</h3>
                <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: 1.7 }}>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        padding: '64px 24px', textAlign: 'center',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111827', margin: '0 0 28px', letterSpacing: '-0.025em' }}>
            Working on something? Let&apos;s compare notes.
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 32px', maxWidth: '65ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Whether you&apos;re building a CX organization from scratch, optimizing what you already have, or exploring what AI can do for your team, I&apos;d like to compare notes.{' '}
            <a href="mailto:isaac.hartiens@fastmail.com" style={{ color: '#111827', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #D1D5DB' }}>
              Email me
            </a>{' '}
            and let&apos;s dig into what you&apos;re working on.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="mailto:isaac.hartiens@fastmail.com"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '14px 28px', background: '#111827', color: '#fff',
                borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
              }}>
              isaac.hartiens@fastmail.com
            </a>
            <a href="https://www.linkedin.com/in/isaachartiens/" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px', background: '#0A66C2', color: '#fff',
                borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#F9FAFB', padding: '24px', textAlign: 'center', borderTop: '1px solid #E5E7EB' }}>
        <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
          &copy; 2026 Isaac Hartiens &middot; Built with Next.js + OpenAI + Pinecone
        </p>
      </footer>
    </main>
  )
}
