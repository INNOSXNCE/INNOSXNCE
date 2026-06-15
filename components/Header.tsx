'use client'
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
  const c = COPY[lang]

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

  return (
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
        onClick={() => startFlash('/')}
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

      {/* Nav */}
      <nav className="flex items-center overflow-hidden" style={{ gap: 'clamp(12px,2.2vw,28px)' }}>
        {NAV.map(({ key, href }) => {
          const active = pathname === href
          return (
            <button
              key={key}
              onClick={() => startFlash(href)}
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

      {/* Lang toggle */}
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #1d1d1d' }}>
        <button style={togBtn(lang === 'id')} onClick={() => setLang('id')}>ID</button>
        <button style={togBtn(lang === 'en')} onClick={() => setLang('en')}>EN</button>
      </div>
    </header>
  )
}
