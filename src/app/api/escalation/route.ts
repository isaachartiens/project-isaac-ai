import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { getEmbedding } from '@/lib/embeddings'
import { getPineconeIndex } from '@/lib/pinecone'
import * as fs from 'fs'
import * as path from 'path'

let _openai: OpenAI | null = null
function getOpenAI(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _openai
}

function getSystemPrompt(): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/prompts/escalation-prompt.txt'), 'utf-8')
  const company = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config/company.json'), 'utf-8'))
  return raw.replace(/{COMPANY_NAME}/g, company.name)
}

function staticStream(text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    }
  })
}

const INJECTION_PATTERNS = [
  'ignore previous instructions',
  'ignore all previous',
  'you are now',
  'disregard your',
  'forget your instructions',
  'new instructions:',
]

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    // Guard A — input length
    if (lastMessage.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Message too long. Please keep questions under 500 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Guard B — prompt injection
    if (INJECTION_PATTERNS.some(p => lastMessage.toLowerCase().includes(p))) {
      return new Response(
        JSON.stringify({ error: 'Invalid input.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const indexName = process.env.PINECONE_ESCALATION_INDEX || 'isaac-escalation-kb'

    let queryEmbedding: number[]
    try {
      queryEmbedding = await getEmbedding(lastMessage)
    } catch {
      return new StreamingTextResponse(staticStream("I'm having trouble processing your request. Please try again."))
    }

    const index = getPineconeIndex(indexName)
    const results = await index.query({ vector: queryEmbedding, topK: 3, includeMetadata: true })
    const relevant = results.matches?.filter(m => (m.score ?? 0) > 0.3) ?? []

    if (relevant.length === 0) {
      return new StreamingTextResponse(
        staticStream("I don't have specific guidance on that scenario. Please consult your team lead or supervisor.")
      )
    }

    const context = relevant.map(m => m.metadata?.text).filter(Boolean).join('\n\n---\n\n')
    const chatHistory = messages.slice(0, -1).map((m: any) => `${m.role}: ${m.content}`).join('\n')

    const systemPrompt = getSystemPrompt()
      .replace('{CONTEXT}', context)
      .replace('{CHAT_HISTORY}', chatHistory)

    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.5,
      max_tokens: 700,
    })

    return new StreamingTextResponse(OpenAIStream(response as any))
  } catch (error) {
    console.error('[escalation] Error:', error)
    return new StreamingTextResponse(
      staticStream("Something went wrong. Please consult your team lead.")
    )
  }
}
