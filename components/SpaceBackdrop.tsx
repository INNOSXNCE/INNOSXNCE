'use client'
import { useEffect, useRef } from 'react'
import { C } from '@/lib/type-scale'

/**
 * Tiled star fields, one per depth layer (same data-URI idiom as NoiseOverlay).
 *
 * These used to be plain <circle> dots. They are now the INNOSXNCE eight-point
 * mark, so the backdrop and the logo are the same shape. The mark is drawn as a
 * path rather than the PNG in public/logo, because a tiled background-image
 * repeats on a fixed grid — it can't scatter stars at different positions,
 * sizes and opacities the way the field needs.
 *
 * Inner/outer radius ratio is traced from the source art. Radii run larger than
 * the dots they replaced: a star's thin points cover far less area than a
 * circle of the same radius, so matching the old visual weight takes about
 * twice the size.
 */
const STAR_PATH = (() => {
  const inner = 0.3
  const pts: string[] = []
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? 1 : inner
    const a = (Math.PI / 8) * i - Math.PI / 2
    pts.push(`${(Math.cos(a) * r).toFixed(3)},${(Math.sin(a) * r).toFixed(3)}`)
  }
  return `M${pts.join('L')}Z`
})()

/** x, y, radius, opacity. */
type Star = [number, number, number, number]

function starField(size: number, stars: Star[]): string {
  const shapes = stars
    .map(([x, y, r, o]) => `<path d='${STAR_PATH}' transform='translate(${x} ${y}) scale(${r})' opacity='${o}'/>`)
    .join('')
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<g fill='white'>${shapes}</g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

const STARS_FAR = starField(280, [
  [23, 41, 1.6, 0.5], [91, 18, 1.4, 0.4], [150, 66, 1.6, 0.55], [204, 29, 1.2, 0.4],
  [255, 88, 1.4, 0.45], [36, 132, 1.4, 0.4], [118, 161, 1.6, 0.5], [232, 150, 1.2, 0.35],
  [65, 216, 1.4, 0.45], [176, 242, 1.6, 0.5], [263, 224, 1.2, 0.4], [12, 262, 1.4, 0.45],
])

const STARS_MID = starField(240, [
  [31, 52, 2.4, 0.6], [117, 23, 2.2, 0.5], [201, 74, 2.6, 0.65], [58, 141, 2.2, 0.55],
  [162, 128, 2.4, 0.6], [226, 183, 2.2, 0.5], [94, 208, 2.6, 0.6], [19, 224, 2.2, 0.5],
])

const STARS_NEAR = starField(200, [
  [44, 36, 3.5, 0.8], [140, 61, 3.1, 0.7], [23, 124, 3.3, 0.75],
  [172, 151, 3.7, 0.85], [96, 182, 3.1, 0.7],
])

// Max mouse-parallax shift in px for the nearest layer; deeper layers scale down.
const MAX_SHIFT = 8

// Per-layer parallax depth: far moves least, near moves most.
const LAYER_DEPTHS = [0.25, 0.6, 1]

export function SpaceBackdrop() {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reduce || !finePointer) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let raf = 0
    let running = false

    // Lerp toward the cursor each frame so movement feels drifty, not twitchy.
    const step = () => {
      current.x += (target.x - current.x) * 0.06
      current.y += (target.y - current.y) * 0.06
      layerRefs.current.forEach((el, i) => {
        if (!el) return
        const shift = LAYER_DEPTHS[i] * MAX_SHIFT
        el.style.transform = `translate3d(${current.x * shift}px, ${current.y * shift}px, 0)`
      })
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
      if (!running) {
        running = true
        raf = requestAnimationFrame(step)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const layerStyle = (image: string, opacity: number): React.CSSProperties => ({
    // Oversized so parallax translation never exposes an edge.
    position: 'absolute',
    inset: -MAX_SHIFT * 2,
    backgroundImage: image,
    opacity,
  })

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <div ref={el => { layerRefs.current[0] = el }} style={layerStyle(STARS_FAR, 0.41)}>
        <div style={shootingStarStyle} />
      </div>
      <div ref={el => { layerRefs.current[1] = el }} style={layerStyle(STARS_MID, 0.49)}>
        <Planet size={12} top="64%" left="82%" tint="#46586a" delay="-30s" />
      </div>
      <div ref={el => { layerRefs.current[2] = el }} style={layerStyle(STARS_NEAR, 0.56)}>
        <Planet size={18} top="22%" left="11%" tint="#6a4a44" delay="0s" />
        <Planet size={7} top="38%" left="76%" tint={C.red} delay="-55s" />
      </div>
    </div>
  )
}

function Planet({ size, top, left, tint, delay }: {
  size: number
  top: string
  left: string
  tint: string
  delay: string
}) {
  return (
    <div
      style={{
        position: 'absolute', top, left,
        width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle at 35% 32%, ${tint}, #0a0a0a 72%)`,
        opacity: 0.55,
        animation: 'planetDrift 90s ease-in-out infinite alternate',
        animationDelay: delay,
      }}
    />
  )
}

const shootingStarStyle: React.CSSProperties = {
  position: 'absolute', top: '16%', left: '72%',
  width: 90, height: 1,
  background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
  animation: 'shoot 26s linear infinite',
  opacity: 0,
}
