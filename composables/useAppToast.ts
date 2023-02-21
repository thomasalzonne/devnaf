import { useToast } from 'vue-toastification/dist/index.mjs'

import ToastSuccessBody from '~/components/notifications/ToastSuccessBody.vue'
import ToastErrorBody from '~/components/notifications/ToastErrorBody.vue'
import ToastProductCart from '~~/components/notifications/ToastProductCart.vue'
import ToastProductWishlist from '~/components/notifications/ToastProductWishlist.vue'

interface ISimpleToastOptions {
  title?: string
  text?: string
}

interface IProductToCartToastOptions {
  text: string
  image: string
}

interface IProductWishlistToastOptions {
  text: string
  image: string
  isFavourite: boolean
}

export const useAppToast = () => {
  const toast = useToast()

  const toastSuccess = (data: ISimpleToastOptions) =>
    toast.success({
      component: ToastSuccessBody,
      props: {
        ...data,
      },
    })

  const toastError = (data: ISimpleToastOptions) =>
    toast.error({
      component: ToastErrorBody,
      props: {
        ...data,
      },
    })

  const toastProductAddedToCart = (data: IProductToCartToastOptions) =>
    toast({
      component: ToastProductCart,
      props: {
        ...data,
      },
    })
  const toastProductWishlist = (data: IProductWishlistToastOptions) =>
    toast({
      component: ToastProductWishlist,
      props: {
        ...data,
      },
    })

  return {
    toastSuccess,
    toastError,
    toastProductAddedToCart,
    toastProductWishlist,
  }
}
