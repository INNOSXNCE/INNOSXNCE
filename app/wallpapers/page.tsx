'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { WP, productLink } from '@/lib/data'
import { wpArt } from '@/lib/art'
import { WallpaperCard } from '@/components/WallpaperCard'
import { DevicePreview } from '@/components/DevicePreview'
import type { CSSProperties } from 'react'
import { T, TRACK, C } from '@/lib/type-scale'

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
        <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: C.dim, marginBottom: 16 }}>{wp.kicker}</div>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(44px,8vw,86px)', lineHeight: 0.95 }}>{wp.title}</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.body, lineHeight: 1.7, color: C.body }}>{wp.sub}</p>
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
            href={productLink(w.slug)}
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
        <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: '#c83232', marginBottom: 12 }}>{label}</div>
        <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(26px,3.4vw,40px)' }}>{title}</h2>
        <p style={{ margin: 0, maxWidth: 460, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.item, lineHeight: 1.7, color: C.body }}>{body}</p>
      </div>
      <a
        href={productLink('all-access')}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setBtnH(true)}
        onMouseLeave={() => setBtnH(false)}
        style={{
          display: 'inline-block', whiteSpace: 'nowrap',
          background: btnH ? '#c83232' : '#fff',
          color: btnH ? '#fff' : '#000',
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.item, fontWeight: 600, letterSpacing: TRACK.button,
          padding: '15px 30px', textDecoration: 'none',
          transition: 'background 0.12s, color 0.12s',
        }}
      >
        {cta}
      </a>
    </div>
  )
}
