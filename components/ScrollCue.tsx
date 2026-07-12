'use client'
import { useEffect, useState } from 'react'

// A first-paint "scroll down" hint over the hero. Shows on every fresh load and
// fades out permanently the first time the user scrolls, hinting them toward the
// hero's scroll reveal. Purely additive: if it never mounts, nothing else breaks.
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
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 10,
          letterSpacing: '0.34em',
          color: '#7a7a7a',
          paddingLeft: '0.34em',
        }}
      >
        SCROLL
      </span>
      <span
        className="scrollcue-line"
        style={{
          display: 'block',
          width: 1,
          height: 26,
          background: 'linear-gradient(to bottom, #7a7a7a, transparent)',
        }}
      />
    </div>
  )
}
