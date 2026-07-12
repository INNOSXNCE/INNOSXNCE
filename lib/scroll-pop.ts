// Pure, dependency-free math for the scroll-linked "pop" on card sections.
// No React, no DOM — kept isolated so it is unit-testable with `node --test`.

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v))
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Progress of a section's rise through the viewport, computed from geometry
// rather than a fixed pixel distance so it adapts to every screen size.
//   rectTop:   section top in px relative to the viewport (getBoundingClientRect().top)
//   viewportH: window.innerHeight
//   startFrac: fraction of viewportH where the pop begins (top at bottom edge -> 1.0)
//   endFrac:   fraction of viewportH where the pop is fully settled
// Returns 0 at/below the start line, 1 at/above the end line, linear between.
export function scrollProgress(
  rectTop: number,
  viewportH: number,
  startFrac: number,
  endFrac: number,
): number {
  if (viewportH <= 0) return 1
  const start = startFrac * viewportH
  const end = endFrac * viewportH
  const span = start - end
  if (span <= 0) return 1
  return clamp01((start - rectTop) / span)
}

export interface PopStyle {
  transform: string
  opacity: number
}

// Eased visual mapping of progress -> transform + opacity for the push-up pop.
export function popTransform(p: number): PopStyle {
  const e = easeOutCubic(clamp01(p))
  const scale = 0.86 + 0.14 * e
  const translateY = 40 * (1 - e)
  const opacity = 0.4 + 0.6 * e
  return {
    transform: `translateY(${translateY}px) scale(${scale})`,
    opacity,
  }
}

export interface PopBand {
  startFrac: number
  endFrac: number
}

// Per-width start/end fractions for the pop. Smaller screens stack the cards,
// so the first card sits high in the section; finishing the pop earlier in the
// rise (a smaller endFrac = higher settle point) keeps cards clickable by the
// time the user's cursor arrives. These are STARTING values — tuned in-browser
// in Task 5 at ~390 / 768 / 1440 px widths.
export function popBand(viewportW: number): PopBand {
  if (viewportW < 700) return { startFrac: 1.0, endFrac: 0.34 }
  if (viewportW < 1100) return { startFrac: 1.0, endFrac: 0.42 }
  return { startFrac: 1.0, endFrac: 0.5 }
}
