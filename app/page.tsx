'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/lib/lang-context'
import { usePageFlash } from '@/lib/page-flash-context'
import { COPY } from '@/lib/copy'
import { WP, PACKS } from '@/lib/data'
import { wpArt, packArt } from '@/lib/art'
import { WallpaperCard } from '@/components/WallpaperCard'
import { PackCard } from '@/components/PackCard'

const innoRed = '#c83232'

function fmtTC(f: number): string {
  const fps = 24
  const tf = Math.floor(f)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(Math.floor(tf / (fps * 3600)) % 24)}:${p(Math.floor(tf / (fps * 60)) % 60)}:${p(Math.floor(tf / fps) % 60)}:${p(tf % fps)}`
}

export default function HomePage() {
  const { lang } = useLang()
  const { startFlash } = usePageFlash()
  const c = COPY[lang]

  const [tc, setTc] = useState('00:00:00:00')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let frame = 0
    const id = setInterval(() => {
      frame += 7
      setTc(fmtTC(frame))
    }, 250)
    return () => clearInterval(id)
  }, [])

  const featuredWp = WP.slice(0, 4)

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
    <main>
      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '9vh', background: '#000', borderBottom: '1px solid #121212', zIndex: 5 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '9vh', background: '#000', borderTop: '1px solid #121212', zIndex: 5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 44%, transparent 28%, rgba(0,0,0,0.9) 100%)', zIndex: 2, pointerEvents: 'none' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '62vw', height: '62vw',
            maxWidth: 760, maxHeight: 760,
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 60%)',
            filter: 'blur(24px)',
            animation: 'glow 7s ease-in-out infinite',
            zIndex: 1, pointerEvents: 'none',
          }}
        />

        {/* Eyebrow */}
        <div style={{ position: 'relative', zIndex: 6, display: 'flex', alignItems: 'center', gap: 18, marginBottom: 34 }}>
          <span style={{ display: 'block', width: 58, height: 1, background: '#333' }} />
          <span style={{ fontFamily: 'var(--font-manrope)', fontSize: 11, letterSpacing: '0.42em', color: '#7a7a7a', whiteSpace: 'nowrap' }}>INNOSXNCE PRESENTS</span>
          <span style={{ display: 'block', width: 58, height: 1, background: '#333' }} />
        </div>

        {/* Headline */}
        <h1
          style={{
            position: 'relative', zIndex: 6,
            margin: 0, textAlign: 'center',
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 700, lineHeight: 0.98, letterSpacing: '0.03em',
          }}
        >
          <span style={{ display: 'block', fontSize: 'clamp(40px,9vw,126px)', color: '#fff' }}>MOTIVATION.</span>
          <span style={{ display: 'block', fontSize: 'clamp(40px,9vw,126px)', color: '#fff' }}>DISCIPLINE.</span>
          <span style={{ display: 'block', fontSize: 'clamp(40px,9vw,126px)', animation: 'dimpulse 3.4s ease-in-out infinite' }}>CONSISTENCY.</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            position: 'relative', zIndex: 6,
            margin: '32px 0 0', maxWidth: 540, padding: '0 20px',
            textAlign: 'center',
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 13, letterSpacing: '0.04em', color: '#7a7a7a', lineHeight: 1.7,
          }}
        >
          {c.heroTag}
        </p>

        {/* Info panel */}
        <div
          style={{
            position: 'absolute', top: 76, right: 'clamp(16px,4vw,48px)', zIndex: 6,
            border: '1px solid #1d1d1d', padding: '10px 13px',
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 9, letterSpacing: '0.18em', color: '#7a7a7a',
            minWidth: 150, whiteSpace: 'nowrap',
          }}
        >
          {[['REEL', '01 / A'], ['DATE', '06 · 2026'], ['TC', tc]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 18, marginTop: k === 'REEL' ? 0 : 5 }}>
              <span>{k}</span>
              <span style={{ color: '#fff', fontVariantNumeric: k === 'TC' ? 'tabular-nums' : undefined }}>{v}</span>
            </div>
          ))}
        </div>

        {/* REC */}
        <div
          style={{
            position: 'absolute', bottom: 'calc(9vh + 18px)', left: 'clamp(16px,4vw,48px)', zIndex: 6,
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 10, letterSpacing: '0.24em', color: '#7a7a7a', whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: innoRed, animation: 'rec 1.4s steps(1) infinite' }} />
          <span>REC · DAY 437</span>
        </div>

        {/* Runtime */}
        <div
          style={{
            position: 'absolute', bottom: 'calc(9vh + 18px)', right: 'clamp(16px,4vw,48px)', zIndex: 6,
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 10, letterSpacing: '0.24em', color: '#7a7a7a',
          }}
        >
          RUNTIME · 1% × ∞
        </div>
      </section>

      {/* ── 1% ── */}
      <section
        style={{
          borderTop: '1px solid #111',
          padding: 'clamp(70px,12vh,150px) clamp(20px,5vw,64px)',
          maxWidth: 1280, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(30px,6vw,90px)',
          alignItems: 'center',
        }}
      >
        <div style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(120px,22vw,290px)', lineHeight: 0.8, letterSpacing: '-0.02em' }}>
          1<span style={{ color: innoRed }}>%</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a', marginBottom: 22 }}>{c.onePctLabel}</div>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.5, color: '#e6e6e6', margin: '0 0 28px' }}>{c.onePctBody}</p>
          <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, letterSpacing: '0.04em', color: '#fff', borderLeft: `2px solid ${innoRed}`, paddingLeft: 14, lineHeight: 1.6 }}>{c.onePctSub}</div>
        </div>
      </section>

      {/* ── Featured Wallpapers ── */}
      <section style={{ borderTop: '1px solid #111', padding: 'clamp(60px,10vh,120px) clamp(20px,5vw,64px)', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 42, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a', marginBottom: 14 }}>{c.fwLabel}</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(26px,4vw,46px)' }}>{c.fwTitle}</h2>
          </div>
          <HoverLink onClick={() => startFlash('/wallpapers')}>{c.fwCta}</HoverLink>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'clamp(10px,1.4vw,18px)' }}>
          {featuredWp.map((w, i) => (
            <WallpaperCard
              key={w.slug}
              idx={String(i + 1).padStart(2, '0')}
              name={w.name}
              subtext={'Rp 9K'}
              artStyle={wpArt(i, w.red)}
              buyLabel={c.wp.buy}
              onBuy={() => window.open(`https://lynk.id/innosxnce/${w.slug}`, '_blank', 'noopener')}
            />
          ))}
        </div>
      </section>

      {/* ── Growth interstitial ── */}
      <Interstitial word="Growth." sub={c.interOneSub} />

      {/* ── Packs ── */}
      <section style={{ borderTop: '1px solid #111', padding: 'clamp(60px,10vh,120px) clamp(20px,5vw,64px)', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 42 }}>
          <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a', marginBottom: 14 }}>{c.packsLabel}</div>
          <h2 style={{ margin: '0 0 10px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(26px,4vw,46px)' }}>{c.packsTitle}</h2>
          <p style={{ margin: 0, fontFamily: 'var(--font-manrope), sans-serif', fontSize: 13, color: '#8a8a8a', letterSpacing: '0.02em' }}>{c.packsSub}</p>
        </div>
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
      </section>

      {/* ── Bangkit interstitial ── */}
      <Interstitial word="Bangkit." sub={c.interTwoSub} />

      {/* ── Discord CTA ── */}
      <section style={{ borderTop: '1px solid #111', padding: 'clamp(80px,14vh,160px) 20px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#7a7a7a' }}>{c.discordLabel}</div>
        <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(34px,6vw,74px)', lineHeight: 1.02 }}>{c.discordTitle}</h2>
        <p style={{ maxWidth: 520, margin: '24px auto 34px', fontFamily: 'var(--font-manrope), sans-serif', fontSize: 14, lineHeight: 1.7, color: '#9a9a9a' }}>{c.discordBody}</p>
        <ExternalCta href="https://discord.gg/innosxnce">{c.discordCta} →</ExternalCta>
      </section>
    </main>
  )
}

function Interstitial({ word, sub }: { word: string; sub: string }) {
  return (
    <section style={{ borderTop: '1px solid #111', minHeight: '54vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(64px,16vw,196px)', lineHeight: 0.9, letterSpacing: '0.02em' }}>{word}</div>
      <div style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(18px,2.4vw,28px)', color: '#7a7a7a', marginTop: 18 }}>{sub}</div>
    </section>
  )
}

function HoverLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 12, letterSpacing: '0.16em', color: h ? '#fff' : '#7a7a7a', whiteSpace: 'nowrap', background: 'none', border: 'none', cursor: 'inherit', transition: 'color 0.12s' }}
    >
      {children}
    </button>
  )
}

function ExternalCta({ href, children }: { href: string; children: React.ReactNode }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block',
        background: h ? '#c83232' : '#fff',
        color: h ? '#fff' : '#000',
        fontFamily: 'var(--font-manrope), sans-serif',
        fontSize: 13, fontWeight: 600, letterSpacing: '0.16em',
        padding: '15px 34px',
        textDecoration: 'none',
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      {children}
    </a>
  )
}
