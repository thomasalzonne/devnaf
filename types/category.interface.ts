export interface ICategorySeo {
  title?: string
  description?: string
}

export interface ICategoryMedia {
  cover?: string
  thumbnail?: string
  social?: string
}

export default interface ICategory {
  title: string
  slug: string
  content: string
  seo?: ICategorySeo
  media?: ICategoryMedia
  is_new_category: boolean
}
