import { getEmbeddings } from '../src/lib/embeddings'
import { getPineconeIndex } from '../src/lib/pinecone'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

const dataDir = path.join(process.cwd(), 'data/escalation-kb')
const indexName = process.env.PINECONE_ESCALATION_INDEX || 'isaac-escalation-kb'

// Inline chunker — safe simple version
function chunkText(text: string, maxSize = 500, overlap = 100): string[] {
  const chunks: string[] = []
  let start = 0
  while (start < text.length) {
    const end = Math.min(start + maxSize, text.length)
    const chunk = text.slice(start, end).trim()
    if (chunk.length > 10) chunks.push(chunk)
    if (end === text.length) break  // reached the end
    start = end - overlap
    if (start <= 0) break
  }
  return chunks
}

async function ingest() {
  console.log('🚀 Ingesting Escalation KB into Pinecone index:', indexName)
  const index = getPineconeIndex(indexName)

  const files = fs.readdirSync(dataDir).filter(f =>
    (f.endsWith('.md') || f.endsWith('.txt')) && f !== 'README.md'
  )

  if (files.length === 0) {
    console.log('⚠️  No KB files found in data/escalation-kb/. Add markdown files and re-run.')
    process.exit(0)
  }

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf-8')
    const chunks = chunkText(content, 500, 100)
    console.log(`📄 ${file}: ${chunks.length} chunks`)

    const embeddings = await getEmbeddings(chunks)
    const vectors = chunks.map((chunk, i) => ({
      id: crypto.createHash('md5').update(`escalation-${file}-${i}`).digest('hex'),
      values: embeddings[i],
      metadata: { text: chunk, source: file, tool: 'escalation', chunkIndex: i }
    }))

    await index.upsert({ records: vectors })
    console.log(`   ✅ Upserted ${vectors.length} vectors`)
  }

  console.log('\n✨ Escalation KB ingestion complete!')
}

ingest().catch(err => { console.error('❌ Failed:', err); process.exit(1) })
