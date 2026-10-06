'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/support', label: 'Customer Support' },
  { href: '/escalation', label: 'Escalation Assistant' },
  { href: '/analytics', label: 'Gen BI Analytics' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#fff', borderBottom: '1px solid #D5D5DC',
      height: '64px', display: 'flex', alignItems: 'center',
      padding: '0 32px', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#111012', letterSpacing: '-0.01em' }}>
          Isaac Hartiens
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {links.map(link => {
          const active = pathname === link.href
          return (
            <Link key={link.href} href={link.href} style={{
              textDecoration: 'none', fontSize: '14px', fontWeight: active ? 600 : 400,
              color: active ? '#111012' : '#A0A0A8',
              borderBottom: active ? '2px solid #111012' : '2px solid transparent',
              paddingBottom: '2px', transition: 'color 0.15s',
            }}>
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* LinkedIn */}
      <a href="https://www.linkedin.com/in/isaachartiens/" target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#A0A0A8', fontSize: '14px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
    </nav>
  )
}
