'use client'
import { useState } from 'react'
import type { CSSProperties } from 'react'

interface PackCardProps {
  num: string
  tier: string
  title: string
  desc: string
  lessons: string
  dur: string
  price: string
  takeLabel: string
  artStyle: CSSProperties
  onTake: () => void
}

export function PackCard({ num, tier, title, desc, lessons, dur, price, takeLabel, artStyle, onTake }: PackCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col bg-black"
      style={{
        border: `1px solid ${hovered ? '#fff' : '#1a1a1a'}`,
        transition: 'border-color 0.12s',
        cursor: 'inherit',
      }}
      onClick={onTake}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Art */}
      <div style={artStyle}>
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 16,
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 10,
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          PACK {num}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            fontSize: 44,
            color: 'rgba(255,255,255,0.18)',
          }}
        >
          ✦
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1" style={{ padding: 22 }}>
        <div className="flex justify-between items-center">
          <span style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 10, letterSpacing: '0.24em', color: '#7a7a7a' }}>
            {tier}
          </span>
          <span style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 10, letterSpacing: '0.1em', color: '#444' }}>
            {num}
          </span>
        </div>

        <h3
          className="m-0"
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 700,
            fontSize: 'clamp(22px,2.4vw,30px)',
            color: '#fff',
          }}
        >
          {title}
        </h3>

        <p
          className="m-0 flex-1"
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 13,
            lineHeight: 1.65,
            color: '#9a9a9a',
          }}
        >
          {desc}
        </p>

        <div
          className="flex gap-3"
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 11,
            letterSpacing: '0.06em',
            color: '#7a7a7a',
            borderTop: '1px solid #141414',
            paddingTop: 14,
          }}
        >
          <span>{lessons}</span>
          <span style={{ color: '#333' }}>·</span>
          <span>{dur}</span>
        </div>

        <div className="flex justify-between items-center" style={{ marginTop: 2 }}>
          <span style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: 20, color: '#fff' }}>
            {price}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: 12,
              letterSpacing: '0.16em',
              color: '#fff',
              borderBottom: '1px solid #c83232',
              paddingBottom: 2,
            }}
          >
            {takeLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
