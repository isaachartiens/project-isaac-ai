'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Home, Headphones, TriangleAlert, ChartColumn } from 'lucide-react'

// Accent color per linked-to page (not the current page)
const routeAccent: Record<string, string> = {
  '/': '#60A5FA',
  '/support': '#60A5FA',
  '/escalation': '#2DD4BF',
  '/analytics': '#A78BFA',
}

const links = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/support', label: 'Customer Support', Icon: Headphones },
  { href: '/escalation', label: 'Escalation Assistant', Icon: TriangleAlert },
  { href: '/analytics', label: 'Gen BI Analytics', Icon: ChartColumn },
]

const toolPaths = ['/support', '/escalation', '/analytics']

const toolAnchors = [
  { label: 'Live Demo', anchor: '#demo' },
  { label: 'My Thinking', anchor: '#thinking' },
  { label: 'Best Practices', anchor: '#best-practices' },
]

export default function Nav() {
  const pathname = usePathname()
  const isToolPage = toolPaths.includes(pathname)
  const [activeAnchor, setActiveAnchor] = useState<string>('')

  useEffect(() => {
    if (!isToolPage) {
      setActiveAnchor('')
      return
    }

    const navH = 104 // full nav height on tool pages (64px main row + 40px tab row)

    const onScroll = () => {
      const scrollY = window.scrollY
      let active = ''

      for (const { anchor } of toolAnchors) {
        const el = document.getElementById(anchor.slice(1))
        if (!el) continue
        // An anchor becomes active when its document-flow position is within the nav + 40px buffer
        if (el.offsetTop <= scrollY + navH + 40) {
          active = anchor
        }
      }
      setActiveAnchor(active)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // set initial state based on current scroll position
    return () => window.removeEventListener('scroll', onScroll)
  }, [isToolPage, pathname])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    setActiveAnchor(anchor) // immediate visual feedback on click
    const el = document.getElementById(anchor.slice(1))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#fff', borderBottom: '1px solid #E5E7EB',
    }}>
      {/* Row 1: main nav */}
      <div style={{
        height: '64px', display: 'flex', alignItems: 'center',
        padding: '0 32px', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>
            Isaac Hartiens
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {links.map(({ href, label, Icon }) => {
            const active = pathname === href
            const accent = routeAccent[href]
            return (
              <Link
                key={href}
                href={href}
                scroll={true}
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  color: active ? accent : '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderBottom: active ? `2px solid ${accent}` : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.15s ease-out',
                }}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </div>

        {/* LinkedIn — kept as inline SVG because lucide-react v1.x removed brand icons */}
        <a
          href="https://www.linkedin.com/in/isaachartiens/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            textDecoration: 'none', color: '#4B5563', fontSize: '14px',
            transition: 'color 0.15s ease-out',
          }}
          className="nav-linkedin"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>

      {/* Row 2: anchor tabs (tool pages only) */}
      {isToolPage && (
        <div style={{
          borderTop: '1px solid #F3F4F6',
          padding: '0 32px',
          display: 'flex',
          height: '40px',
          alignItems: 'stretch',
        }}>
          {toolAnchors.map(({ label, anchor }) => (
            <a
              key={anchor}
              href={anchor}
              onClick={(e) => handleAnchorClick(e, anchor)}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: activeAnchor === anchor ? 'var(--accent)' : '#6B7280',
                textDecoration: 'none',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: activeAnchor === anchor ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'color 0.15s ease-out, border-color 0.15s ease-out',
                cursor: 'pointer',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
