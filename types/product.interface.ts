export interface IProductSize {
  ean: string
  price: string | null
  price_discounted: string | null
  size: string
  stock: number
}

export interface IProductMedia {
  title?: {
    es_ES: string
  }
  url: string
}

export interface IProductColor {
  type: string
  value: string
  slug: string
  image: string
  color_name?: string
}

export interface IProductCategory {
  name: string
  slug: string
}

export interface IProduct {
  description: string
  details: []
  medias: IProductMedia[]
  name: string
  sizes: IProductSize[]
  tags: []
  variants: IProductColor[]
  delivery: string
  materials: string
  category: IProductCategory[]
  categories: string[]
  collections: string[]
  color: string
  color_type: string
  color_value: string
  in_stock: boolean
  is_discounted: boolean
  percentage: number
  price: number
  price_discounted: number
  released_at: number
  thumbnail_url: string
  slug: string
  reference: string
}

export interface ICatalogProductVariant {
  image: string
  slug: string
  type: string
  value: string
}
export interface ICatalogProduct {
  active: boolean
  categories: string[]
  color: string
  hexacode: string
  in_stock: boolean
  name: string
  objectID: string
  price: number
  price_discounted: number
  reference: string
  sizes: []
  slug: string
  thumbnail_url: string
  variants: ICatalogProductVariant[]
  released_at: number
}

export interface ICommonSize {
  ean: string
  price: string | null
  price_discounted: string | null
  size: string
  stock: number
}

export interface ICommonProduct {
  name: string
  quantity: number
  originalPrice: number
  price: number
  percentage: number
  slug: string
  id: number
  medias: {
    url: string
  }[]
  sizes?: IProductSize[]
  colors?: IProductColor[]
}

export interface ISyliusProductVariant {
  code: string
  inStock: boolean
  inventorySourceStocksOnHand: number
  originalPrice: number
  percentage: number
  price: number
  productolorGroup: []
}
export interface ISyliusProduct {
  averageRating: number
  code: string
  createdAt: string
  defaultVariant: string
  description: string | null
  id: number
  images: []
  mainTaxon: string
  name: string
  options: []
  productTaxons: string[]
  reviews: []
  shortDescription: string | null
  slug: string
  updatedAt: string
  variants: ISyliusProductVariant[]
}
