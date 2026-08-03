'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { WorkItem } from '@/lib/types'

/**
 * Before/after comparison slider for the InnoProductions showcase.
 *
 * Until real client footage exists, both halves are rendered as CSS-composed
 * mock frames: the BEFORE side is flat, desaturated and bare (an ungraded
 * camera file), the AFTER side is graded, captioned and finished. Swapping in
 * real media later is a two-line change — drop <video>/<img> into the two
 * `Frame` slots and keep the wrapper as-is.
 *
 * Interaction: pointer drag anywhere on the surface, plus a focusable
 * ARIA slider handle driven by the arrow / Home / End keys, so the component
 * is usable without a mouse.
 */

const SILVER = '#d4d4d4'
const DIM = '#7a7a7a'

interface Props {
  work: WorkItem
  lang: 'id' | 'en'
  beforeLabel: string
  afterLabel: string
}

export function BeforeAfter({ work, lang, beforeLabel, afterLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.width === 0) return
    const next = ((clientX - r.left) / r.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  // Pointer move/up are bound to the window (not the element) so a drag that
  // travels outside the frame keeps tracking and always releases cleanly.
  useEffect(() => {
    if (!dragging) return
    const move = (e: PointerEvent) => {
      e.preventDefault()
      setFromClientX(e.clientX)
    }
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [dragging, setFromClientX])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(p => Math.max(0, p - step)) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos(p => Math.min(100, p + step)) }
    else if (e.key === 'Home') { e.preventDefault(); setPos(0) }
    else if (e.key === 'End') { e.preventDefault(); setPos(100) }
  }

  const vertical = work.ratio === '9:16'
  const hookLines = work.hook[lang].split('\n')

  return (
    <div>
      <div
        ref={wrapRef}
        onPointerDown={e => {
          // Only the primary button starts a drag; ignore right/middle clicks.
          if (e.button !== 0) return
          setDragging(true)
          setFromClientX(e.clientX)
        }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: vertical ? '9 / 16' : '16 / 9',
          overflow: 'hidden',
          border: '1px solid #1a1a1a',
          background: '#000',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {/* AFTER — full bleed underneath, revealed as the divider moves left */}
        <AfterFrame
          hookLines={hookLines}
          vertical={vertical}
          caption={lang === 'id' ? 'SUBTITLE TER-SYNC' : 'SYNCED SUBTITLES'}
        />

        {/* BEFORE — clipped to the left of the divider */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
          }}
        >
          <BeforeFrame />
        </div>

        {/* Corner labels */}
        <Tag side="left" text={beforeLabel} muted />
        <Tag side="right" text={afterLabel} />

        {/* Divider */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${pos}%`,
            width: 1,
            background: '#fff',
            transform: 'translateX(-0.5px)',
            pointerEvents: 'none',
          }}
        />

        {/* Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          onPointerDown={e => {
            e.stopPropagation()
            if (e.button !== 0) return
            setDragging(true)
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pos}%`,
            transform: 'translate(-50%, -50%)',
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.75)',
            border: '1px solid #fff',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            color: '#fff',
            fontSize: 9,
            letterSpacing: '0.05em',
            cursor: 'inherit',
          }}
        >
          <span>◀</span>
          <span>▶</span>
        </div>
      </div>

      {/* Caption */}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              fontWeight: 600,
              fontSize: 16,
              color: '#fff',
              letterSpacing: '0.04em',
            }}
          >
            {work.title[lang]}
          </div>
          <div
            style={{
              marginTop: 5,
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: 10,
              letterSpacing: '0.2em',
              color: DIM,
            }}
          >
            {work.category[lang]}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 10,
            letterSpacing: '0.14em',
            color: '#3a3a3a',
            whiteSpace: 'nowrap',
          }}
        >
          {Math.round(pos)}%
        </div>
      </div>
    </div>
  )
}

/* ── Frames ────────────────────────────────────────────────────────── */

function BeforeFrame() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(158deg, #2a2a2c 0%, #37373a 42%, #232325 100%)',
        filter: 'saturate(0.25) contrast(0.82) brightness(0.86)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Flat subject mass — an unlit, uncomposed frame */}
      <div
        style={{
          width: '46%',
          height: '38%',
          background: 'linear-gradient(180deg, #45454a 0%, #303034 100%)',
          borderRadius: '46% 46% 38% 38%',
          opacity: 0.72,
        }}
      />
      {/* Camera OSD */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 9,
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        ● REC 00:00:00:00
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 9,
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        A001_C007.MP4
      </div>
    </div>
  )
}

function AfterFrame({
  hookLines,
  vertical,
  caption,
}: {
  hookLines: string[]
  vertical: boolean
  caption: string
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(158deg, #0d0d10 0%, #1e1f26 38%, #0a0a0c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Graded key light */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          width: '78%',
          height: '52%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      {/* Subject, now shaped and separated */}
      <div
        style={{
          width: '46%',
          height: '38%',
          background: 'linear-gradient(180deg, #f2f2f2 0%, #8f9096 62%, #3a3b42 100%)',
          borderRadius: '46% 46% 38% 38%',
          boxShadow: '0 0 60px rgba(255,255,255,0.12)',
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* Burned-in hook */}
      <div
        style={{
          position: 'absolute',
          top: vertical ? '9%' : '11%',
          left: 0,
          right: 0,
          textAlign: 'center',
          padding: '0 8%',
          fontFamily: 'var(--font-cinzel), serif',
          fontWeight: 700,
          fontSize: vertical ? 'clamp(18px,4.4vw,30px)' : 'clamp(13px,2vw,22px)',
          lineHeight: 1.08,
          letterSpacing: '0.06em',
          color: '#fff',
          textShadow: '0 2px 18px rgba(0,0,0,0.85)',
        }}
      >
        {hookLines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>

      {/* Caption bar */}
      <div
        style={{
          position: 'absolute',
          bottom: vertical ? '17%' : '19%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '5px 11px',
          background: 'rgba(255,255,255,0.94)',
          color: '#000',
          fontFamily: 'var(--font-manrope), sans-serif',
          fontWeight: 700,
          fontSize: vertical ? 11 : 10,
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        {caption}
      </div>

      {/* Waveform — sound design pass */}
      <div
        style={{
          position: 'absolute',
          bottom: vertical ? '9%' : '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 2,
          height: 16,
          opacity: 0.65,
        }}
      >
        {[4, 9, 14, 7, 16, 11, 5, 13, 8, 15, 6, 10].map((h, i) => (
          <div key={i} style={{ width: 2, height: h, background: SILVER }} />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, height: 2, background: 'rgba(255,255,255,0.18)' }}>
        <div style={{ width: '38%', height: '100%', background: '#fff' }} />
      </div>
    </div>
  )
}

function Tag({ side, text, muted }: { side: 'left' | 'right'; text: string; muted?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: side === 'left' ? 12 : undefined,
        right: side === 'right' ? 12 : undefined,
        padding: '4px 9px',
        background: 'rgba(0,0,0,0.62)',
        border: `1px solid ${muted ? '#333' : 'rgba(255,255,255,0.5)'}`,
        fontFamily: 'var(--font-manrope), sans-serif',
        fontSize: 9,
        letterSpacing: '0.22em',
        color: muted ? DIM : '#fff',
        pointerEvents: 'none',
      }}
    >
      {text}
    </div>
  )
}
