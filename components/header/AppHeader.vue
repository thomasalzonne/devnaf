<template>
  <header
    ref="header"
    v-click-outside="closeMenu"
    class="header"
    :class="{
      'header--with-search': isShowSeachInput,
      'header--opacity': isOpacity,
    }"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
  >
    <div class="header__container">
      <NuxtLink to="/" class="header__logo">
        <SvgIcon class="header__logo-icon" name="logo" />
      </NuxtLink>
      <div class="header__center">
        <HeaderSearch
          v-if="isShowSeachInput"
          :is-active="isOpenSearchModal"
          :is-opacity="isOpacity"
          @handleClick="openSearchModal"
          @closeSearch="closeSearchModal"
        />
        <HeaderCategories
          class="header__categories"
          :categories="categories"
          :active-category-slug="activeCategory?.slug || null"
          :is-opacity="isOpacity"
          @select-category="openMegaMenu"
        />
      </div>

      <HeaderNavigation
        class="header__nav"
        :class="{ 'header__nav--hide': isOpenMenu }"
        :is-authorized="isAuthorized"
        :is-error-page="isErrorPage"
        :is-show-search-button="!isShowSeachInput || isMobile"
        :is-open-mobile-menu="isOpenMobileMenu"
        :is-open-account-menu="isOpenMobileAccountMenu"
        :is-opacity="isOpacity"
        @open-search="toggleSearch"
        @open-cart="openCartModal"
        @openMobileMenu="toggleMobileMenu"
      />
    </div>
    <MegaMenu
      :is-open="!!activeCategory"
      :group="activeCategory"
      @close="closeMenu"
    />
    <MobileMenu
      :is-open="isOpenMobileMenu"
      :navigations="categories"
      @close="closeMobileMenu"
    />
    <MobileAccountMenu
      :is-open="isOpenMobileAccountMenu"
      @close="closeMobileAccountMenu"
    />
  </header>
</template>

<script lang="ts" setup>
import HeaderCategories from './HeaderCategories.vue'
import HeaderNavigation from './HeaderNavigation.vue'
import HeaderSearch from './HeaderSearch.vue'
import { useAuthStore } from '~~/store/auth'
import { EModals } from '~~/constants/modals'
import { useLayoutStore } from '~~/store/layout'
import { useCommonStore } from '~~/store/common'
import { INavigationItem } from '~~/types/divat.interface'

interface IProps {
  isErrorPage?: boolean
}

withDefaults(defineProps<IProps>(), {
  isErrorPage: false,
})

const layoutStore = useLayoutStore()
const commonStore = useCommonStore()
const authStore = useAuthStore()
const route = useRoute()
const isShowSeachInput = ref(true)
const activeCategory = ref<INavigationItem>(null)
const header = ref(null)
const isHeaderHovered = ref(false)

const COLLECTIONS_PAGE_NAME = 'collections-collection'

const isAuthorized = computed(() => {
  return authStore.isAuthorized
})

const isOpenSearchModal = computed(() => {
  return layoutStore.modals[EModals.SEARCH]
})

const isOpenMenu = computed(() => {
  return layoutStore.modals[EModals.MENU]
})

const isMobile = computed(() => {
  return layoutStore.windowWidth < 992
})

const categories = computed(() => {
  return commonStore?.data?.navigations?.main || []
})

const isOpenMobileMenu = computed(() => {
  return layoutStore.modals[EModals.MOBILE_MENU]
})

const scrollTop = computed(() => {
  return layoutStore.scrollTop || 0
})

const isCollectionPage = computed(() => {
  return route.name === 'collections-collection'
})

const isOpenMobileAccountMenu = computed(() => {
  return layoutStore.modals[EModals.MOBILE_ACCOUNT_MENU]
})

const collectionTopPercentage = computed(() => {
  return layoutStore.collectionTopPercentage
})

const isOpenSomeModal = computed(() => {
  return layoutStore.isOpenSomeModal
})

const isOpacity = computed(() => {
  if (!isCollectionPage.value) return false

  return (
    collectionTopPercentage.value < 0.8 &&
    !isOpenSomeModal.value &&
    !isHeaderHovered.value
  )
})

const openMegaMenu = (category: INavigationItem) => {
  if (activeCategory.value?.slug === category.slug) return

  activeCategory.value = category
}

const closeMenu = (): void => {
  activeCategory.value = null
}

const openSearchModal = (): void => {
  layoutStore.openModal(EModals.SEARCH)
}

const toggleSearch = (): void => {
  isShowSeachInput.value = !isShowSeachInput.value
}

const closeSearchModal = (): void => {
  layoutStore.closeModal(EModals.SEARCH)
}

const openCartModal = (): void => {
  isMobile.value ? navigateTo('/cart') : layoutStore.openModal(EModals.CART)
}

const toggleMobileMenu = (): void => {
  isOpenMobileMenu.value ? closeMobileMenu() : openMobileMenu()
}

const openMobileMenu = () => {
  layoutStore.openModal(EModals.MOBILE_MENU)
}

const closeMobileMenu = () => {
  layoutStore.closeModal(EModals.MOBILE_MENU)
}

const closeMobileAccountMenu = () => {
  layoutStore.closeModal(EModals.MOBILE_ACCOUNT_MENU)
}

const calcHeaderHeight = () => {
  if (isShowSeachInput.value) {
    layoutStore.headerHeight = 120
  } else {
    layoutStore.headerHeight = 80
  }
}

const handleMouseEnter = () => {
  isHeaderHovered.value = true
}

const handleMouseLeave = () => {
  isHeaderHovered.value = false

  closeMenu()
}

watch(
  () => route.name,
  (name: string, oldName: string) => {
    if (name !== oldName) {
      if (name === COLLECTIONS_PAGE_NAME) {
        isShowSeachInput.value = false
      } else {
        isShowSeachInput.value = true
      }
    }
  },
  {
    immediate: true,
  }
)

watch(
  () => scrollTop.value,
  debounce((value, oldValue) => {
    if (route.name !== COLLECTIONS_PAGE_NAME) {
      return
    }

    Math.round(value) > Math.round(oldValue)
      ? (isShowSeachInput.value = false)
      : (isShowSeachInput.value = true)
  }, 200)
)

watch(
  () => isShowSeachInput.value,
  () => {
    calcHeaderHeight()
  }
)

onMounted(() => {
  calcHeaderHeight()
})

onUnmounted(() => {
  layoutStore.closeAllModals()
})

const MegaMenu = defineAsyncComponent(
  () => import('~/components/menu/MegaMenu.vue')
)

const MobileMenu = defineAsyncComponent(
  () => import('~/components/menu/MobileMenu.vue')
)

const MobileAccountMenu = defineAsyncComponent(
  () => import('~/components/menu/MobileAccountMenu.vue')
)
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 22px 20px 23px 18px;
  background-color: $color-white;
  position: relative;
  max-height: $header-height-mobile;

  &__nav {
    margin-left: auto;

    &--hide {
      display: none;
    }
  }

  &__logo {
    width: 119px;
    height: 30px;
  }

  &__logo-icon {
    width: 119px;
    height: 30px;
  }

  &__container {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__center {
    display: none;
    flex-direction: column;
    justify-content: center;
    padding: 0 36px 0 47px;
    width: 100%;

    &--active {
      .header__categories {
        margin-top: 13px;
      }
    }
  }
}

@include media-lg {
  .header {
    padding: 20px 0px 15px 0px;
    max-height: $header-height-desktop;
    box-shadow: $header-box-shadow;
    backdrop-filter: blur(5px);
    transition: all 200ms ease-in-out;

    &--opacity {
      background-color: rgba($color: $color-white, $alpha: 0.1);

      .header {
        &__logo-icon {
          color: $color-white;
        }
      }
    }

    &--with-search {
      max-height: 120px;

      .header {
        &__container {
          align-items: flex-start;
        }

        &__categories {
          margin-top: 13px;
        }

        &__nav {
          margin-top: 10px;
        }
      }
    }

    &__logo {
      width: 162px;
      height: 41px;
      margin-top: 3px;
    }

    &__logo-icon {
      width: 162px;
      height: 41px;
    }

    &__container {
      padding: 0 60px 0 61px;
    }

    &__nav {
      &--hide {
        display: block;
      }
    }

    &__center {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
