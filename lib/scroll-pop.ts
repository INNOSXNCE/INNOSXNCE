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

// The pop grows from POP_SCALE_FROM to 1 and rises POP_TRANSLATE_FROM px into
// place while fading in. Scale never exceeds 1 (no horizontal overflow). A
// larger from-scale = a more pronounced pop.
const POP_SCALE_FROM = 0.6
const POP_TRANSLATE_FROM = 100 // px
const POP_OPACITY_FROM = 0.2

function popScale(p: number): number {
  return POP_SCALE_FROM + (1 - POP_SCALE_FROM) * easeOutCubic(clamp01(p))
}

// Eased visual mapping of progress -> transform + opacity for the push-up pop.
export function popTransform(p: number): PopStyle {
  const e = easeOutCubic(clamp01(p))
  const translateY = POP_TRANSLATE_FROM * (1 - e)
  const opacity = POP_OPACITY_FROM + (1 - POP_OPACITY_FROM) * e
  return {
    transform: `translateY(${translateY}px) scale(${popScale(p)})`,
    opacity,
  }
}

// Because popTransform eases-out (front-loads the visual), the section looks
// essentially final well before raw progress reaches 1. Clickability must open
// while the card is still perceptibly mid-pop, NOT once it already looks final —
// otherwise a card can sit visually settled but dead while the ease-out tail
// finishes (the exact "click does nothing" seam we must avoid). A scale
// difference below ~1% is imperceptible, so the gate opens the instant the
// rendered scale reaches 0.985 (still ~1.5% small = visibly settling) — safely
// before the eye would call the card final and reach to click it. Tying the
// gate to actual scale keeps it correct if the pop range above is retuned.
const POP_SETTLE_SCALE = 0.985

export function popSettled(p: number): boolean {
  return popScale(p) >= POP_SETTLE_SCALE
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
  if (viewportW < 700) return { startFrac: 1.0, endFrac: 0.22 }
  if (viewportW < 1100) return { startFrac: 1.0, endFrac: 0.25 }
  return { startFrac: 1.0, endFrac: 0.28 }
}
