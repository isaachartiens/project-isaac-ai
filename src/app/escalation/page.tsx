import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'

const questions = [
  'Buyer claims item not received, tracking shows delivered',
  'Seller asking how to appeal an INAD case',
  'Account restricted due to low seller metrics',
  'Buyer opened a chargeback — what are the steps?',
  'When do I escalate to Trust & Safety?',
]

const tickets = [
  { id: 'TKT-0481', reason: 'Item Not Received', priority: 'High', status: 'Open', agent: 'Dan', time: '2m ago' },
  { id: 'TKT-0479', reason: 'INAD Case Appeal', priority: 'High', status: 'In Progress', agent: 'Felicia', time: '8m ago' },
  { id: 'TKT-0477', reason: 'Payment Dispute', priority: 'Medium', status: 'Open', agent: 'Mike', time: '15m ago' },
  { id: 'TKT-0475', reason: 'Seller Metrics', priority: 'Medium', status: 'In Progress', agent: 'Annie', time: '22m ago' },
  { id: 'TKT-0472', reason: 'Account Access', priority: 'Low', status: 'Resolved', agent: 'Patrick', time: '1h ago' },
  { id: 'TKT-0469', reason: 'Policy Question', priority: 'Low', status: 'Resolved', agent: 'Penny', time: '2h ago' },
]

const priorityColors: Record<string, string> = { High: '#E53238', Medium: '#F5AF02', Low: '#10B981' }
const statusColors: Record<string, string> = { Open: '#3665F3', 'In Progress': '#F5AF02', Resolved: '#10B981' }

export default function EscalationPage() {
  return (
    <main style={{ background: '#F5F5FA', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* Tool header */}
      <div style={{
        paddingTop: '88px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(135deg, #ECFDF5 0%, #F5F5FA 100%)',
        borderBottom: '1px solid #D5D5DC',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#10B981', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Internal Tool</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111012', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Agent Escalation Assistant
          </h1>
          <p style={{ fontSize: '15px', color: '#64748B', margin: '0 0 16px', maxWidth: '600px', lineHeight: 1.6 }}>
            Guides Tier 1 agents through resolution paths and escalation criteria — inspired by the AI guidance tool
            I deployed at Amazon that reduced Tier 2 escalation rates by 30%.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Agent Empowerment', 'Escalation Criteria', 'Tier 1 Resolution'].map(tag => (
              <span key={tag} style={{
                padding: '4px 10px', background: 'rgba(16,185,129,0.08)', color: '#10B981',
                borderRadius: '20px', fontSize: '12px', fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', alignItems: 'start' }}>

        {/* Left: Ticket queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Queue header */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '16px 20px', border: '1px solid #D5D5DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111012', margin: 0 }}>Support Queue</h2>
              <p style={{ fontSize: '13px', color: '#A0A0A8', margin: '2px 0 0' }}>6 active tickets</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Open', 'In Progress'].map(f => (
                <button key={f} style={{
                  padding: '6px 12px', borderRadius: '6px', border: '1px solid #D5D5DC',
                  background: f === 'All' ? '#111012' : '#fff', color: f === 'All' ? '#fff' : '#A0A0A8',
                  fontSize: '13px', cursor: 'default', fontFamily: 'inherit',
                }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Tickets */}
          {tickets.map(t => (
            <div key={t.id} style={{
              background: '#fff', borderRadius: '10px', padding: '16px 20px',
              border: '1px solid #D5D5DC', display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#A0A0A8' }}>{t.id}</span>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: '#111012' }}>{t.reason}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#A0A0A8' }}>Agent: {t.agent} · {t.time}</div>
              </div>
              <span style={{
                padding: '3px 9px', borderRadius: '12px', fontSize: '12px', fontWeight: 500,
                background: `${priorityColors[t.priority]}18`, color: priorityColors[t.priority],
              }}>{t.priority}</span>
              <span style={{
                padding: '3px 9px', borderRadius: '12px', fontSize: '12px', fontWeight: 500,
                background: `${statusColors[t.status]}18`, color: statusColors[t.status],
              }}>{t.status}</span>
            </div>
          ))}
        </div>

        {/* Right: Chat */}
        <div style={{ position: 'sticky', top: '80px', height: '600px' }}>
          <ChatPanel
            apiEndpoint="/api/escalation"
            accentColor="#10B981"
            title="Escalation Assistant"
            subtitle="Internal agent guidance tool"
            suggestedQuestions={questions}
          />
        </div>
      </div>
    </main>
  )
}
