<template>
  <div class="look-card">
    <div class="look-card__img-container">
      <div class="look-card__gradient"></div>
      <img class="look-card__img" :src="image" alt="" />
      <p class="look-card__title">
        {{ product?.name || '' }}
      </p>
      <WishlistButton class="look-card__wishlist" :is-active="false" />
    </div>
    <button class="look-card__button" @click="selectCard">
      {{ $t('Common.add') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import WishlistButton from '~/components/common/WishlistButton.vue'

import { IProduct } from '~~/types/product.interface'

const emit = defineEmits(['onSelect'])

interface IProps {
  product: IProduct
}

const props = defineProps<IProps>()

const image = computed(() => {
  return props.product?.thumbnail_url || ''
})

const selectCard = () => {
  emit('onSelect')
}
</script>

<style lang="scss" scoped>
.look-card {
  width: 160px;
  height: auto;

  &__img-container {
    position: relative;
    width: 100%;
    height: 176px;
    background-color: $color-light-grey;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__button {
    background-color: $color-black;
    color: $color-white;
    font-weight: 460;
    font-size: 12px;
    line-height: 44px;
    font-family: $font-secondary;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 0 0 5px 5px;
    width: 100%;
  }

  &__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 80%;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }

  &__title {
    font-weight: 460;
    font-size: 13px;
    line-height: 17px;
    font-family: $font-secondary;
    color: $color-white;
    position: absolute;
    bottom: 7px;
    left: 12px;
    padding-right: 12px;
  }

  &__wishlist {
    position: absolute;
    top: 12px;
    right: 9px;
    width: 16px;
    height: 16px;
  }

  & :deep() {
    .wishlist-button {
      &--active {
        .wishlist-button__icon {
          color: $color-pink;
        }
      }

      &__icon {
        color: $color-white;
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
