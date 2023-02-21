<template>
  <div class="page-product">
    <div class="product-main-block">
      <div
        v-if="isMobile"
        :style="{
          height: `${
            isSliderMinimized ? `${sliderMinimizeTopLimit}px` : '0px'
          }`,
        }"
      ></div>
      <Transition name="fade">
        <AppBreadcrumbs v-if="isSliderMinimized" />
      </Transition>
      <ProductGallery
        :medias="product?.medias || []"
        :product-slug="productSlug"
        :percentage="product?.percentage || 0"
        :is-favourite="isProductInWishlist"
        :is-minimized="isSliderMinimized"
        class="product-main-block__slider"
        @openLooksModal="openLooksModal"
        @toggleWishlist="toggleWishlist"
      />
      <Transition name="fade">
        <ProductInfoBlock
          v-if="!isMobile || (isMobile && isSliderMinimized)"
          class="product-main-block__info"
          :medias="product?.medias || []"
          :product="product"
          :current-size="currentSize"
          :is-favourite="isProductInWishlist"
          :is-minimized="isSliderMinimized"
          :is-mobile="isMobile"
          :is-in-stock="isInStock"
          :is-in-cart="isInCart"
          @openSizeHelper="toggleModal"
          @selectSize="selectSize"
          @toggleWishlist="toggleWishlist"
          @openProductModal="openProductModal"
          @addProductToCart="addProductToCart"
        />
      </Transition>
      <ProductMobileButtons
        v-if="isMobile"
        :is-loading="isLoading"
        :is-in-cart="isInCart"
        :is-in-stock="isInStock"
        @trigger="handleProductButton"
      />
    </div>
    <div class="product-main-block__sliders">
      <ProductInstaBlock />
      <ProductArticlesBlock
        v-if="!!latestProducts?.length"
        :latest-products="latestProducts"
      />

      <AdvantagesBlock />
      <ProductSizeModal
        :is-open="isOpenProductSizeModal"
        :sizes="product?.sizes"
        @close="toggleModal"
      />
      <ProductLooksModal
        :is-open="isOpenLooksModal"
        :product="product"
        @openSizeHelper="openSizeHelper"
        @close="closeLooksModal"
      />
      <ProductMobileModal
        :is-open="isOpenProductModal"
        :product="product"
        :current-size="currentSize"
        :is-favourite="isProductInWishlist"
        :product-slug="productSlug"
        @close="closeProductModal"
        @openSizes="toggleModal"
        @select-size="selectSize"
        @openSizeHelper="openSizeHelper"
        @toggleWishlist="toggleWishlist"
        @productAdded="handleProductAdded"
      />
      <SizeHelperModal v-if="isOpenSizeHelper" @close="closeSizeHelper" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import ProductGallery from '~/components/product/ProductGallery.vue'
import ProductInfoBlock from '~/components/product/ProductInfoBlock.vue'
import ProductInstaBlock from '~/components/product/ProductInstaBlock.vue'
import ProductArticlesBlock from '~/components/product/ProductArticlesBlock.vue'
import AdvantagesBlock from '~/components/common/AdvantagesBlock.vue'
import AppBreadcrumbs from '~/components/common/AppBreadcrumbs.vue'

import {
  ICatalogProduct,
  IProduct,
  IProductCategory,
  IProductSize,
  ISyliusProduct,
  ISyliusProductVariant,
} from '~~/types/product.interface'
import { useProductsStore } from '~~/store/products'
import { IBreadcrumbs } from '~~/types/breadcrumbs.interface'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'
import { IPIMError } from '~~/types/error.interface'
import { EModals } from '~~/constants/modals'
import { useLayoutStore } from '~~/store/layout'
import { useWishlistStore } from '~~/store/wishlist'
import { IWishlistProductWrapper } from '~~/types/wishlist.interface'
import { useCartStore } from '~~/store/cart'
import { ICartItem } from '~~/types/cart.interface'

const HANDLE_SCROLL_DEBOUNCE_DELAY = 300

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const productsStore = useProductsStore()
const breadcrumbsStore = useBreadcrumbsStore()
const wishlistStore = useWishlistStore()
const layoutStore = useLayoutStore()
const cartStore = useCartStore()

const { toastProductWishlist, toastProductAddedToCart } = useAppToast()

const { t } = useI18n()

const isOpenProductSizeModal = ref(false)
const currentSize = ref<IProductSize | null>(null)
const latestProducts = shallowRef<ICatalogProduct[]>([])
const isOpenSizeHelper = ref(false)
const isProductInWishlist = ref(false)
const isSliderMinimized = ref(false)
const sliderMinimizeTopLimit = ref(40)
const sliderMinimizeBottomLimit = ref(2)
const isLoading = ref(false)
const isProductPageMobile = ref(false)

const { data: product, error } = await useFetch<IProduct & IPIMError>(
  `https://divat.nafnaf.io/api/v1/${
    useRuntimeConfig().public.channelCode
  }/product/${route.params.product}`
)

if (!product.value || error?.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '',
    fatal: true,
  })
}

const { data: syliusProduct, error: syliusError } =
  await useFetch<ISyliusProduct>(
    `${runtimeConfig.public.apiUrl}/shop/products-by-slug/${route.params.product}`
  )

if (!syliusProduct.value || syliusError?.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '',
    fatal: true,
  })
}

const mergeSyliusWithDivat = (sProduct: ISyliusProduct) => {
  if (!sProduct || !product.value) {
    return
  }

  if (sProduct?.name) {
    product.value.name = sProduct.name
  }

  if (sProduct?.variants?.[0]) {
    product.value.price = transformPriceFromSylius(
      sProduct.variants[0].originalPrice
    )
    product.value.price_discounted = transformPriceFromSylius(
      sProduct.variants[0].price
    )
    product.value.percentage = sProduct.variants[0].percentage
    product.value.is_discounted = !!sProduct.variants[0].originalPrice
  }

  if (sProduct?.description) {
    product.value.description = sProduct.description
  }

  if (sProduct?.images?.length) {
    product.value.medias = sProduct.images
  }

  if (sProduct.variants?.length) {
    const sizes: IProductSize[] = []
    sProduct.variants.forEach((item: ISyliusProductVariant) => {
      const name =
        product.value.sizes.find((size) => size?.ean === item?.code)?.size || ''

      if (name) {
        sizes.push({
          ean: item?.code || null,
          price: '',
          price_discounted: '',
          size: name,
          stock: item?.inventorySourceStocksOnHand || 0,
        })
      }
    })

    product.value.sizes = sizes
  }
}

if (product.value && syliusProduct.value) {
  mergeSyliusWithDivat(syliusProduct.value)
}

const metaTitle = computed(() => {
  const categoryName = product.value?.category?.[0]?.name || ''
  const productName = product.value?.name || ''

  if (categoryName) return `${product.value?.name} | ${categoryName}`
  else return productName
})

useHead({
  title: metaTitle.value,
  meta: [{ name: 'description', content: product.value?.description }],
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const productSlug = computed(() => {
  return route.params.product as string
})

const wishlistProducts = computed<IWishlistProductWrapper[]>(() => {
  return wishlistStore.wishlist?.wishlistProducts || []
})

const isProductInWishlistStore = computed<boolean>(() => {
  return !!wishlistProducts.value?.find(
    (item: IWishlistProductWrapper) => item?.product?.slug === productSlug.value
  )
})

const isOpenLooksModal = computed(() => {
  return layoutStore.modals[EModals.PRODUCT_LOOKS]
})

const isOpenProductModal = computed(() => {
  return layoutStore.modals[EModals.PRODUCT_MOBILE_MODAL]
})

const isInStock = computed<boolean>(() => {
  return !!currentSize.value?.stock
})

const isInCart = computed<boolean>(() => {
  return !!(cartStore.cart?.items as ICartItem[])?.find(
    (item: ICartItem) => item.variant?.code === currentSize.value?.ean
  )
})

const selectSize = (size: IProductSize) => {
  currentSize.value = size
}

const toggleModal = (): void => {
  isOpenProductSizeModal.value = !isOpenProductSizeModal.value
}

const openSizeHelper = () => {
  isOpenSizeHelper.value = true
}

const closeSizeHelper = () => {
  isOpenSizeHelper.value = false
}

const openLooksModal = () => {
  layoutStore.openModal(EModals.PRODUCT_LOOKS)
}

const closeLooksModal = () => {
  layoutStore.closeModal(EModals.PRODUCT_LOOKS)
}

const setLatestProducts = () => {
  latestProducts.value = productsStore.latestProducts?.slice() || []

  productsStore.saveNextProductInStore()
}

const toggleWishlist = async () => {
  const slug: string = productSlug.value || ''
  const inWishlist = isProductInWishlist.value

  isProductInWishlist.value = !isProductInWishlist.value

  !inWishlist
    ? await wishlistStore.addToWishlist(slug)
    : await wishlistStore.removeItem(slug)

  isProductInWishlist.value = checkInWishlistProduct()

  toastProductWishlist({
    text: isProductInWishlist.value
      ? t('Notifications.added_to_wishlist')
      : t('Notifications.removed_from_wishlist'),
    image: product.value?.medias?.[0]?.url || '',
    isFavourite: isProductInWishlist.value,
  })
}

const checkInWishlistProduct = () => {
  return !!wishlistProducts.value?.find(
    (item: IWishlistProductWrapper) => item?.product?.slug === productSlug.value
  )
}

const setBreadcrumbs = () => {
  const categories: IProductCategory[] = product.value?.category || []
  const breadcrumbs: IBreadcrumbs[] = []

  if (categories.length) {
    categories.forEach((category: IProductCategory) => {
      breadcrumbs.push({
        name: category?.name,
        path: `/collections/${category?.slug}`,
      })
    })
  }

  if (product.value) {
    breadcrumbs.push({
      name: product.value?.name,
      path: '/',
    })
  }

  breadcrumbsStore.updateBreadcrumbs(breadcrumbs)
}

const handleScroll = () => {
  if (!isProductPageMobile.value) return

  const scroll = window.scrollY

  if (scroll > sliderMinimizeBottomLimit.value && isSliderMinimized.value) {
    return
  }

  if (scroll > sliderMinimizeTopLimit.value && !isSliderMinimized.value) {
    isSliderMinimized.value = true
    window.scrollTo({ top: sliderMinimizeTopLimit.value, behavior: 'smooth' })
  }

  if (scroll < sliderMinimizeBottomLimit.value && isSliderMinimized.value) {
    isSliderMinimized.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const openProductModal = () => {
  layoutStore.openModal(EModals.PRODUCT_MOBILE_MODAL)
}

const closeProductModal = () => {
  layoutStore.closeModal(EModals.PRODUCT_MOBILE_MODAL)
}

const handleProductButton = () => {
  if (isInCart.value && isSliderMinimized.value) {
    navigateTo('/cart')
  } else {
    addProductToCart()
  }
}

const addProductToCart = async () => {
  if (isSliderMinimized.value || !isMobile.value) {
    isLoading.value = true
    await cartStore.handleAddToCart(currentSize.value?.ean || '')

    toastProductAddedToCart({
      text: t('Notifications.added_to_cart'),
      image: product.value?.medias?.[0]?.url || '',
    })

    isLoading.value = false

    handleProductAdded()
  } else {
    openProductModal()
  }
}

const handleProductAdded = () => {
  layoutStore.openModal(EModals.PRODUCT_LOOKS)
}

onMounted(() => {
  if (isMobile.value) {
    isProductPageMobile.value = true

    window.addEventListener(
      'touchend',
      debounce(handleScroll, HANDLE_SCROLL_DEBOUNCE_DELAY)
    )
  }

  currentSize.value =
    product.value?.sizes.find((size: IProductSize) => size.stock > 0) || null

  setLatestProducts()

  setTimeout(() => {
    setBreadcrumbs()
  }, 0)

  isProductInWishlist.value = checkInWishlistProduct()
})

onBeforeUnmount(() => {
  if (isMobile.value) {
    isProductPageMobile.value = false

    window.removeEventListener('touchend', handleScroll)
  }

  breadcrumbsStore.clearBreadcrumbs()
})

watch(
  () => isMobile.value,
  (value: boolean) => {
    isSliderMinimized.value = false

    if (!value) {
      isProductPageMobile.value = false

      window.removeEventListener('touchend', handleScroll)
    } else {
      isProductPageMobile.value = true

      window.addEventListener(
        'touchend',
        debounce(handleScroll, HANDLE_SCROLL_DEBOUNCE_DELAY)
      )
    }

    window.scrollTo({ top: 0 })
  }
)

watch(
  () => isProductInWishlistStore.value,
  (value) => {
    isProductInWishlist.value = value
  }
)

const ProductSizeModal = defineAsyncComponent(
  () => import('~/components/modals/ProductSizeModal.vue')
)

const SizeHelperModal = defineAsyncComponent(
  () => import('~/components/modals/SizeHelperModal.vue')
)

const ProductLooksModal = defineAsyncComponent(
  () => import('~/components/product/ProductLooksModal.vue')
)

const ProductMobileModal = defineAsyncComponent(
  () => import('~/components/product/ProductMobileModal.vue')
)
</script>

<style lang="scss" scoped>
.page-product {
  position: relative;
}

.product-main-block {
  &__sliders {
    overflow: hidden;
  }
}

@include media-lg {
  .product-main-block {
    display: grid;
    grid-template-columns: calc(59% - 45px) calc(42% - 30px);
    padding: 0 20px;
    gap: 30px;

    &__slider {
      margin-bottom: 10px;
    }

    &__info {
      position: sticky;
      top: 20px;
      height: max-content;
      margin: 0;
    }
  }
}

@include media-xl {
  .product-main-block {
    display: grid;
    grid-template-columns: calc(59% - 45px) calc(42% - 30px);
    padding: 0 60px;
    gap: 62px;
  }
}

@include media-xxl {
  .product-main-block {
    grid-template-columns: calc(59% - 49px) calc(42% - 109px);
    gap: 127px;
    padding-left: calc((100vw - 1800px) / 2);
    padding-right: calc((100vw - 1800px) / 2);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-100%);
}
</style>
