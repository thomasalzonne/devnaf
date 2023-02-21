import { defineStore } from 'pinia'
import { EStatus } from '~~/constants/status'
import { ICheckoutInfoPayload } from '~~/types/checkout.interface'
import { useCartStore } from '~/store/cart'
import { ICart } from '~~/types/cart.interface'

interface State {
  delivery: any
  error: any
  status: EStatus
}

export const useCheckoutStore = defineStore('checkout', {
  state: (): State => {
    return {
      delivery: null,
      error: null,
      status: EStatus.INIT,
    }
  },
  actions: {
    async setDeliveryInfo(payload: ICheckoutInfoPayload): Promise<void> {
      const config = useRuntimeConfig()
      const cartStore = useCartStore()
      const cartToken = cartStore.cart?.tokenValue

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders/${cartToken}`,
        {
          key: 'fetchProfile',
          method: 'PUT',
          body: {
            ...payload,
          },
          initialCache: false,
        }
      )

      error
        ? this.setDeliveryInfoError(error)
        : this.setDeliveryInfoSuccess(data)
    },
    setDeliveryInfoError(error: any): void {
      this.error = error?.message
      this.status = EStatus.ERROR
    },
    setDeliveryInfoSuccess(data: ICart): void {
      const cartStore = useCartStore()

      this.error = null
      this.status = EStatus.SUCCESS

      cartStore.$patch({
        cart: data,
      })
    },
    async subscribeToNewsletter(email: string): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/customers/subscribe-to-newsletter`,
        {
          key: 'subscribeToNewsletter',
          method: 'POST',
          body: {
            email,
            subscribedToNewsletter: true,
          },
          initialCache: false,
        }
      )

      if (error) {
        this.error = error?.message
        this.status = EStatus.ERROR
      } else {
        this.error = null
        this.status = EStatus.SUCCESS
      }
    },
    async setShipmentMethod() {
      const config = useRuntimeConfig()
      const cartStore = useCartStore()
      const cartToken = cartStore.cart?.tokenValue || ''
      const shipmentId = cartStore.cart?.shipments?.[0].id
      const shippingMethod = cartStore.cart?.shipments?.[0].method

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders/${cartToken}/shipments/${shipmentId}`,
        {
          key: 'setShipmentMethod',
          method: 'PATCH',
          initialCache: false,
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
          body: {
            shippingMethod,
          },
        }
      )

      error
        ? this.setCompleteOrderError(error)
        : this.setCompleteOrderSuccess(data)
    },
    async setPaymentMethod(): Promise<void> {
      const config = useRuntimeConfig()
      const cartStore = useCartStore()
      const cartToken = cartStore.cart?.tokenValue || ''
      const paymentId = cartStore.cart?.payments?.[0].id
      const paymentMethod = cartStore.cart?.payments?.[0].method

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders/${cartToken}/payments/${paymentId}`,
        {
          key: 'setPaymentMethod',
          method: 'PATCH',
          initialCache: false,
          headers: {
            accept: 'application/ld+json',
            'Content-Type': 'application/merge-patch+json',
          },
          body: {
            paymentMethod,
          },
        }
      )

      error
        ? this.setCompleteOrderError(error)
        : this.setCompleteOrderSuccess(data)
    },
    async completeOrder(): Promise<void> {
      const config = useRuntimeConfig()
      const cartStore = useCartStore()
      const cartToken = cartStore.cart?.tokenValue || ''

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders/${cartToken}/complete`,
        {
          key: 'completeCart',
          method: 'PATCH',
          initialCache: false,
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
          body: {
            notes: 'Notes',
          },
        }
      )

      error
        ? this.setCompleteOrderError(error)
        : this.setCompleteOrderSuccess(data)
    },
    setCompleteOrderError(e) {
      this.error = e
      this.status = EStatus.ERROR
    },
    setCompleteOrderSuccess() {
      this.error = null
      this.status = EStatus.SUCCESS
    },
    clearError() {
      this.error = null
    },
  },
})
