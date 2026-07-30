'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { scrollProgress, popTransform, popSettled, popBand } from '@/lib/scroll-pop'

// Wraps a section's inner content in a scroll-linked scale-up / push-up "pop".
// Structure: a stable OUTER box (measured, never transformed) + a transformed
// INNER box. Measuring the outer box avoids a feedback loop where our own
// translateY would shift the element we measure.
//
// Timing is geometry-relative (see lib/scroll-pop.ts), so it adapts per screen
// size. pointer-events stay off until progress hits 1 — because the motion is
// purely scroll-linked with no post-scroll settle, progress equals 1 exactly
// when the section is framed and has stopped moving, so cards become clickable
// precisely as they settle (no dead-click window).
export function ScrollPop({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  // Safe default: fully shown + clickable. Only animates from a low value once
  // the effect confirms motion is allowed and reads real geometry.
  const [p, setP] = useState(1)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const rectTop = el.getBoundingClientRect().top
      const band = popBand(window.innerWidth)
      setP(scrollProgress(rectTop, window.innerHeight, band.startFrac, band.endFrac))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update() // set correct initial progress (already-in-view / deep-link / short viewport)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const style = popTransform(p)
  // Gate clickability on visual settle (see popSettled), not raw p===1, so cards
  // are never visually final yet unclickable.
  const settled = popSettled(p)
  return (
    <div ref={ref}>
      <div
        style={{
          transform: style.transform,
          opacity: style.opacity,
          transformOrigin: 'center',
          pointerEvents: settled ? 'auto' : 'none',
          willChange: settled ? 'auto' : 'transform, opacity',
        }}
      >
        {children}
      </div>
    </div>
  )
}
