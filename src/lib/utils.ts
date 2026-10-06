import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function chunkText(text: string, maxChunkSize = 500, overlap = 100): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    let end = start + maxChunkSize

    if (end < text.length) {
      const sentenceBreak = text.lastIndexOf('. ', end)
      const wordBreak = text.lastIndexOf(' ', end)
      const candidate = sentenceBreak > start + overlap
        ? sentenceBreak + 1
        : wordBreak > start + overlap
        ? wordBreak
        : end
      end = candidate
    }

    const chunk = text.slice(start, end).trim()
    if (chunk.length > 0) chunks.push(chunk)

    // Always advance by at least 1 to prevent infinite loops
    start = Math.max(start + 1, end - overlap)
  }

  return chunks
}
