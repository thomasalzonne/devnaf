import { IHydra } from './hydra.interface'

export interface IAddressItem {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  company: string
  countryCode: string
  provinceCode: string
  provinceName: string
  street: string
  city: string
  postcode: string
}

export interface IAddressesResponse extends IHydra {
  'hydra:member': IAddressItem[]
  'hydra:totalItems': number
}

export interface IAddressAddForm {
  firstName: string
  lastName: string
  phoneNumber: string
  company: string
  countryCode: string
  provinceCode: string
  provinceName: string
  street: string
  city: string
  postcode: string
  details?: string
  id?: number
  email?: string
  nif?: string
}

export interface ICountry {
  '@id': string
  '@type': string
  '@context': string
  id: number
  code: string
  provinces: string[]
  enabled: boolean
  name: string
}

export interface ICountriesResponse extends IHydra {
  'hydra:member': ICountry[]
  'hydra:totalItems': number
}

export interface IProvince {
  '@id': string
  '@type': string
  code: string
  name: string
}
