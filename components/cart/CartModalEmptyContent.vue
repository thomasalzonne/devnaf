<template>
  <div class="empty-cart">
    <div class="empty-cart__img-container">
      <img
        class="empty-cart__img"
        src="~/assets/images/empty.png"
        alt="Piggy"
      />
    </div>
    <ButtonCloseModal class="empty-cart__close" @click="closeModal" />
    <div class="empty-cart__content">
      <p class="empty-cart__title">{{ $t('CartModal.empty_heading') }},</p>
      <p class="empty-cart__text">
        {{ $t('CartModal.empty_text') }}
      </p>
      <div class="empty-cart__button-container">
        <AppButton title="consulter mes favoris" @click="goToFavourites" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import ButtonCloseModal from '~/components/common/ButtonCloseModal.vue'
import { useAuthStore } from '~~/store/auth'

const authStore = useAuthStore()
const router = useRouter()
const emit = defineEmits(['closeModal'])

const isAuthorized = computed(() => {
  return authStore.isAuthorized
})

const goToFavourites = () => {
  isAuthorized.value
    ? router.push('/account/favourites')
    : router.push('/wishlist')
}

const closeModal = () => {
  emit('closeModal')
}
</script>

<style lang="scss" scoped>
.empty-cart {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: auto;
  position: relative;

  &__img-container {
    height: 391px;
    width: 100%;
  }

  &__img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
    text-align: center;
    margin-top: 30px;
  }

  &__text {
    margin-top: 10px;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    text-align: center;
    max-width: 339px;
  }

  &__button-container {
    margin-top: 30px;
    width: 100%;
  }

  &__content {
    padding: 0 20px;
  }

  &__close {
    display: none;
  }
}

@include media-lg {
  .empty-cart {
    margin-top: 0;
    justify-content: flex-start;
    align-items: flex-start;

    &__img-container {
      height: 288px;
    }

    &__content {
      width: 100%;
      padding: 0 72px;
    }

    &__title {
      font-size: 24px;
      margin-top: 28px;
      line-height: 44px;
      text-align: left;
      margin-top: 13px;
    }

    &__text {
      font-family: $font-secondary;
      margin-top: 22px;
      font-weight: 440;
      font-size: 16px;
      line-height: 21px;
      text-align: left;
    }

    &__button-container {
      margin-top: 34px;
      width: 100%;
    }

    &__close {
      display: flex;
      position: absolute;
      top: 22px;
      right: 27px;
      z-index: 100;
      color: $color-white;
    }
  }
}
</style>
