<template>
  <div class="steps">
    <template v-if="isSuccess">
      <div class="steps__success-container">
        <SvgIcon class="steps__success-icon" name="check_circle" />
        <p class="steps__name">{{ $t('Checkout.steps.success') }}</p>
      </div>
    </template>

    <template v-else>
      <div class="steps__item">
        <div
          class="steps__circle"
          :class="{ 'steps__circle--done': isCart || isDelivery || isPayment }"
        >
          1
        </div>
        <p class="steps__name">{{ $t('Checkout.steps.cart') }}</p>
      </div>
      <div class="steps__item">
        <div
          class="steps__circle"
          :class="{ 'steps__circle--done': isDelivery || isPayment }"
        >
          2
        </div>
        <p class="steps__name">{{ $t('Checkout.steps.delivery') }}</p>
      </div>
      <div class="steps__item">
        <div
          class="steps__circle"
          :class="{ 'steps__circle--done': isPayment }"
        >
          3
        </div>
        <p class="steps__name">{{ $t('Checkout.steps.payment') }}</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const isCart = computed(() => {
  return route.name === 'cart'
})

const isDelivery = computed(() => {
  return route.name === 'checkout-index'
})

const isPayment = computed(() => {
  return route.name === 'checkout-index-payment'
})

const isSuccess = computed(() => {
  return route.name === 'checkout-index-success'
})
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &__item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  &__circle {
    border: 1px solid $color-pink;
    background-color: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 27px;
    height: 27px;
    color: $color-pink;

    &--done {
      background-color: $color-pink;
      color: $color-white;
    }
  }

  &__name {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 14px;
    line-height: 32px;
    text-transform: uppercase;
  }

  &__success-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__success-icon {
    width: 28px;
    height: 28px;
  }
}
</style>
