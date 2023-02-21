<template>
  <AppModalWrapper
    class="pre-auth"
    :is-open="isOpen"
    :is-show-header="false"
    :is-close-on-click-outside="true"
  >
    <button class="pre-auth__close" @click="closeModal">
      <SvgIcon class="pre-auth__close-icon" name="close" />
    </button>
    <div class="pre-auth__img-container">
      <img
        class="pre-auth__img"
        src="~/assets/images/pre_auth_bg.png"
        alt="Auth"
      />
    </div>
    <div class="pre-auth__content">
      <AppButton
        class="pre-auth__button"
        :title="$t('Login.create_account')"
        btn-style="light"
        @click="goToRegistration"
      />
      <AppButton
        class="pre-auth__button"
        :title="$t('Login.login')"
        @click="goToLogin"
      />
      <AppButton
        class="pre-auth__button"
        :title="$t('Login.continue_as_guest')"
        btn-style="outline"
        @click="goAsGuest"
      />
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import AppButton from '~/components/common/AppButton.vue'

import { EAuth } from '~~/constants/auth'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const $route = useRoute()
const $router = useRouter()

const closeModal = () => {
  const query = { ...$route.query }

  delete query.authAction

  $router.push({
    query,
  })
}

const goToRegistration = () => {
  const query = { ...$route.query }

  query.authAction = EAuth.REGISTRATION

  $router.push({ query })
}

const goToLogin = () => {
  const query = { ...$route.query }

  query.authAction = EAuth.LOGIN

  $router.push({ query })
}

const goAsGuest = () => {
  closeModal()

  $router.push('/checkout')
}
</script>

<style lang="scss" scoped>
.pre-auth {
  overflow: auto;

  &:deep(.app-modal-wrapper__body) {
    padding: 0;
  }

  &:deep(.app-modal-wrapper__back) {
    display: none;
  }

  &:deep(.button-close-modal) {
    color: $color-white;
  }

  &__content {
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    gap: 13px;
    width: 100%;
  }

  &__img-container {
    width: 100%;
    height: 353px;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__button {
    max-width: 100%;
  }

  &__close {
    position: absolute;
    top: 19px;
    right: 26px;
    width: 20px;
    height: 20px;
    color: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__close-icon {
    width: 20px;
    height: 20px;
  }
}

@include media-lg {
  .pre-auth {
    &:deep(.app-modal-wrapper__header) {
      display: none;
    }

    &:deep(.app-modal-wrapper__body) {
      padding: 0;
    }

    &__img-container {
      max-height: 329px;
    }

    &__content {
      padding: 50px 73px;
    }

    &__button {
      max-width: 100%;
    }
  }
}
</style>
