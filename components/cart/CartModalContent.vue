<template>
  <div class="cart-content">
    <div class="cart-content__list">
      <CartProduct
        v-for="product in cartItems"
        :key="product.id"
        :item="product"
        :for-modal="true"
        :currency-code="cart?.currencyCode"
      />
    </div>

    <div class="cart-content__footer">
      <div class="cart-content__prices">
        <p
          v-if="total <= freeDeliveryPrice"
          class="cart-content__text"
          v-html="
            $t('Cart.add_for_free_delivery', {
              n: $n(shipmentTotalToFree, 'EUR'),
            })
          "
        ></p>
        <p v-else class="cart-content__text">
          {{ $t('Cart.free_delivery_text') }}
        </p>
        <DeliveryFreeProggress :price="total" />
      </div>
      <div class="cart-content__total-container">
        <div class="cart-content__total-row">
          <p class="cart-content__total-title">{{ $t('Cart.total') }}</p>
          <div class="cart-content__total-price-container">
            <p class="cart-content__total-price">
              {{ $n(total, cart?.currencyCode) }}
            </p>
          </div>
        </div>
      </div>

      <div class="cart-content__button-container">
        <AppButton :title="$t('CartModal.go_to_cart')" @click="goToCart" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DeliveryFreeProggress from './DeliveryFreeProggress.vue'

import { useCartStore } from '~~/store/cart'
import CartProduct from '~/components/cards/CartProduct.vue'
import AppButton from '~/components/common/AppButton.vue'

import { ICart, ICartItem } from '~~/types/cart.interface'
import { transformPriceFromSylius } from '~~/utils/sylius'

const emit = defineEmits(['go-to-cart'])

const config = useRuntimeConfig()
const cartStore = useCartStore()

const freeDeliveryPrice = +config.public.freeDeliveryPrice

const cart = computed<ICart>(() => {
  return cartStore?.cart
})

const cartItems = computed<ICartItem[]>(() => {
  return (cartStore.cart.items as ICartItem[]) || []
})

const total = computed(() => {
  return transformPriceFromSylius(cart.value?.total)
})

const shipmentTotalToFree = computed(() => {
  return transformPriceFromSylius(cart.value?.shipmentTotalToFree || 0)
})

const goToCart = () => {
  emit('go-to-cart')
}
</script>

<style lang="scss" scoped>
.cart-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__total-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-black;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
  }

  &__button-container {
    margin-top: 20px;
    width: 100%;
  }

  &__price {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 400;
    line-height: 22px;
    margin-top: 20px;
  }

  &__total-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__total-title {
    font-weight: 900;
    font-size: 20px;
    line-height: 22px;
    text-transform: uppercase;
  }

  &__total-price-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__total-price {
    font-weight: 900;
    font-size: 20px;
    line-height: 22px;
    text-align: right;
  }

  &__list {
    overflow: auto;
    margin-top: 8px;
    padding-right: 5px;

    @include custom-scroll;
  }

  &__footer {
    margin-top: auto;
  }

  &__prices {
    margin-top: 23px;
  }

  &__text {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 16px;
    line-height: 21px;

    &:deep(span) {
      font-weight: 460;
    }
  }
}

@include media-lg {
  .cart-content {
    & :deep(.app-button) {
      max-width: 100%;
    }
  }
}
</style>
