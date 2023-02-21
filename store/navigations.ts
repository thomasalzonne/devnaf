import { defineStore } from 'pinia'
import { useCustomFetch } from '~~/composables/useCustomFetch'
import { IDictionary } from '~~/types/dictionary.interface'

import INavigation from '~~/types/navigation.interface'

interface IState {
  navigations: IDictionary<INavigation[]>
}

export const useNavigationsStore = defineStore('navigations', {
  state: (): IState => {
    return {
      navigations: null,
    }
  },
  actions: {
    async fetchNavigations(): Promise<void> {
      const config = useRuntimeConfig()

      const { data } = await useCustomFetch(
        `https://divat.nafnaf.io/api/v1/${config.public.channelCode}/navigations`,
        {
          key: 'fetchNavigations',
          method: 'GET',
          initialCache: false,
        }
      )

      this.navigations = data
    },
  },
})
