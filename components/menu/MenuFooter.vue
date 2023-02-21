<template>
  <div class="menu-footer">
    <button class="menu-footer__item" @click="goToHome">
      <div class="menu-footer__footer-icon-container">
        <SvgIcon class="menu-footer__item-icon" name="menu_home" />
      </div>
      <span class="menu-footer__item-title">
        {{ $t('ErrorPage.button_title') }}
      </span>
    </button>
    <button class="menu-footer__item" @click="openLoginModal">
      <div class="menu-footer__footer-icon-container">
        <SvgIcon class="menu-footer__item-icon" name="menu_account" />
      </div>
      <span class="menu-footer__item-title">
        {{ isAuthorized ? firstName : $t('Account.account') }}
      </span>
    </button>
    <button class="menu-footer__item" @click="openCartModal">
      <div class="menu-footer__footer-icon-container">
        <SvgIcon
          class="menu-footer__item-icon menu-footer__item-icon--white"
          name="bag"
        />
        <div v-if="cartItemsQuantity" class="menu-footer__item-badge">
          {{ cartItemsQuantity }}
        </div>
      </div>
      <span class="menu-footer__item-title"> {{ $t('Common.cart') }} </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { EAuth } from '~~/constants/auth'
import { EModals } from '~~/constants/modals'
import { useAuthStore } from '~~/store/auth'
import { useCartStore } from '~~/store/cart'
import { useLayoutStore } from '~~/store/layout'
import { useProfileStore } from '~~/store/profile'

const $route = useRoute()
const $router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const cartStore = useCartStore()
const layoutStore = useLayoutStore()
const emit = defineEmits(['close-modal'])

const isAuthorized = computed(() => {
  return authStore.isAuthorized
})

const firstName = computed(() => {
  return profileStore.profile?.firstName || ''
})

const cartItemsQuantity = computed(() => {
  return cartStore.itemsQuantity || 0
})

const openLoginModal = (): void => {
  const query = $route.query

  if (!isAuthorized.value) {
    $router.push({ query: { ...query, authAction: EAuth.LOGIN } })
  } else {
    $router.push('/account')
  }
}

const openCartModal = () => {
  layoutStore.openModal(EModals.CART)
}

const goToHome = () => {
  $router.push('/')

  if (layoutStore.modals[EModals.CART]) {
    layoutStore.closeModal(EModals.CART)
  }

  emit('close-modal')
}
</script>

<style lang="scss" scoped>
.menu-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: $color-pink;
  height: 72px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  border-radius: 6px 6px 0 0;
  padding: 16px 12px 5px 12px;
  width: 100%;
  z-index: 120;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__item-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    color: $color-white;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    max-width: calc(100vw / 3);
  }

  &__item-icon {
    width: 20px;
    height: 20px;

    &--white {
      color: $color-white;
    }
  }

  &__footer-icon-container {
    position: relative;
  }

  &__item-badge {
    position: absolute;
    top: -4px;
    right: -8px;
    background-color: $color-black;
    color: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
  }
}

@include media-lg {
  .menu-footer {
    display: none;
  }
}
</style>
