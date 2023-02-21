<template>
  <div class="order-prices">
    <div class="order-prices__row">
      <p class="order-prices__label">{{ $t('Order.cart_sum') }}</p>
      <p class="order-prices__price">
        {{ $n(itemsTotal, order.currencyCode) }}
      </p>
    </div>
    <div v-if="orderReductionTotal" class="order-prices__row">
      <p class="order-prices__label">{{ $t('Cart.reduction_total') }}</p>
      <p class="order-prices__price order-prices__price--pink">
        -{{ $n(orderReductionTotal, order.currencyCode) }}
      </p>
    </div>
    <div v-if="orderPromotionTotal" class="order-prices__row">
      <p class="order-prices__label">{{ $t('Order.promo_code') }}</p>
      <p class="order-prices__price order-prices__price--pink">
        {{ $n(orderPromotionTotal, order.currencyCode) }}
      </p>
    </div>
    <div class="order-prices__row">
      <p class="order-prices__label">{{ $t('Order.delivery_sum') }}</p>
      <p v-if="shippingTotal" class="order-prices__price">
        {{ $n(shippingTotal, order.currencyCode) }}
      </p>
      <p v-else class="order-prices__price order-prices__price--pink">
        {{ $t('Order.delivery_free') }}
      </p>
    </div>
    <div class="order-prices__row">
      <p class="order-prices__total-label">{{ $t('Order.total') }}</p>
      <p class="order-prices__total">
        {{ $n(total || 0, currencyCode) }}
      </p>
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

const currencyCode = computed(() => {
  return props.order?.currencyCode || 'EUR'
})

const itemsTotal = computed(() => {
  return transformPriceFromSylius(props.order?.originalTotal)
})

const orderPromotionTotal = computed(() => {
  return transformPriceFromSylius(props.order?.orderPromotionTotal)
})

const orderReductionTotal = computed(() => {
  return transformPriceFromSylius(props.order?.distinctionTotal)
})

const shippingTotal = computed(() => {
  return transformPriceFromSylius(props.order?.shippingTotal)
})

const total = computed(() => {
  return transformPriceFromSylius(props.order?.total)
})
</script>

<style lang="scss" scoped>
.order-prices {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:first-child) {
      margin-top: 13px;
    }

    &:first-child {
      margin-top: 37px;
    }

    &:last-child {
      margin-top: 25px;
    }
  }

  &__label {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  }

  &__price {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-align: right;

    &--pink {
      font-weight: 700;
      color: $color-pink;
    }
  }

  &__total-label {
    font-weight: 900;
    font-size: 20px;
    line-height: 22px;
  }

  &__total {
    font-weight: 900;
    font-size: 20px;
    line-height: 22px;
    text-align: right;
  }
}
</style>
