import Nav from '@/components/Nav'
import ChatPanel from '@/components/ChatPanel'

const questions = [
  'How do I return an item?',
  'Why was my payment declined?',
  'How do I contact a seller?',
  'What is the Money Back Guarantee?',
  'How do I track my order?',
]

const categories = [
  { name: 'Returns & Refunds', icon: '↩️', count: '24 articles' },
  { name: 'Payments & Billing', icon: '💳', count: '18 articles' },
  { name: 'Shipping & Tracking', icon: '📦', count: '31 articles' },
  { name: 'Account & Security', icon: '🔒', count: '15 articles' },
  { name: 'Buying', icon: '🛍️', count: '22 articles' },
  { name: 'Selling', icon: '🏷️', count: '29 articles' },
]

export default function SupportPage() {
  return (
    <main style={{ background: '#F5F5FA', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* Tool header */}
      <div style={{
        paddingTop: '88px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px',
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F5FA 100%)',
        borderBottom: '1px solid #D5D5DC',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3665F3' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#3665F3', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Customer Support</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111012', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Customer Support Assistant
          </h1>
          <p style={{ fontSize: '15px', color: '#64748B', margin: '0 0 16px', maxWidth: '600px', lineHeight: 1.6 }}>
            A RAG-powered chatbot answering buyer and seller questions from a curated knowledge base —
            mirroring the self-service architecture I built at Amazon to reduce live agent contact volume.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['RAG Pipeline', 'Knowledge Base Guardrails', 'Streaming Responses'].map(tag => (
              <span key={tag} style={{
                padding: '4px 10px', background: 'rgba(54,101,243,0.08)', color: '#3665F3',
                borderRadius: '20px', fontSize: '12px', fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', alignItems: 'start' }}>

        {/* Left: Help center background */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Search */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #D5D5DC' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111012', margin: '0 0 12px' }}>How can we help you?</h2>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search for answers..." readOnly style={{
                width: '100%', boxSizing: 'border-box', padding: '11px 16px 11px 40px',
                border: '1px solid #D5D5DC', borderRadius: '8px', fontSize: '14px',
                background: '#F5F5FA', color: '#A0A0A8', fontFamily: 'inherit',
              }} />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A0A0A8' }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M3 7a4 4 0 1 1 8 0A4 4 0 0 1 3 7zm4-5a5 5 0 1 0 3.192 8.907l2.45 2.45a.75.75 0 1 0 1.061-1.06l-2.45-2.451A5 5 0 0 0 7 2z" fill="#A0A0A8" />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #D5D5DC' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111012', margin: '0 0 16px' }}>Browse by Category</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {categories.map(cat => (
                <div key={cat.name} style={{
                  padding: '14px', background: '#F5F5FA', borderRadius: '8px',
                  border: '1px solid #D5D5DC', cursor: 'default',
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>{cat.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#111012' }}>{cat.name}</div>
                  <div style={{ fontSize: '12px', color: '#A0A0A8', marginTop: '2px' }}>{cat.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #D5D5DC' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111012', margin: '0 0 12px' }}>Popular Articles</h3>
            {['How do I return an item?', 'Why haven\'t I received my item?', 'How do I track my order?', 'What is the Money Back Guarantee?', 'How do I contact a seller?'].map(a => (
              <div key={a} style={{ padding: '10px 0', borderBottom: '1px solid #F5F5FA', fontSize: '14px', color: '#3665F3', cursor: 'default' }}>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chat */}
        <div style={{ position: 'sticky', top: '80px', height: '600px' }}>
          <ChatPanel
            apiEndpoint="/api/support"
            accentColor="#3665F3"
            title="Support Assistant"
            subtitle="Answers from knowledge base only"
            suggestedQuestions={questions}
          />
        </div>
      </div>
    </main>
  )
}
