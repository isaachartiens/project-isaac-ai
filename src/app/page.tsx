import Nav from '@/components/Nav'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

const tools = [
  {
    id: 'support',
    name: 'Customer Support Assistant',
    tagline: 'Answers buyer and seller questions from a curated knowledge base',
    context: 'The same knowledge architecture I use at Amazon to reduce contact volume and cut new-hire ramp time. Built from the same playbook, smaller scale.',
    href: '/support',
  },
  {
    id: 'escalation',
    name: 'Agent Escalation Assistant',
    tagline: 'Guides Tier 1 agents through resolution paths to prevent escalations',
    context: 'Replicates the escalation guidance I\'ve deployed at Amazon. That work dropped Tier 2 escalation rates 30%. This one shows how the pattern works.',
    href: '/escalation',
  },
  {
    id: 'analytics',
    name: 'Gen BI Analytics Bot',
    tagline: 'Ask natural language questions about CX ticket data',
    context: 'Shows how a conversational query layer on top of structured ticket data lets managers skip the analyst queue and ask directly.',
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
    body: 'I help companies move from AI curiosity to AI utility. Internal tools, customer-facing systems, and Gen BI platforms that let employees stop data mining and start making decisions. The result: a 30% reduction in escalation rates.',
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

export default function Home() {
  return (
    <main className="home-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '128px', paddingBottom: '112px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 16px', borderRadius: '20px',
            background: 'rgba(96,165,250,0.1)', color: '#3B82F6',
            fontSize: '13px', fontWeight: 500, marginBottom: '32px', letterSpacing: '0.02em',
            border: '1px solid rgba(96,165,250,0.2)',
          }}>
            <Sparkles style={{ width: '14px', height: '14px', flexShrink: 0 }} aria-hidden="true" />
            Product · AI · CX Operations
          </div>
          <h1 style={{
            fontSize: '60px', fontWeight: 700, color: '#111827', margin: '0 0 6px',
            lineHeight: 1.0, letterSpacing: '-0.035em',
          }}>
            Operational Rigor.
          </h1>
          <h1 style={{
            fontSize: '60px', fontWeight: 700, color: '#111827', margin: '0 0 32px',
            lineHeight: 1.0, letterSpacing: '-0.035em',
          }}>
            Human-Centric Scale.
          </h1>
          <p style={{
            fontSize: '18px', color: '#4B5563', lineHeight: 1.7,
            margin: '0 0 44px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
          }}>
            Grew up in startups, developed to lead with Amazon at scale. Curiosity drove every step, through every corner of the business. That arc is why this whole site is a live demo, not screenshots of one. Three AI systems, working, and a look into how I think about building them. Whether you&apos;re evaluating me for a role, exploring a collaboration, or just seeing what&apos;s possible, hope something here is worth your time.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/experience" style={{
              padding: '14px 28px', background: '#111827', color: '#fff',
              borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
            }}>
              View My Experience
            </Link>
            <a href="#tools" style={{
              padding: '14px 28px', background: 'transparent', color: '#111827',
              border: '1px solid #E5E7EB', borderRadius: '10px',
              textDecoration: 'none', fontSize: '15px', fontWeight: 500,
            }}>
              See the AI Lab
            </a>
          </div>
        </div>
      </section>

      {/* EXPERTISE TILES */}
      <section style={{ background: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Expertise
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#111827', margin: '0 0 20px', letterSpacing: '-0.025em' }}>
              A decade of building things that work.
            </h2>
            <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: '0 auto', maxWidth: '65ch' }}>
              Hey, I&apos;m Isaac! Happy to have you here. Ten years of building things, some that worked, a lot that didn&apos;t go as planned, all of them worth something. Led teams, made calls with incomplete data, changed my mind when the numbers said I was wrong. Came up from frontline tech support into product, programs, and CX operations at Amazon. This isn&apos;t a portfolio of outputs. It&apos;s a record of how I approach problems.
            </p>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {expertise.map(tile => (
              <div
                key={tile.label}
                className={`expertise-card ${tile.cssClass}`}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid #E5E7EB',
                  borderTop: '4px solid var(--accent)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
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

      {/* AI LAB */}
      <section id="tools" style={{ background: '#F9FAFB', padding: '96px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              AI Lab
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#111827', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
              Three tools. All working.
            </h2>
            <p style={{ fontSize: '16px', color: '#4B5563', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              These aren&apos;t mockups. Each one is queryable against a real knowledge base, built to solve a specific CX problem the same way I&apos;d build it for a team on Monday.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {tools.map(tool => (
              <div
                key={tool.id}
                className={`tool-card tool-card-${tool.id}`}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid #E5E7EB',
                  borderTop: '4px solid var(--accent)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0 }}>{tool.name}</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{tool.tagline}</p>
                <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.7, flex: 1 }}>{tool.context}</p>
                <Link href={tool.href} style={{
                  color: 'var(--accent)', fontWeight: 600, fontSize: '14px',
                  textDecoration: 'none', marginTop: '4px',
                  letterSpacing: '0.01em',
                }}>
                  Try it
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD VS BUY */}
      <section style={{ background: '#F9FAFB', padding: '96px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Build vs. Buy
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 24px', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            A Different Perspective
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '16px', color: '#4B5563', margin: 0, lineHeight: 1.8 }}>
              Many SaaS platforms now offer AI capabilities out of the box. For companies just getting started, that can be the right move. But off-the-shelf tools come with trade-offs: limited control over your data, constrained guardrails, and responses shaped by someone else's model.
            </p>
            <p style={{ fontSize: '16px', color: '#4B5563', margin: 0, lineHeight: 1.8 }}>
              These three were built in days, not months. When you know exactly what you&apos;re solving for, purpose-built beats packaged.
            </p>
            <p style={{ fontSize: '16px', color: '#111827', margin: 0, lineHeight: 1.8, fontWeight: 500 }}>
              The bottleneck is almost never the technology. It&apos;s knowing what you&apos;re trying to solve.
            </p>
          </div>
        </div>
      </section>

      {/* OPERATING PRINCIPLES */}
      <section style={{ background: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Operating Principles
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#111827', margin: '0 0 20px', letterSpacing: '-0.025em' }}>
              How I work.
            </h2>
            <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: '0 auto', maxWidth: '65ch' }}>
              Here&apos;s what &apos;product&apos; means to me: not roadmaps and demos, it&apos;s finding root cause first, then the smallest system that actually fixes it, so a year out it still holds. How the team works: collaborate more than hand off. If someone has the sharper read on why something breaks, that&apos;s what we ship, not whoever filed the ticket.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {personal.map(p => (
              <div key={p.title} style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '16px', padding: '32px',
                textAlign: 'center',
              }}>
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
        padding: '96px 24px', textAlign: 'center',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#111827', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
            Working on something? Let&apos;s compare notes.
          </h2>
          <p style={{ fontSize: '16px', color: '#6B7280', margin: '0 0 16px' }}>
            Isaac Hartiens · Austin, TX
          </p>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 32px', maxWidth: '65ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Built to do two jobs: one to make the next role easier to explain, and one for you to actually click through. If you&apos;re evaluating me for something specific, email me, let&apos;s dig into the numbers behind the case studies, what was broken, what the OKR said, whether the tool still hits it today. If you&apos;re just poking around, same thing, take what&apos;s useful, run whatever doesn&apos;t fit your stack, and email when something in there makes sense to you.
          </p>
          <a href="https://www.linkedin.com/in/isaachartiens/" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px', background: '#0A66C2', color: '#fff',
              borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
            }}>
            {/* lucide-react v1.x removed brand icons — inline SVG is the canonical LinkedIn mark */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Let&apos;s Connect
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#F9FAFB', padding: '24px', textAlign: 'center', borderTop: '1px solid #E5E7EB' }}>
        <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
          &copy; 2025 Isaac Hartiens · Built with Next.js + OpenAI + Pinecone
        </p>
      </footer>
    </main>
  )
}
