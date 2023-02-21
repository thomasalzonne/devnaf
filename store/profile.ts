import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { EStatus } from '~~/constants/status'
import {
  IProfile,
  IProfileEditForm,
  IProfileEditPassword,
} from '~~/types/profile.interface'
import { useCustomFetch } from '~~/composables/useCustomFetch'

interface IState {
  profile: IProfile | null
  error: any
  status: EStatus
}

export const useProfileStore = defineStore('profile', {
  state: (): IState => {
    return {
      profile: null,
      error: null,
      status: EStatus.INIT,
    }
  },
  getters: {},
  actions: {
    async fetchProfile(): Promise<void> {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()
      const userId = authStore.userId

      this.status = EStatus.PENDING

      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/customers/${userId}`,
        {
          key: 'fetchProfile',
          method: 'GET',
          initialCache: false,
        }
      )

      error
        ? this.setFetchProfileError(error)
        : this.setFetchProfileSuccess(data)
    },
    setFetchProfileError(error: any) {
      this.profile = null
      this.error = error.message
      this.status = EStatus.ERROR
    },
    setFetchProfileSuccess(data: any) {
      this.profile = data
      this.error = null
      this.status = EStatus.SUCCESS
    },
    async editProfile(body: IProfileEditForm): Promise<void> {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()
      const userId = authStore.userId

      this.status = EStatus.PENDING
      const { data, error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/customers/${userId}`,
        {
          key: 'editProfile',
          method: 'PUT',
          body,
          initialCache: false,
        }
      )

      if (error) {
        this.error = error
        this.status = EStatus.ERROR
      } else {
        this.setFetchProfileSuccess(data)
      }
    },
    async editPassword(body: IProfileEditPassword): Promise<void> {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()
      const userId = authStore.userId

      this.status = EStatus.PENDING
      const { error } = await useCustomFetch(
        `${config.public.apiUrl}/shop/customers/${userId}/password`,
        {
          key: 'editPassword',
          method: 'PUT',
          body,
          initialCache: false,
        }
      )

      if (error) {
        this.error = error
        this.status = EStatus.ERROR
      } else {
        this.error = null
        this.status = EStatus.SUCCESS
      }
    },
    clear() {
      this.error = null
      this.status = EStatus.INIT
    },
  },
})
