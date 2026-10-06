import { Pinecone } from '@pinecone-database/pinecone'

// Lazy initialization — prevents build-time crashes (see PLAYBOOK.md #5)
let _pinecone: Pinecone | null = null

function getPinecone(): Pinecone {
  if (!_pinecone) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('Missing PINECONE_API_KEY environment variable')
    }
    _pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
  }
  return _pinecone
}

// Factory: get a named index — supports multiple indexes in one app
export function getPineconeIndex(indexName: string) {
  return getPinecone().index(indexName)
}

export interface DocumentChunk {
  id: string
  text: string
  metadata: {
    source: string
    tool: string
    chunkIndex: number
  }
}
