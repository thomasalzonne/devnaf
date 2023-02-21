<template>
  <div class="checkout-info">
    <div class="checkout-info__main">
      <p class="checkout-info__title">{{ $t('Cart.my_cart') }}</p>
      <div class="checkout-info__items">
        <CartProduct
          v-for="item in cartItems"
          :key="item.id"
          :item="(item as ICartItem)"
          :currency-code="currencyCode"
          :for-checkout="true"
          class="checkout-info__product"
        />
      </div>
      <NuxtLink
        v-if="page !== 'success'"
        to="/cart"
        class="checkout-info__edit"
      >
        {{ $t('Cart.edit_cart') }}
      </NuxtLink>
      <div class="checkout-info__total-container">
        <p class="checkout-info__total-label">{{ $t('Cart.total') }}</p>
        <p class="checkout-info__total">{{ $n(total, currencyCode) }}</p>
      </div>
    </div>

    <CheckoutInfoDelivery v-if="page === 'delivery'" />
    <CheckoutInfoPayment v-if="page === 'payment'" />
  </div>
</template>

<script lang="ts" setup>
import CheckoutInfoDelivery from './CheckoutInfoDelivery.vue'
import CheckoutInfoPayment from './CheckoutInfoPayment.vue'
import CartProduct from '~/components/cards/CartProduct.vue'
import { ICart, ICartItem } from '~~/types/cart.interface'
import { IOrder, IOrderItem } from '~~/types/orders.interface'

interface IProps {
  cart: ICart | IOrder
  page: 'delivery' | 'payment' | 'success'
}

const props = withDefaults(defineProps<IProps>(), {
  cart: null,
  page: 'delivery',
})

const cartItems = computed<ICartItem[] | IOrderItem[]>(() => {
  return props?.cart?.items || []
})

const total = computed(() => {
  return transformPriceFromSylius(props.cart?.total)
})

const currencyCode = computed(() => {
  return props.cart?.currencyCode || 'EUR'
})
</script>

<style lang="scss" scoped>
.checkout-info {
  &__main {
    border-radius: 10px;
    border: 1px solid $color-medium-grey;
    padding: 21px 21px 20px 13px;
  }

  &__items {
    max-height: 600px;
    overflow: auto;
    overflow-x: hidden;
    padding-right: 5px;
    margin-top: 10px;

    @include custom-scroll;
  }

  &__edit {
    display: block;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $color-black-opacity;
    text-decoration: underline;
    margin-top: 16px;
  }

  &__total-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 21px;
  }

  &__total-label {
    font-weight: 900;
    font-size: 20px;
    line-height: 22px;
    text-transform: uppercase;
  }

  &__total {
    font-weight: 900;
    font-size: 20px;
    line-height: 22px;
    text-align: right;
  }

  &__title {
    font-weight: 900;
    font-size: 14px;
    line-height: 22px;
  }
}

@include media-lg {
  .checkout-info {
    &__main {
      padding: 21px 19px;
    }

    &__title {
      font-family: $font-secondary;
      font-weight: 480;
      font-size: 24px;
      line-height: 44px;
    }
  }
}
</style>
