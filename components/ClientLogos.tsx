'use client'
import { useState } from 'react'
import Image from 'next/image'
import { T, TRACK, C } from '@/lib/type-scale'

/**
 * The row of client and brand logos that fills the hero's bottom letterbox band.
 *
 * This is not a section of its own — it is the closing band of the hero, so the
 * proof sits inside the first viewport rather than waiting for a scroll. The
 * hero renders it as its last flex child; the band's own height is what the
 * letterbox strip used to fake with a fixed 9vh.
 *
 * Two problems this component exists to solve.
 *
 * First, colour. The four marks were drawn for four different backgrounds —
 * white-on-dark, white-plus-yellow, orange, and a red block with dark outlined
 * type. Dropped onto black as-is they read as four unrelated stickers, and the
 * dark parts of the Great Wall mark disappear entirely. So every logo is forced
 * to flat white (`brightness(0) invert(1)` keeps the alpha and throws away the
 * hue), with the real artwork restored on hover. The row reads as one row; the
 * brand is still there when you point at it.
 *
 * Second, size. Their aspect ratios run from 1.48 to 3.33, so a single shared
 * height would make the wide ones tower over the square one. Heights below are
 * set for roughly equal optical area instead — height = sqrt(area / aspect) —
 * which is why no two numbers match.
 *
 * To add a client, drop a cropped PNG in public/logo/clients and add a row to
 * LOGOS. Nothing else in this file should need touching.
 */

type Client = {
  name: string
  src: string
  /** Intrinsic pixel size of the file, required by next/image. */
  w: number
  h: number
  /** Rendered height. Tuned per logo for equal optical area, not equal height. */
  height: string
}

/**
 * Every number below is 12% under the previous row — the marks were reading
 * louder than the headline they are meant to support. The `min(Xvw, Yvh)` term
 * matters as much as the cap: the band shares one viewport with the hero
 * headline, so on a short window the logos have to give height back rather than
 * push the band under the fold. On anything 900px tall or more the vw term wins
 * and the ceilings apply.
 *
 * The floors are load-bearing. Set any lower and three marks squeeze onto the
 * first phone row, leaving the fourth stranded on its own; at these values the
 * row breaks 2+2. Shrinking them freed roughly 35px on that three-logo row,
 * which is exactly what the wider `gap` below takes back — the two changes are
 * a pair, so retune them together.
 */
const LOGOS: Client[] = [
  { name: 'Alvin Witarsa Orchestra', src: '/logo/clients/alvin-witarsa-orchestra.png', w: 480, h: 325, height: 'clamp(51px,min(6.5vw,9.7vh),83px)' },
  { name: 'Behind The Blocks',       src: '/logo/clients/behind-the-blocks.png',       w: 480, h: 192, height: 'clamp(40px,min(5.1vw,7.6vh),64px)' },
  { name: 'CAK Investment Club',     src: '/logo/clients/cak-investment-club.png',     w: 480, h: 198, height: 'clamp(40px,min(5.1vw,7.7vh),65px)' },
  { name: 'Great Wall China Education Consultant', src: '/logo/clients/great-wall.png', w: 426, h: 128, height: 'clamp(29px,min(3.7vw,5.5vh),47px)' },
]

const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * @param delay Seconds before the band fades in, so it lands after the hero
 *   headline and socials have finished arriving.
 */
export function ClientLogos({ label, delay = 1.5 }: { label: string; delay?: number }) {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        background: '#000',
        borderTop: `1px solid ${C.line}`,
        // vh-weighted so the band gives height back on short laptop screens
        // instead of squeezing the headline above it.
        padding: 'clamp(14px,2.2vh,30px) clamp(20px,5vw,64px)',
        animation: `heroFade 0.9s ${EASE_OUT_EXPO} ${delay}s both`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p
          style={{
            margin: '0 0 clamp(10px,1.5vh,20px)',
            textAlign: 'center',
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: T.micro,
            letterSpacing: TRACK.wide,
            color: C.faint,
          }}
        >
          {label}
        </p>

        {/* Wraps rather than scrolls: with four logos a marquee would be motion
            for its own sake, and on a phone two rows of two beats a squeezed one. */}
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            // Wider than the marks need for breathing room alone: the floor is
            // set so a three-logo row still overflows the narrowest phone after
            // the size cut above, which is what keeps the 2+2 break.
            gap: 'clamp(42px,6.5vw,88px)',
          }}
        >
          {LOGOS.map(logo => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function LogoItem({ logo }: { logo: Client }) {
  const [hovered, setHovered] = useState(false)

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.w}
        height={logo.h}
        style={{
          height: logo.height,
          width: 'auto',
          // Flat white at rest, true artwork on hover.
          filter: hovered ? 'none' : 'brightness(0) invert(1)',
          transition: 'filter 0.2s',
        }}
      />
    </li>
  )
}
