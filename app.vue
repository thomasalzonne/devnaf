<template>
  <div>
    <NuxtLayout>
      <div>
        <NuxtPage />
      </div>
    </NuxtLayout>
    <SearchModal />
    <CartModal />
    <AppAuth />
    <AppSvgSprite />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from './store/auth'
import { scrollToTop } from './utils/utils'
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
import { useProductsStore } from '~/store/products'
import { useLayoutStore } from '~/store/layout'
import { lockBody, unlockBody } from '~/utils/body-locker'
// import 'vue3-lottie/dist/style.css'
import { useCommonStore } from '~/store/common'

const route = useRoute()
const authStore = useAuthStore()
const nuxtApp = useNuxtApp()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const layoutStore = useLayoutStore()
const commonStore = useCommonStore()

const isOpenSomeModal = computed(() => {
  return layoutStore.isOpenSomeModal
})

watch(
  isOpenSomeModal,
  (value: boolean) => {
    value ? lockBody() : unlockBody()
  },
  { immediate: true }
)

watch(
  () => route.path,
  () => {
    layoutStore.closeAllModals()
  }
)

const handleResize = () => {
  layoutStore.windowWidth = window?.innerWidth || 0
}

const handleScroll = () => {
  layoutStore.scrollTop = window?.scrollY || 0
}

nuxtApp.hook('page:finish', () => {
  if (route.name !== 'collections-collection') {
    scrollToTop()
  }
})

await useAsyncData('initDivat', () => commonStore.fetchDivatData())
await useAsyncData('initCart', () => cartStore.checkExistingCart())
await useAsyncData('initWishlist', () => wishlistStore.checkWishlist())

onMounted(() => {
  productsStore.setLastProductsFromLocalStorage()
  authStore.checkAuthorize()

  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)

  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})

const CartModal = defineAsyncComponent(
  () => import('~/components/cart/CartModal.vue')
)

const AppAuth = defineAsyncComponent(
  () => import('~/components/auth/AppAuth.vue')
)

const AppSvgSprite = defineAsyncComponent(
  () => import('~/components/common/AppSvgSprite.vue')
)

const SearchModal = defineAsyncComponent(
  () => import('~/components/modals/SearchModal.vue')
)
</script>
