import Nav from '@/components/Nav'

const milestones = [
  { year: '2003', title: 'First role in CX', body: 'ISPs, Nintendo, Comcast', highlight: false },
  { year: '2009', title: 'Employee of the Year', body: 'Comcast', highlight: true },
  { year: '2013', title: 'TruSource Labs', body: 'Building CX foundations for startups', highlight: false },
  { year: '2014', title: 'Employee of the Year', body: 'Service Delivery & Client Success', highlight: true },
  { year: '2019', title: 'Direct hire to Amazon/eero', body: 'Led first Amazon WFH transition', highlight: true },
  { year: '2020', title: 'Program Management', body: 'Promoted internally', highlight: false },
  { year: '2024', title: 'Product Manager', body: 'Promoted internally', highlight: false },
  { year: '2026', title: 'AI systems deployed at scale', body: 'Multiple tools, working', highlight: true },
]

const metrics = [
  { value: '$1M+', label: 'Cost savings delivered', sub: 'across platform migrations' },
  { value: '400+', label: 'Agents scaled globally', sub: '7 sites, 5 languages' },
  { value: '60%', label: 'Telephony cost reduction', sub: 'Bright Pattern to Amazon Connect' },
  { value: '50+', label: 'NPS score achieved', sub: 'up from mid-30s' },
]

const frontline = [
  {
    title: 'Started in tier 1 technical support',
    body: 'Began my career at major ISPs and boutique organizations. Every instinct I have about what makes a support system work was built answering the phones, before springboarding into building teams from the ground up.',
  },
  {
    title: 'Advanced through every frontline role',
    body: 'Grew from tier 1 to tier 2, inside sales, and training across multiple organizations. Built the full stack of frontline skills before ever managing anyone. You learn differently when you have skin in the game.',
  },
  {
    title: 'Supported Nintendo\'s consumer base',
    body: 'Learned what high-volume, high-expectation support looks like at consumer scale. The bar for quality was high and the pace was relentless. It raised my standard permanently.',
  },
  {
    title: 'Employee of the Year, Comcast (2009)',
    body: 'Recognized for excellence in customer support across a large, competitive organization. The first signal that how I approached the work was different from how most people did.',
  },
  {
    title: 'Grew into leadership and training at Trusource Labs',
    body: 'Advanced into supervisor, senior escalations manager, and training roles at a top BPO while supporting both Google Nest and eero clients. Built systems and trained people before I had the title for it.',
  },
  {
    title: 'Employee of the Year (2013)',
    body: 'Recognized for excellence in leadership and service delivery. Two employee of the year awards in four years, at two different organizations. The recognition was nice. The pattern it confirmed mattered more.',
  },
]

const operations = [
  {
    title: 'Helped Google Nest scale from startup to repeatable operation',
    body: 'Supported Google Nest pre and post-acquisition at Trusource Labs. Built the escalation workflow and training program that was adopted as the global standard for Google CX Ops, raising CSAT from 83 to 92+.',
  },
  {
    title: 'Ran Google Nest and eero programs as a vendor partner',
    body: 'Managed multi-site technical support operations coordinating 100+ support agents, QA analysts, and support leaders. Delivered executive reviews to Google leadership on operational performance, risk, and automation initiatives.',
  },
  {
    title: 'Promoted to General Manager and Director of Client Success',
    body: 'Took on full ownership of both the operational and client relationship at Trusource. Accountable for delivery, performance, and the P&L. The role taught me that the client relationship and the operational quality are the same thing.',
  },
  {
    title: 'Hired directly to Amazon/eero during the 2019 acquisition',
    body: 'Brought onto the Amazon team through the acquisition. Grew the support organization from 20 agents to 400+ across 7 sites and 5 languages, managing to a $15M peak annual budget.',
  },
  {
    title: 'Built the onboarding framework that scaled with the organization',
    body: 'Designed the onboarding and enablement system that reduced new agent ramp time from 6 weeks to 3 weeks. Structured training, role-based toolkits, hands-on labs, and feedback loops. The organization scaled without rebuilding it.',
  },
  {
    title: 'Managed the full support organization',
    body: 'Owned everything: help center content, systems and tools integrations, contracts and vendors, network support engineering, social support, and global CX operations across every site.',
  },
]

const programMgmt = [
  {
    title: 'Led the Voice of the Customer program',
    body: 'Built and ran a VoC program tracking KPIs, trending issues, customer sentiment, and customer feedback across every channel. Presented findings and recommendations directly to the executive level on a regular cadence.',
  },
  {
    title: 'Orchestrated telephony modernization from Bright Pattern to Amazon Connect',
    body: 'Managed the full migration, consolidating telephony, QA, and automation into a single operating stack within AWS. Reduced operating costs by 60%. Came in on time with full system ownership on the other side.',
  },
  {
    title: 'Negotiated vendor contracts to 15-30% cost reductions',
    body: 'Managed relationships with multiple global service delivery vendors, owning SLA enforcement, performance reviews, and contract negotiations. Achieved cost reductions while maintaining or improving service quality.',
  },
  {
    title: 'Built the framework for planning and prioritizing complex initiatives',
    body: 'Established a documentation and prioritization standard across the organization: problem, impact, solution, outcome. The framework was adopted across teams and became the common language for how work got scoped and approved.',
  },
  {
    title: 'Drove complex cross-functional alignment across every function',
    body: 'Coordinated across engineering, technical program managers, legal, security, finance, and forecasting. Acted as the execution arm for VP-level strategic priorities, translating direction into resourced programs with measurable outcomes.',
  },
]

const productMgmt = [
  {
    title: 'Consolidated 10 siloed platforms into one technical infrastructure',
    body: 'Integrated Salesforce, Amazon Connect, Jira, Contentful, NICE WFM, and more into a single connected system of record. Eliminated duplicated tooling and expanded capability without adding headcount.',
  },
  {
    title: 'Led the Zendesk to Salesforce migration',
    body: 'Managed a 10-month program across six functions: engineering, design, operations, finance, legal, and security. Delivered 2 months ahead of schedule with zero downtime and $400K in annual savings. The first major eero program to hit its release deadline.',
  },
  {
    title: 'Rejected a $1M+ vendor implementation and built a better one internally',
    body: 'Ran the cost-benefit analysis on a Salesforce Service Cloud implementation for the support center and said no. Built the support site as an extension of eero.com instead, using existing infrastructure. Saved $600K, achieved 20% contact deflection, added zero headcount.',
  },
  {
    title: 'Replaced the NPS platform and improved scores from mid-30s to 50+',
    body: 'Rebuilt the NPS program on Salesforce Service and Marketing Cloud, eliminating recurring license spend, increasing open rates by 8%, and driving a sustained improvement in NPS score.',
  },
  {
    title: 'Deployed AI tools that reduced handle time 30% and escalations 40%',
    body: 'Led the rollout of Amazon Q/Bedrock across the organization: GenBI, internal and external chatbots, real-time call analysis, call summarization, and intent classification. Built the adoption campaigns, office hours, and feedback loops that made it stick.',
  },
  {
    title: 'Built a custom anomaly-detection model that cut time-to-RCA by 70%',
    body: 'Co-built a Pinecone and OpenAI model that surfaces the likely root cause the moment a network pattern emerges against history. The signal reaches the right person before the problem becomes a customer contact.',
  },
]

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
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

export default function ExperiencePage() {
  return (
    <main className="experience-page" style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '120px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(160deg, #F0F4FF 0%, #FAFAFA 60%, #F5F0FF 100%)',
        borderBottom: '1px solid #E5E7EB',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Experience
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#111827', margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Over two decades in CX.
          </h1>
          <p style={{ fontSize: '18px', color: '#4B5563', lineHeight: 1.7, margin: '0 auto', maxWidth: '600px' }}>
            Started on the phones. Grew into every seat in the organization. Amazon L6, recognized as a top 10% performer. The path was not planned, but every step was deliberate: stay curious, stay close to the problem, and build things that hold.
          </p>
        </div>
      </section>

      {/* KEY METRICS */}
      <section style={{ background: '#F9FAFB', padding: '32px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {metrics.map(m => (
              <div key={m.label} style={{ ...cardStyle, padding: '18px 20px' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>{m.value}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', margin: '4px 0 2px' }}>{m.label}</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER TIMELINE */}
      <section style={{ background: '#fff', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '48px', textAlign: 'center' }}>
            Career Arc
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${milestones.length}, 1fr)`, overflowX: 'auto' }}>
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', marginBottom: '12px', display: 'block' }}>
                  {m.year}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div style={{ flex: 1, height: '1px', background: i === 0 ? 'transparent' : '#E5E7EB' }} />
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
                    background: m.highlight ? 'var(--accent)' : '#fff',
                    border: `2px solid ${m.highlight ? 'var(--accent)' : '#D1D5DB'}`,
                  }} />
                  <div style={{ flex: 1, height: '1px', background: i === milestones.length - 1 ? 'transparent' : '#E5E7EB' }} />
                </div>
                <div style={{ marginTop: '12px', padding: '0 4px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827', lineHeight: 1.4, marginBottom: '2px' }}>{m.title}</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: 1.4 }}>{m.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRONTLINE SUPPORT */}
      <section style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Frontline Support · 2003 - 2013
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 32px', letterSpacing: '-0.025em' }}>
            Where every skill I have came from.
          </h2>
          {frontline.map((item, i) => numberedListItem(i, item.title, item.body))}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
        </div>
      </section>

      {/* CX OPERATIONS */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            CX Operations · 2014 - 2019
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 32px', letterSpacing: '-0.025em' }}>
            Built from scratch. Twice.
          </h2>
          {operations.map((item, i) => numberedListItem(i, item.title, item.body))}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
        </div>
      </section>

      {/* PROGRAM MANAGEMENT */}
      <section style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Program Management · 2020 - 2023
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 32px', letterSpacing: '-0.025em' }}>
            Complex initiatives. One outcome.
          </h2>
          {programMgmt.map((item, i) => numberedListItem(i, item.title, item.body))}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
        </div>
      </section>

      {/* PRODUCT MANAGEMENT */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Product Management · 2024 - Present
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 32px', letterSpacing: '-0.025em' }}>
            Systems that power the business.
          </h2>
          {productMgmt.map((item, i) => numberedListItem(i, item.title, item.body))}
          <div style={{ borderTop: '1px solid #E5E7EB' }} />
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
