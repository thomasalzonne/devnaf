<template>
  <div v-if="isOpen" class="auth-cta" @click="closeModal">
    <div class="auth-cta__body" @click.stop="">
      <ButtonCloseModal class="auth-cta__close" @click="closeModal" />
      <div class="auth-cta__image-container">
        <img
          class="auth-cta__image"
          src="~/assets/images/auth_cta_image.png"
          alt="Auth CTA"
        />
      </div>

      <div class="auth-cta__content">
        <p class="auth-cta__heading">{{ $t('Auth.cta_heading') }} ✨</p>
        <AppButton
          class="auth-cta__button"
          :title="$t('Auth.cta_button')"
          @click="openLogin"
        />
        <p class="auth-cta__message">
          {{ $t('Auth.cta_message') }}
          <button class="auth-cta__link" @click="openRegistration">
            {{ $t('Auth.cta_link') }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonCloseModal from '~/components/common/ButtonCloseModal.vue'
import AppButton from '~/components/common/AppButton.vue'

import { EAuth } from '~~/constants/auth'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

const router = useRouter()
const layoutStore = useLayoutStore()

const isOpen = computed(() => {
  return layoutStore.modals[EModals.AUTH_CTA]
})

const closeModal = () => {
  layoutStore.closeModal(EModals.AUTH_CTA)
}

const openLogin = () => {
  closeModal()

  router.push({ query: { authAction: EAuth.LOGIN } })
}

const openRegistration = () => {
  closeModal()

  router.push({ query: { authAction: EAuth.REGISTRATION } })
}
</script>

<style lang="scss" scoped>
.auth-cta {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.3);

  &__body {
    position: fixed;
    bottom: $header-height-mobile;
    left: 0;
    background-color: $color-white;
    padding: 17px 20px 53px 20px;
    width: 100%;
  }

  &__close {
    margin-left: auto;
    margin-right: 8px;
  }

  &__heading {
    text-align: center;
    font-weight: 480;
    font-size: 20px;
    line-height: 26px;
    font-family: $font-secondary;
    margin-top: 24px;
  }

  &__button {
    margin: 0 auto;
    margin-top: 25px;
    max-width: 450px;
  }

  &__message {
    margin-top: 9px;
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    color: $color-medium-grey;
    text-align: center;
  }

  &__link {
    color: $color-pink;
    text-decoration: underline;
  }

  &__image-container {
    display: none;
    width: 100%;
    max-height: 242px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@include media-lg {
  .auth-cta {
    z-index: $z-index-modal;
    &__body {
      top: $header-height-desktop;
      right: 0;
      left: unset;
      bottom: unset;
      width: 483px;
      height: 100%;
      padding: 0;
    }

    &__content {
      padding: 43px 72px;
    }

    &__heading {
      font-weight: 480;
      font-size: 24px;
      line-height: 44px;
      text-align: left;
      margin-top: 0;
    }

    &__message {
      font-weight: 500;
      font-size: 14px;
      line-height: 23px;
    }

    &__button {
      margin-top: 18px;
    }

    &__close {
      display: none;
    }

    &__image-container {
      display: block;
    }
  }
}
</style>
