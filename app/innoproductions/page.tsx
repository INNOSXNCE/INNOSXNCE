'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import {
  CONTACT,
  STATS,
  SERVICES,
  TIERS,
  ADDONS,
  PROCESS,
  WORK,
  FAQ,
  waLink,
} from '@/lib/inno-productions'
import { BeforeAfter } from '@/components/BeforeAfter'
import { BriefForm } from '@/components/BriefForm'
import { ScrollPop } from '@/components/ScrollPop'
import type { TierItem, ServiceItem } from '@/lib/types'
import { T, TRACK, C } from '@/lib/type-scale'

/* InnoProductions runs a monochrome palette on purpose: INNOSXNCE owns the
   red, the studio side stays silver so the two brands read as related but
   distinct within the same shell. */
const SILVER = '#d4d4d4'
const DIM = C.dim
const LINE = C.line
const PAD = '0 clamp(20px,5vw,48px)'
const MAX = 1100

export default function InnoProductionsPage() {
  const { lang } = useLang()
  const c = COPY[lang].inno
  const [ctaH, setCtaH] = useState(false)
  const [cta2H, setCta2H] = useState(false)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ padding: '130px clamp(20px,5vw,48px) 0', maxWidth: MAX, margin: '0 auto' }}>
        <Kicker>{c.kicker}</Kicker>
        <h1
          style={{
            margin: '0 0 22px',
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 700,
            fontSize: 'clamp(42px,8.5vw,96px)',
            lineHeight: 0.94,
            letterSpacing: '-0.01em',
            whiteSpace: 'pre-line',
          }}
        >
          {c.title}
        </h1>
        <p
          style={{
            margin: '0 0 34px',
            maxWidth: 560,
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.lead,
            lineHeight: 1.75,
            color: C.body,
          }}
        >
          {c.lead}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a
            href="#brief"
            onMouseEnter={() => setCtaH(true)}
            onMouseLeave={() => setCtaH(false)}
            style={{
              padding: '15px 32px',
              background: ctaH ? 'transparent' : '#fff',
              color: ctaH ? '#fff' : '#000',
              border: '1px solid #fff',
              fontFamily: 'var(--font-archivo), sans-serif',
              fontSize: T.meta,
              fontWeight: 600,
              letterSpacing: TRACK.button,
              textDecoration: 'none',
              transition: 'background 0.12s, color 0.12s',
            }}
          >
            {c.ctaPrimary}
          </a>
          <a
            href="#pricing"
            onMouseEnter={() => setCta2H(true)}
            onMouseLeave={() => setCta2H(false)}
            style={{
              padding: '15px 32px',
              background: 'transparent',
              color: cta2H ? '#fff' : DIM,
              border: `1px solid ${cta2H ? '#fff' : LINE}`,
              fontFamily: 'var(--font-archivo), sans-serif',
              fontSize: T.meta,
              fontWeight: 600,
              letterSpacing: TRACK.button,
              textDecoration: 'none',
              transition: 'color 0.12s, border-color 0.12s',
            }}
          >
            {c.ctaSecondary}
          </a>
        </div>
      </section>

      {/* ── Spec strip ───────────────────────────────────────────── */}
      <section style={{ padding: '58px clamp(20px,5vw,48px) 0', maxWidth: MAX, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 1,
            background: LINE,
            border: `1px solid ${LINE}`,
          }}
        >
          {STATS.map(s => (
            <div key={s.l.en} style={{ background: '#000', padding: '26px 14px', textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-cinzel), serif',
                  fontWeight: 700,
                  fontSize: 'clamp(16px,2.4vw,26px)',
                  color: '#fff',
                  lineHeight: 1.1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontSize: T.micro,
                  letterSpacing: TRACK.label,
                  color: DIM,
                }}
              >
                {s.l[lang]}
              </div>
            </div>
          ))}
        </div>

        {/* Sub-brand relationship — answers "wait, what is this page?" up front */}
        <p
          style={{
            margin: '26px 0 0',
            maxWidth: 620,
            fontFamily: 'var(--font-cormorant), serif',
            fontStyle: 'italic',
            fontSize: T.quote,
            lineHeight: 1.65,
            color: DIM,
            borderLeft: `1px solid ${SILVER}`,
            paddingLeft: 18,
          }}
        >
          {c.relation}
        </p>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <Section>
        <ScrollPop>
          <SectionHead label={c.servicesLabel} title={c.servicesTitle} sub={c.servicesSub} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: 'clamp(12px,1.6vw,18px)',
            }}
          >
            {SERVICES.map(s => (
              <ServiceCard key={s.slug} s={s} lang={lang} />
            ))}
          </div>
        </ScrollPop>
      </Section>

      {/* ── Work / before–after ──────────────────────────────────── */}
      <Section>
        <SectionHead label={c.workLabel} title={c.workTitle} sub={c.workSub} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(16px,2.4vw,28px)',
            alignItems: 'start',
          }}
        >
          {WORK.map(w => (
            <BeforeAfter
              key={w.slug}
              work={w}
              lang={lang}
              beforeLabel={c.workBefore}
              afterLabel={c.workAfter}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 20,
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.micro,
            letterSpacing: TRACK.button,
            color: C.ghost,
          }}
        >
          {c.workHint}
        </div>
      </Section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <Section>
        <ScrollPop>
          <SectionHead label={c.processLabel} title={c.processTitle} sub={c.processSub} />
          <div style={{ borderTop: `1px solid ${LINE}` }}>
            {PROCESS.map(p => (
              <div
                key={p.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(52px, 88px) 1fr',
                  gap: 'clamp(14px,3vw,34px)',
                  padding: '26px 0',
                  borderBottom: `1px solid ${LINE}`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cinzel), serif',
                    fontWeight: 700,
                    fontSize: 'clamp(22px,3.4vw,38px)',
                    color: SILVER,
                    lineHeight: 1,
                  }}
                >
                  {p.num}
                </div>
                <div>
                  <h3
                    style={{
                      margin: '0 0 9px',
                      fontFamily: 'var(--font-cinzel), serif',
                      fontWeight: 600,
                      fontSize: 'clamp(17px,2.2vw,23px)',
                      color: '#fff',
                    }}
                  >
                    {p.title[lang]}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      maxWidth: 620,
                      fontFamily: 'var(--font-archivo), sans-serif',
                      fontSize: T.item,
                      lineHeight: 1.75,
                      color: C.body,
                    }}
                  >
                    {p.desc[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollPop>
      </Section>

      {/* ── Pricing ──────────────────────────────────────────────── */}
      <Section id="pricing">
        <SectionHead label={c.pricingLabel} title={c.pricingTitle} sub={c.pricingSub} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(268px, 1fr))',
            gap: 'clamp(12px,1.6vw,18px)',
            alignItems: 'stretch',
          }}
        >
          {TIERS.map(t => (
            <TierCard
              key={t.slug}
              t={t}
              lang={lang}
              featuredLabel={c.pricingFeatured}
              pickLabel={c.pricingPick}
              greeting={COPY[lang].inno.form.greeting}
            />
          ))}
        </div>
        <p
          style={{
            margin: '24px 0 0',
            maxWidth: 660,
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.meta,
            lineHeight: 1.75,
            color: C.faint,
          }}
        >
          {c.pricingNote}
        </p>
      </Section>

      {/* ── Add-ons ──────────────────────────────────────────────── */}
      <Section>
        <SectionHead label={c.addonsLabel} title={c.addonsTitle} sub={c.addonsSub} />
        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {ADDONS.map(a => (
            <div
              key={a.slug}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 10,
                padding: '17px 0',
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              <div style={{ flex: '1 1 240px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-archivo), sans-serif',
                    fontSize: T.body,
                    fontWeight: 500,
                    color: '#fff',
                  }}
                >
                  {a.name[lang]}
                </span>
                <span
                  style={{
                    marginLeft: 12,
                    fontFamily: 'var(--font-archivo), sans-serif',
                    fontSize: T.micro,
                    color: C.faint,
                  }}
                >
                  {a.note[lang]}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-cinzel), serif',
                  fontWeight: 600,
                  fontSize: T.lead,
                  color: SILVER,
                  whiteSpace: 'nowrap',
                }}
              >
                {a.price}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <Section>
        <SectionHead label={c.faqLabel} title={c.faqTitle} />
        <div style={{ borderTop: `1px solid ${LINE}`, maxWidth: 760 }}>
          {FAQ.map((item, i) => (
            <FaqRow key={i} q={item.q[lang]} a={item.a[lang]} />
          ))}
        </div>
      </Section>

      {/* ── Brief / contact ──────────────────────────────────────── */}
      <Section id="brief" last>
        <SectionHead label={c.contactLabel} title={c.contactTitle} sub={c.contactSub} />
        <div style={{ maxWidth: 760 }}>
          <BriefForm />

          <div style={{ marginTop: 46, paddingTop: 26, borderTop: `1px solid ${LINE}` }}>
            <div
              style={{
                marginBottom: 16,
                fontFamily: 'var(--font-archivo), sans-serif',
                fontSize: T.micro,
                letterSpacing: TRACK.label,
                color: DIM,
              }}
            >
              {c.contactDirect.toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,4vw,42px)' }}>
              <DirectLink label="WHATSAPP" value={CONTACT.waDisplay} href={waLink(COPY[lang].inno.form.greeting)} />
              <DirectLink label="EMAIL" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <DirectLink label="INSTAGRAM" value={CONTACT.instagramHandle} href={CONTACT.instagram} />
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

/* ── Layout helpers ────────────────────────────────────────────────── */

function Section({ children, id, last }: { children: React.ReactNode; id?: string; last?: boolean }) {
  return (
    <section
      id={id}
      style={{
        // scroll-margin keeps anchored sections clear of the fixed 58px header
        scrollMarginTop: 78,
        padding: `clamp(64px,9vw,104px) 0 ${last ? 'clamp(72px,10vw,120px)' : '0'}`,
      }}
    >
      <div style={{ padding: PAD, maxWidth: MAX, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 18,
        fontFamily: 'var(--font-archivo), sans-serif',
        fontSize: T.micro,
        letterSpacing: TRACK.wide,
        color: DIM,
      }}
    >
      {children}
    </div>
  )
}

function SectionHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 38 }}>
      <Kicker>{label}</Kicker>
      <h2
        style={{
          margin: '0 0 12px',
          fontFamily: 'var(--font-cinzel), serif',
          fontWeight: 700,
          fontSize: 'clamp(28px,5vw,54px)',
          lineHeight: 1.02,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            margin: 0,
            maxWidth: 560,
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.body,
            lineHeight: 1.7,
            color: C.body,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

/* ── Cards ─────────────────────────────────────────────────────────── */

function ServiceCard({ s, lang }: { s: ServiceItem; lang: 'id' | 'en' }) {
  const [h, setH] = useState(false)
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        border: `1px solid ${h ? '#fff' : LINE}`,
        padding: 28,
        height: '100%',
        transition: 'border-color 0.12s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.label, color: DIM }}>
          {s.num}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.micro,
            letterSpacing: TRACK.label,
            color: SILVER,
            border: `1px solid ${LINE}`,
            padding: '3px 8px',
          }}
        >
          {s.ratio}
        </span>
      </div>
      <h3
        style={{
          margin: '0 0 11px',
          fontFamily: 'var(--font-cinzel), serif',
          fontWeight: 600,
          fontSize: 'clamp(19px,2.4vw,25px)',
          color: '#fff',
        }}
      >
        {s.title[lang]}
      </h3>
      <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.item, lineHeight: 1.7, color: C.body }}>
        {s.desc[lang]}
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: `1px solid ${LINE}` }}>
        {s.includes.map(inc => (
          <li
            key={inc.en}
            style={{
              padding: '9px 0',
              borderBottom: `1px solid ${LINE}`,
              fontFamily: 'var(--font-archivo), sans-serif',
              fontSize: T.meta,
              lineHeight: 1.5,
              color: C.body,
            }}
          >
            <span style={{ color: SILVER, marginRight: 9 }}>✦</span>
            {inc[lang]}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TierCard({
  t,
  lang,
  featuredLabel,
  pickLabel,
  greeting,
}: {
  t: TierItem
  lang: 'id' | 'en'
  featuredLabel: string
  pickLabel: string
  greeting: string
}) {
  const [h, setH] = useState(false)
  // STUDIO is quoted, not listed, so it carries a price with no billing unit.
  const priceLabel = t.unit ? `${t.price} ${t.unit[lang]}` : t.price
  const msg = `${greeting}\n\n${lang === 'id' ? 'Paket' : 'Package'}: ${t.name} (${priceLabel})`

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${t.featured ? SILVER : LINE}`,
        padding: '32px 26px 26px',
        background: t.featured ? '#060606' : 'transparent',
        height: '100%',
      }}
    >
      {t.featured && (
        <div
          style={{
            position: 'absolute',
            top: -1,
            left: -1,
            padding: '5px 11px',
            background: SILVER,
            color: '#000',
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.micro,
            fontWeight: 700,
            letterSpacing: TRACK.label,
          }}
        >
          {featuredLabel}
        </div>
      )}

      <div
        style={{
          marginTop: t.featured ? 12 : 0,
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.micro,
          letterSpacing: TRACK.wide,
          color: DIM,
        }}
      >
        {t.name}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 0 10px' }}>
        <span
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 700,
            fontSize: 'clamp(28px,4vw,40px)',
            color: '#fff',
            lineHeight: 1,
          }}
        >
          {t.price}
        </span>
        {t.unit && (
          <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.meta, color: DIM }}>{t.unit[lang]}</span>
        )}
      </div>

      <p
        style={{
          margin: '0 0 20px',
          fontFamily: 'var(--font-cormorant), serif',
          fontStyle: 'italic',
          fontSize: T.lead,
          lineHeight: 1.5,
          color: C.body,
        }}
      >
        {t.tagline[lang]}
      </p>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: `1px solid ${LINE}`, flex: 1 }}>
        {t.features.map(f => (
          <li
            key={f.en}
            style={{
              padding: '9px 0',
              borderBottom: `1px solid ${LINE}`,
              fontFamily: 'var(--font-archivo), sans-serif',
              fontSize: T.meta,
              lineHeight: 1.5,
              color: C.body,
            }}
          >
            <span style={{ color: SILVER, marginRight: 9 }}>✦</span>
            {f[lang]}
          </li>
        ))}
      </ul>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
          padding: '15px 0 20px',
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.micro,
          letterSpacing: '0.12em',
          color: C.faint,
        }}
      >
        <span>{t.turnaround[lang]}</span>
        <span>{t.revisions[lang]}</span>
      </div>

      <a
        href={waLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '13px 20px',
          background: t.featured || h ? '#fff' : 'transparent',
          color: t.featured || h ? '#000' : '#fff',
          border: '1px solid #fff',
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.micro,
          fontWeight: 600,
          letterSpacing: TRACK.button,
          textDecoration: 'none',
          transition: 'background 0.12s, color 0.12s',
        }}
      >
        {pickLabel}
      </a>
    </div>
  )
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${LINE}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '19px 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.body,
          fontWeight: 500,
          color: open ? '#fff' : '#c8c8c8',
          cursor: 'inherit',
        }}
      >
        <span>{q}</span>
        <span style={{ color: SILVER, fontSize: T.lead, flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p
          style={{
            margin: '0 0 20px',
            paddingRight: 30,
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.item,
            lineHeight: 1.8,
            color: C.body,
          }}
        >
          {a}
        </p>
      )}
    </div>
  )
}

function DirectLink({ label, value, href }: { label: string; value: string; href: string }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: T.micro, letterSpacing: TRACK.label, color: C.ghost, marginBottom: 7 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.body,
          color: h ? '#fff' : SILVER,
          borderBottom: `1px solid ${h ? '#fff' : 'transparent'}`,
          paddingBottom: 2,
          transition: 'color 0.12s, border-color 0.12s',
        }}
      >
        {value}
      </div>
    </a>
  )
}
