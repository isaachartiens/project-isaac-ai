import { NextRequest, NextResponse } from 'next/server'

// Per-instance in-memory sliding window rate limiter.
//
// IMPORTANT: Vercel Edge workers are distributed across global POPs.
// Each worker instance maintains its own Map, so the 10 req/min limit is
// enforced per-instance, not globally. For a portfolio demo this is the
// correct tradeoff — no Redis or external store is required.
const requestLog = new Map<string, number[]>()
const WINDOW_MS = 60_000 // 1 minute sliding window
const MAX_REQUESTS = 10   // requests allowed per IP per window

export function middleware(request: NextRequest) {
  // Extract client IP: x-forwarded-for first (set by Vercel), then request.ip, then localhost fallback
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : (request.ip ?? '127.0.0.1')

  const now = Date.now()
  // Slide the window: keep only timestamps within the last 60 seconds
  const timestamps = (requestLog.get(ip) ?? []).filter(t => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' }),
      {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  timestamps.push(now)
  requestLog.set(ip, timestamps)

  return NextResponse.next()
}

// Only apply this middleware to the three AI API routes
export const config = {
  matcher: ['/api/support', '/api/escalation', '/api/analytics'],
}
