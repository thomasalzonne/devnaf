<template>
  <div class="page-cart" :class="{ 'page-cart--empty': !cartItems?.length }">
    <template v-if="cartItems.length">
      <CheckoutHeader
        v-if="isMobile"
        @back="handleHeaderBack"
        @close="handleHeaderClose"
      />
      <div class="page-cart__wrapper">
        <div class="page-cart__body">
          <div class="page-cart__delivery-block">
            <DeliveryFreeBlock
              :price="total"
              :amount-to-free="shipmentTotalToFree"
            />
          </div>
          <div class="page-cart__header">
            <h2 class="page-cart__heading">{{ $t('Cart.my_cart') }}</h2>
            <p v-if="cartItems?.length" class="page-cart__subheading">
              {{ cartItems?.length }} <span>{{ $t('Cart.articles') }}</span>
            </p>
          </div>
          <div class="page-cart__products-block">
            <div class="page-cart__products-list">
              <CartProduct
                v-for="item in cartItems"
                :key="item.id"
                :item="item"
                :currency-code="cart?.currencyCode"
                class="page-card__product"
                @deleteItem="openDeleteModal"
                @changeQuantity="changeQuantity"
                @editProduct="editProduct"
              />
            </div>
          </div>
        </div>

        <CartInfo
          v-if="!isMobile"
          class="page-cart__info-block"
          :is-gift="isGift"
          :is-loading="isPending"
          @submit="goToCheckout"
          @toggleIsGift="toggleIsGift"
        />
      </div>

      <CartSlider
        v-if="latestViewedProducts?.length"
        class="page-cart__articles"
        :title="$t('Common.last_viewed_products')"
        squiggle="desktop"
        squiggle-color="#F3752E"
        :products="latestViewedProducts"
      />

      <AdvantagesBlock class="page-cart__advantages-block" />
      <CartTotal v-if="isMobile" @submit="goToCheckout" />
      <DeleteCartModal
        :item="itemForDelete"
        @confirm="deleteItem"
        @cancel="cancelDelete"
      />
      <CartModalEdit
        :product="editedProduct"
        @changeQuantity="changeQuantity"
      />
    </template>
    <template v-else>
      <CartEmpty />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import CartProduct from '~/components/cards/CartProduct.vue'
import CartInfo from '~/components/cart/CartInfo.vue'
import CartSlider from '~/components/cart/CartSlider.vue'
import AdvantagesBlock from '~/components/common/AdvantagesBlock.vue'
import CartTotal from '~/components/common/CartTotal.vue'
import DeliveryFreeBlock from '~/components/cart/DeliveryFreeBlock.vue'
import DeleteCartModal from '~~/components/cart/DeleteCartModal.vue'
import CartModalEdit from '~/components/cart/CartModalEdit.vue'
import CartEmpty from '~/components/cart/CartEmpty.vue'

import { useAuthStore } from '~~/store/auth'
import { EAuth } from '~~/constants/auth'
import { useCartStore } from '~~/store/cart'
import { ICart, ICartItem } from '~~/types/cart.interface'
import { useProductsStore } from '~~/store/products'
import { ICatalogProduct } from '~~/types/product.interface'
import { EStatus } from '~~/constants/status'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

definePageMeta({
  layout: 'checkout',
})

const authStore = useAuthStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const layoutStore = useLayoutStore()
const $router = useRouter()
const $route = useRoute()
const { t } = useI18n()
const { toastError } = useAppToast()

await useAsyncData('fetchCart', () => cartStore.fetchCart())

const itemForDelete = ref<ICartItem>(null)
const editedProduct = ref<ICartItem>(null)

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const cart = computed<ICart>(() => {
  return cartStore?.cart
})

const total = computed(() => {
  return transformPriceFromSylius(cart.value?.total)
})

const cartItems = computed<ICartItem[]>(() => {
  return (cart.value?.items as ICartItem[]) || []
})

const isSomeItemsNotAvailable = computed<boolean>(() => {
  return !!cartItems.value?.find((item: ICartItem) => !item?.variant?.inStock)
})

const latestViewedProducts = computed<ICatalogProduct[]>(() => {
  return productsStore?.latestProducts || []
})

const isGift = computed<boolean>(() => {
  return cart.value?.isGift
})

const isPending = computed(() => {
  return cartStore?.status === EStatus.PENDING
})

const shipmentTotalToFree = computed(() => {
  return transformPriceFromSylius(cart.value?.shipmentTotalToFree || 0)
})

const deleteItem = async (): Promise<void> => {
  await cartStore.removeItem(itemForDelete.value.id)

  layoutStore.closeModal(EModals.CART_DELETE)
}

const changeQuantity = async ({ id, quantity }): Promise<void> => {
  await cartStore.changeItemQuantity({ id, quantity })
}

const openDeleteModal = (id: number) => {
  itemForDelete.value = cartItems.value.find(
    (item: ICartItem) => item.id === id
  )

  layoutStore.openModal(EModals.CART_DELETE)
}

const cancelDelete = () => {
  itemForDelete.value = null
}

const goToCheckout = () => {
  if (isSomeItemsNotAvailable.value) {
    toastError({
      text: t('Cart.items_not_available'),
    })

    return
  }

  if (authStore.isAuthorized) {
    $router.push('/checkout')
  } else {
    const query = { ...$route.query }

    query.authAction = EAuth.PRE_AUTH
    query.checkoutFlow = '1'

    $router.push({ query })
  }
}

const toggleIsGift = async (isGift: boolean) => {
  await cartStore.toggleIsGift(isGift)
}

const editProduct = (product: ICartItem) => {
  editedProduct.value = product

  layoutStore.openModal(EModals.CART_EDIT_PRODUCT)
}

const handleHeaderBack = () => {
  if ($route.query.authAction) {
    $router.back()
  }

  if (layoutStore.isOpenSomeModal) {
    layoutStore.closeAllModals()
  }
}

const handleHeaderClose = () => {
  if (layoutStore.isOpenSomeModal) {
    layoutStore.closeAllModals()
  } else {
    navigateTo('/')
  }
}

watch(
  () => cartItems.value,
  (value: ICartItem[]) => {
    if (!value?.length) $router.push('/')
  }
)

onMounted(() => {
  if (!cart.value) {
    navigateTo('/')
  }
})
</script>

<style lang="scss" scoped>
.page-cart {
  display: grid;
  grid-template-columns: 100%;
  padding-bottom: 175px;

  &--empty {
    margin-top: -75px;
    height: 100vh;
    padding-bottom: 0;
  }

  &__body {
    display: grid;
    grid-template-columns: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0px 12px 0px;
    width: 100%;
    background-color: $color-white;
    order: 0;
    width: 100%;
    gap: 10px;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }

  &__subheading {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 14px;
    line-height: 18px;

    span {
      display: none;
    }
  }

  &__line-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-black;
    white-space: nowrap;
    display: flex;
    gap: 5px;
    align-items: baseline;

    & :deep(span) {
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      color: $color-yellow;
    }
  }

  &__products-block {
    order: 1;
  }

  &__products-list {
    margin: 33px 20px 20px;
    padding: 0;
  }

  &__info-block {
    margin: 20px 20px 20px;
  }

  &__articles {
    margin-top: 20px;
    padding-top: 9px;
    margin-bottom: 49px;
    overflow: hidden;
  }

  &__delivery-block {
    order: 1;
    display: flex;
    align-items: center;
    padding: 0px 20px 0px 20px;
    width: 100%;
    background-color: $color-white;
  }
}

@include media-lg {
  .page-cart {
    &__header {
      padding: 26px 0px 24px 0px;
      margin: 0 auto;
      max-width: calc($container-width + 120px);
      justify-content: flex-start;
      order: 1;
    }

    &__body {
      display: block;
    }

    &__delivery-block {
      padding: 19px 0px 27px 0px;
      order: 0;
    }

    &__heading {
      font-weight: 480;
      font-size: 36px;
      line-height: 44px;
    }

    &__subheading {
      margin-left: 25px;
      font-size: 24px;
      line-height: 31px;

      span {
        display: inline;
      }
    }

    &__wrapper {
      display: grid;
      grid-template-columns: calc(64% - 33px) calc(36% - 30px);
      padding: 0 60px;
      gap: 63px;
      max-width: calc($container-width + 120px);
      margin: 0 auto;
      width: 100%;
      min-height: 80vh;
    }

    &__products-block {
      order: 2;
    }

    &__products-list {
      border: 1px solid $color-medium-grey;
      border-radius: 10px;
      margin: 0;
      padding: 36px 24px 36px 37px;
    }

    &__info-block {
      margin: 0;
      margin-top: 19px;
      position: sticky;
      top: calc($header-height-desktop + 20px);
      height: max-content;
    }

    &__articles {
      margin-top: 200px;
      padding-top: 0px;
      margin-bottom: 0px;
      padding-bottom: 0;
    }

    &__advantages-block {
      display: grid;
    }

    &__looks {
      margin-top: 200px;
    }
  }
}

@include media-xl {
  .page-cart {
    &__wrapper {
      padding: 0 122px;
      max-width: calc($container-width + 344px);
    }
  }
}
</style>
