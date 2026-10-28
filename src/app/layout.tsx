import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Isaac Hartiens | CX & AI Portfolio',
  description: 'AI-powered CX tools and career portfolio for Isaac Hartiens: customer support, escalation assistant, and analytics.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", margin: 0, overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
