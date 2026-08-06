export type Lang = 'id' | 'en'

export interface WallpaperItem {
  slug: string
  name: string
  red: boolean
  desc: { id: string; en: string }
}

export interface PackItem {
  slug: string
  title: string
  price: string
  lessonsN: number
  tier: { id: string; en: string }
  dur: { id: string; en: string }
  desc: { id: string; en: string }
  /** Bullet list shown on the pricing cards at /tutorials. */
  features: Array<{ id: string; en: string }>
  /** Exactly one pack should carry this — it renders as the red card. */
  featured?: boolean
}

/* ── InnoProductions ──────────────────────────────────────────────── */

export type Bi = { id: string; en: string }

export interface ServiceItem {
  slug: string
  num: string
  /** Aspect ratio badge shown on the card, e.g. '9:16'. */
  ratio: string
  title: Bi
  desc: Bi
  /** Concrete deliverables, so the client knows exactly what lands in their inbox. */
  includes: Bi[]
}

export interface TierItem {
  slug: string
  name: string
  price: string
  /** Billing unit, e.g. '/ video'. Omitted when the price is not a fixed figure. */
  unit?: Bi
  tagline: Bi
  /** Highlighted as the recommended tier. */
  featured: boolean
  features: Bi[]
  /** Working days (or SLA phrasing) shown in the tier footer. */
  turnaround: Bi
  revisions: Bi
}

export interface AddOnItem {
  slug: string
  name: Bi
  price: string
  note: Bi
}

export interface ProcessStep {
  num: string
  title: Bi
  desc: Bi
}

export interface WorkItem {
  slug: string
  /** Client-facing project label. */
  title: Bi
  category: Bi
  /** BeforeAfter still lays out either orientation; every sample is 16:9 today. */
  ratio: '9:16' | '16:9'
  /** On-screen hook text rendered into the AFTER frame. */
  hook: Bi
  /** Optional real video link; when set the card links out to it. */
  href?: string
}

export interface FaqItem {
  q: Bi
  a: Bi
}

