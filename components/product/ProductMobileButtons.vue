<template>
  <div class="product-buttons">
    <ProductButton
      class="product-buttons__button"
      :is-in-cart="isInCart"
      :is-loading="isLoading"
      :is-in-stock="isInStock"
      @trigger="handleClick"
    />
  </div>
</template>

<script lang="ts" setup>
import ProductButton from '~/components/product/ProductButton.vue'

interface IProps {
  isInStock: boolean
  isInCart: boolean
  isLoading: boolean
}

withDefaults(defineProps<IProps>(), {
  isInStock: false,
  isInCart: false,
  isLoading: false,
})
const emit = defineEmits(['trigger'])

const handleClick = () => {
  emit('trigger')
}
</script>

<style lang="scss" scoped>
.product-buttons {
  position: fixed;
  bottom: $header-height-mobile;
  left: 0;
  z-index: 100;
  width: 100vw;

  & :deep() {
    .button {
      display: flex;
      height: 55px;
      width: 100%;
      border-radius: 0;

      &__title {
        font-weight: 460;
        font-size: 14px;
        line-height: 44px;
      }
    }
  }
}

@include media-lg {
  .product-buttons {
    display: none;
  }
}
</style>
