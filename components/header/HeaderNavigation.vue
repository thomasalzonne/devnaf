<template>
  <div class="header-nav" :class="{ 'header-nav--opacity': isOpacity }">
    <div class="header-nav__container">
      <template v-if="isMobile">
        <HeaderNavigationItem
          v-if="isShowSearchButton"
          class="header-nav__search"
          :is-disabled="isErrorPage"
          :is-active="isOpenMobileMenu"
          icon="search_alt"
          @trigger="openMobileMenu"
        />

        <HeaderNavigationItem
          class="header-nav__cart"
          :is-disabled="isErrorPage"
          :badge-value="cartItemsQuantity"
          icon="bag_outline"
          @trigger="openCart"
        />

        <HeaderNavigationItem
          class="header-nav__favourites"
          :is-disabled="isErrorPage"
          icon="heart_nav"
          :badge-value="wishlistItemsQuantity"
          @trigger="goToFavourites"
        />

        <HeaderNavigationItem
          class="header-nav__account"
          :is-disabled="isErrorPage"
          :is-active="isActiveAccount"
          icon="account"
          @trigger="openLoginModal"
        />
      </template>

      <template v-else>
        <HeaderNavigationItem
          v-if="isShowSearchButton"
          class="header-nav__search"
          :is-disabled="isErrorPage"
          icon="search"
          @trigger="openSearchModal"
        />

        <HeaderNavigationItem
          class="header-nav__account"
          :is-disabled="isErrorPage"
          icon="account"
          @trigger="openLoginModal"
        />

        <HeaderNavigationItem
          class="header-nav__favourites"
          :is-disabled="isErrorPage"
          icon="heart_nav"
          :badge-value="wishlistItemsQuantity"
          @trigger="goToFavourites"
        />

        <HeaderNavigationItem
          class="header-nav__cart"
          :is-disabled="isErrorPage"
          :badge-value="cartItemsQuantity"
          icon="bag_outline"
          @trigger="openCart"
        />

        <HeaderNavigationItem
          class="header-nav__pin"
          :is-disabled="isErrorPage"
          icon="pin_outline"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderNavigationItem from '~/components/header/HeaderNavigationItem.vue'

import { EAuth } from '~~/constants/auth'
import { useWishlistStore } from '~~/store/wishlist'
import { useCartStore } from '~~/store/cart'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

interface IProps {
  isOpenSearch?: boolean
  isAuthorized: boolean
  isErrorPage: boolean
  isShowSearchButton?: boolean
  isOpenMobileMenu?: boolean
  isOpenAccountMenu?: boolean
  isOpacity: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  isOpenSearch: false,
  isAuthorized: false,
  isErrorPage: false,
  isShowSearchButton: true,
  isOpenMobileMenu: false,
  isOpenAccountMenu: false,
  isOpacity: false,
})
const emit = defineEmits([
  'open-search',
  'open-cart',
  'openMobileMenu',
  'openMobileAccountMenu',
])

const router = useRouter()
const route = useRoute()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const layoutStore = useLayoutStore()

const wishlistItemsQuantity = computed<number>(() => {
  return wishlistStore?.wishlist?.wishlistProducts?.length || 0
})

const cartItemsQuantity = computed<number>(() => {
  return cartStore?.itemsQuantity || 0
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const isActiveAccount = computed(() => {
  return props.isOpenAccountMenu || (isMobile && route.path.includes('account'))
})

const openSearchModal = () => {
  emit('open-search', 'openMobileMenu')
}

const openLoginModal = () => {
  if (!props.isAuthorized) {
    router.push({
      query: { ...route.query, authAction: EAuth.LOGIN },
    })

    return
  }

  if (isMobile.value) {
    props.isOpenAccountMenu
      ? layoutStore.closeModal(EModals.MOBILE_ACCOUNT_MENU)
      : layoutStore.openModal(EModals.MOBILE_ACCOUNT_MENU)

    return
  }

  router.push('/account')
}

const openCart = () => {
  emit('open-cart')
}

const goToFavourites = () => {
  props.isAuthorized
    ? router.push('/account/favourites')
    : router.push('/wishlist')
}

const openMobileMenu = () => {
  emit('openMobileMenu')
}
</script>

<style lang="scss" scoped>
.header-nav {
  &--opacity {
    & :deep() {
      .header-navigation-item {
        color: $color-white;
      }
    }
  }

  &__container {
    display: flex;
    align-items: flex-start;
    gap: 25px;
  }

  &__pin {
    display: none;
  }
}

@include media-lg {
  .header-nav {
    &__container {
      gap: 34px;
      display: flex;
      margin-right: 0px;
    }

    &__pin {
      display: block;
    }
  }
}
</style>
