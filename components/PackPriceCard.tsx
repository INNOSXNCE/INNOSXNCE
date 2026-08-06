'use client'
import { useState } from 'react'
import type { Lang, PackItem } from '@/lib/types'
import { T, TRACK, C } from '@/lib/type-scale'

/**
 * Pricing card for the classes page.
 *
 * Structure follows the reference layout — label, title, price, meta, feature
 * list, full-width CTA — but the visual language stays house: sharp corners,
 * square buttons, and the ✦ bullet instead of a check glyph. One pack carries
 * `featured` and renders as a solid #c83232 block; everything else is black
 * with a hairline that goes white on hover, matching the rest of the site.
 *
 * Kept separate from PackCard, which is still used on the home page where the
 * cards lead with art rather than price.
 */

const RED = C.red
const LINE = C.line
const DIM = C.dim

interface Props {
  pack: PackItem
  num: string
  lang: Lang
  packLabel: string
  takeLabel: string
  href: string
}

export function PackPriceCard({ pack, num, lang, packLabel, takeLabel, href }: Props) {
  const [hovered, setHovered] = useState(false)
  const feat = !!pack.featured

  // On the red card the muted greys would drop below readable contrast, so the
  // whole secondary ramp switches to white at reduced alpha.
  const label = feat ? 'rgba(255,255,255,0.78)' : DIM
  const meta = feat ? 'rgba(255,255,255,0.82)' : DIM
  const item = feat ? 'rgba(255,255,255,0.94)' : C.body
  const bullet = feat ? '#fff' : RED
  const hair = feat ? 'rgba(255,255,255,0.24)' : LINE

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        height: '100%',
        padding: 'clamp(24px,3vw,34px)',
        background: feat ? RED : '#000',
        border: `1px solid ${hovered ? '#fff' : feat ? RED : LINE}`,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.12s',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.micro,
          letterSpacing: TRACK.label,
          textTransform: 'uppercase',
          color: label,
        }}
      >
        {packLabel} {num} · {pack.tier[lang]}
      </div>

      <h3
        style={{
          margin: '16px 0 0',
          fontFamily: 'var(--font-cinzel), serif',
          fontWeight: 700,
          fontSize: 'clamp(22px,2.7vw,31px)',
          lineHeight: 1.05,
          color: '#fff',
        }}
      >
        {pack.title}
      </h3>

      <div
        style={{
          margin: '20px 0 0',
          fontFamily: 'var(--font-cinzel), serif',
          fontWeight: 700,
          fontSize: 'clamp(32px,4.2vw,46px)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: '#fff',
        }}
      >
        {pack.price}
      </div>

      <div
        style={{
          marginTop: 10,
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.meta,
          letterSpacing: TRACK.body,
          color: meta,
        }}
      >
        {pack.lessonsN} {lang === 'id' ? 'pelajaran' : 'lessons'} · {pack.dur[lang]}
      </div>

      {/* flex:1 pushes the CTA to the bottom so all three cards align */}
      <ul
        style={{
          flex: 1,
          listStyle: 'none',
          margin: '26px 0 0',
          padding: '22px 0 0',
          borderTop: `1px solid ${hair}`,
        }}
      >
        {pack.features.map(f => (
          <li
            key={f.en}
            style={{
              display: 'flex',
              gap: 11,
              padding: '7px 0',
              fontFamily: 'var(--font-archivo), sans-serif',
              fontSize: T.item,
              lineHeight: 1.5,
              color: item,
            }}
          >
            <span aria-hidden style={{ color: bullet, flexShrink: 0, fontSize: T.micro, lineHeight: 1.7 }}>
              ✦
            </span>
            {f[lang]}
          </li>
        ))}
      </ul>

      <span
        style={{
          display: 'block',
          marginTop: 28,
          padding: '14px 20px',
          textAlign: 'center',
          background: hovered ? 'transparent' : '#fff',
          color: hovered ? '#fff' : feat ? RED : '#000',
          border: '1px solid #fff',
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.meta,
          fontWeight: 600,
          letterSpacing: TRACK.button,
          transition: 'background 0.12s, color 0.12s',
        }}
      >
        {takeLabel}
      </span>
    </a>
  )
}
