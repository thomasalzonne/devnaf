import { defineStore } from 'pinia'
import { IBreadcrumbs } from '~~/types/breadcrumbs.interface'

interface State {
  breadcrumbs: IBreadcrumbs[]
}

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  state: (): State => {
    return {
      breadcrumbs: [],
    }
  },
  actions: {
    updateBreadcrumbs(breadcrumbs: IBreadcrumbs[] = []) {
      this.breadcrumbs = breadcrumbs
    },
    clearBreadcrumbs() {
      this.breadcrumbs.splice(0)
    },
  },
})
