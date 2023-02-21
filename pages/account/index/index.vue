<template>
  <div class="page-preferences">
    <AccountMobilePageHeader
      icon="account"
      :title="$t('Account.my_personal_info')"
      :is-child="true"
      :navigation="navigationItems.children"
      @back="goBack"
    />
    <p class="page-preferences__heading">
      {{ $t('Account.my_personal_info') }}
    </p>
    <div class="page-preferences__main">
      <AccountUserInfoPreferences />
      <AccountUserPasswordPreferences v-if="!isFakeEmail" />
    </div>
    <!-- <div class="page-preferences__remove">
      <RemoveAccountBlock />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import AccountUserInfoPreferences from '~/components/account/AccountUserInfoPreferences.vue'
import AccountUserPasswordPreferences from '~/components/account/AccountUserPasswordPreferences.vue'
// import RemoveAccountBlock from '~/components/account/RemoveAccountBlock.vue'
import AccountMobilePageHeader from '~/components/account/AccountMobilePageHeader.vue'
import { useProfileStore } from '~~/store/profile'
import { IProfileNavigationItem } from '~~/types/profile.interface'

const profileStore = useProfileStore()

const isFakeEmail = computed(() => {
  return !!profileStore.profile?.user?.isFakeEmail
})

const { navigation } = useAccountNavigation()

const navigationItems = computed(() => {
  return navigation.find(
    (item: IProfileNavigationItem) => item.scope === 'account'
  )
})

const goBack = () => {
  useRouter().back()
}
</script>

<style lang="scss" scoped>
.page-preferences {
  padding-bottom: 45px;
  &__heading {
    display: none;
    font-weight: 480;
    font-size: 36px;
    line-height: 44px;
    font-family: $font-secondary;
    margin-left: 10px;
  }

  &__main {
    display: grid;
    margin-top: 19px;
    gap: 39px;
    padding: 0 20px;
  }

  &__remove {
    padding: 0 20px;
    margin-top: 49px;
  }
}

@include media-lg {
  .page-preferences {
    margin-left: 5px;

    &__heading {
      display: block;
    }

    &__main {
      margin-top: 30px;
      gap: 30px;
      padding: 0;
    }

    &__remove {
      margin-top: 30px;
      padding: 0;
    }
  }
}

@media screen and (min-width: 1280px) {
  .page-preferences {
    &__main {
      grid-template-columns: 52% calc(48% - 35px);
      gap: 35px;
    }

    &__remove {
      margin-top: 71px;
    }
  }
}

@media screen and (min-width: 2560px) {
  .page-preferences {
    &__remove {
      display: grid;
      grid-template-columns: 52% 48%;
    }
  }
}
</style>
