<template>
  <AppModalWrapper
    class="cart-modal"
    :class="{ 'cart-modal--empty': !itemsQuantity }"
    :is-open="isOpen"
    :is-close-on-click-outside="true"
    :is-show-header="true"
    @close="closeModal"
  >
    <template #header>
      <div class="cart-modal__header">
        <p class="cart-modal__title">
          {{ $t('CartModal.title') }}
        </p>
        <p v-if="itemsQuantity" class="cart-modal__count">
          {{ itemsQuantity }} {{ $t('Cart.articles') }}
        </p>
      </div>
    </template>

    <div
      class="cart-modal__body"
      :class="{ 'cart-modal__body--empty': !itemsQuantity }"
    >
      <CartModalContent v-if="itemsQuantity" @go-to-cart="goToCart" />
      <CartModalEmptyContent v-else @closeModal="closeModal" />
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import CartModalEmptyContent from '~/components/cart/CartModalEmptyContent.vue'
import CartModalContent from '~/components/cart/CartModalContent.vue'

import { useCartStore } from '~~/store/cart'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

const isOpen = computed(() => {
  return layoutStore.modals[EModals.CART]
})

watch(
  () => isOpen.value,
  (value) => {
    value
      ? layoutStore.openModal(EModals.CART)
      : layoutStore.closeModal(EModals.CART)

    if (route.query?.authAction && value) {
      const query = { ...route.query }

      delete query.authAction

      router.replace({ query })
    }
  }
)

watch(
  () => route.query,
  () => {
    if (isOpen.value && route.query.authAction) {
      closeModal()
    }
  }
)

const itemsQuantity = computed(() => {
  return cartStore.itemsQuantity || 0
})

const closeModal = () => {
  layoutStore.closeModal(EModals.CART)
}

const goToCart = () => {
  router.push('/cart')

  closeModal()
}
</script>

<style lang="scss" scoped>
.cart-modal {
  & :deep(.app-modal-wrapper__body) {
    margin-top: 0;
  }

  &__body {
    padding: 20px 0px;
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    width: 100%;
    margin-top: 5px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 24px;
    line-height: 44px;
  }

  &__count {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 16px;
    line-height: 21px;
    margin-top: 4px;
  }
}

@include media-lg {
  .cart-modal {
    &__header {
      justify-content: flex-start;
      margin-top: 0px;
    }

    &__body {
      padding: 0;
      padding-right: 5px;
    }

    & :deep(.app-modal-wrapper__wrapper) {
      overflow: hidden;
    }

    & :deep(.app-modal-wrapper__body) {
      padding-left: 29px;
      padding-right: 26px;
      padding-top: 0px;
    }

    & :deep(.app-modal-wrapper__header) {
      padding-left: 29px;
      padding-right: 26px;
      padding-top: 11px;
    }

    &--empty {
      .cart-modal__body {
        padding: 0;
      }

      & :deep() {
        .app-modal-wrapper {
          &__header {
            display: none;
          }

          &__body {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
