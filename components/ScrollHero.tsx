'use client'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

// Total scroll distance devoted to the hero scrub, in viewport-heights.
const SPACER_VH = 280

// Survives client-side route changes but resets on a full page load,
// so the intro plays once per visit and re-plays when iterating locally.
let latchedThisPageLoad = false

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v))
}

// Maps overall scrub progress to one word's reveal amount.
// Words reveal sequentially; each fades in over the first 70% of its segment.
export function wordReveal(progress: number, index: number, total: number): number {
  const segment = 1 / total
  const start = index * segment
  return clamp01((progress - start) / (segment * 0.7))
}

export function ScrollHero({ children }: {
  children: (progress: number, latched: boolean) => ReactNode
}) {
  const [progress, setProgress] = useState(latchedThisPageLoad ? 1 : 0)
  const [latched, setLatched] = useState(latchedThisPageLoad)
  const wrapRef = useRef<HTMLDivElement>(null)
  const latchedByScrollRef = useRef(false)

  useEffect(() => {
    if (latchedThisPageLoad) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      latchedThisPageLoad = true
      // Deferred a tick (nested callback, not a direct effect-body call) to satisfy
      // react-hooks/set-state-in-effect; runs before the next paint either way, so
      // the "render final state instantly, no pin" requirement is unaffected.
      queueMicrotask(() => {
        setProgress(1)
        setLatched(true)
      })
      return
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current
        if (!el) return
        const scrollable = el.offsetHeight - window.innerHeight
        const passed = -el.getBoundingClientRect().top
        const p = scrollable <= 0 ? 1 : clamp01(passed / scrollable)
        setProgress(p)
        if (p >= 1) {
          latchedThisPageLoad = true
          latchedByScrollRef.current = true
          setLatched(true)
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // handles restored/deep-linked scroll positions on mount
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // The spacer collapses from SPACER_VH to the hero's natural 100vh when
  // latching; shift scroll by the removed height in the same frame so the
  // viewport does not visibly jump.
  useLayoutEffect(() => {
    if (!latched || !latchedByScrollRef.current) return
    const removed = (window.innerHeight * (SPACER_VH - 100)) / 100
    window.scrollBy(0, -removed)
  }, [latched])

  if (latched) return <>{children(1, true)}</>

  return (
    <div ref={wrapRef} style={{ height: `${SPACER_VH}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {children(progress, false)}
      </div>
    </div>
  )
}
