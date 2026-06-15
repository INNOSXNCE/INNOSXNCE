'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'

export default function JournalPage() {
  const { lang } = useLang()
  const c = COPY[lang]
  const j = c.journal
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
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a', marginBottom: 16 }}>{j.kicker}</div>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(40px,7vw,82px)', lineHeight: 0.96 }}>{j.title}</h1>
        <p style={{ margin: '0 auto', maxWidth: 500, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, lineHeight: 1.7, color: '#9a9a9a' }}>{j.sub}</p>
      </div>

      {/* Videos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(12px,1.6vw,20px)' }}>
        {j.videos.map(v => (
          <VideoCard key={v.t} title={v.t} views={v.v} />
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 54 }}>
        <a
          href="https://tiktok.com/@innosxnce1"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBtnH(true)}
          onMouseLeave={() => setBtnH(false)}
          style={{
            display: 'inline-block',
            background: btnH ? '#c83232' : '#fff',
            color: btnH ? '#fff' : '#000',
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.16em',
            padding: '16px 38px', textDecoration: 'none',
            transition: 'background 0.12s, color 0.12s',
          }}
        >
          {j.cta}
        </a>
      </div>
    </section>
  )
}

function VideoCard({ title, views }: { title: string; views: string }) {
  const [h, setH] = useState(false)
  return (
    <div
      style={{ border: `1px solid ${h ? '#fff' : '#1a1a1a'}`, background: '#000', transition: 'border-color 0.12s', cursor: 'inherit' }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={() => window.open('https://tiktok.com/@innosxnce1', '_blank', 'noopener')}
    >
      {/* Thumbnail placeholder */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '9 / 16',
          overflow: 'hidden',
          background: 'radial-gradient(120% 80% at 50% 30%, rgba(255,255,255,0.08), #000 70%), linear-gradient(180deg,#0a0a0a,#000)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: 54, height: 54,
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: '#fff',
          }}
        >
          ▶
        </span>
        <span
          style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 10, letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {views} views
        </span>
      </div>
      {/* Title */}
      <div style={{ padding: 16 }}>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, color: '#fff', lineHeight: 1.45 }}>{title}</div>
      </div>
    </div>
  )
}
