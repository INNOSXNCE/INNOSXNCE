import Image from 'next/image'

/**
 * The INNOSXNCE eight-point mark, standing in for the ✦ glyph it replaced.
 *
 * The glyph was doing brand work in eight places — header, footer, both card
 * types, the community tiles and the innoproductions feature lists — but it is
 * a typeface character, so it rendered differently on every platform. This is
 * the real logo instead.
 *
 * The source art is white with a glow baked into its alpha, so tone is set with
 * `opacity`, not `color`. The two places that used a coloured ✦ (red on the
 * community tiles, silver on innoproductions) therefore render white. Recolouring
 * would mean a CSS mask or an SVG trace rather than a plain <Image>.
 *
 * Sizes here run larger than the font-size they replace: a glyph's ink fills
 * about half its em box, and the mark's thin points need the extra room to read
 * as a star rather than a smudge.
 */
export function StarMark({
  size,
  opacity = 1,
  priority = false,
  style,
}: {
  /** Box width and height in px. */
  size: number
  opacity?: number
  /** Set on the header mark so it doesn't lazy-load into view after paint. */
  priority?: boolean
  style?: React.CSSProperties
}) {
  return (
    <Image
      src="/logo/innosxnce-star.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      priority={priority}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        opacity,
        ...style,
      }}
    />
  )
}
