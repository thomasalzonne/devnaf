<template>
  <div class="toast-cart">
    <div v-if="image" class="toast-cart__image-container">
      <img class="toast-cart__image" :src="image" alt="" />
    </div>
    <div class="toast-cart__content">
      <p v-if="text" class="toast-cart__text">{{ text }}</p>
    </div>
    <div class="toast-cart__button-container">
      <button class="toast-cart__button" @click="goToCart">
        <SvgIcon class="toast-cart__icon" name="bag_outline" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification/dist/index.mjs'

interface IProps {
  image: string
  text: string
}

withDefaults(defineProps<IProps>(), {
  image: '',
  text: '',
})

const toast = useToast()

const goToCart = () => {
  toast.clear()

  navigateTo('/cart')
}
</script>

<style lang="scss" scoped>
.toast-cart {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 19px 12px 19px;

  &__image-container {
    display: none;
    max-width: 72px;
    height: auto;
  }

  &__image {
    display: block;
    object-fit: contain;
    width: 100%;
    height: auto;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__text {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 13px;
    line-height: 17px;
    color: $color-black;
    max-width: 120px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $color-black;
    border-radius: 10px;
    background-color: $color-white;
    color: $color-black;
    height: 40px;
    padding: 10px 18px;
    box-shadow: 3px 3px 0px 0px $color-black;
    transition: $easeOut200;
  }
}

@include media-lg {
  .toast-cart {
    gap: 21px;
    padding: 10px 13px 10px 9px;

    &__image-container {
      display: block;
    }

    &__text {
      font-size: 16px;
      line-height: 21px;
      max-width: 170px;
    }

    &__button {
      transition: $easeOut200;

      &:hover {
        box-shadow: 3px 3px 0px 0px $color-pink;
      }
    }
  }
}
</style>
