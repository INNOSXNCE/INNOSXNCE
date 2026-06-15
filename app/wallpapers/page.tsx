'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { WP } from '@/lib/data'
import { wpArt } from '@/lib/art'
import { WallpaperCard } from '@/components/WallpaperCard'
import { DevicePreview } from '@/components/DevicePreview'
import type { CSSProperties } from 'react'

interface HoveredWp {
  name: string
  artStyle: CSSProperties
}

export default function WallpapersPage() {
  const { lang } = useLang()
  const c = COPY[lang]
  const wp = c.wpPage
  const [hoveredWp, setHoveredWp] = useState<HoveredWp | null>(null)

  return (
    <section
      style={{
        padding: '120px clamp(20px,5vw,64px) 60px',
        maxWidth: 1280, margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 50, maxWidth: 620 }}>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a', marginBottom: 16 }}>{wp.kicker}</div>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(44px,8vw,86px)', lineHeight: 0.95 }}>{wp.title}</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, lineHeight: 1.7, color: '#9a9a9a' }}>{wp.sub}</p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'clamp(10px,1.4vw,18px)' }}>
        {WP.map((w, i) => (
          <WallpaperCard
            key={w.slug}
            idx={String(i + 1).padStart(2, '0')}
            name={w.name}
            subtext={w.desc[lang]}
            subtextSize={11}
            artStyle={wpArt(i, w.red)}
            buyLabel={c.wp.buy}
            onBuy={() => window.open(`https://lynk.id/innosxnce/${w.slug}`, '_blank', 'noopener')}
            onEnter={() => setHoveredWp({ name: w.name, artStyle: wpArt(i, w.red) })}
            onLeave={() => setHoveredWp(null)}
          />
        ))}
      </div>

      {/* Bundle CTA */}
      <BundleBanner
        label={wp.bundleLabel}
        title={wp.bundleTitle}
        body={wp.bundleBody}
        cta={wp.bundleCta}
      />

      {/* Device preview */}
      {hoveredWp && (
        <DevicePreview name={hoveredWp.name} artStyle={hoveredWp.artStyle} />
      )}
    </section>
  )
}

function BundleBanner({
  label, title, body, cta,
}: {
  label: string; title: string; body: string; cta: string
}) {
  const [h, setH] = useState(false)
  const [btnH, setBtnH] = useState(false)

  return (
    <div
      style={{
        marginTop: 46,
        border: `1px solid ${h ? '#2a2a2a' : '#1a1a1a'}`,
        padding: 'clamp(28px,5vw,52px)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 24,
        flexWrap: 'wrap',
        transition: 'border-color 0.12s',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 10, letterSpacing: '0.3em', color: '#c83232', marginBottom: 12 }}>{label}</div>
        <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(26px,3.4vw,40px)' }}>{title}</h2>
        <p style={{ margin: 0, maxWidth: 460, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, lineHeight: 1.7, color: '#9a9a9a' }}>{body}</p>
      </div>
      <a
        href="https://lynk.id/innosxnce/all-access"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setBtnH(true)}
        onMouseLeave={() => setBtnH(false)}
        style={{
          display: 'inline-block', whiteSpace: 'nowrap',
          background: btnH ? '#c83232' : '#fff',
          color: btnH ? '#fff' : '#000',
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 13, fontWeight: 600, letterSpacing: '0.14em',
          padding: '15px 30px', textDecoration: 'none',
          transition: 'background 0.12s, color 0.12s',
        }}
      >
        {cta}
      </a>
    </div>
  )
}
