<template>
  <div class="checkout-success">
    <CheckoutHeader
      v-if="isMobile"
      @back="handleHeaderBack"
      @close="handleHeaderClose"
    />
    <div class="checkout-success__img-container">
      <img
        class="checkout-success__img"
        src="~/assets/images/checkout_success.png"
        alt="Checkout"
      />
    </div>
    <div class="checkout-success__content">
      <h2 class="checkout-success__heading">
        {{ $t('Checkout.success.thanks') }} {{ userName }}, <br />
        <b> {{ $t('Checkout.success.order_created') }} </b>
      </h2>
      <p class="checkout-success__label">
        {{ $t('Checkout.success.naf_thanks') }}
      </p>
      <div class="checkout-success__description-container">
        <p class="checkout-success__description">
          {{ $t('Checkout.success.instruction_1') }}
        </p>
        <p class="checkout-success__description">
          {{ $t('Checkout.success.instruction_2') }}
        </p>
        <p class="checkout-success__description">
          {{ $t('Checkout.success.instruction_3') }}
        </p>
        <p class="checkout-success__description">
          {{ $t('Checkout.success.instruction_4') }}
        </p>
      </div>
      <CheckoutAddress class="checkout-success__address" :address="address" />
      <CheckoutInfo
        class="checkout-success__info"
        :cart="order"
        page="success"
      />

      <div class="checkout-success__button-container">
        <NuxtLink to="/">
          <AppButton :title="$t('Checkout.success.button')" @click="null" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue'
import CheckoutAddress from '~/components/checkout/CheckoutAddress.vue'
import CheckoutInfo from '~/components/checkout/CheckoutInfo.vue'
import AppButton from '~/components/common/AppButton.vue'
import { useOrdersStore } from '~~/store/orders'
import { useLayoutStore } from '~~/store/layout'

definePageMeta({
  layout: 'checkout',
})

const ordersStore = useOrdersStore()
const layoutStore = useLayoutStore()

const route = useRoute()

const tokenValue = route.query?.order

await useAsyncData('fetchLastOrder', () =>
  ordersStore.fetchOrder(tokenValue.toString())
)

const order = computed(() => {
  return ordersStore.order
})

const address = computed(() => {
  return order.value?.shippingAddress
})

const userName = computed(() => {
  return order.value?.shippingAddress?.firstName || ''
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const handleHeaderBack = () => {
  navigateTo('/')
}

const handleHeaderClose = () => {
  navigateTo('/account/orders')
}
</script>

<style lang="scss" scoped>
.checkout-success {
  display: grid;
  grid-template-columns: 100%;
  padding-top: 25px;

  &__img-container {
    width: 100%;
    max-height: 205px;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    padding: 0 20px;
    width: 100%;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 22px;
    max-width: 464px;
    text-align: center;
    margin: 19px auto 0 auto;

    b {
      font-weight: 480;
      font-family: $font-secondary;
      color: $color-pink;
    }
  }

  &__label {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
  }

  &__description-container {
    margin: 8px auto;
  }

  &__description {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-black-opacity;
    text-align: center;

    &:not(:first-child) {
      margin-top: 16px;
    }
  }

  &__address {
    margin-top: 16px;
  }

  &__info {
    margin-top: 24px;

    &:deep(.checkout-info__total-container) {
      margin-top: 50px;
    }
  }

  &__button-container {
    margin-top: 19px;

    &:deep(.app-button) {
      max-width: 100%;
    }
  }
}

@include media-lg {
  .checkout-success {
    display: grid;
    grid-template-columns: calc(50% - 30px) calc(50% - 30px);
    gap: 60px;
    padding-bottom: 260px;
    padding-top: 0;

    &__img-container {
      max-height: 100%;
    }

    &__img {
      height: auto;
      object-fit: contain;
    }

    &__content {
      padding-right: 60px;
    }

    &__heading {
      font-size: 36px;
      line-height: 44px;
      margin-top: 30px;
      text-align: left;
      margin-left: 0;
    }

    &__label {
      font-size: 16px;
      line-height: 20px;
      margin: 0;
      margin-top: 35px;
      max-width: 302px;
      text-align: left;
    }

    &__description-container {
      max-width: 80%;
      margin-left: 0;
    }

    &__description {
      font-size: 14px;
      line-height: 16px;
      text-align: left;
    }

    &__address {
      margin-top: 35px;
    }

    &__button-container {
      margin-top: 30px;
    }
  }
}

@media screen and (min-width: 1439px) {
  .checkout-success {
    grid-template-columns: calc(56% - 1px) calc(38% - 83px);
    gap: 84px;

    &__description-container {
      max-width: 100%;
      margin-top: 0;
    }

    &__heading {
      margin-top: 70px;
    }

    &__content {
      padding: 0;
    }

    &__address {
      margin-top: 37px;
    }

    &__info {
      &:deep(.checkout-info__total-container) {
        margin-top: 59px;
      }
    }
  }
}
</style>
