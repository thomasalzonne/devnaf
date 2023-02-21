import { defineStore } from 'pinia'
import { useWishlistStore } from './wishlist'

import { EStatus } from '~/constants/status'
import {
  EFacebookStatus,
  ILoginForm,
  ILoginWithSocialsBody,
  IRegistrationForm,
  IRequestResetPasswordForm,
  IResetPasswordForm,
  IResetPasswordPayload,
} from '~~/types/auth.interface'

import { useProfileStore } from '~/store/profile'
import { useCustomFetch } from '~~/composables/useCustomFetch'
import { COOKIE_CONFIG, EAppCookie } from '~~/constants/cookie'
import { IProfile } from '~~/types/profile.interface'
import { useCartStore } from '~/store/cart'
import { useProductsStore } from '~/store/products'

interface State {
  isAuthorized: boolean
  error: any
  status: EStatus
  token: string
  userId: string | null
}

interface ILoginResponse {
  token: string
  customer: IProfile
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      isAuthorized: false,
      error: null,
      status: EStatus.INIT,
      token: '',
      userId: null,
    }
  },
  getters: {
    getIsAuthorized: (state) => state.isAuthorized,
  },
  actions: {
    async login(payload: ILoginForm): Promise<void> {
      const config = useRuntimeConfig()
      const body = {
        email: payload.email,
        password: payload.password,
      }

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch<ILoginResponse>(
        `${config.public.apiUrl}/shop/authentication-token`,
        {
          method: 'POST',
          body,
          initialCache: false,
        }
      )

      error ? this.setLoginError(error) : this.setLoginSuccess(data)
    },
    setLoginError(error: any) {
      const cookieToken = useCookie<string | null>(
        EAppCookie.AUTH_TOKEN,
        COOKIE_CONFIG()
      )
      const cookieUserId = useCookie<string | null>(
        EAppCookie.USER_ID,
        COOKIE_CONFIG()
      )

      cookieToken.value = null
      cookieUserId.value = null
      this.error = error || true
      this.status = EStatus.ERROR
      this.isAuthorized = false
      this.token = ''
    },
    async setLoginSuccess(data: ILoginResponse) {
      const cookieToken = useCookie(EAppCookie.AUTH_TOKEN, COOKIE_CONFIG())
      const cookieUserId = useCookie<string | null>(
        EAppCookie.USER_ID,
        COOKIE_CONFIG()
      )
      const cartToken = useCookie(EAppCookie.CART_TOKEN, COOKIE_CONFIG())
      const wishlistToken = useCookie(
        EAppCookie.WISHLIST_TOKEN,
        COOKIE_CONFIG()
      )

      const profileStore = useProfileStore()
      const wishlistStore = useWishlistStore()
      const cartStore = useCartStore()

      const token = data?.token

      this.userId = data?.customer?.id?.toString()
      this.token = `Bearer ${token}`
      this.isAuthorized = true
      this.status = EStatus.SUCCESS

      await (cookieToken.value = this.token)
      await (cookieUserId.value = this.userId)

      profileStore.$patch({
        profile: data?.customer || null,
      })

      wishlistToken.value
        ? await wishlistStore.mergeWishlist()
        : await wishlistStore.fetchWishlist()

      cartToken.value
        ? await cartStore.attachCartToUser()
        : await cartStore.fetchCart()
    },
    async loginWithSocials(body: ILoginWithSocialsBody): Promise<void> {
      const config = useRuntimeConfig()

      const { data, error } = await useCustomFetch<ILoginResponse>(
        `${config.public.apiUrl}/shop/customers/social/${body.service}/connect`,
        {
          method: 'POST',
          body: {
            accessToken: body.accessToken,
          },
          headers: {
            'Accept-Language': config.public.locale,
          },
        }
      )

      error ? this.setLoginError(error) : this.setLoginSuccess(data)
    },
    async registration(
      payload: IRegistrationForm,
      locale: string
    ): Promise<void> {
      const config = useRuntimeConfig()

      this.status = EStatus.PENDING

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/customers`,
        {
          method: 'POST',
          body: payload,
          initialCache: false,
          headers: {
            'Accept-Language': locale,
          },
        }
      )

      if (error) {
        this.setRegistrationError(error)
      } else {
        this.status = EStatus.SUCCESS

        await this.login({ email: payload.email, password: payload.password })
      }
    },
    setRegistrationError(error: any) {
      const cookie = useCookie<string | null>(
        EAppCookie.AUTH_TOKEN,
        COOKIE_CONFIG()
      )

      cookie.value = null

      this.error = error
      this.status = EStatus.ERROR
      this.isAuthorized = false
      this.token = ''
    },
    async requestResetPassword(email: string, locale: string): Promise<void> {
      const config = useRuntimeConfig()
      const body: IRequestResetPasswordForm = {
        email,
      }

      this.status = EStatus.PENDING

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/reset-password-requests`,
        {
          method: 'POST',
          body,
          initialCache: false,
          headers: {
            'Accept-Language': locale,
          },
        }
      )

      if (error) {
        this.error =
          error.violations?.map((e: any) => e.message) || error || true
        this.status = EStatus.ERROR
      } else {
        this.status = EStatus.SUCCESS
      }
    },
    async resetPassword(
      form: IResetPasswordForm,
      token: string,
      locale: string
    ): Promise<void> {
      const config = useRuntimeConfig()
      const body: IResetPasswordPayload = {
        newPassword: form.password,
        confirmNewPassword: form.password,
      }

      this.status = EStatus.PENDING

      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/reset-password-requests/${token}`,
        {
          method: 'PATCH',
          body,
          initialCache: false,
          headers: {
            'Accept-Language': locale,
            'Content-Type': 'application/merge-patch+json',
          },
        }
      )

      if (error) {
        this.error =
          error.violations?.map((e: any) => e.message) || error || true
        this.status = EStatus.ERROR
      } else {
        this.status = EStatus.SUCCESS
      }
    },
    async logout(): Promise<void> {
      const cookieToken = useCookie<string | null>(EAppCookie.AUTH_TOKEN)
      const cookieUserId = useCookie<string | null>(EAppCookie.USER_ID)
      const wishlistToken = useCookie<string | null>(EAppCookie.WISHLIST_TOKEN)
      const cartToken = useCookie<string | null>(EAppCookie.CART_TOKEN)

      cookieToken.value = null
      cookieUserId.value = null
      wishlistToken.value = null
      cartToken.value = null

      if (FB) {
        await FB.getLoginStatus(async (response) => {
          if (response.status === EFacebookStatus.CONNECTED) {
            await FB.logout()
          }
        })
      }

      const authStore = useAuthStore()
      const cartStore = useCartStore()
      const wishlistStore = useWishlistStore()
      const productsStore = useProductsStore()

      authStore.$reset()
      cartStore.$reset()
      wishlistStore.$reset()
      productsStore.$reset()

      localStorage.clear()
    },
    async checkAuthorize(): Promise<void> {
      const token = useCookie(EAppCookie.AUTH_TOKEN)
      const userId = useCookie(EAppCookie.USER_ID)

      if (token.value && userId.value) {
        await this.setAuthorized(token.value, userId.value)
      }

      if (this.isAuthorized) {
        const profileStore = useProfileStore()
        const cartStore = useCartStore()
        const wishlistStore = useWishlistStore()

        await profileStore.fetchProfile()
        await cartStore.fetchCart()
        await wishlistStore.initWishlist()
      }
    },
    setAuthorized(token: string, userId: string): void {
      this.isAuthorized = true
      this.error = null
      this.status = EStatus.INIT
      this.token = token
      this.userId = userId
    },
    reset(): void {
      this.error = null
      this.status = EStatus.INIT
    },
  },
})
