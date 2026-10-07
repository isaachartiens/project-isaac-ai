'use client'
import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import { MessageSquare, Loader, Check } from 'lucide-react'

interface ChatPanelProps {
  apiEndpoint: string
  accentColor: string
  title: string
  subtitle?: string
  suggestedQuestions: string[]
}

// Inline markdown renderer — handles **bold**, bullets, [links](url), line breaks
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    if (line.trim() === '') {
      nodes.push(<div key={key++} style={{ height: '6px' }} />)
      continue
    }
    const bullet = line.match(/^[\-\*]\s+(.+)/)
    if (bullet) {
      nodes.push(
        <div key={key++} style={{ display: 'flex', gap: '6px', margin: '2px 0' }}>
          <span style={{ flexShrink: 0 }}>•</span>
          <span>{inlineMarkdown(bullet[1])}</span>
        </div>
      )
      continue
    }
    nodes.push(<div key={key++} style={{ margin: '1px 0', lineHeight: 1.55 }}>{inlineMarkdown(line)}</div>)
  }
  return nodes
}

function inlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^\)]+)\)/g
  let lastIndex = 0, key = 0, match: RegExpExecArray | null
  pattern.lastIndex = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>)
    if (match[1]) parts.push(<strong key={key++} style={{ fontWeight: 600 }}>{match[1]}</strong>)
    else if (match[2] && match[3]) parts.push(
      <span key={key++} style={{ color: '#64748B', fontStyle: 'italic' }}>
        {match[2]} (sample link)
      </span>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(<span key={key++}>{text.slice(lastIndex)}</span>)
  return parts.length ? parts : [<span key={0}>{text}</span>]
}

export default function ChatPanel({ apiEndpoint, accentColor, title, subtitle, suggestedQuestions }: ChatPanelProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat({ api: apiEndpoint })
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      maxHeight: '560px',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', background: accentColor, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{title}</div>
            {subtitle && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>{subtitle}</div>}
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              title="New conversation"
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '6px',
                color: '#fff', cursor: 'pointer', padding: '4px 8px',
                fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px',
                fontFamily: 'inherit',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
              </svg>
              New chat
            </button>
          )}
        </div>
      </div>

      {/* Messages — fixed-height scroll pane */}
      <div
        className="chat-messages"
        style={{
          height: '320px',
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: '#FAFAFA',
          flexShrink: 0,
        }}
      >
        {messages.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '6px',
            paddingTop: '8px',
          }}>
            <p style={{ fontSize: '12px', color: '#A0A0A8', textAlign: 'center', margin: '0 0 6px' }}>
              Ask me anything to get started
            </p>
            {suggestedQuestions.map(q => (
              <button key={q} onClick={() => append({ role: 'user', content: q })}
                style={{
                  textAlign: 'left', background: '#fff', border: '1px solid #E5E7EB',
                  borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#111827',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                {q}
              </button>
            ))}
          </div>
        ) : (
          messages.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '82%', padding: '10px 14px', borderRadius: '12px',
                fontSize: '14px', lineHeight: 1.55,
                ...(m.role === 'user'
                  ? { background: accentColor, color: '#fff', borderBottomRightRadius: '4px' }
                  : { background: '#fff', color: '#111827', border: '1px solid #E5E7EB', borderBottomLeftRadius: '4px' }
                )
              }}>
                {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: '#fff', border: '1px solid #E5E7EB',
              borderRadius: '12px', borderBottomLeftRadius: '4px',
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <Loader
                style={{ width: '16px', height: '16px', color: accentColor }}
                className="animate-spin"
                aria-label="Loading"
              />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 14px', borderTop: '1px solid #E5E7EB', background: '#fff',
          flexShrink: 0,
        }}
      >
        {/* Leading MessageSquare icon beside the input */}
        <MessageSquare
          style={{ width: '14px', height: '14px', color: '#9CA3AF', flexShrink: 0 }}
          aria-hidden="true"
        />
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          style={{
            flex: 1, border: '1px solid #E5E7EB', borderRadius: '8px',
            padding: '8px 12px', fontSize: '14px', outline: 'none', fontFamily: 'inherit',
            background: '#F9FAFB', minWidth: 0,
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            width: '34px', height: '34px', borderRadius: '8px', border: 'none',
            background: accentColor, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            opacity: isLoading || !input.trim() ? 0.5 : 1,
            transition: 'opacity 0.15s ease-out',
          }}
        >
          {isLoading ? (
            <Check style={{ width: '14px', height: '14px', color: '#fff' }} aria-hidden="true" />
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none" />
            </svg>
          )}
        </button>
      </form>
    </div>
  )
}
