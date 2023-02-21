<template>
  <div class="page-subscriptions">
    <AccountMobilePageHeader
      icon="account"
      :title="$t('Account.my_subscriptions')"
      :is-child="true"
      :navigation="navigationItems.children"
      @back="goBack"
    />
    <p class="account-page-header page-subscriptions__header">
      {{ $t('Account.my_subscriptions') }}
    </p>
    <div class="page-subscriptions__content">
      <AppContentCard class="page-subscriptions__card">
        <template #header>
          <div class="page-subscriptions__card-header">
            <p class="account-card-header">
              {{ $t('Account.newsletter_title') }}
            </p>
            <AppToggle
              v-model="isSubscribedToNewsletter"
              class="page-subscriptions__toggle-mobile"
            />
          </div>
        </template>
        <template #body>
          <div class="page-subscriptions__card-body">
            <div>
              <p class="page-subscriptions__title">
                {{ $t('Account.newsletter_label') }}
              </p>
              <p class="page-subscriptions__description">
                {{ $t('Account.newsletter_description') }}
              </p>
            </div>
            <AppToggle
              v-model="isSubscribedToNewsletter"
              class="page-subscriptions__toggle-desktop"
            />
          </div>
        </template>
      </AppContentCard>
      <AppContentCard class="page-subscriptions__card">
        <template #header>
          <div class="page-subscriptions__card-header">
            <p class="account-card-header">
              {{ $t('Account.sms_title') }}
            </p>

            <AppToggle
              v-model="isSubscribedToNewsletterSms"
              class="page-subscriptions__toggle-mobile"
            />
          </div>
        </template>
        <template #body>
          <div class="page-subscriptions__card-body">
            <div>
              <p class="page-subscriptions__title">
                {{ $t('Account.sms_label') }}
              </p>
              <p class="page-subscriptions__description">
                {{ $t('Account.sms_description') }}
              </p>
            </div>
            <AppToggle
              v-model="isSubscribedToNewsletterSms"
              class="page-subscriptions__toggle-desktop"
            />
          </div>
        </template>
      </AppContentCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppContentCard from '~~/components/common/AppContentCard.vue'
import AppToggle from '~/components/common/AppToggle.vue'
import { EStatus } from '~~/constants/status'
import { useProfileStore } from '~~/store/profile'
import { IProfileNavigationItem } from '~~/types/profile.interface'

definePageMeta({
  middleware: 'auth',
})

const { navigation } = useAccountNavigation()
const profileStore = useProfileStore()
const router = useRouter()

const navigationItems = computed(() => {
  return navigation.find(
    (item: IProfileNavigationItem) => item.scope === 'account'
  )
})

const isPending = computed(() => {
  return profileStore.status === EStatus.PENDING
})

const isSubscribedToNewsletter = computed({
  get() {
    return profileStore.profile?.subscribedToNewsletter
  },
  set(value: boolean) {
    if (isPending.value) return

    if (value !== isSubscribedToNewsletter.value) {
      profileStore.editProfile({
        subscribedToNewsletter: value,
      })
    }
  },
})

const isSubscribedToNewsletterSms = computed({
  get() {
    return profileStore.profile?.subscribedToNewsletterSms
  },
  set(value: boolean) {
    if (isPending.value) return

    if (value !== isSubscribedToNewsletterSms.value) {
      profileStore.editProfile({
        subscribedToNewsletterSms: value,
      })
    }
  },
})

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.page-subscriptions {
  min-height: calc(100vh - $header-height-mobile);

  &__header {
    display: none;
  }

  &__card {
    width: 100%;
    &:not(:first-child) {
      margin-top: 18px;
    }
  }

  &__content {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;
    min-height: calc(90vh - $header-height-mobile - 30px);
  }

  &__card-header {
    padding: 10px 18px 7px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__card-body {
    padding: 18px 18px 20px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  &__title {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
  }

  &__description {
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    color: $color-black-opacity;
    margin-top: 6px;
  }

  &__toggle-desktop {
    display: none;
  }
}

@include media-lg {
  .page-subscriptions {
    &__header {
      display: block;
      margin-left: 10px;
    }

    &__card {
      &:not(:first-child) {
        margin-top: 21px;
      }
    }

    &__content {
      display: block;
      margin-top: 30px;
      max-width: 703px;
      padding: 0;
    }

    &__card-header {
      padding: 17px 20px 18px 25px;
    }

    &__card-body {
      padding: 18px 30px 25px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    &__title {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }

    &__description {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: $color-black-opacity;
      margin-top: 5px;
    }

    &__toggle-desktop {
      display: flex;
    }

    &__toggle-mobile {
      display: none;
    }
  }
}
</style>
