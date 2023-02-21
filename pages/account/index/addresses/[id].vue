<template>
  <div class="edit-address">
    <AccountMobilePageHeader
      icon="account"
      :title="$t('Account.my_addresses')"
      :is-child="true"
      :navigation="navigationItems.children"
      @back="goBack"
    />
    <p class="account-page-header edit-address__header">
      {{ $t('Account.addresses') }}
    </p>
    <div class="edit-address__container">
      <AppContentCard class="edit-address__content">
        <template #header>
          <div class="edit-address__card-header">
            <p class="account-card-header">{{ $t('Account.edit_address') }}</p>
            <BackButton class="edit-address__back-desktop" @back="goBack" />
            <button class="edit-address__back-mobile" @click="goBack">
              <SvgIcon
                class="edit-address__back-mobile-icon"
                name="arrow_left"
              />
            </button>
          </div>
        </template>
        <template #body>
          <div class="edit-address__card-body">
            <AccountAddressForm
              :is-edit="true"
              :initial-form="initialForm"
              @submit="editAddress"
            />
          </div>
        </template>
      </AppContentCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AppContentCard from '~/components/common/AppContentCard.vue'
import BackButton from '~/components/common/BackButton.vue'
import AccountAddressForm from '~/components/account/AccountAddressForm.vue'
import { useAddressesStore } from '~~/store/addresses'
import { IAddressItem } from '~~/types/addresses.interface'
import { EStatus } from '~~/constants/status'
import { IProfileNavigationItem } from '~~/types/profile.interface'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const $router = useRouter()
const $route = useRoute()
const addressesStore = useAddressesStore()
const { toastSuccess, toastError } = useAppToast()
const { t } = useI18n()

const { navigation } = useAccountNavigation()

const navigationItems = computed(() => {
  return navigation.find(
    (item: IProfileNavigationItem) => item.scope === 'account'
  )
})

const addressId = computed(() => {
  return $route.params?.id || null
})

const initialForm = computed(() => {
  return addressesStore.addresses.find(
    (address: IAddressItem) => address.id === +addressId.value
  )
})

const editAddress = async (form) => {
  form.id = addressId.value
  await addressesStore.editAddress(form)

  const status = addressesStore.status

  if (status === EStatus.SUCCESS) {
    toastSuccess({
      title: '',
      text: t('Account.update_delivery_confirmation'),
    })

    await addressesStore.fetchAddresses()

    goBack()
  }

  if (status === EStatus.ERROR) {
    toastError({
      title: t('Notifications.error'),
    })
  }
}

const goBack = () => {
  $router.push('/account/addresses')
}
</script>

<style lang="scss" scoped>
.edit-address {
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
  .edit-address {
    padding-bottom: 60px;

    &__header {
      display: block;
      margin-left: 10px;
    }

    &__container {
      margin-top: 30px;
      max-width: 746px;
    }

    &__card-header {
      padding: 15px 25px 12px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__card-body {
      padding: 25px 47px 40px 27px;
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
