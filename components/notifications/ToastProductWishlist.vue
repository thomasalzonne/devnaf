<template>
  <div class="toast-wishlist">
    <div v-if="image" class="toast-wishlist__image-container">
      <img class="toast-wishlist__image" :src="image" alt="" />
    </div>
    <div class="toast-wishlist__content">
      <p v-if="text" class="toast-wishlist__text">{{ text }}</p>
    </div>
    <div class="toast-wishlist__button-container">
      <button class="toast-wishlist__button" @click="goToWishlist">
        <SvgIcon
          class="toast-wishlist__icon"
          :class="{ 'toast-wishlist__icon--active': isFavourite }"
          :name="
            !isFavourite ? 'heart_product_outline' : 'heart_product_filled'
          "
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification/dist/index.mjs'
import { useAuthStore } from '~~/store/auth'

interface IProps {
  image: string
  text: string
  isFavourite: boolean
}

withDefaults(defineProps<IProps>(), {
  image: '',
  text: '',
  isFavourite: false,
})

const authStore = useAuthStore()
const toast = useToast()

const goToWishlist = () => {
  toast.clear()

  authStore.isAuthorized
    ? navigateTo('/accounts/favourites')
    : navigateTo('/wishlist')
}
</script>

<style lang="scss" scoped>
.toast-wishlist {
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

    &--active {
      color: $color-pink;
    }
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
  }
}

@include media-lg {
  .toast-wishlist {
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
