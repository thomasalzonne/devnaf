<template>
  <div class="page-addresses">
    <AccountMobilePageHeader
      icon="account"
      :title="$t('Account.my_addresses')"
      :is-child="true"
      :navigation="navigationItems.children"
      @back="goBack"
    />
    <p class="account-page-header page-addresses__header">
      {{ $t('Account.addresses') }}
    </p>
    <div class="page-addresses__container">
      <AppContentCard
        class="page-addresses__card"
        :class="{ 'page-addresses__card--empty': !isShowContent }"
      >
        <template #header>
          <p class="account-card-header page-addresses__card-header">
            {{ $t('Common.my_addresses') }}
          </p>
        </template>
        <template #body>
          <div v-if="pending" class="page-addresses__loader">
            <AppLoader />
          </div>
          <template v-else>
            <div class="page-addresses__card-body">
              <template v-if="isShowContent">
                <AccountAddressItem
                  v-for="address in addresses"
                  :key="address.id"
                  :address="address"
                  :with-checkbox="false"
                  @deleteAddress="openDeleteModal"
                />
              </template>
              <p v-else class="page-addresses__empty">
                {{ $t('Account.addresses_empty') }}
              </p>
            </div>
          </template>
        </template>
      </AppContentCard>
      <NuxtLink
        class="page-addresses__button-container"
        to="/account/addresses/create"
      >
        <AppButton
          class="page-addresses__button"
          :title="$t('Common.add_address')"
          size="small"
        />
      </NuxtLink>
      <AccountDeleteAddressModal
        :is-open="isOpenDeleteModal"
        :address="addressForDelete"
        :user-name="userName"
        :is-pending="isPending"
        @confirm="deleteAddress"
        @cancel="closeDeleteModal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import AppContentCard from '~/components/common/AppContentCard.vue'
import AccountAddressItem from '~/components/account/AccountAddressItem.vue'
import AppLoader from '~/components/common/AppLoader.vue'

import { useAddressesStore } from '~~/store/addresses'
import { IAddressItem } from '~/types/addresses.interface'
import { EStatus } from '~~/constants/status'
import { IProfileNavigationItem } from '~~/types/profile.interface'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import { useProfileStore } from '~~/store/profile'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const addressesStore = useAddressesStore()
const layoutStore = useLayoutStore()
const profileStore = useProfileStore()
const $router = useRouter()

const addressForDelete = ref<IAddressItem>(null)
const isPending = ref(false)

const { pending } = await useLazyAsyncData(
  'fetchAddressesPage',
  addressesStore.fetchAddresses
)

const { navigation } = useAccountNavigation()

const navigationItems = computed(() => {
  return navigation.find(
    (item: IProfileNavigationItem) => item.scope === 'account'
  )
})

const addresses = computed<IAddressItem[]>(() => {
  return addressesStore?.addresses || []
})

const isShowContent = computed<boolean>(() => {
  return !!addresses.value.length
})

const isOpenDeleteModal = computed(() => {
  return layoutStore.modals[EModals.DELETE_ADDRESS]
})

const userName = computed(() => {
  return profileStore?.profile?.firstName || ''
})

const deleteAddress = async () => {
  isPending.value = true
  await addressesStore.deleteAddress(addressForDelete.value?.id)

  const status = addressesStore.status

  if (status === EStatus.SUCCESS) {
    await addressesStore.fetchAddresses()

    closeDeleteModal()

    $router.push('/account/addresses')
  }

  isPending.value = false
}

const closeDeleteModal = () => {
  layoutStore.closeModal(EModals.DELETE_ADDRESS)
  addressForDelete.value = null
}

const openDeleteModal = (id: number) => {
  window.scrollTo(0, 0)

  layoutStore.openModal(EModals.DELETE_ADDRESS)
  addressForDelete.value = addresses.value?.find(
    (address: IAddressItem) => address.id === id
  )
}

const goBack = () => {
  if (isOpenDeleteModal.value) {
    closeDeleteModal()
  } else {
    $router.back()
  }
}

const AccountDeleteAddressModal = defineAsyncComponent(
  () => import('~/components/account/AccountDeleteAddressModal.vue')
)
</script>

<style lang="scss" scoped>
.page-addresses {
  padding-bottom: 60px;
  min-height: calc(100vh - $header-height-mobile);

  &__header {
    display: none;
  }

  &__container {
    margin-top: 30px;
    padding: 0 20px;
    min-height: calc(86vh - $header-height-mobile);
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  &__link {
    margin-top: 50px;
  }

  &__loader {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__card {
    width: 100%;
  }

  &__card-header {
    padding: 10px 18px 7px 18px;
  }

  &__card-body {
    padding: 16px 0 0 0;
  }

  &__button-container {
    width: 100%;
  }

  &__button {
    margin-top: 19px;
    width: 100%;
  }

  &__empty {
    padding: 7px 18px 24px 19px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $color-black-opacity;
  }
}

@include media-lg {
  .page-addresses {
    padding-bottom: 60px;
    min-height: auto;

    &__header {
      display: block;
      margin-left: 10px;
    }

    &__container {
      margin-top: 30px;
      max-width: 746px;
      padding: 0;
      display: block;
    }

    &__link {
      margin-top: 50px;
    }

    &__loader {
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__card-header {
      padding: 20px;
    }

    &__card-body {
      padding: 13px 25px 30px 25px;
    }

    &__button {
      margin-top: 20px;
      max-width: 259px;
    }

    &__empty {
      padding: 9px 10px 4px 6px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: $color-black-opacity;
    }

    &__card {
      min-width: 488px;

      &--empty {
        width: max-content;
      }
    }
  }
}
</style>
