'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { T, TRACK, C } from '@/lib/type-scale'
import { StarMark } from '@/components/StarMark'

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

      {/* No member or activity counts here. A hand-typed number goes stale
          and stops matching the server; if a count comes back, read it from
          Discord's invite API rather than typing it in. */}

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
            background: btnH ? C.red : C.text,
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
      style={{ border: `1px solid ${h ? C.lineHover : C.line}`, padding: 28, transition: 'border-color 0.12s' }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div style={{ marginBottom: 16 }}><StarMark size={24} /></div>
      <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 600, fontSize: 'clamp(18px,2.2vw,24px)', color: '#fff' }}>{title}</h3>
      <p style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.item, lineHeight: 1.7, color: C.body }}>{desc}</p>
    </div>
  )
}
