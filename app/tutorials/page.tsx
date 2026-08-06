'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { PACKS, productLink } from '@/lib/data'
import { PackPriceCard } from '@/components/PackPriceCard'
import { T, TRACK, C } from '@/lib/type-scale'

export default function TutorialsPage() {
  const { lang } = useLang()
  const c = COPY[lang]
  const tp = c.tutPage
  const [btnH, setBtnH] = useState(false)

  return (
    <section
      style={{
        padding: '130px clamp(20px,5vw,64px) 100px',
        maxWidth: 1280, margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 50, maxWidth: 640 }}>
        <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: C.dim, marginBottom: 16 }}>{tp.kicker}</div>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(40px,7vw,80px)', lineHeight: 0.96 }}>{tp.title}</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.body, lineHeight: 1.7, color: C.body }}>{tp.sub}</p>
      </div>

      {/* Pricing grid — cards lead with price and what is included */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(12px,1.6vw,20px)',
          alignItems: 'stretch',
        }}
      >
        {PACKS.map((p, i) => (
          <PackPriceCard
            key={p.slug}
            pack={p}
            num={String(i + 1).padStart(2, '0')}
            lang={lang}
            packLabel={c.tut.packLabel}
            takeLabel={c.tut.takePack}
            href={productLink(p.slug)}
          />
        ))}
      </div>

      {/* Preview CTA */}
      <div
        style={{
          marginTop: 46,
          border: '1px solid #1a1a1a',
          padding: 'clamp(28px,5vw,48px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: '#c83232', marginBottom: 12 }}>{tp.previewLabel}</div>
          <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(24px,3.2vw,38px)' }}>{tp.previewTitle}</h2>
          <p style={{ margin: 0, maxWidth: 440, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.item, lineHeight: 1.7, color: C.body }}>{tp.previewBody}</p>
        </div>
        <a
          href="https://tiktok.com/@innosxnce1"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBtnH(true)}
          onMouseLeave={() => setBtnH(false)}
          style={{
            display: 'inline-block', whiteSpace: 'nowrap',
            border: '1px solid #fff',
            background: btnH ? '#fff' : 'transparent',
            color: btnH ? '#000' : '#fff',
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.item, fontWeight: 600, letterSpacing: TRACK.button,
            padding: '14px 28px', textDecoration: 'none',
            transition: 'background 0.12s, color 0.12s',
          }}
        >
          {tp.previewCta}
        </a>
      </div>
    </section>
  )
}
