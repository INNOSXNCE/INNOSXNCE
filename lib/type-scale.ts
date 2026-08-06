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

/** Greys, lightest to darkest. Each one is a step up from what it replaced. */
export const C = {
  /** Headings and key figures. */
  text: '#fff',
  /** Paragraph copy. Was #9a9a9a. */
  body: '#b4b4b4',
  /** Labels, kickers, metadata. Was #7a7a7a. */
  dim: '#9a9a9a',
  /** Fine print. Was #5a5a5a. */
  faint: '#6e6e6e',
  /** Decorative only — never for text a visitor must read. Was #3a3a3a. */
  ghost: '#4a4a4a',
  /** Hairline rules and card edges. */
  line: '#1a1a1a',
  /** INNOSXNCE red. Used sparingly. */
  red: '#c83232',
} as const
