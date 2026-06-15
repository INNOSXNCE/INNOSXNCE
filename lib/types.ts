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
}
