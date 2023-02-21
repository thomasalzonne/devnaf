import { IHydraDefault } from './hydra.interface'
import { IOrderItem } from './orders.interface'
import { IProductMedia } from './product.interface'

export enum ECartState {
  CART = 'cart',
  SHIPPING_SELECTED = 'shipping_selected',
  PAYMENT_SELECTED = 'payment_selected',
  COMPLETED = 'completed',
}

export interface IShippingAddress extends IHydraDefault {
  firstName: string
  lastName: string
  countryCode: string
  provinceName: string
  street: string
  city: string
  postcode: string
  email?: string
  company?: string
}

export interface IBillingAddress extends IHydraDefault {
  firstName: string
  lastName: string
  countryCode: string
  provinceName: string
  street: string
  city: string
  postcode: string
}

export interface IPayment extends IHydraDefault {
  id: number
  method: string
}

export interface IShipment extends IHydraDefault {
  id: number
  method: string
}

export interface ICartItemColorGroup {
  code: string
  colorType: string
  colorValue: string
  name: string
  slug: string
}

export interface ICartItemVariant {
  code: string
  ean: string
  name: string
  inStock: boolean
  inventorySourceStocksOnHand: number
  originalPrice: number
  price: number
  // eslint-disable-next-line no-use-before-define
  product: ICartItemProduct
  percentage: number
  translation: {
    name: string
  }
  productColorGroup: ICartItemColorGroup[]
}
export interface ICartItemProduct {
  defaultVariant: string
  pictures: IProductMedia[]
  slug: string
  colorHash: string
  type: 'file' | 'hexacode'
  value: string
  name: string
  variants: ICartItemVariant[]
}

export interface ICartItem extends IHydraDefault {
  variant: ICartItemVariant
  productName: string
  id: number
  quantity: number
  unitPrice: number
  originalUnitPrice: number
  total: number
  subtotal: number
  stock?: number
  slug?: string
  percentage: number
}

export interface ICart extends IHydraDefault {
  customer?: string
  channel?: string
  shippingAddress: IShippingAddress
  billingAddress: IBillingAddress
  payments: IPayment[]
  shipments: IShipment[]
  currencyCode: string
  localeCode: string
  checkoutState: ECartState
  paymentState: ECartState.CART
  shippingState: ECartState.CART
  tokenValue: string
  id: number
  number: string
  items: ICartItem[] | IOrderItem[]
  itemsTotal: number
  total: number
  state?: ECartState.CART
  returnRequest?: string
  taxTotal: number
  shippingTotal: number
  orderPromotionTotal: number
  isGift: boolean
  shipmentTotalToFree?: number
  originalTotal: number
  distinctionTotal: number
}

export interface ICartList extends IHydraDefault {
  'hydra:member': ICart[]
}
