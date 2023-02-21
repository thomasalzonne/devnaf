<template>
  <NuxtLink :to="`/products/${slug}`" class="product-color-button">
    <div
      class="product-color-button__color-container"
      :class="{ 'product-color-button__color-container--active': isActive }"
    >
      <div class="product-color-button__color" :style="colorStyle"></div>
    </div>
    <div v-if="colorData?.color_name" class="product-color-button__tooltip">
      {{ colorData?.color_name }}
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { IProductColor } from '~~/types/product.interface'

interface IProps {
  colorData: IProductColor | null
  isActive: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  colorData: null,
  isActive: false,
})

const slug = computed(() => {
  return props.colorData?.slug || ''
})

const colorStyle = computed(() => {
  if (props.colorData?.type === 'hexacode') {
    return { 'background-color': props.colorData?.value }
  }

  return {
    'background-image': "url('" + props.colorData?.value + "')",
    'background-size': 'cover',
  }
})
</script>
<style lang="scss" scoped>
.product-color-button {
  cursor: pointer;
  position: relative;

  &__color-container {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 37px;
    height: 37px;
    border: 1px solid $color-white;
    transition: $easeOut200;

    &--active {
      border-color: $color-dark-grey;
    }
  }

  &__color {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    overflow: hidden;
  }

  &__tooltip {
    position: absolute;
    opacity: 0;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    font-weight: 400;
    margin-top: 4px;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    transition: $easeOut200;
    background-color: $color-white;
    z-index: 2;
    width: max-content;
    display: none;
  }
}

@include media-lg {
  .product-color-button {
    &:hover {
      .product-color-button {
        &__color-container {
          border-color: $color-black;

          &--active {
            border-color: $color-dark-grey;
          }
        }

        &__tooltip {
          opacity: 1;
        }
      }
    }

    &__color-container {
      width: 37px;
      height: 37px;
    }

    &__color {
      width: 25px;
      height: 25px;
    }

    &__tooltip {
      display: block;
    }
  }
}
</style>
