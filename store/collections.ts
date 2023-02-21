import { defineStore } from 'pinia'

interface State {
  productId: string
  scrollTop: number
  slug: string
  hitsPerPage: number
}

export const useCollectionsStore = defineStore('collections', {
  state: (): State => {
    return {
      productId: '',
      scrollTop: 0,
      slug: '',
      hitsPerPage: 20,
    }
  },
})
