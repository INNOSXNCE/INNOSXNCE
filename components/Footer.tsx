'use client'
import { useRouter } from 'next/navigation'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { T, TRACK, C } from '@/lib/type-scale'
import { StarMark } from '@/components/StarMark'

const SOCIALS = [
  { label: 'TIKTOK',    href: 'https://tiktok.com/@innosxnce1' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/innosxnce1' },
  { label: 'DISCORD',   href: 'https://discord.com/invite/pyvX8V3E8Q' },
]

export function Footer() {
  const { lang } = useLang()
  const router = useRouter()
  const c = COPY[lang]

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-archivo), sans-serif',
    fontSize: T.micro,
    letterSpacing: TRACK.button,
    color: C.dim,
    textDecoration: 'none',
  }

  return (
    <>
      <footer
        className="flex items-center justify-between flex-wrap"
        style={{
          borderTop: `1px solid ${C.line}`,
          padding: '26px clamp(20px,5vw,48px) 10px',
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.micro,
            letterSpacing: TRACK.button,
            color: C.dim,
          }}
        >
          {c.footerMade} · <span style={{ color: '#fff' }}><StarMark size={15} style={{ marginRight: 5 }} />1% PER HARI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          {/* Community is in the main nav as well; it stays here, in white,
              beside the Discord link. A real <a href> — the onClick only
              intercepts plain left clicks, so ctrl/cmd/middle-click still open
              it in a new tab. */}
          <a
            href="/community"
            onClick={e => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
              e.preventDefault()
              router.push('/community')
            }}
            style={{ ...linkStyle, color: '#fff' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none')}
          >
            {c.nav.community}
          </a>

          <span aria-hidden style={{ width: 1, height: 10, background: C.line }} />

          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
      {/* Purchase terms are text a buyer has to be able to read, so they sit on
          `dim` (7.5:1 on black). They were on `ghost`, the decorative step, at
          2.4:1. `faint` would not do either: #6e6e6e is only 4.1:1. */}
      <div
        style={{
          padding: '6px clamp(20px,5vw,48px) 28px',
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.micro,
          lineHeight: 1.6,
          color: C.dim,
          maxWidth: 660,
        }}
      >
        {c.footerDisc}
      </div>
    </>
  )
}
