import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { EStatus } from '~~/constants/status'
import { useCustomFetch } from '~~/composables/useCustomFetch'
import { COOKIE_CONFIG, EAppCookie } from '~~/constants/cookie'
import { ICart, ICartList } from '~~/types/cart.interface'

interface IState {
  cart: ICart | null
  error: any
  status: EStatus
}

export const useCartStore = defineStore('cart', {
  state: (): IState => {
    return {
      cart: null,
      error: null,
      status: EStatus.INIT,
    }
  },
  getters: {
    itemsQuantity: (state) => state.cart?.items?.length || 0,
  },
  actions: {
    async initCart(): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders`,
        {
          key: 'initCart',
          method: 'POST',
          body: {
            localeCode: config.public.locale,
          },
        }
      )

      error ? this.setInitCartError(error) : this.setInitCartSuccess(data)
    },
    setInitCartError(error: any): void {
      const cookieCartToken = useCookie<string | null>(EAppCookie.CART_TOKEN)

      this.error = error.message
      this.status = EStatus.ERROR
      this.cart = null

      cookieCartToken.value = null
    },
    setInitCartSuccess(data: any): void {
      this.error = null
      this.status = EStatus.SUCCESS
      this.cart = data

      const cookieCartToken = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())

      cookieCartToken.value = data?.tokenValue || ''
    },
    async handleAddToCart(productId: string): Promise<void> {
      const token = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())

      if (!token.value) {
        await this.initCart()
      }

      await this.addProductToCart(productId)
    },
    async addProductToCart(productId: string): Promise<void> {
      const token = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<ICart>(
        `${config.public.apiUrl}/shop/orders/${token.value}/items`,
        {
          key: 'addItemToCart',
          method: 'POST',
          body: {
            productVariant: productId,
            quantity: 1,
          },
        }
      )

      error
        ? this.setAddProductToCartError(error)
        : this.setAddProductToCartSuccess(data)
    },
    setAddProductToCartError(error: any): void {
      this.error = error.message
      this.status = EStatus.ERROR
    },
    setAddProductToCartSuccess(data: ICart): void {
      this.error = null
      this.status = EStatus.SUCCESS
      this.cart = data
    },
    async fetchCart(): Promise<void> {
      const cookieToken = useCookie<string | null>(
        EAppCookie.CART_TOKEN,
        COOKIE_CONFIG()
      )
      const authStore = useAuthStore()

      if (cookieToken.value && !authStore.isAuthorized) {
        await this.fetchCartForNonAuthUser()
      }

      if (authStore.isAuthorized) {
        await this.fetchCartForAuthUser()
      }
    },
    async fetchCartForNonAuthUser() {
      const cookieToken = useCookie<string | null>(
        EAppCookie.CART_TOKEN,
        COOKIE_CONFIG()
      )
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<ICart>(
        `${config.public.apiUrl}/shop/orders/${cookieToken.value}`,
        {
          key: 'fetchCartNonAuth',
          method: 'GET',
          headers: {
            'Content-Type': 'application/ld+json',
          },
        }
      )

      error ? this.setFetchCartError(error) : this.setFetchCartSuccess(data)
    },
    async fetchCartForAuthUser() {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<ICartList>(
        `${config.public.apiUrl}/shop/carts?page=1&itemsPerPage=30`,
        {
          key: 'cartForAuthUser',
          method: 'GET',
        }
      )
      error
        ? this.setFetchCartError(error)
        : this.setFetchCartSuccess(data['hydra:member'][0])
    },
    async attachCartToUser() {
      const cookieToken = useCookie<string | null>(EAppCookie.CART_TOKEN)

      await this.mergeCart(cookieToken.value as string)
    },
    setFetchCartError(error: any) {
      this.status = EStatus.ERROR
      this.error = error?.message || ''
      this.cart = null
    },
    setFetchCartSuccess(data: ICart) {
      this.error = null
      this.status = EStatus.SUCCESS

      if (data) {
        this.cart = data

        const cookieToken = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())

        cookieToken.value = data.tokenValue
      }
    },
    async checkExistingCart(): Promise<void> {
      const token = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())

      if (token.value) {
        await this.fetchCart()
      }
    },
    async removeItem(id: number): Promise<void> {
      const token = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())
      const config = useRuntimeConfig()

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/orders/${token.value}/items/${id}`,
        {
          key: 'removeItem',
          method: 'DELETE',
          initialCache: false,
        }
      )
      error ? this.setRemoveItemError(error) : this.setRemoveItemSuccess()
    },
    setRemoveItemError(error: any) {
      this.error = error.data.message
      this.status = EStatus.ERROR
    },
    async setRemoveItemSuccess(): Promise<void> {
      this.error = null
      this.status = EStatus.SUCCESS

      await this.fetchCart()

      if (!this.itemsQuantity) {
        this.clear()
      }
    },
    async changeItemQuantity({
      id,
      quantity,
    }: {
      id: number
      quantity: number
    }): Promise<void> {
      const token = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())
      const config = useRuntimeConfig()

      const { data, error } = await useCustomFetch<ICart>(
        `${config.public.apiUrl}/shop/orders/${token.value}/items/${id}`,
        {
          key: 'editItem',
          method: 'PATCH',
          initialCache: false,
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
          body: {
            quantity,
          },
        }
      )

      error
        ? this.setChangeQuantityError(error)
        : this.setChangeQuantitySuccess(data)
    },
    setChangeQuantityError(error: any) {
      this.error = error.message
      this.status = EStatus.ERROR
    },
    setChangeQuantitySuccess(data: ICart) {
      this.error = null
      this.status = EStatus.SUCCESS

      this.cart = data
    },
    async toggleIsGift(isGift: boolean = true) {
      const token = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<ICart>(
        `${config.public.apiUrl}/shop/orders/${token.value}/gift`,
        {
          key: 'toggleIsGift',
          method: 'PUT',
          initialCache: false,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            isGift,
          },
        }
      )

      if (error) {
        this.status = EStatus.ERROR
      } else {
        this.cart = data
        this.status = EStatus.SUCCESS
      }
    },
    async mergeCart(token: string): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<ICart>(
        `${config.public.apiUrl}/shop/orders/${token}/merge`,
        {
          key: 'mergeCart',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {},
        }
      )

      const cookieToken = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())

      if (error) {
        this.status = EStatus.ERROR
        cookieToken.value = null
      } else {
        cookieToken.value = data.tokenValue
        this.cart = data
        this.status = EStatus.SUCCESS
      }
    },
    clear() {
      const cookieCartToken = useCookie<string | null>(EAppCookie.CART_TOKEN)

      this.error = null
      this.status = EStatus.INIT
      this.cart = null

      cookieCartToken.value = null
    },
  },
})
