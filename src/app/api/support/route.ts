import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { getEmbedding } from '@/lib/embeddings'
import { getPineconeIndex } from '@/lib/pinecone'
import * as fs from 'fs'
import * as path from 'path'

// Lazy OpenAI client (see PLAYBOOK.md #5)
let _openai: OpenAI | null = null
function getOpenAI(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _openai
}

function getSystemPrompt(): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/prompts/support-prompt.txt'), 'utf-8')
  const company = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config/company.json'), 'utf-8'))
  return raw
    .replace(/{COMPANY_NAME}/g, company.name)
    .replace(/{SUPPORT_URL}/g, company.supportUrl)
}

function staticStream(text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    }
  })
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content
    const indexName = process.env.PINECONE_SUPPORT_INDEX || 'isaac-support-kb'

    // Embed + retrieve
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
        staticStream("I don't have specific information about that. For the most accurate answer, please contact support directly.")
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
      temperature: 0.7,
      max_tokens: 600,
    })

    return new StreamingTextResponse(OpenAIStream(response as any))
  } catch (error) {
    console.error('[support] Error:', error)
    return new StreamingTextResponse(
      staticStream("Something went wrong. Please try again or contact support directly.")
    )
  }
}
