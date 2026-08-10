/**
 * One place for every text size, tracking value and grey on the site.
 *
 * Before this existed the same values were retyped inline in fourteen files,
 * which is how the site ended up with four different "small label" sizes —
 * 9px, 10px, 11px and 12px — doing the same job. Several of them were
 * unreadable, especially in grey on black.
 *
 * Two rules the numbers below encode:
 *
 * 1. Nothing goes below 13px. That is the floor for text a visitor is
 *    expected to actually read. The only exceptions are simulated interfaces —
 *    the mock phone in DevicePreview and the camera OSD inside BeforeAfter —
 *    where small type is the illustration, not the message.
 *
 * 2. Grey on black has to clear 4.5:1 for small text. The old #7a7a7a sat at
 *    roughly 4.1:1, which fails, and it was being used at 9px. Every grey here
 *    is one step lighter than what it replaced.
 *
 * Change a number here and the whole site follows.
 */

/** Font sizes, in px. */
export const T = {
  /** Floor. Corner tags, ribbons, fine print, uppercase kickers. */
  micro: 13,
  /** Metadata lines, button labels, nav items. */
  meta: 14,
  /** Dense lists — feature bullets, spec rows. */
  item: 15,
  /** Paragraphs. */
  body: 16,
  /** Hero and section lead paragraphs. */
  lead: 17,
  /** Cormorant italic pull quotes. */
  quote: 19,
} as const

/**
 * Letter spacing. Wide tracking on uppercase is a house signature, but past
 * roughly 0.2em at small sizes a word stops reading as a word and becomes
 * loose letters. These are the reduced values.
 */
export const TRACK = {
  /** Section kickers and eyebrows. Was 0.3em. */
  wide: '0.2em',
  /** Small uppercase labels and tags. Was 0.2–0.22em. */
  label: '0.16em',
  /** Button labels. */
  button: '0.14em',
  /** Body and metadata. */
  body: '0.04em',
} as const

/**
 * The palette, as inline-style-ready strings.
 *
 * These are deliberately `var(--color-…)` references rather than hex. The
 * actual values live in the `@theme` block of `app/globals.css`, which is the
 * single definition — so the CSS-only rules there (placeholder, scrollbar,
 * selection, focus ring) and the inline style objects here cannot drift apart.
 * They used to: the stylesheet was still on #7a7a7a-era greys long after this
 * file had moved off them.
 *
 * Everything resolves at paint time, so gradients, borders and box-shadows all
 * accept these unchanged. Nothing on this site paints to a canvas or writes a
 * colour into an SVG `fill` attribute, which are the two places a `var()` would
 * not resolve — if that ever changes, read the hex out of `globals.css`.
 */
export const C = {
  /* Text ladder, lightest to darkest. */
  /** Headings and key figures. */
  text: 'var(--color-text)',
  /** Paragraph copy. Was #9a9a9a. */
  body: 'var(--color-body)',
  /** Labels, kickers, metadata. Was #7a7a7a. */
  dim: 'var(--color-dim)',
  /** Fine print. Was #5a5a5a. */
  faint: 'var(--color-faint)',
  /** Decorative only — never for text a visitor must read. Was #3a3a3a. */
  ghost: 'var(--color-ghost)',

  /* Surfaces. */
  /** The page itself. */
  bg: 'var(--color-bg)',
  /** Lifted a hair off the page: the featured pricing tier, device bezels. */
  raised: 'var(--color-raised)',

  /* Rules. */
  /** Hairline rules and card edges. */
  line: 'var(--color-line)',
  /** Every bordered surface goes here on hover, in 0.12s. Not a new colour —
      naming it stops the next card from inventing its own #2a2a2a. */
  lineHover: 'var(--color-line-hover)',

  /* Accents. */
  /** InnoProductions silver: bullets, prices, step numbers, featured edge. */
  silver: 'var(--color-silver)',
  /** INNOSXNCE red. Used sparingly. */
  red: 'var(--color-red-inno)',

  /** Ink on the white-filled brief form fields — the one inverse context. */
  fieldInk: 'var(--color-field-ink)',
} as const
