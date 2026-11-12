export type Lang = 'ru' | 'kz'

/** A string available in both site languages. */
export type Text = Record<Lang, string>

export type RegionId = 'almaty' | 'south' | 'north' | 'west' | 'capital'

export interface Destination {
  id: string
  name: Text
  region: RegionId
  short: Text
  description: Text
  images: string[]
  highlights: Text[]
  bestTime: Text
  fromCity: Text
  duration: Text
}

export type Difficulty = 1 | 2 | 3

export interface Tour {
  id: string
  title: Text
  summary: Text
  route: Text
  days: number
  price: number
  difficulty: Difficulty
  image: string
  includes: Text[]
  season: 'summer' | 'all' | 'winter'
}

export type GalleryCategory = 'mountains' | 'lakes' | 'steppe' | 'culture' | 'cities'

export interface Photo {
  src: string
  title: Text
  category: GalleryCategory
}

export interface Faq {
  q: Text
  a: Text
}
