<template>
  <Transition name="slide">
    <div v-if="isOpen" class="mobile-menu" @click="closeMenu">
      <div class="mobile-menu__body" @click.stop="">
        <MobileAccountMenuItem
          v-for="(item, i) in items"
          :key="i"
          :item="item"
          :active-scope="activeScope"
          @setActiveScope="setActiveScope"
          @click="item.callback"
        />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { INavigationItem } from '~~/types/divat.interface'
import { IProfileNavigationItem } from '~~/types/profile.interface'

import MobileAccountMenuItem from '~/components/menu/MobileAccountMenuItem.vue'
import { useAuthStore } from '~~/store/auth'

interface IProps {
  isOpen: boolean
  navigations?: INavigationItem[]
}

const emit = defineEmits(['close'])
const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()

const activeScope = ref('')

withDefaults(defineProps<IProps>(), {
  isOpen: false,
  navigations: null,
})

const logout = () => {
  authStore.logout()
  navigateTo('/')

  closeMenu()
}

const items: IProfileNavigationItem[] = [
  {
    title: t('Account.my_orders'),
    iconName: 'bag_outline',
    to: '/account/orders',
    disable: false,
    scope: 'orders',
  },
  {
    title: t('Account.my_profile'),
    iconName: 'account',
    disable: false,
    scope: 'account',
    children: [
      {
        title: t('Account.my_personal_info'),
        to: '/account',
        disable: false,
        scope: 'account',
      },
      {
        title: t('Account.my_addresses'),
        to: '/account/addresses',
        disable: false,
        scope: 'account',
      },
      {
        title: t('Account.my_favourite_store'),
        to: '/account/store',
        disable: true,
        scope: 'account',
      },
      {
        title: t('Account.my_payments'),
        to: '/account/payment',
        disable: false,
        scope: 'account',
      },
      {
        title: t('Account.my_subscriptions'),
        to: '/account/subscriptions',
        disable: false,
        scope: 'account',
      },
    ],
  },
  {
    title: t('Account.my_favourites'),
    iconName: 'heart_nav',
    to: '/account/favourites',
    disable: false,
    scope: 'favourite',
  },
  {
    title: t('Account.need_help'),
    iconName: 'info',
    to: '/account/faq',
    disable: false,
    scope: 'info',
  },
  {
    title: t('Account.logout'),
    iconName: 'logout',
    callback: logout,
    disable: false,
    scope: 'logout',
  },
]

watch(
  () => route.path,
  () => {
    closeMenu()
  }
)

const setActiveScope = (scope: string) => {
  activeScope.value = scope
}

const closeMenu = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.mobile-menu {
  height: calc(100vh - $header-height-mobile);
  width: 100vw;
  position: fixed;
  bottom: $header-height-mobile;
  left: 0;
  background-color: rgba($color: $color-black, $alpha: 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-end;

  &__body {
    background-color: $color-white;
    overflow-x: hidden;
    overflow: auto;
    height: auto;
    width: 100%;
    padding: 6px 21px 66px 20px;
  }

  &__search {
    margin-bottom: 15px;
  }

  &__search-container {
    padding: 20px;
  }

  &__nav-container {
    padding: 0 20px 20px;
  }

  &__images {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    justify-content: flex-start;
    gap: 28px;
    width: 100%;
    margin-top: 13px;
  }

  &__image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 163px;
  }

  &__image {
    object-fit: cover;
    height: 100%;
    width: 100%;
    object-position: top;
  }

  &__image-text {
    font-family: $font-secondary;
    position: absolute;
    font-weight: 480;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    text-transform: uppercase;
    color: $color-white;
    width: min-content;
    text-shadow: -1px 0 $color-black, 0 1px $color-black, 1px 0 $color-black,
      0 -1px $color-black;
    opacity: 0.8;
  }
}

@include media-lg {
  .mobile-menu {
    display: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;

  .mobile-menu__body {
    transition: all 0.3s ease-in-out;
  }
}

.slide-enter-from,
.slide-leave-to {
  .mobile-menu__body {
    transform: translateY(100%);
  }
}
</style>
