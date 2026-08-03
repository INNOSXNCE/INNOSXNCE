'use client'
import { useState } from 'react'
import type { CSSProperties } from 'react'

interface WallpaperCardProps {
  idx: string
  name: string
  subtext: string
  artStyle: CSSProperties
  buyLabel: string
  /** Product URL on the storefront. Build it with productLink() from lib/data. */
  href: string
  onEnter?: () => void
  onLeave?: () => void
  subtextSize?: number
}

export function WallpaperCard({
  idx, name, subtext, artStyle, buyLabel, href,
  onEnter, onLeave, subtextSize = 10,
}: WallpaperCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    // A real anchor, not a clickable <div>: middle-click and cmd/ctrl-click open
    // a new tab, the card is reachable by keyboard, and search engines can
    // finally see the product URLs.
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden bg-black"
      style={{
        aspectRatio: '9 / 16',
        border: `1px solid ${hovered ? '#fff' : '#1a1a1a'}`,
        transition: 'border-color 0.12s',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={() => { setHovered(true); onEnter?.() }}
      onMouseLeave={() => { setHovered(false); onLeave?.() }}
      // Keyboard focus gets the same white border as hover, so tabbing through
      // the grid reads the same as pointing at it.
      onFocus={() => { setHovered(true); onEnter?.() }}
      onBlur={() => { setHovered(false); onLeave?.() }}
    >
      {/* CSS art background */}
      <div style={artStyle} />

      {/* Top meta */}
      <div
        className="absolute top-3 left-3 right-3 flex justify-between"
        style={{
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.5)',
          zIndex: 2,
        }}
      >
        <span>{idx}</span>
        <span aria-hidden>✦</span>
      </div>

      {/* Bottom info */}
      <div className="absolute left-[14px] right-[14px] bottom-[14px]" style={{ zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 700,
            fontSize: 'clamp(18px,2vw,26px)',
            color: '#fff',
            letterSpacing: '0.04em',
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: subtextSize,
            letterSpacing: '0.18em',
            color: '#8a8a8a',
            marginTop: 4,
            lineHeight: subtextSize > 10 ? 1.5 : undefined,
          }}
        >
          {subtext}
        </div>
      </div>

      {/* Hover buy overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/45 transition-opacity duration-[120ms]"
        style={{ zIndex: 3, opacity: hovered ? 1 : 0 }}
      >
        <span
          style={{
            border: '1px solid #fff',
            padding: '8px 16px',
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 11,
            letterSpacing: '0.2em',
            color: '#fff',
          }}
        >
          {buyLabel}
        </span>
      </div>
    </a>
  )
}
