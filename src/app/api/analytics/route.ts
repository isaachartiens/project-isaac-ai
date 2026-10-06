import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import * as fs from 'fs'
import * as path from 'path'

let _openai: OpenAI | null = null
function getOpenAI(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _openai
}

function staticStream(text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    }
  })
}

// Pre-aggregate ticket data into rich stats — keeps prompt well under token limits
function buildAnalyticsContext(data: any[]): string {
  const total = data.length
  if (total === 0) return 'No data available.'

  const avg = (arr: number[]) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
  const pct = (n: number) => ((n / total) * 100).toFixed(1) + '%'
  const groupBy = (key: string) => {
    const map: Record<string, any[]> = {}
    data.forEach(t => { const k = t[key] ?? 'unknown'; (map[k] = map[k] || []).push(t) })
    return map
  }

  // Top-level KPIs
  const escalated = data.filter(t => t.escalated).length
  const fcr = data.filter(t => t.first_contact_resolution).length
  const csats = data.map(t => t.csat).filter(Boolean)
  const handles = data.map(t => t.handle_time_mins).filter(Boolean)

  const lines: string[] = [
    `=== DATASET OVERVIEW ===`,
    `Total tickets: ${total}`,
    `Avg CSAT: ${avg(csats)}/5`,
    `FCR rate: ${pct(fcr)}`,
    `Escalation rate: ${pct(escalated)}`,
    `Avg handle time: ${avg(handles)} mins`,
    ``,
  ]

  // By channel
  const byChannel = groupBy('channel')
  lines.push(`=== BY CHANNEL ===`)
  Object.entries(byChannel).forEach(([ch, rows]) => {
    const csatAvg = avg(rows.map(r => r.csat))
    const fcrPct = pct(rows.filter(r => r.first_contact_resolution).length)
    const escPct = pct(rows.filter(r => r.escalated).length)
    const handleAvg = avg(rows.map(r => r.handle_time_mins))
    lines.push(`${ch}: ${rows.length} tickets | CSAT ${csatAvg} | FCR ${fcrPct} | Escalation ${escPct} | Handle ${handleAvg}m`)
  })
  lines.push(``)

  // By contact reason
  const byReason = groupBy('contact_reason')
  lines.push(`=== BY CONTACT REASON ===`)
  Object.entries(byReason)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([reason, rows]) => {
      const csatAvg = avg(rows.map(r => r.csat))
      const fcrPct = pct(rows.filter(r => r.first_contact_resolution).length)
      const escPct = pct(rows.filter(r => r.escalated).length)
      lines.push(`${reason}: ${rows.length} tickets | CSAT ${csatAvg} | FCR ${fcrPct} | Escalation ${escPct}`)
    })
  lines.push(``)

  // By team
  const byTeam = groupBy('team')
  lines.push(`=== BY TEAM ===`)
  Object.entries(byTeam).sort().forEach(([team, rows]) => {
    const csatAvg = avg(rows.map(r => r.csat))
    const fcrPct = pct(rows.filter(r => r.first_contact_resolution).length)
    const escPct = pct(rows.filter(r => r.escalated).length)
    const handleAvg = avg(rows.map(r => r.handle_time_mins))
    lines.push(`${team}: ${rows.length} tickets | CSAT ${csatAvg} | FCR ${fcrPct} | Escalation ${escPct} | Handle ${handleAvg}m`)
  })
  lines.push(``)

  // By agent
  const byAgent = groupBy('agent_name')
  lines.push(`=== BY AGENT ===`)
  Object.entries(byAgent)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([agent, rows]) => {
      const csatAvg = avg(rows.map(r => r.csat))
      const fcrPct = pct(rows.filter(r => r.first_contact_resolution).length)
      const escPct = pct(rows.filter(r => r.escalated).length)
      const handleAvg = avg(rows.map(r => r.handle_time_mins))
      lines.push(`${agent}: ${rows.length} tickets | CSAT ${csatAvg} | FCR ${fcrPct} | Escalation ${escPct} | Handle ${handleAvg}m`)
    })
  lines.push(``)

  // By seller tier
  const byTier = groupBy('seller_tier')
  lines.push(`=== BY SELLER TIER ===`)
  Object.entries(byTier).forEach(([tier, rows]) => {
    const csatAvg = avg(rows.map(r => r.csat))
    const escPct = pct(rows.filter(r => r.escalated).length)
    lines.push(`${tier}: ${rows.length} tickets | CSAT ${csatAvg} | Escalation ${escPct}`)
  })
  lines.push(``)

  // By region
  const byRegion = groupBy('region')
  lines.push(`=== BY REGION ===`)
  Object.entries(byRegion).forEach(([region, rows]) => {
    const csatAvg = avg(rows.map(r => r.csat))
    lines.push(`${region}: ${rows.length} tickets | CSAT ${csatAvg}`)
  })
  lines.push(``)

  // By sentiment
  const bySentiment = groupBy('sentiment')
  lines.push(`=== BY SENTIMENT ===`)
  Object.entries(bySentiment).forEach(([s, rows]) => {
    lines.push(`${s}: ${rows.length} tickets (${pct(rows.length)})`)
  })
  lines.push(``)

  // Escalation breakdown
  const escRows = data.filter(t => t.escalated)
  const byEscReason = groupBy.call({ }, 'escalation_reason')
  const escByReason: Record<string, number> = {}
  escRows.forEach(t => { const r = t.escalation_reason ?? 'unknown'; escByReason[r] = (escByReason[r] || 0) + 1 })
  lines.push(`=== ESCALATION BREAKDOWN (${escRows.length} escalated) ===`)
  Object.entries(escByReason).sort((a, b) => b[1] - a[1]).forEach(([r, n]) => {
    lines.push(`${r}: ${n} (${((n/escRows.length)*100).toFixed(1)}% of escalations)`)
  })

  return lines.join('\n')
}

function getSystemPrompt(total: number, analyticsData: string, chatHistory: string): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/prompts/analytics-prompt.txt'), 'utf-8')
  const company = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config/company.json'), 'utf-8'))
  return raw
    .replace(/{COMPANY_NAME}/g, company.name)
    .replace('{TICKET_COUNT}', String(total))
    .replace('{DATA_SUMMARY}', `Pre-aggregated statistics across ${total} tickets`)
    .replace('{TICKET_DATA}', analyticsData)
    .replace('{CHAT_HISTORY}', chatHistory)
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const dataPath = path.join(process.cwd(), 'data/analytics/tickets.json')
    if (!fs.existsSync(dataPath)) {
      return new StreamingTextResponse(
        staticStream("The analytics dataset isn't loaded yet. Please add tickets.json to data/analytics/.")
      )
    }

    const raw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    const data: any[] = Array.isArray(raw) ? raw : raw.tickets || []

    if (data.length === 0) {
      return new StreamingTextResponse(staticStream("The dataset appears to be empty."))
    }

    const analyticsContext = buildAnalyticsContext(data)
    const chatHistory = messages.slice(0, -1).map((m: any) => `${m.role}: ${m.content}`).join('\n')
    const systemPrompt = getSystemPrompt(data.length, analyticsContext, chatHistory)

    console.log(`[analytics] Context size: ~${Math.round(systemPrompt.length / 4)} tokens`)

    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.3,
      max_tokens: 800,
    })

    return new StreamingTextResponse(OpenAIStream(response as any))
  } catch (error) {
    console.error('[analytics] Error:', error)
    return new StreamingTextResponse(
      staticStream("Something went wrong with the analytics query. Please try again.")
    )
  }
}
