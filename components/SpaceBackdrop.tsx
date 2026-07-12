'use client'
import { useRef } from 'react'

// Tiled SVG star fields, one per depth layer (same data-URI idiom as NoiseOverlay).
const STARS_FAR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cg fill='white'%3E%3Ccircle cx='23' cy='41' r='0.7' opacity='0.5'/%3E%3Ccircle cx='91' cy='18' r='0.6' opacity='0.4'/%3E%3Ccircle cx='150' cy='66' r='0.7' opacity='0.55'/%3E%3Ccircle cx='204' cy='29' r='0.5' opacity='0.4'/%3E%3Ccircle cx='255' cy='88' r='0.6' opacity='0.45'/%3E%3Ccircle cx='36' cy='132' r='0.6' opacity='0.4'/%3E%3Ccircle cx='118' cy='161' r='0.7' opacity='0.5'/%3E%3Ccircle cx='232' cy='150' r='0.5' opacity='0.35'/%3E%3Ccircle cx='65' cy='216' r='0.6' opacity='0.45'/%3E%3Ccircle cx='176' cy='242' r='0.7' opacity='0.5'/%3E%3Ccircle cx='263' cy='224' r='0.5' opacity='0.4'/%3E%3Ccircle cx='12' cy='262' r='0.6' opacity='0.45'/%3E%3C/g%3E%3C/svg%3E\")"

const STARS_MID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cg fill='white'%3E%3Ccircle cx='31' cy='52' r='1.1' opacity='0.6'/%3E%3Ccircle cx='117' cy='23' r='1' opacity='0.5'/%3E%3Ccircle cx='201' cy='74' r='1.2' opacity='0.65'/%3E%3Ccircle cx='58' cy='141' r='1' opacity='0.55'/%3E%3Ccircle cx='162' cy='128' r='1.1' opacity='0.6'/%3E%3Ccircle cx='226' cy='183' r='1' opacity='0.5'/%3E%3Ccircle cx='94' cy='208' r='1.2' opacity='0.6'/%3E%3Ccircle cx='19' cy='224' r='1' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E\")"

const STARS_NEAR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cg fill='white'%3E%3Ccircle cx='44' cy='36' r='1.6' opacity='0.8'/%3E%3Ccircle cx='140' cy='61' r='1.4' opacity='0.7'/%3E%3Ccircle cx='23' cy='124' r='1.5' opacity='0.75'/%3E%3Ccircle cx='172' cy='151' r='1.7' opacity='0.85'/%3E%3Ccircle cx='96' cy='182' r='1.4' opacity='0.7'/%3E%3C/g%3E%3C/svg%3E\")"

// Max mouse-parallax shift in px for the nearest layer; deeper layers scale down.
const MAX_SHIFT = 8

export function SpaceBackdrop() {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])

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
      <div ref={el => { layerRefs.current[0] = el }} style={layerStyle(STARS_FAR, 0.55)}>
        <div style={shootingStarStyle} />
      </div>
      <div ref={el => { layerRefs.current[1] = el }} style={layerStyle(STARS_MID, 0.65)}>
        <Planet size={12} top="64%" left="82%" tint="#46586a" delay="-30s" />
      </div>
      <div ref={el => { layerRefs.current[2] = el }} style={layerStyle(STARS_NEAR, 0.75)}>
        <Planet size={18} top="22%" left="11%" tint="#6a4a44" delay="0s" />
        <Planet size={7} top="38%" left="76%" tint="#c83232" delay="-55s" />
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
