<template>
  <header ref="header" class="checkout-header">
    <div class="checkout-header__container">
      <BackButton
        v-if="isPageWithBackButton || (isPaymentFromOrder && !isMobile)"
        class="checkout-header__back"
        @back="goBack"
      />
      <NuxtLink to="/" class="checkout-header__logo">
        <SvgIcon class="checkout-header__logo-icon" name="logo" />
      </NuxtLink>

      <button class="checkout-header__icon-container" @click="goBack">
        <SvgIcon
          class="checkout-header__icon checkout-header__icon--arrow"
          name="arrow_left"
        />
      </button>
      <div class="checkout-header__center">
        <CheckoutSteps />
      </div>
      <button class="checkout-header__icon-container" @click="close">
        <SvgIcon
          class="checkout-header__icon checkout-header__icon--close"
          name="close"
        />
      </button>

      <HeaderNavigation
        class="checkout-header__nav"
        :class="{ 'checkout-header__nav--hide': isOpenMenu }"
        :is-open-search="isShowSearch"
        :is-authorized="isAuthorized"
        :is-error-page="false"
        :is-show-search-button="false"
        @open-search="toggleSearch"
        @open-cart="openCartModal"
      />
    </div>
    <CartModal :is-open="isOpenCartModal" @close="closeCartModal" />
  </header>
</template>

<script lang="ts" setup>
import CheckoutSteps from './CheckoutSteps.vue'
import HeaderNavigation from '~/components/header/HeaderNavigation.vue'
import CartModal from '~/components/cart/CartModal.vue'
import BackButton from '~/components/common/BackButton.vue'
import { useAuthStore } from '~~/store/auth'
import { EModals } from '~~/constants/modals'
import { useLayoutStore } from '~~/store/layout'

const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const route = useRoute()

const emit = defineEmits(['back', 'close'])

const isShowSearch = ref(false)

const isAuthorized = computed(() => {
  return authStore.isAuthorized
})

const isOpenCartModal = computed(() => {
  return layoutStore.modals[EModals.CART]
})

const isOpenSearchModal = computed(() => {
  return layoutStore.modals[EModals.SEARCH]
})

const isOpenMenu = computed(() => {
  return layoutStore.modals[EModals.MENU]
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const isPaymentFromOrder = computed(() => {
  return !!route?.query?.order
})

const isPageWithBackButton = computed(() => {
  return route.name.toString().includes('checkout-index')
})

const toggleSearch = (): void => {
  isOpenSearchModal.value
    ? layoutStore.closeModal(EModals.SEARCH)
    : layoutStore.openModal(EModals.SEARCH)
}

const openCartModal = (): void => {
  layoutStore.openModal(EModals.CART)
}

const closeCartModal = (): void => {
  layoutStore.closeModal(EModals.CART)
}

const goBack = (): void => {
  if (isMobile.value) {
    emit('back')
  } else {
    if (route.name === 'checkout-index') {
      navigateTo('/cart')
    }

    if (route.name === 'checkout-index-payment') {
      navigateTo('/checkout')
    }
  }
}

const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.checkout-header {
  display: flex;
  align-items: center;
  padding: 22px 15px 14px 18px;
  background-color: $color-white;
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: $header-height-mobile;
  margin: 0 auto;
  z-index: 2000;

  &__logo {
    display: none;
  }

  &__logo-icon {
    width: 162px;
    height: 41px;
  }

  &__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  &__back {
    display: none;
    margin-top: -10px;
  }

  &__nav {
    display: none;
  }

  &__icon-container {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -15px;
  }

  &__icon {
    width: 20px;
    height: 20px;

    &--close {
      width: 15px;
      height: 15px;
    }
  }
}

@include media-lg {
  .checkout-header {
    position: static;
    padding: 20px 0px 15px 0px;
    max-height: 83px;
    left: initial;
    top: initial;
    box-shadow: $header-box-shadow;
    height: $header-height-desktop;
    width: 100%;
    margin: 0;
    transform: unset;

    &__logo {
      display: inline-block;
      width: 162px;
      height: 41px;
      margin-top: 5px;
    }

    &__logo-icon {
      width: 162px;
      height: 41px;
    }

    &__container {
      padding: 0 60px 0 58px;
    }

    &__back {
      display: flex;
      margin-right: 50px;
    }

    &__nav {
      display: flex;
    }

    &__icon-container {
      display: none;
    }
  }
}
</style>
