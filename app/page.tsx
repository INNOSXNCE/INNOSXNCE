'use client'
import { useState, type CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { WP, PACKS, productLink } from '@/lib/data'
import { wpArt, packArt } from '@/lib/art'
import { WallpaperCard } from '@/components/WallpaperCard'
import { PackCard } from '@/components/PackCard'
import { ScrollCue } from '@/components/ScrollCue'
import { SocialOrbs } from '@/components/SocialOrbs'
import { ScrollPop } from '@/components/ScrollPop'
import { T, TRACK, C } from '@/lib/type-scale'

const innoRed = '#c83232'

// The hero intro plays on load instead of being scrubbed by scroll: the three
// words are the first thing a visitor should read, not a reward for scrolling.
// Slow out-expo so the motion decelerates into place rather than snapping.
const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'

// `both` fill keeps each element hidden until its delay elapses, so nothing
// flashes at final position on first paint. Reduced motion is handled globally
// in globals.css, which collapses every animation to its end state instantly.
const heroWord = (i: number): CSSProperties => ({
  display: 'block',
  fontSize: 'clamp(40px,9vw,126px)',
  color: '#fff',
  animation: `heroWord 1.15s ${EASE_OUT_EXPO} ${0.18 + i * 0.17}s both`,
  willChange: 'transform, opacity, filter',
})

const heroFade = (delay: number): CSSProperties => ({
  animation: `heroFade 0.9s ${EASE_OUT_EXPO} ${delay}s both`,
})

export default function HomePage() {
  const { lang } = useLang()
  const router = useRouter()
  const c = COPY[lang]

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
            // Fades up once behind the words, then settles into its idle breathing.
            animation: `heroGlowIn 1.6s ${EASE_OUT_EXPO} both, glow 7s ease-in-out 1.6s infinite`,
            zIndex: 1, pointerEvents: 'none',
          }}
        />

        {/* Eyebrow — the rules draw outward from the label as it fades in. */}
        <div style={{ position: 'relative', zIndex: 6, display: 'flex', alignItems: 'center', gap: 18, marginBottom: 34 }}>
          <span style={{ display: 'block', width: 58, height: 1, background: C.ghost, transformOrigin: 'right', animation: `heroRule 1s ${EASE_OUT_EXPO} 0.1s both` }} />
          <span style={{ fontFamily: 'var(--font-archivo)', fontSize: T.micro, letterSpacing: '0.42em', color: C.dim, whiteSpace: 'nowrap', ...heroFade(0) }}>INNOSXNCE PRESENTS</span>
          <span style={{ display: 'block', width: 58, height: 1, background: C.ghost, transformOrigin: 'left', animation: `heroRule 1s ${EASE_OUT_EXPO} 0.1s both` }} />
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
          <span style={heroWord(0)}>MOTIVATION.</span>
          <span style={heroWord(1)}>DISCIPLINE.</span>
          <span style={heroWord(2)}>CONSISTENCY.</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            position: 'relative', zIndex: 6,
            margin: '32px 0 0', maxWidth: 540, padding: '0 20px',
            textAlign: 'center',
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.item, letterSpacing: '0.04em', color: C.dim, lineHeight: 1.7,
            ...heroFade(0.95),
          }}
        >
          {c.heroTag}
        </p>

        {/* Socials — last thing in the hero to arrive, after the tagline has
            settled, so the eye still lands on the headline first. */}
        <SocialOrbs delay={1.15} />

        <ScrollCue />
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
          <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: C.dim, marginBottom: 22 }}>{c.onePctLabel}</div>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.5, color: '#e6e6e6', margin: '0 0 28px' }}>{c.onePctBody}</p>
          <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.item, letterSpacing: '0.04em', color: '#fff', borderLeft: `2px solid ${innoRed}`, paddingLeft: 14, lineHeight: 1.6 }}>{c.onePctSub}</div>

          {/* Closing line + signature, carried over from the retired Manifesto
              page so the brand argument still lands without costing a route. */}
          <div style={{ marginTop: 34, paddingTop: 28, borderTop: '1px solid #1a1a1a' }}>
            <div
              style={{
                fontFamily: 'var(--font-cinzel), serif',
                fontWeight: 700,
                fontSize: 'clamp(19px,2.3vw,28px)',
                lineHeight: 1.35,
                letterSpacing: '0.02em',
                color: '#fff',
              }}
            >
              {c.onePctLine}
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: 'var(--font-archivo), sans-serif',
                fontSize: T.micro,
                letterSpacing: TRACK.wide,
                color: C.dim,
              }}
            >
              — INNOSXNCE
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Wallpapers ── */}
      <section style={{ borderTop: '1px solid #111', padding: 'clamp(60px,10vh,120px) clamp(20px,5vw,64px)', maxWidth: 1280, margin: '0 auto' }}>
        <ScrollPop>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 42, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: C.dim, marginBottom: 14 }}>{c.fwLabel}</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(26px,4vw,46px)' }}>{c.fwTitle}</h2>
          </div>
          <HoverLink onClick={() => router.push('/wallpapers')}>{c.fwCta}</HoverLink>
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
              href={productLink(w.slug)}
            />
          ))}
        </div>
        </ScrollPop>
      </section>

      {/* ── Packs ── */}
      <section style={{ borderTop: '1px solid #111', padding: 'clamp(60px,10vh,120px) clamp(20px,5vw,64px)', maxWidth: 1280, margin: '0 auto' }}>
        <ScrollPop>
        <div style={{ marginBottom: 42 }}>
          <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: C.dim, marginBottom: 14 }}>{c.packsLabel}</div>
          <h2 style={{ margin: '0 0 10px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(26px,4vw,46px)' }}>{c.packsTitle}</h2>
          <p style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.item, color: C.body, letterSpacing: '0.02em' }}>{c.packsSub}</p>
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
              href={productLink(p.slug)}
            />
          ))}
        </div>
        </ScrollPop>
      </section>

      {/* ── Discord CTA ── */}
      <section style={{ borderTop: '1px solid #111', padding: 'clamp(80px,14vh,160px) 20px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.wide, color: C.dim }}>{c.discordLabel}</div>
        <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 'clamp(34px,6vw,74px)', lineHeight: 1.02 }}>{c.discordTitle}</h2>
        <p style={{ maxWidth: 520, margin: '24px auto 34px', fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.body, lineHeight: 1.7, color: C.body }}>{c.discordBody}</p>
        <ExternalCta href="https://discord.com/invite/pyvX8V3E8Q">{c.discordCta} →</ExternalCta>
      </section>
    </main>
  )
}

function HoverLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.meta, letterSpacing: TRACK.button, color: h ? '#fff' : C.dim, whiteSpace: 'nowrap', background: 'none', border: 'none', transition: 'color 0.12s' }}
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
        fontFamily: 'var(--font-archivo), sans-serif',
        fontSize: T.item, fontWeight: 600, letterSpacing: TRACK.button,
        padding: '15px 34px',
        textDecoration: 'none',
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      {children}
    </a>
  )
}
