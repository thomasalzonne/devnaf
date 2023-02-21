import { defineStore } from 'pinia'
import { useCustomFetch } from '~~/composables/useCustomFetch'
import { IDivatData } from '~~/types/divat.interface'

interface IState {
  data: IDivatData
}

export const useCommonStore = defineStore('navigations', {
  state: (): IState => {
    return {
      data: null,
    }
  },
  actions: {
    async fetchDivatData(): Promise<void> {
      const config = useRuntimeConfig()

      const { data } = await useCustomFetch(
        `https://divat.nafnaf.io/api/v1/${config.public.channelCode}/setupfront`,
        {
          key: 'fetchDivatData',
          method: 'GET',
        }
      )

      this.data = data
    },
  },
})
