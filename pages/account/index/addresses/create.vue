<template>
  <div class="create-address">
    <AccountMobilePageHeader
      icon="account"
      :title="$t('Account.my_addresses')"
      :is-child="true"
      :navigation="navigationItems.children"
      @back="goBack"
    />
    <p class="account-page-header create-address__header">
      {{ $t('Account.addresses') }}
    </p>
    <div class="create-address__container">
      <AppContentCard class="create-address__content">
        <template #header>
          <div class="create-address__card-header">
            <p class="account-card-header">
              {{ $t('Account.create_address') }}
            </p>
            <BackButton class="create-address__back-desktop" @back="goBack" />
            <button class="create-address__back-mobile" @click="goBack">
              <SvgIcon
                class="create-address__back-mobile-icon"
                name="arrow_left"
              />
            </button>
          </div>
        </template>
        <template #body>
          <div class="create-address__card-body">
            <AccountAddressForm
              :is-saved="isAddressCreated"
              @submit="addAddress"
              @submitWhenSaved="goBack"
            />
          </div>
        </template>
      </AppContentCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import BackButton from '~/components/common/BackButton.vue'
import AppContentCard from '~/components/common/AppContentCard.vue'
import AccountAddressForm from '~/components/account/AccountAddressForm.vue'

import { useAddressesStore } from '~~/store/addresses'
import { IAddressAddForm } from '~~/types/addresses.interface'
import { EStatus } from '~~/constants/status'
import { IProfileNavigationItem } from '~~/types/profile.interface'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const $router = useRouter()
const addressesStore = useAddressesStore()
const { toastSuccess, toastError } = useAppToast()
const { t } = useI18n()

const isAddressCreated = ref(false)

const { navigation } = useAccountNavigation()

const navigationItems = computed(() => {
  return navigation.find(
    (item: IProfileNavigationItem) => item.scope === 'account'
  )
})

const goBack = () => {
  $router.push('/account/addresses')
}

const addAddress = async (form: IAddressAddForm): Promise<void> => {
  await addressesStore.addAddress(form)
  const status = addressesStore.status

  if (status === EStatus.SUCCESS) {
    toastSuccess({
      title: t('Notifications.success'),
      text: t('Account.update_delivery_confirmation'),
    })

    await addressesStore.fetchAddresses()

    isAddressCreated.value = true
  }

  if (status === EStatus.ERROR) {
    toastError({
      title: t('Notifications.error'),
    })
  }
}
</script>

<style lang="scss" scoped>
.create-address {
  height: 100%;
  width: 100%;
  padding-bottom: 60px;

  &__header {
    display: none;
  }

  &__container {
    margin-top: 60px;
    padding: 0 20px;
  }

  &__card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 18px 7px 18px;
    width: 100%;
  }

  &__card-body {
    padding: 18px;
  }

  &__back-desktop {
    display: none;
  }

  &__back-mobile {
    width: 18px;
    height: 18px;
    margin-left: auto;
  }

  &__back-mobile-icon {
    width: 18px;
    height: 18px;
  }
}

@include media-lg {
  .create-address {
    padding-bottom: 60px;

    &__header {
      display: block;
      margin-left: 10px;
    }

    &__container {
      margin-top: 30px;
      max-width: 746px;
      padding: 0;
    }

    &__card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 25px 12px 22px;
    }

    &__card-body {
      padding: 25px 47px 29px 27px;
    }

    &__back-desktop {
      display: flex;
    }

    &__back-mobile {
      display: none;
    }
  }
}
</style>
