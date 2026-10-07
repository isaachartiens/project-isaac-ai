'use client'
import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import { MessageSquare, Loader, Check, RotateCcw, Send } from 'lucide-react'

interface ChatPanelProps {
  apiEndpoint: string
  accentColor: string
  title: string
  subtitle?: string
  suggestedQuestions: string[]
}

// Session usage constants
const STORAGE_KEY = 'isaac_msg_count'
const SOFT_LIMIT = 20
const LIMIT_MESSAGE =
  "You've reached the demo limit for this session. Refresh the page to start a new conversation, or reach out directly via LinkedIn."

// localStorage helpers — guard for SSR safety even though this is 'use client'
function getCount(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10)
}
function incrementCount(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, String(getCount() + 1))
}
function resetCount(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
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
  const [chatError, setChatError] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat({
    api: apiEndpoint,
    onFinish: () => {
      incrementCount()
    },
    onError: (error) => {
      // ai@2.x embeds the raw response body in the error message string.
      // Try to pull out the "error" field from the embedded JSON; fall back to
      // a status-code heuristic, then a generic message.
      const bodyMatch = error.message.match(/\{[^}]*"error"\s*:\s*"([^"]+)"[^}]*\}/)
      if (bodyMatch?.[1]) {
        setChatError(bodyMatch[1])
      } else if (
        error.message.toLowerCase().includes('429') ||
        error.message.toLowerCase().includes('too many')
      ) {
        setChatError('Too many requests. Please wait a moment before trying again.')
      } else {
        setChatError('Something went wrong. Please try again.')
      }
    },
  })

  const endRef = useRef<HTMLDivElement>(null)
  const [justCompleted, setJustCompleted] = useState(false)
  const prevIsLoadingRef = useRef(false)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (prevIsLoadingRef.current && !isLoading && messages.length > 0) {
      setJustCompleted(true)
      const t = setTimeout(() => setJustCompleted(false), 1500)
      return () => clearTimeout(t)
    }
    prevIsLoadingRef.current = isLoading
  }, [isLoading, messages.length])

  // Wraps handleSubmit to enforce the soft session limit and clear prior errors
  const customHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setChatError(null)
    if (getCount() >= SOFT_LIMIT) {
      setChatError(LIMIT_MESSAGE)
      return
    }
    handleSubmit(e)
  }

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
              onClick={() => {
                setMessages([])
                resetCount()
                setChatError(null)
              }}
              title="New conversation"
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '6px',
                color: '#fff', cursor: 'pointer', padding: '4px 8px',
                fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px',
                fontFamily: 'inherit',
              }}
            >
              <RotateCcw className="h-4 w-4" />
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
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: '100%', gap: '6px',
          }}>
            <p style={{ fontSize: '12px', color: '#A0A0A8', textAlign: 'center', margin: '0 0 6px' }}>
              Ask me anything to get started
            </p>
            {suggestedQuestions.map(q => (
              <button
                key={q}
                onClick={() => {
                  setChatError(null)
                  if (getCount() >= SOFT_LIMIT) {
                    setChatError(LIMIT_MESSAGE)
                    return
                  }
                  append({ role: 'user', content: q })
                }}
                style={{
                  textAlign: 'left', background: '#fff', border: '1px solid #E5E7EB',
                  borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#111827',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
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
        {justCompleted && !isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: '#fff', border: '1px solid #E5E7EB',
              borderRadius: '12px', borderBottomLeftRadius: '4px',
              padding: '8px 12px', display: 'flex', alignItems: 'center',
            }}>
              <Check style={{ width: '14px', height: '14px', color: accentColor }} aria-hidden="true" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={customHandleSubmit}
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
            <Loader style={{ width: '14px', height: '14px', color: '#fff' }} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send style={{ width: '14px', height: '14px', color: '#fff' }} aria-hidden="true" />
          )}
        </button>
      </form>

      {/* Inline error display — shown below input, no modal, no toast */}
      {chatError && (
        <div
          style={{
            padding: '4px 14px 8px',
            fontSize: '12px',
            color: accentColor,
            background: '#fff',
            flexShrink: 0,
          }}
        >
          {chatError}
        </div>
      )}
    </div>
  )
}
