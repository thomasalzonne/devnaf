<template>
  <div class="cart-empty">
    <div class="cart-empty__header">
      <button class="cart-empty__button" @click="back">
        <SvgIcon class="cart-empty__icon" name="arrow_left" />
      </button>
      <p class="cart-empty__heading">{{ $t('Common.cart') }}</p>
    </div>
    <div class="cart-empty__content">
      <CartModalEmptyContent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CartModalEmptyContent from '~/components/cart/CartModalEmptyContent.vue'

const router = useRouter()

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.cart-empty {
  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__button {
    position: absolute;
    left: 20px;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
  }

  &__content {
    overflow: auto;
  }
}
</style>
