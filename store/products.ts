import { defineStore } from 'pinia'
import { EAppLocalStorageKeys } from '~~/constants/localStorage'
import { ICatalogProduct } from '~~/types/product.interface'

interface IState {
  latestProducts: ICatalogProduct[]
  stash: ICatalogProduct
}

export const useProductsStore = defineStore('products', {
  state: (): IState => {
    return {
      latestProducts: [],
      stash: null,
    }
  },
  actions: {
    setLastProductsFromLocalStorage(): void {
      const latestProducts = JSON.parse(
        localStorage.getItem(EAppLocalStorageKeys.LAST_VIEWED_PRODUCTS)
      )

      if (latestProducts) {
        this.latestProducts = latestProducts
      }
    },
    saveNextProductInStore(): void {
      if (this.stash !== null) {
        this.latestProducts.unshift(this.stash)

        if (this.latestProducts.length > 5) {
          this.latestProducts.pop()
        }

        this.stash = null

        localStorage.setItem(
          EAppLocalStorageKeys.LAST_VIEWED_PRODUCTS,
          JSON.stringify(this.latestProducts)
        )
      }
    },
    addProductInStash(product: ICatalogProduct) {
      const isAlreadyInList = !!this.latestProducts?.find(
        (p: ICatalogProduct) => p?.objectID === product?.objectID
      )

      if (!isAlreadyInList) {
        this.stash = product
      }
    },
  },
})
