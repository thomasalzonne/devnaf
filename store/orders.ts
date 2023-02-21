import { defineStore } from 'pinia'
import { EStatus } from '~~/constants/status'
import {
  IOrder,
  IOrderListItem,
  IOrderResponse,
} from '~~/types/orders.interface'

interface State {
  orders: IOrderListItem[]
  error: any
  status: EStatus
  order: IOrder
  totalItems: number
}

export const useOrdersStore = defineStore('orders', {
  state: (): State => {
    return {
      orders: [],
      error: null,
      status: EStatus.INIT,
      order: null,
      totalItems: 0,
    }
  },
  actions: {
    async fetchOrders(page: number = 1): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders?page=${page}&itemsPerPage=10&sort=desc`,
        {
          key: 'fetchOrders',
          method: 'GET',
          initialCache: false,
        }
      )

      error
        ? this.setFetchOrdersError(error)
        : this.setFetchOrdersSuccess(data, page)
    },
    setFetchOrdersError(error): void {
      this.error = error
      this.status = EStatus.ERROR
    },
    setFetchOrdersSuccess(data: IOrderResponse, page: number): void {
      this.error = null
      this.status = EStatus.SUCCESS

      page === 1
        ? (this.orders = data?.['hydra:member'] || [])
        : (this.orders = this.orders.concat(data?.['hydra:member'] || []))

      this.totalItems = data?.['hydra:totalItems']
    },
    async fetchOrder(tokenValue: string): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders/${tokenValue}`,
        {
          key: 'fetchOrder',
          method: 'GET',
          initialCache: false,
        }
      )

      error ? this.setFetchOrderError(error) : this.setFetchOrderSuccess(data)
    },
    setFetchOrderError(error): void {
      this.error = error
      this.status = EStatus.ERROR
    },
    setFetchOrderSuccess(data: IOrder): void {
      this.error = null
      this.status = EStatus.SUCCESS
      this.order = data || []
    },
  },
})
