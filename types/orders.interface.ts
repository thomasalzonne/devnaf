import { ICartItem, ICartItemVariant } from './cart.interface'
import { IHydra, IHydraDefault } from './hydra.interface'

export enum ECheckoutOrderState {
  COMPLETED = 'completed',
  PAYMENT_SELECTED = 'payment_selected',
  SHIPPING_SELECTED = 'shipping_selected',
}

export enum EPaymentOrderState {
  AWAITING_PAYMENT = 'awaiting_payment',
}

export interface IOrderListItem extends IHydraDefault {
  id: number
  itemsTotal: number
  loyaltyPoints: number
  number: string
  tokenValue: string
  checkoutCompletedAt: string
  checkoutState: ECheckoutOrderState
  countItems: number
}

export interface IOrderResponse extends IHydra {
  'hydra:member': IOrderListItem[]
}

export interface IOrderBillingAddress extends IHydraDefault {
  city: string
  countryCode: string
  firstName: string
  lastName: string
  phoneNumber: string
  postcode: string
  provinceCode: string
  provinceName: string
  street: string
}

export interface IOrderVariant extends ICartItemVariant {}

export interface IOrderItem extends IHydraDefault {
  discountedUnitPrice: number
  id: number
  originalUnitPrice: number
  productName: string
  quantity: number
  subtotal: number
  total: number
  unitPrice: number
  units: string[]
  variant: ICartItemVariant
}

export interface IOrderPayment extends IHydraDefault {
  id: number
  method: string
}

export interface IOrderShipment extends IHydraDefault {
  id: number
  method: string
}

export interface IOrderShippingAddress extends IHydraDefault {
  city: string
  countryCode: string
  firstName: string
  lastName: string
  postcode: string
  provinceCode: string
  provinceName: string
  street: string
  company?: string
}

export interface IOrder extends IHydraDefault {
  billingAddress: IOrderBillingAddress
  checkoutState: string
  currencyCode: string
  id: number
  isGift: boolean
  items: IOrderItem[] | ICartItem[]
  itemsTotal: number
  localeCode: string
  loyaltyPoints: number
  number: string
  orderPromotionTotal: number
  paymentState: string
  shipmentTotaTolFree: number
  payments: IOrderPayment[]
  shipments: IOrderShipment[]
  shippingAddress: IOrderShippingAddress
  shippingTotal: number
  taxTotal: number
  tokenValue: string
  total: number
  shippingState: string
  distinctionTotal: number
  originalTotal: number
}
