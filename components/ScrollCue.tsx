'use client'
import { useEffect, useState } from 'react'
import { T, TRACK, C } from '@/lib/type-scale'

// A "scroll down" hint over the hero. Arrives after the hero intro has played
// and fades out permanently the first time the user scrolls, pointing them at
// the page below. Purely additive: if it never mounts, nothing else breaks.
//
// It sits in normal flow, last in the hero's headline block, rather than pinned
// to the bottom. Pinned, it claimed no height, so on a short window it printed
// straight through the social orbs above it — and with the client-logo band now
// closing the hero there is no spare lane to pin it into. In flow it competes
// for space like everything else and the collision cannot happen.
export function ScrollCue() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setHidden(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // hide immediately if the page loads already scrolled
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden
      // Dropped entirely under 760px of viewport height — see globals.css.
      className="hero-scroll-cue"
      style={{
        position: 'relative',
        zIndex: 6,
        marginTop: 'clamp(10px,2.2vh,30px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: hidden ? 0 : 1,
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease',
        // `backwards` (not `both`): the fill must hold the cue hidden during the
        // delay, then get out of the way so the scroll fade-out above can win.
        animation: 'heroFade 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.35s backwards',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: T.micro,
          letterSpacing: '0.34em',
          color: C.dim,
          paddingLeft: '0.34em',
        }}
      >
        SCROLL
      </span>
      <span
        style={{
          display: 'block',
          width: 1,
          height: 26,
          background: `linear-gradient(to bottom, ${C.dim}, transparent)`,
          // Reduced-motion is handled globally in globals.css (neutralizes all animations).
          animation: 'scrollcue 1.8s ease-in-out infinite',
        }}
      />
    </div>
  )
}
