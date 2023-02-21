<template>
  <button
    class="product-size-button"
    :class="{
      'product-size-button--active': isActive,
      'product-size-button--disabled': !sizeStock,
    }"
    :disabled="!sizeStock"
  >
    <AppLoader v-if="isPending" />
    <span v-else class="product-size-button__size-caption">{{
      sizeValue
    }}</span>
  </button>
</template>

<script lang="ts" setup>
import AppLoader from '~/components/common/AppLoader.vue'
import { IProductSize } from '~~/types/product.interface'

interface IProps {
  size: IProductSize
  isActive?: boolean
  isPending?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  size: null,
  isActive: false,
  isPending: false,
})

const sizeValue = computed(() => {
  return props?.size?.size || ''
})

const sizeStock = computed(() => {
  return props?.size?.stock || 0
})
</script>

<style lang="scss" scoped>
.product-size-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background-color: $color-white;
  color: $color-black;
  border: 1px solid $color-medium-grey;
  border-radius: 5px;
  font-weight: 400;

  &--active {
    background-color: $color-pink;
    color: $color-white;
    border-color: $color-pink;

    .product-size-button__size-caption {
      font-weight: 700;
    }
  }

  &--disabled {
    color: $color-medium-grey;
    border-color: $color-light-grey;
    cursor: default;

    &::after {
      content: '';
      position: absolute;
      height: 46px;
      width: 1px;
      background-color: $color-light-grey;
      left: 2px;
      top: 2px;
      transform: rotate(-45deg);
      transform-origin: top left;
    }
  }

  &__size-caption {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    margin-top: 2px;
  }
}

@include media-lg {
  .product-size-button {
    width: 37px;
    height: 37px;
    border: 2px solid $color-medium-grey;
    border-radius: 10px;

    &--active {
      background-color: $color-pink;
      color: $color-white;
      border-color: $color-pink;
    }

    &--disabled {
      &::after {
        height: 42px;
        left: 1px;
        top: 1px;
      }
    }

    &__size-caption {
      font-size: 12px;
    }
  }
}
</style>
