'use client'
import { useEffect, useState } from 'react'
import { T, TRACK, C } from '@/lib/type-scale'

// A "scroll down" hint over the hero. Arrives after the hero intro has played
// and fades out permanently the first time the user scrolls, pointing them at
// the page below. Purely additive: if it never mounts, nothing else breaks.
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
      style={{
        position: 'absolute',
        bottom: 'calc(9vh + 26px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: hidden ? 0 : 1,
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease',
        // `backwards` (not `both`): the fill must hold the cue hidden during the
        // delay, then get out of the way so the scroll fade-out above can win.
        // heroCue rather than heroFade because the keyframes have to carry the
        // translateX(-50%) centering above — an animated transform replaces it.
        animation: 'heroCue 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.35s backwards',
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
          background: 'linear-gradient(to bottom, #9a9a9a, transparent)',
          // Reduced-motion is handled globally in globals.css (neutralizes all animations).
          animation: 'scrollcue 1.8s ease-in-out infinite',
        }}
      />
    </div>
  )
}
