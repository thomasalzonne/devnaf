<template>
  <div class="account-address-item">
    <div class="account-address-item__info-container">
      <AppCheckbox
        v-if="withCheckbox"
        class="account-address-item__checkbox"
        :model-value="selectedAddressId === address?.id"
        @update:model-value="selectAddress"
      />
      <div v-if="address?.company" class="account-address-item__badge">
        {{ address?.company || '' }}
      </div>
      <p class="account-address-item__text">
        <span
          v-if="address?.firstName"
          class="account-address-item__text account-address-item__text--bold"
          >{{ address.firstName }}</span
        >
        {{ ' ' }}
        <span
          v-if="address?.lastName"
          class="account-address-item__text account-address-item__text--bold account-address-item__text--uppercase"
          >{{ address.lastName }}</span
        >
        <br />
        {{ ' ' }}
        <span
          v-if="streetFormated"
          class="account-address-item__text account-address-item__text--small"
        >
          {{ streetFormated }}</span
        >
        {{ ' ' }}
        <span
          v-if="address?.postcode"
          class="account-address-item__text account-address-item__text--small"
        >
          {{ address?.postcode || '' }}</span
        >
        {{ ' ' }}
        <span
          v-if="address?.city"
          class="account-address-item__text account-address-item__text--uppercase account-address-item__text--small"
        >
          {{ address?.city || '' }}</span
        >
      </p>
    </div>
    <div class="account-address-item__link-container">
      <template v-if="!readonly">
        <NuxtLink
          :to="`/account/addresses/${addressId}`"
          class="account-address-item__link"
        >
          {{ $t('Common.edit') }}
        </NuxtLink>
        <button class="account-address-item__link" @click="deleteAddress">
          {{ $t('Common.delete') }}
        </button>
      </template>
      <template v-else>
        <button class="account-address-item__link" @click="editAddress">
          {{ $t('Common.select') }}
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppCheckbox from '~/components/common/AppCheckbox.vue'
import { IAddressItem } from '~~/types/addresses.interface'

interface IAddressItemProps {
  address: IAddressItem
  readonly?: boolean
  selectedAddressId?: number
  withCheckbox?: boolean
}

const props = withDefaults(defineProps<IAddressItemProps>(), {
  address: null,
  readonly: false,
  selectedAddressId: null,
  withCheckbox: true,
})
const emit = defineEmits(['deleteAddress', 'selectAddress', 'editAddress'])

const addressId = computed<number>(() => {
  return props?.address?.id || null
})

const streetFormated = computed(() => {
  const street = props?.address?.street || ''

  const dividedFields = street.split(', Details:')

  return dividedFields[0]
})

const deleteAddress = (): void => {
  emit('deleteAddress', addressId.value)
}

const selectAddress = (): void => {
  emit('selectAddress', addressId.value)
}

const editAddress = () => {
  emit('editAddress', addressId.value)
}
</script>

<style lang="scss" scoped>
.account-address-item {
  display: grid;
  gap: 7px;
  padding: 16px;
  border-bottom: 1px solid $color-medium-grey;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &__info-container {
    display: flex;
    align-items: flex-start;
  }

  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-black-opacity;
    margin-top: 6px;

    &--bold {
      font-weight: 500;
    }

    &--uppercase {
      text-transform: uppercase;
    }

    &--small {
      font-size: 11px;
      line-height: 13px;
    }
  }

  &__checkbox {
    margin-right: 11px;
  }

  &__badge {
    padding: 2px 10px;
    background-color: $color-black;
    border-radius: 30px;
    font-weight: 400;
    font-size: 10px;
    line-height: 22px;
    text-align: center;
    color: $color-white;
    width: max-content;
    white-space: nowrap;
    margin-right: 13px;
  }

  &__link-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
  }

  &__link {
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    text-align: right;
    text-decoration: underline;
    color: $color-dark-grey;
  }
}

@include media-lg {
  .account-address-item {
    padding: 0;
    border: none;
    border-radius: 0px;
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &__info-container {
      align-items: center;
    }

    &__text {
      font-size: 14px;
      line-height: 16px;
      margin-top: 0px;

      br {
        display: none;
      }
    }

    &__checkbox {
      margin-right: 14px;
    }

    &__badge {
      font-size: 14px;
      line-height: 22px;
      margin-right: 15px;
    }

    &__link-container {
      gap: 20px;
    }

    &__link {
      font-size: 13px;
      line-height: 30px;
    }
  }
}

@include media-xl {
  .account-address-item {
    display: flex;
    justify-content: space-between;

    &__link-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__link {
      font-weight: 500;
      font-size: 14px;
      line-height: 30px;
      text-align: right;
      text-decoration: underline;
      color: $color-dark-grey;
    }
  }
}
</style>
