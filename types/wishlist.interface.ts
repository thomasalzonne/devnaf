/* eslint-disable no-use-before-define */
import { IHydraDefault } from './hydra.interface'
import { IProductMedia } from './product.interface'

export interface IWishlistShopUser extends IHydraDefault {
  id: number
  email: string
}

export interface IWishlistProductInnerVariant {
  code: string
  ean: string
  id: number
  inventorySourceStocksOnHand: number
  name: string
  product: string
  translation: {
    name: string
  }
}

export interface IWishlistProduct extends IHydraDefault {
  id: number
  defaultVariant: string
  slug: string
  pictures: IProductMedia[]
  colorHash: string
  name: string
  variants: IWishlistProductInnerVariant[]
}

export interface IColorGroupItem {
  code: string
  colorType: string
  colorValue: string
  name: string
  slug: string
}

export interface IWishlistProductVariant {
  code: string
  id: number
  inStock: boolean
  onHand: number
  originalPrice: number
  price: number
  percentage: number
  product: IWishlistProduct
  inventorySourceStocksOnHand: number
  translation: {
    name: string
  }
  productColorGroup: IColorGroupItem[]
}

export interface IWishlistProductWrapper extends IHydraDefault {
  product: IWishlistProduct
  variant: IWishlistProductVariant
  quantity: number
}

export interface IWishlist extends IHydraDefault {
  id: number
  wishlistProducts: IWishlistProductWrapper[]
  token: string
  shopUser?: IWishlistShopUser
}
