<template>
  <div class="account-navigation">
    <div class="account-navigation__list">
      <AccountNavigationItem
        v-for="(item, i) in items"
        :key="i"
        :item="item"
        :active-scope="activeScope"
        @click="handleClick"
        @setActiveScope="setActiveScope"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AccountNavigationItem from './AccountNavigationItem.vue'
import { useAuthStore } from '~~/store/auth'
import { IProfileNavigationItem } from '~~/types/profile.interface'

const authStore = useAuthStore()
const { t } = useI18n()

const logout = () => {
  authStore.logout()
  navigateTo('/')
}

const activeScope = ref('account')

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

const handleClick = (callback) => {
  callback()
}

const setActiveScope = (scope: string) => {
  activeScope.value = scope
}
</script>

<style lang="scss" scoped>
.account-navigation {
  margin-top: 20px;

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
}

@include media-lg {
  .account-navigation {
    max-width: 424px;
    top: calc($header-height-desktop + 46px);
    height: max-content;
    margin: 0;
    position: sticky;

    &__list {
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      box-shadow: none;
    }
  }
}
</style>
