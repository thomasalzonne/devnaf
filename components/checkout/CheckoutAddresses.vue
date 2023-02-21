<template>
  <div class="account-addresses">
    <div class="account-addresses__header">{{ $t('Common.my_addresses') }}</div>
    <div class="account-addresses__body">
      <CheckoutAddressItem
        v-for="address in addresses"
        :key="address.id"
        :address="address"
        :readonly="readonly"
        :selected-address-id="selectedAddressId"
        @select-address="selectAddress"
        @edit-address="editAddress"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CheckoutAddressItem from '~/components/checkout/CheckoutAddressItem.vue'
import { IAddressItem } from '~~/types/addresses.interface'

interface IProps {
  addresses: IAddressItem[]
  readonly: boolean
  selectedAddressId?: number
}

defineProps<IProps>()
const emit = defineEmits(['selectAddress', 'editAddress'])

const selectAddress = (address: IAddressItem) => {
  emit('selectAddress', address)
}

const editAddress = (address: IAddressItem) => {
  emit('editAddress', address)
}
</script>

<style lang="scss" setup>
.account-addresses {
  &__header {
    display: none;
  }
}

@include media-lg {
  .account-addresses {
    border: 1px solid $color-medium-grey;
    border-radius: 10px;

    &__header {
      display: flex;
      padding: 20px 22px 18px 22px;
      border-bottom: 1px solid $color-light-grey;
      font-weight: 900;
      font-size: 20px;
      line-height: 22px;
    }

    &__body {
      padding: 20px 20px 30px 20px;
    }
  }
}
</style>
