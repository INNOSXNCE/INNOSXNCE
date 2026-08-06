'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { T, TRACK, C } from '@/lib/type-scale'

export default function CommunityPage() {
  const { lang } = useLang()
  const c = COPY[lang]
  const com = c.community
  const [btnH, setBtnH] = useState(false)

  return (
    <section
      style={{
        padding: '130px clamp(20px,5vw,48px) 100px',
        maxWidth: 1100, margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 54 }}>
        <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: C.dim, marginBottom: 16 }}>{com.kicker}</div>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(40px,7vw,82px)', lineHeight: 0.96 }}>{com.title}</h1>
        <p style={{ margin: '0 auto', maxWidth: 480, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.body, lineHeight: 1.7, color: C.body }}>{com.sub}</p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 1,
          background: C.line,
          border: '1px solid #1a1a1a',
          marginBottom: 46,
        }}
      >
        {com.stats.map(s => (
          <div key={s.l} style={{ background: '#000', padding: '30px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,46px)', color: '#fff', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.label, color: C.dim, marginTop: 12 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(12px,1.6vw,18px)' }}>
        {com.benefits.map(b => (
          <BenefitCard key={b.t} title={b.t} desc={b.d} />
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 54 }}>
        <a
          href="https://discord.com/invite/pyvX8V3E8Q"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBtnH(true)}
          onMouseLeave={() => setBtnH(false)}
          style={{
            display: 'inline-block',
            background: btnH ? '#c83232' : '#fff',
            color: btnH ? '#fff' : '#000',
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.item, fontWeight: 600, letterSpacing: TRACK.button,
            padding: '16px 38px', textDecoration: 'none',
            transition: 'background 0.12s, color 0.12s',
          }}
        >
          {com.cta}
        </a>
      </div>
    </section>
  )
}

function BenefitCard({ title, desc }: { title: string; desc: string }) {
  const [h, setH] = useState(false)
  return (
    <div
      style={{ border: `1px solid ${h ? '#fff' : '#1a1a1a'}`, padding: 28, transition: 'border-color 0.12s' }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div style={{ color: '#c83232', fontSize: T.body, marginBottom: 16 }}>✦</div>
      <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 600, fontSize: 'clamp(18px,2.2vw,24px)', color: '#fff' }}>{title}</h3>
      <p style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.item, lineHeight: 1.7, color: C.body }}>{desc}</p>
    </div>
  )
}
