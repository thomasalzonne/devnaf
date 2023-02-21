<template>
  <div class="delivery-status">
    <div class="delivery-status__header">
      <p class="delivery-status__heading">{{ $t('Order.delivery_label') }}</p>
    </div>
    <p class="delivery-status__caption">
      {{ $t('Order.order_date_label') }} ORDER_DATE
    </p>

    <div class="delivery-status__grid">
      <div class="delivery-status__icon-container">
        <SvgIcon
          class="delivery-status__icon"
          :class="{
            'delivery-status__icon--active': order.shippingState === 'ready',
          }"
          name="pin_outline"
        />
        <div
          class="delivery-status__separator"
          :class="{
            'delivery-status__separator--active':
              order.shippingState === 'ready',
          }"
        ></div>
      </div>
      <div class="delivery-status__status-container">
        <p class="delivery-status__status">
          {{ $t('Order.order_send_next_day') }}
        </p>
      </div>
      <div class="delivery-status__icon-container">
        <SvgIcon class="delivery-status__icon" name="shipping" />
        <div class="delivery-status__separator"></div>
      </div>
      <div
        class="delivery-status__status-container delivery-status__status-container--center"
      >
        <p class="delivery-status__status">
          {{ $t('Order.order_on_delivery') }}
        </p>
        <div class="delivery-status__icon-arrow-container">
          <SvgIcon class="delivery-status__icon-arrow" name="arrow__left" />
        </div>
      </div>
      <div class="delivery-status__icon-container">
        <SvgIcon
          class="delivery-status__icon delivery-status__icon--disabled"
          name="house"
        />
      </div>
      <div
        class="delivery-status__status-container delivery-status__status-container--last"
      >
        <p class="delivery-status__status">
          {{ $t('Order.address_of_delivry') }} <br />
          {{ shippingAddress?.firstName || '' }}
          {{ shippingAddress?.lastName || '' }} <br />
          {{ shippingAddress.street || '' }} <br />
          {{
            `${shippingAddress.postcode} - ${shippingAddress.city} - ${shippingAddress.countryCode}`
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IOrder } from '~~/types/orders.interface'

interface IProps {
  order: IOrder
}

const props = withDefaults(defineProps<IProps>(), {
  order: null,
})

const shippingAddress = computed(() => {
  return props.order?.shippingAddress
})
</script>

<style lang="scss" scoped>
.delivery-status {
  &__header {
    border-bottom: 1px solid $color-medium-grey;
    padding: 0 0 11px 9px;
  }

  &__heading {
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    font-family: $font-secondary;
  }

  &__caption {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-top: 19px;
    margin-bottom: 29px;
    margin: 19px 19px 29px 9px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 30px 1fr;
    row-gap: 12px;
    column-gap: 23px;
    padding: 0 32px;
  }

  &__icon-container {
    width: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }

  &__icon {
    width: 30px;
    height: 30px;

    &--active {
      color: $color-pink;
    }

    &--disabled {
      color: $color-medium-grey;
    }
  }
  &__icon-arrow-container {
    width: 24px;
    height: 24px;
    margin-top: 4px;
  }

  &__icon-arrow {
    width: 24px;
    height: 24px;
  }

  &__separator {
    width: 2px;
    background-color: $color-black;
    height: 25px;

    &--active {
      background-color: $color-pink;
    }
  }

  &__status-container {
    display: flex;
    width: 100%;
    gap: 25px;
  }

  &__status {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-top: 7px;
  }
}

@include media-xl {
  .delivery-status {
    &__header {
      border-bottom: 1px solid $color-medium-grey;
      padding: 0 0 11px 9px;
    }

    &__heading {
      font-size: 25px;
      line-height: 30px;
    }

    &__caption {
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 16px;
    }

    &__grid {
      grid-template-columns: 60px 1fr;
      row-gap: 12px;
      column-gap: 39px;
      padding: 0;
      padding-left: 10px;
    }

    &__icon-container {
      width: 60px;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 20px;
    }

    &__icon {
      width: 60px;
      height: 60px;
    }

    &__icon-arrow-container {
      margin-top: 16px;
    }

    &__separator {
      width: 3px;
      height: 35px;
    }

    &__status-container {
      display: flex;
      width: 100%;
      gap: 10px;

      &--center {
        margin-top: -5px;
      }

      &--last {
        margin-top: -42px;
      }
    }

    &__status {
      font-size: 18px;
      line-height: 30px;
      margin-top: 16px;
    }
  }
}
</style>
