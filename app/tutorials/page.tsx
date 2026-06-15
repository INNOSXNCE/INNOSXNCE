'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { PACKS } from '@/lib/data'
import { packArt } from '@/lib/art'
import { PackCard } from '@/components/PackCard'

export default function TutorialsPage() {
  const { lang } = useLang()
  const c = COPY[lang]
  const tp = c.tutPage
  const [btnH, setBtnH] = useState(false)

  const packs = PACKS.map((p, i) => ({
    ...p,
    num: String(i + 1).padStart(2, '0'),
    artStyle: packArt(i),
    tierLabel: p.tier[lang],
    descLabel: p.desc[lang],
    lessons: `${p.lessonsN} ${lang === 'id' ? 'pelajaran' : 'lessons'}`,
    durLabel: p.dur[lang],
  }))

  return (
    <section
      style={{
        padding: '130px clamp(20px,5vw,64px) 100px',
        maxWidth: 1280, margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 50, maxWidth: 640 }}>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a', marginBottom: 16 }}>{tp.kicker}</div>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(40px,7vw,80px)', lineHeight: 0.96 }}>{tp.title}</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, lineHeight: 1.7, color: '#9a9a9a' }}>{tp.sub}</p>
      </div>

      {/* Pack grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(12px,1.6vw,20px)' }}>
        {packs.map(p => (
          <PackCard
            key={p.slug}
            num={p.num}
            tier={p.tierLabel}
            title={p.title}
            desc={p.descLabel}
            lessons={p.lessons}
            dur={p.durLabel}
            price={p.price}
            takeLabel={c.tut.take}
            artStyle={p.artStyle}
            onTake={() => window.open(`https://lynk.id/innosxnce/${p.slug}`, '_blank', 'noopener')}
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
          <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 10, letterSpacing: '0.3em', color: '#c83232', marginBottom: 12 }}>{tp.previewLabel}</div>
          <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(24px,3.2vw,38px)' }}>{tp.previewTitle}</h2>
          <p style={{ margin: 0, maxWidth: 440, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, lineHeight: 1.7, color: '#9a9a9a' }}>{tp.previewBody}</p>
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
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.14em',
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
