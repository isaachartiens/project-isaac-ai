import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'

const questions = [
  "What's driving escalations this month?",
  'Which contact reason has the lowest FCR?',
  'How does CSAT vary by channel?',
  'Which agent has the highest handle time?',
  'Compare Team 1 vs Team 2 performance',
]

const kpis = [
  { label: 'Avg CSAT', value: '3.78', sub: 'out of 5', color: '#3665F3' },
  { label: 'FCR Rate', value: '70.4%', sub: 'first contact resolution', color: '#10B981' },
  { label: 'Escalation Rate', value: '10.0%', sub: 'of total tickets', color: '#E53238' },
  { label: 'Avg Handle Time', value: '13.7m', sub: 'per ticket', color: '#8B5CF6' },
]

export default function AnalyticsPage() {
  return (
    <main style={{ background: '#F5F5FA', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* Tool header */}
      <div style={{
        paddingTop: '88px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(135deg, #F5F3FF 0%, #F5F5FA 100%)',
        borderBottom: '1px solid #D5D5DC',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8B5CF6' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#8B5CF6', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Gen BI Analytics</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111012', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Gen BI Analytics Bot
          </h1>
          <p style={{ fontSize: '15px', color: '#64748B', margin: '0 0 16px', maxWidth: '600px', lineHeight: 1.6 }}>
            Ask natural language questions about 500 synthetic CX tickets — demonstrating the conversational analytics
            layer I built so managers get instant answers without SQL or BI tools.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['500 Tickets', 'NL2Data', 'GPT-4o Analysis'].map(tag => (
              <span key={tag} style={{
                padding: '4px 10px', background: 'rgba(139,92,246,0.08)', color: '#8B5CF6',
                borderRadius: '20px', fontSize: '12px', fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', alignItems: 'start' }}>

        {/* Left: Dashboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Date range */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '14px 20px', border: '1px solid #D5D5DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#111012' }}>CX Operations Dashboard</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['7D', '30D', '90D'].map(d => (
                <button key={d} style={{
                  padding: '5px 12px', borderRadius: '6px', border: '1px solid #D5D5DC',
                  background: d === '90D' ? '#111012' : '#fff', color: d === '90D' ? '#fff' : '#A0A0A8',
                  fontSize: '13px', cursor: 'default', fontFamily: 'inherit',
                }}>{d}</button>
              ))}
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {kpis.map(k => (
              <div key={k.label} style={{ background: '#fff', borderRadius: '10px', padding: '18px 16px', border: '1px solid #D5D5DC', borderTop: `3px solid ${k.color}` }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#111012', letterSpacing: '-0.02em' }}>{k.value}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#111012', margin: '4px 0 2px' }}>{k.label}</div>
                <div style={{ fontSize: '11px', color: '#A0A0A8' }}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Chart placeholders */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #D5D5DC', height: '180px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#111012', marginBottom: '12px' }}>Contact Volume by Reason</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
                {[65, 52, 48, 38, 30, 24, 20, 16, 14, 12].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: i === 0 ? '#3665F3' : '#EEEEF6', borderRadius: '3px 3px 0 0', height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #D5D5DC', height: '180px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#111012', marginBottom: '12px' }}>CSAT Trend (90 days)</div>
              <svg viewBox="0 0 200 100" style={{ width: '100%', height: '120px' }}>
                <polyline points="0,70 25,65 50,60 75,55 100,58 125,50 150,45 175,42 200,38"
                  fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="0,70 25,65 50,60 75,55 100,58 125,50 150,45 175,42 200,38 200,100 0,100"
                  fill="rgba(139,92,246,0.08)" stroke="none" />
              </svg>
            </div>
          </div>

          {/* Channel breakdown */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #D5D5DC' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111012', marginBottom: '14px' }}>Channel Breakdown</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[{ label: 'Chat', pct: 45, color: '#3665F3' }, { label: 'Phone', pct: 35, color: '#10B981' }, { label: 'Email', pct: 20, color: '#8B5CF6' }].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#111012', width: '48px', flexShrink: 0 }}>{c.label}</span>
                  <div style={{ flex: 1, height: '8px', background: '#F5F5FA', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: '13px', color: '#A0A0A8', width: '36px', textAlign: 'right', flexShrink: 0 }}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Chat */}
        <div style={{ position: 'sticky', top: '80px', height: '600px' }}>
          <ChatPanel
            apiEndpoint="/api/analytics"
            accentColor="#8B5CF6"
            title="Analytics Assistant"
            subtitle="500 synthetic CX tickets"
            suggestedQuestions={questions}
          />
        </div>
      </div>
    </main>
  )
}
