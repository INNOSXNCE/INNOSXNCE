'use client'
import { useState } from 'react'
import type { CSSProperties } from 'react'

interface WallpaperCardProps {
  idx: string
  name: string
  subtext: string
  artStyle: CSSProperties
  buyLabel: string
  onBuy: () => void
  onEnter?: () => void
  onLeave?: () => void
  subtextSize?: number
}

export function WallpaperCard({
  idx, name, subtext, artStyle, buyLabel, onBuy,
  onEnter, onLeave, subtextSize = 10,
}: WallpaperCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden bg-black"
      style={{
        aspectRatio: '9 / 16',
        border: `1px solid ${hovered ? '#fff' : '#1a1a1a'}`,
        transition: 'border-color 0.12s',
        cursor: 'inherit',
      }}
      onClick={onBuy}
      onMouseEnter={() => { setHovered(true); onEnter?.() }}
      onMouseLeave={() => { setHovered(false); onLeave?.() }}
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
        <span>✦</span>
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
    </div>
  )
}
