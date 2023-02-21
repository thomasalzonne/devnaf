<template>
  <div class="account-info-block">
    <div class="account-info-block__header">
      <div class="account-info-block__header-content">
        <p class="account-info-block__heading">
          {{ $t('Account.hello', { n: firstName }) }}
        </p>
        <p v-if="userEmail" class="account-info-block__email">
          {{ userEmail }}
        </p>
      </div>
      <AppButton :title="$t('Common.logout')" @click="logout" />

      <!-- <AccountBirthday /> -->
    </div>
    <!-- <AccountPoints :points="loyaltyPoints" /> -->
    <!-- <AccountMorphology /> -->
    <!-- <AccountColors /> -->
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import { useAuthStore } from '~~/store/auth'
import { useProfileStore } from '~~/store/profile'
// import AccountBirthday from '~/components/account/AccountBirthday.vue'
// import AccountMorphology from '~/components/account/AccountMorphology.vue'
// import AccountColors from '~/components/account/AccountColors.vue'

const profileStore = useProfileStore()
const authStore = useAuthStore()

const firstName = computed(() => {
  return profileStore.profile?.firstName || ''
})

// const loyaltyPoints = computed<number>(() => {
//   return profileStore.profile?.loyaltyPointsAccount || 0
// })

const userEmail = computed(() => {
  const isFakeEmail = profileStore.profile?.user?.isFakeEmail

  return !isFakeEmail ? profileStore.profile?.email || '' : ''
})

const logout = () => {
  authStore.logout()
  navigateTo('/')
}
</script>

<style lang="scss" scoped>
.account-info-block {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  &__heading {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
  }

  &__email {
    font-size: 14px;
    color: $color-grey;
    line-height: 20px;
    margin-bottom: 20px;
  }

  & :deep() {
    .app-button {
      height: 40px;
      padding: 5px;
      min-height: 45px;

      &__title {
        font-size: 16px;
      }
    }
  }
}

@include media-xl {
  .account-info-block {
    margin-bottom: 40px;

    &__heading {
      font-size: 80px;
      line-height: 80px;
    }

    &__email {
      font-size: 16px;
      margin-top: 16px;
      margin-bottom: 16px;
    }

    & :deep() {
      .app-button {
        display: none;
      }
    }
  }
}
</style>
