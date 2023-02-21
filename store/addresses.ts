import { defineStore } from 'pinia'
import { EStatus } from '~~/constants/status'
import { useCustomFetch } from '~~/composables/useCustomFetch'
import {
  IAddressAddForm,
  IAddressesResponse,
  IAddressItem,
  ICountry,
} from '~~/types/addresses.interface'

interface IState {
  addresses: IAddressItem[]
  error: any
  status: EStatus
  country: ICountry
}

export const useAddressesStore = defineStore('addresses', {
  state: (): IState => {
    return {
      addresses: [],
      error: null,
      status: EStatus.INIT,
      country: null,
    }
  },
  getters: {},
  actions: {
    async fetchAddresses(): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/addresses`,
        {
          key: 'fetchAddressesList',
          method: 'GET',
        }
      )

      error
        ? this.setFetchAddressesError(error)
        : this.setFetchAddressesSuccess(data)
    },
    setFetchAddressesError(error: any) {
      this.error = error?.data?.message || ''
      this.status = EStatus.ERROR
    },
    setFetchAddressesSuccess(data: IAddressesResponse) {
      this.addresses = data?.['hydra:member'] || []
      this.error = null
      this.status = EStatus.SUCCESS
    },
    async addAddress(body: IAddressAddForm): Promise<any> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { error, data } = await useCustomFetch(
        `${config.public.apiUrl}/shop/addresses`,
        {
          key: 'addAddress',
          method: 'POST',
          initialCache: false,
          body,
        }
      )

      error ? this.setAddAddressError(error) : this.setAddAddressSuccess()

      return data
    },

    setAddAddressError(error: any) {
      this.error = error.message
      this.status = EStatus.ERROR
    },
    setAddAddressSuccess() {
      this.error = null
      this.status = EStatus.SUCCESS
    },
    async editAddress(body: IAddressAddForm): Promise<void> {
      const config = useRuntimeConfig()

      const id = body.id
      delete body.id

      this.status = EStatus.PENDING

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/addresses/${id}`,
        {
          key: 'editAddress',
          method: 'PUT',
          initialCache: false,
          body,
        }
      )

      error ? this.setEditAddressError(error) : this.setEditAddressSuccess()
    },
    setEditAddressError(error: any) {
      this.error = error.message
      this.status = EStatus.ERROR
    },
    setEditAddressSuccess() {
      this.error = null
      this.status = EStatus.SUCCESS
    },
    async deleteAddress(id: number): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/addresses/${id}`,
        {
          key: 'deleteAddress',
          method: 'DELETE',
          initialCache: false,
        }
      )

      error ? this.setDeleteAddressError(error) : this.setDeleteAddressSuccess()
    },
    setDeleteAddressSuccess() {
      this.error = null
      this.status = EStatus.SUCCESS
    },
    setDeleteAddressError(error: any) {
      this.error = error.message
      this.status = EStatus.ERROR
    },
    async fetchCountry(): Promise<void> {
      const config = useRuntimeConfig()

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/countries/${config.public.countryCode}`,
        {
          key: 'fetchCountryList',
          method: 'GET',
          initialCache: false,
        }
      )

      if (!error) {
        this.country = data
      }
    },
    clear() {
      this.error = null
      this.status = EStatus.INIT
    },
  },
})
