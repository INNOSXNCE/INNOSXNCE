'use client'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'

export default function ManifestoPage() {
  const { lang } = useLang()
  const m = COPY[lang].manifesto

  const body = m.body

  return (
    <article
      style={{
        maxWidth: 720, margin: '0 auto',
        padding: '130px clamp(20px,5vw,40px) 110px',
      }}
    >
      {/* Kicker */}
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a' }}>
        {m.kicker}
      </div>

      {/* Title */}
      <h1
        style={{
          margin: '18px 0 0', textAlign: 'center',
          fontFamily: 'var(--font-cinzel), serif',
          fontWeight: 700, fontSize: 'clamp(44px,9vw,94px)',
          lineHeight: 0.95, letterSpacing: '0.02em',
        }}
      >
        {m.title}
      </h1>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '34px 0 40px' }}>
        <span style={{ width: 46, height: 1, background: '#333' }} />
        <span style={{ color: '#c83232', fontSize: 13 }}>✦</span>
        <span style={{ width: 46, height: 1, background: '#333' }} />
      </div>

      {/* Lead */}
      <p
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontStyle: 'italic', fontSize: 'clamp(22px,3vw,30px)',
          textAlign: 'center', color: '#d4d4d4', lineHeight: 1.5,
          margin: '0 0 54px',
        }}
      >
        {m.lead}
      </p>

      {/* Body p0 with drop cap */}
      <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 16, lineHeight: 1.95, color: '#c6c6c6', margin: '0 0 26px' }}>
        <span
          style={{
            float: 'left',
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 700, fontSize: 74, lineHeight: 0.74,
            padding: '6px 14px 0 0', color: '#fff',
          }}
        >
          {body[0].charAt(0)}
        </span>
        {body[0].slice(1)}
      </p>

      {/* Pull quote 1 */}
      <PullQuote>{m.pull1}</PullQuote>

      {/* Body p1 & p2 */}
      <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 16, lineHeight: 1.95, color: '#c6c6c6', margin: '0 0 26px' }}>{body[1]}</p>
      <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 16, lineHeight: 1.95, color: '#c6c6c6', margin: '0 0 26px' }}>{body[2]}</p>

      {/* Pull quote 2 */}
      <PullQuote>{m.pull2}</PullQuote>

      {/* Body p3 */}
      <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 16, lineHeight: 1.95, color: '#c6c6c6', margin: '0 0 26px' }}>{body[3]}</p>

      {/* Signature */}
      <div style={{ marginTop: 56, textAlign: 'center', fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a' }}>
        {m.signature}
      </div>
    </article>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: '50px 0', textAlign: 'center' }}>
      <div style={{ width: 50, height: 1, background: '#333', margin: '0 auto 22px' }} />
      <div style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(22px,3vw,33px)', lineHeight: 1.35, color: '#fff', letterSpacing: '0.02em' }}>
        {children}
      </div>
      <div style={{ width: 50, height: 1, background: '#333', margin: '22px auto 0' }} />
    </div>
  )
}
