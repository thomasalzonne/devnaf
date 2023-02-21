import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { EStatus } from '~~/constants/status'
import { useCustomFetch } from '~~/composables/useCustomFetch'
import { IWishlist } from '~~/types/wishlist.interface'
import { COOKIE_CONFIG, EAppCookie } from '~~/constants/cookie'

interface IState {
  wishlist: IWishlist | null
  error: any
  status: EStatus
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): IState => {
    return {
      wishlist: null,
      error: null,
      status: EStatus.INIT,
    }
  },
  getters: {
    token(state): string {
      return state.wishlist?.token || ''
    },
  },
  actions: {
    async initWishlist(): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const tokenValue = useCookie(EAppCookie.WISHLIST_TOKEN)
      const isAuthorized = useAuthStore().isAuthorized

      const { data, error } = await useCustomFetch<IWishlist>(
        `${config.public.apiUrl}/shop/wishlists`,
        {
          method: 'POST',
          initialCache: false,
          body: {
            channelCode: config.public.channelCode,
            tokenValue: isAuthorized ? tokenValue.value : null,
          },
        }
      )

      error
        ? this.setInitWishlistError(error)
        : this.setInitWishlistSuccess(data)
    },
    setInitWishlistError(error: any): void {
      const cookieWishlistToken = useCookie<string | null>(
        EAppCookie.WISHLIST_TOKEN
      )

      this.error = error.message
      this.status = EStatus.ERROR
      this.wishlist = null

      cookieWishlistToken.value = null
    },
    setInitWishlistSuccess(data: IWishlist): void {
      const cookieWishlistToken = useCookie(
        EAppCookie.WISHLIST_TOKEN,
        COOKIE_CONFIG()
      )

      this.error = null
      this.status = EStatus.SUCCESS
      this.wishlist = data
      cookieWishlistToken.value = data.token
    },
    async addToWishlist(productId: string): Promise<void> {
      if (this.token) {
        await this.addProductToWishlist(productId)
      } else {
        await this.initWishlist()
        await this.addProductToWishlist(productId)
      }
    },
    async addProductToWishlist(slug: string): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<IWishlist>(
        `${config.public.apiUrl}/shop/wishlists/${this.token}/product/${slug}`,
        {
          key: 'addProductToWishlist',
          method: 'PATCH',
          initialCache: false,
          body: {},
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
        }
      )

      error
        ? this.setAddProductToWishlistError(error)
        : this.setAddProductToWishlistSuccess(data)
    },
    setAddProductToWishlistError(error: any): void {
      this.error = error.message
      this.status = EStatus.ERROR
    },
    setAddProductToWishlistSuccess(data: IWishlist): void {
      this.error = null
      this.status = EStatus.SUCCESS
      this.wishlist = data
    },
    async fetchWishlist(): Promise<void> {
      const cookieToken = useCookie<string | null>(EAppCookie.WISHLIST_TOKEN)
      const authStore = useAuthStore()

      if (cookieToken.value && !authStore.isAuthorized) {
        await this.fetchWishlistForNonAuthUser(cookieToken.value)
      }

      if (authStore.isAuthorized) {
        await this.initWishlist()
      }
    },
    async fetchWishlistForNonAuthUser(token: string): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<IWishlist>(
        `${config.public.apiUrl}/shop/wishlists/${token}`,
        {
          method: 'GET',
          initialCache: false,
        }
      )
      error
        ? this.setFetchWishlistByTokenError(error)
        : this.setFetchWishlistByTokenSuccess(data)
    },
    setFetchWishlistByTokenError(error: any): void {
      this.wishlist = null
      this.error = error.message
      this.status = EStatus.ERROR
    },
    setFetchWishlistByTokenSuccess(data: IWishlist): void {
      this.wishlist = data
      this.error = null
      this.status = EStatus.SUCCESS
    },
    async removeItem(slug: string): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/wishlists/${this.wishlist?.token}/products/${slug}`,
        {
          method: 'DELETE',
          initialCache: false,
        }
      )
      error ? this.setRemoveItemError(error) : await this.setRemoveItemSuccess()
    },
    setRemoveItemError(error: any) {
      this.error = error.message
      this.status = EStatus.ERROR
    },
    async setRemoveItemSuccess(): Promise<void> {
      this.error = null
      this.status = EStatus.SUCCESS

      await this.fetchWishlist()
    },
    async checkWishlist(): Promise<void> {
      const token = useCookie(EAppCookie.WISHLIST_TOKEN)

      if (token.value) {
        await this.fetchWishlist()
      }
    },
    async mergeWishlist(): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<IWishlist>(
        `${config.public.apiUrl}/shop/wishlists/${this.wishlist?.token}/merge`,
        {
          method: 'PUT',
          initialCache: false,
          'Content-Type': 'application/ld+json',
          body: {},
        }
      )

      error ? this.mergeWishlistError(error) : this.mergeWishlistSuccess(data)
    },
    mergeWishlistError(error: any) {
      this.error = error.message
      this.status = EStatus.ERROR
      this.wishlist = null
    },
    mergeWishlistSuccess(data: IWishlist) {
      const tokenValue = useCookie(EAppCookie.WISHLIST_TOKEN)

      this.wishlist = data
      this.status = EStatus.SUCCESS
      this.error = null

      tokenValue.value = data.token
    },
    clear() {
      this.error = null
      this.status = EStatus.INIT
    },
  },
})
