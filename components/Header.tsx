'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/lang-context'
import { usePageFlash } from '@/lib/page-flash-context'
import { COPY } from '@/lib/copy'

const NAV: Array<{ key: keyof typeof COPY.id.nav; href: string }> = [
  { key: 'home',      href: '/' },
  { key: 'manifesto', href: '/manifesto' },
  { key: 'wallpapers',href: '/wallpapers' },
  { key: 'tutorials', href: '/tutorials' },
  { key: 'community', href: '/community' },
  { key: 'journal',   href: '/journal' },
]

export function Header() {
  const { lang, setLang } = useLang()
  const { startFlash } = usePageFlash()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const c = COPY[lang]

  // Header persists across routes; close the overlay on any route change
  // (incl. browser back/forward, which bypasses navigate()).
  useEffect(() => {
    // Deferred a tick to satisfy react-hooks/set-state-in-effect (same pattern as ScrollHero).
    queueMicrotask(() => setMenuOpen(false))
  }, [pathname])

  // Lock scroll while the overlay is open, so a swipe can't scroll the
  // scroll-scrubbed hero underneath it (which would silently advance the scrub).
  // The page's scroll container is <html>, not <body>, so body overflow:hidden
  // alone doesn't lock it and can't hold scrollY under a programmatic scroll;
  // pin the body with position:fixed and restore the exact offset on close.
  useEffect(() => {
    if (!menuOpen) return
    const scrollY = window.scrollY
    const body = document.body
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'
    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      body.style.overscrollBehavior = prev.overscrollBehavior
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  // Close the overlay if the viewport crosses to >= lg while it's open, so
  // resizing past the desktop breakpoint doesn't leave stale menu state.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const closeIfDesktop = () => { if (mq.matches) setMenuOpen(false) }
    mq.addEventListener('change', closeIfDesktop)
    return () => mq.removeEventListener('change', closeIfDesktop)
  }, [])

  const togBtn = (on: boolean): React.CSSProperties => ({
    padding: '7px 11px',
    fontFamily: 'var(--font-manrope), sans-serif',
    fontSize: '11px',
    letterSpacing: '0.18em',
    background: on ? '#fff' : 'transparent',
    color: on ? '#000' : '#7a7a7a',
    border: 'none',
    cursor: 'inherit',
  })

  const navigate = (href: string) => {
    setMenuOpen(false)
    startFlash(href)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 flex items-center justify-between"
        style={{
          height: 58,
          padding: '0 clamp(16px,4vw,48px)',
          background: 'rgba(0,0,0,0.78)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #161616',
          zIndex: 60,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-[9px] text-white"
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.3em',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'inherit',
          }}
        >
          <span style={{ fontSize: 13 }}>✦</span>
          <span>INNOSXNCE</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center" style={{ gap: 'clamp(12px,2.2vw,28px)' }}>
          {NAV.map(({ key, href }) => {
            const active = pathname === href
            return (
              <button
                key={key}
                onClick={() => navigate(href)}
                style={{
                  padding: '4px 0',
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  whiteSpace: 'nowrap',
                  color: active ? '#fff' : '#7a7a7a',
                  background: 'none',
                  border: 'none',
                  borderBottom: `1px solid ${active ? '#c83232' : 'transparent'}`,
                  cursor: 'inherit',
                }}
              >
                {c.nav[key]}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center" style={{ gap: 14 }}>
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: 11,
              letterSpacing: '0.24em',
              color: menuOpen ? '#fff' : '#7a7a7a',
              background: 'none',
              border: 'none',
              cursor: 'inherit',
            }}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>

          {/* Lang toggle */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #1d1d1d' }}>
            <button style={togBtn(lang === 'id')} onClick={() => setLang('id')}>ID</button>
            <button style={togBtn(lang === 'en')} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center lg:hidden"
          style={{ top: 58, background: 'rgba(0,0,0,0.96)', zIndex: 55, gap: 28 }}
        >
          {NAV.map(({ key, href }, i) => (
            <button
              key={key}
              onClick={() => navigate(href)}
              style={{
                fontFamily: 'var(--font-cinzel), serif',
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: '0.18em',
                color: pathname === href ? '#c83232' : '#fff',
                background: 'none',
                border: 'none',
                cursor: 'inherit',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  color: '#7a7a7a',
                  marginRight: 12,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {c.nav[key]}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
