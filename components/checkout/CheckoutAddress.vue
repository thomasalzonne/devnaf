<template>
  <div class="address">
    <div class="address__header">
      <p class="address__heading">{{ $t('Checkout.success.address') }}</p>
      <div v-if="addressName" class="address__badge">{{ addressName }}</div>
    </div>
    <div class="address__body">
      <p class="address__name">
        {{ firstName }} <span class="address__lastname">{{ lastName }}</span>
      </p>
      <p class="address__text">
        {{ fullAddress }} <br />
        {{ postcode }}
        <span class="address__text address__text--uppercase">{{ city }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IShippingAddress } from '~~/types/cart.interface'

interface IProps {
  address: IShippingAddress
}

const props = withDefaults(defineProps<IProps>(), {
  address: null,
})

const firstName = computed(() => {
  return props.address?.firstName || ''
})

const lastName = computed(() => {
  return props.address?.lastName || ''
})

const fullAddress = computed(() => {
  const street = props?.address?.street || ''

  const dividedFields = street.split(', Details:')

  return dividedFields[0]
})

const addressName = computed(() => {
  return props.address?.company || ''
})

const postcode = computed(() => {
  return props.address?.postcode || ''
})

const city = computed(() => {
  return props.address?.city || ''
})
</script>

<style lang="scss" scoped>
.address {
  border: 1px solid $color-medium-grey;
  border-radius: 10px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px 11px 22px;
    border-bottom: 1px solid $color-light-grey;
  }

  &__heading {
    font-weight: 900;
    font-size: 14px;
    line-height: 22px;
  }

  &__badge {
    background-color: $color-black;
    border-radius: 30px;
    padding: 3px 10px;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: $color-white;
    height: 26px;
  }

  &__body {
    padding: 18px 22px 12px 22px;
  }

  &__name {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-black-opacity;
  }

  &__lastname {
    text-transform: uppercase;
  }

  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-black-opacity;
    margin-top: 7px;
    max-width: 204px;

    &--uppercase {
      text-transform: uppercase;
    }
  }
}

@include media-lg {
  .address {
    &__header {
      padding: 18px 21px 11px 20px;
    }

    &__heading {
      font-size: 20px;
    }

    &__body {
      padding: 13px 19px 12px 20px;
    }

    &__name {
      font-size: 14px;
      line-height: 16px;
    }

    &__text {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
