<template>
  <AppContentCard :as-accordion="isMobile">
    <template #header>
      <p class="delivery-details__header">{{ $t('Order.delivery_details') }}</p>
    </template>
    <template #body>
      <div class="delivery-details__body">
        <div class="delivery-details__row">
          <p class="delivery-details__label">{{ $t('Order.order_status') }}</p>
          <AccountOrderItemStatus
            class="delivery-details__status"
            :status="status"
            :payment-status="paymentStatus"
          />
        </div>
        <div class="delivery-details__delivery">
          <p class="delivery-details__label">
            {{ $t('Order.delivery_to_home') }}
          </p>
          <AppBadge v-if="addressName" :title="addressName" />
        </div>
        <div class="delivery-details__address-container">
          <p class="delivery-details__text">
            <span class="delivery-details__text--bolder">
              {{ firstName + ' ' }}
            </span>
            <span
              class="delivery-details__text--uppercase delivery-details__text--bolder"
            >
              {{ lastName + ' ' }}
            </span>
            <br />
            <span>
              {{ address + ' ' }}
              {{ postcode + ' ' }}
            </span>
            <span
              class="delivery-details__text delivery-details__text--uppercase"
              >{{ city }}</span
            >
          </p>
        </div>
      </div>
    </template>
  </AppContentCard>
</template>

<script lang="ts" setup>
import AppContentCard from '~/components/common/AppContentCard.vue'
import AppBadge from '~/components/common/AppBadge.vue'
import AccountOrderItemStatus from '~/components/account/AccountOrderItemStatus.vue'
import { ECheckoutOrderState, IOrder } from '~~/types/orders.interface'

interface IProps {
  order: IOrder
  isMobile: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  order: null,
  isMobile: false,
})

const shippingAddress = computed(() => {
  return props.order?.shippingAddress || null
})

const firstName = computed(() => {
  return shippingAddress.value.firstName || ''
})

const lastName = computed(() => {
  return shippingAddress.value.lastName || ''
})

const address = computed(() => {
  const street = shippingAddress.value?.street || ''

  const dividedFields = street.split(', Details:')

  return dividedFields[0]
})

const addressName = computed(() => {
  return shippingAddress.value?.company || ''
})

const status = computed<ECheckoutOrderState | string>(() => {
  return props.order?.checkoutState || ''
})

const paymentStatus = computed(() => {
  return props.order?.paymentState || ''
})

const postcode = computed(() => {
  return shippingAddress.value?.postcode || ''
})

const city = computed(() => {
  return shippingAddress.value?.city || ''
})
</script>

<style lang="scss" scoped>
.delivery-details {
  &__header {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 44px;
    padding: 4px 15px 0 15px;
  }

  &__body {
    padding: 20px 15px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__label {
    font-weight: 460;
    font-size: 14px;
    line-height: 18px;
    font-family: $font-secondary;
  }

  &__delivery {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 17px;
  }

  &__address-container {
    margin-top: 15px;
    display: flex-inline;
    gap: 6px;
  }

  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: $color-black-opacity;

    &--bolder {
      font-weight: 500;
    }

    &--uppercase {
      text-transform: uppercase;
    }
  }

  &__status {
    & :deep() {
      .order-status {
        &__circle {
          width: 14px;
          height: 14px;
        }

        &__img {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}

@include media-lg {
  .delivery-details {
    &__header {
      font-size: 20px;
      padding: 10px 28px 4px;
    }

    &__body {
      padding: 33px 24px 44px 24px;
    }

    &__row {
      gap: 20px;
    }

    &__label {
      font-size: 18px;
      line-height: 23px;
    }

    &__delivery {
      gap: 20px;
      margin-top: 45px;
    }

    &__address-container {
      margin-top: 20px;
      gap: 6px;
    }

    &__text {
      font-size: 14px;
      line-height: 16px;

      br {
        display: none;
      }
    }

    &__status {
      & :deep() {
        .order-status {
          &__circle {
            width: 22px;
            height: 22px;
          }

          &__img {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
}
</style>
