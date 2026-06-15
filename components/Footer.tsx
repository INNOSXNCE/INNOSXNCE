'use client'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'

const SOCIALS = [
  { label: 'TIKTOK',    href: 'https://tiktok.com/@innosxnce1' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/innosxnce1' },
  { label: 'DISCORD',   href: 'https://discord.gg/innosxnce' },
]

export function Footer() {
  const { lang } = useLang()
  const c = COPY[lang]

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-manrope), sans-serif',
    fontSize: 10,
    letterSpacing: '0.16em',
    color: '#7a7a7a',
    textDecoration: 'none',
  }

  return (
    <>
      <footer
        className="flex items-center justify-between flex-wrap"
        style={{
          borderTop: '1px solid #111',
          padding: '26px clamp(20px,5vw,48px) 10px',
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 10,
            letterSpacing: '0.16em',
            color: '#7a7a7a',
          }}
        >
          {c.footerMade} · <span style={{ color: '#fff' }}>✦ 1% PER HARI</span>
        </div>
        <div style={{ display: 'flex', gap: 18 }}>
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7a7a7a')}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
      <div
        style={{
          padding: '6px clamp(20px,5vw,48px) 28px',
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 10,
          lineHeight: 1.6,
          color: '#3a3a3a',
          maxWidth: 660,
        }}
      >
        {c.footerDisc}
      </div>
    </>
  )
}
