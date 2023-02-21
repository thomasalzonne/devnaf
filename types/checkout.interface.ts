export interface IBillingForm {
  firstName: string
  lastName: string
  countryCode: string
  provinceCode: string
  provinceName: string
  street: string
  city: string
  postcode: string
  details: string
  phoneNumber: string
  email?: string
  company?: string
  nif?: string
}

export interface IShippingForm extends IBillingForm {
  email?: string
}

export interface ICheckoutInfoPayload {
  email?: string
  billingAddress?: IBillingForm
  shippingAddress?: IShippingForm
  couponCode?: string
}

export interface ISessionData {
  id: string
  sessionData: string
}
