import { IAddressItem } from './addresses.interface'

export interface IProfile {
  defaultAddress: IAddressItem | null
  email: string
  firstName: string
  lastName: string
  loyaltyPointsAccount: number | null
  subscribedToNewsletter: boolean
  subscribedToNewsletterSms: boolean
  phoneNumber: string | null
  birthday: string | null
  user: {
    verified?: boolean
    isFakeEmail: boolean
  }
  id: number
  gender: string
}

export interface IProfileEditForm {
  defaultAddress?: string
  email?: string
  firstName?: string
  lastName?: string
  gender?: string
  birthday?: string
  phoneNumber?: string
  subscribedToNewsletter?: boolean
  subscribedToNewsletterSms?: boolean
}

export interface IProfileEditPassword {
  currentPassword: string
  newPassword: string
  confirmNewPassword?: string
}

export interface IProfileNavigationItem {
  title: string
  iconName?: string
  children?: IProfileNavigationItem[]
  to?: string
  callback?: Function
  disable: boolean
  scope: string
}
