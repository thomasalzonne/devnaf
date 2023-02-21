<template>
  <AppModalWrapper
    class="login-modal"
    :class="{ 'login-modal--checkout': isCheckout }"
    :is-show-back-button="isCheckout"
    :is-open="isOpen"
    @close="closeModal"
    @back="handleBack"
  >
    <AuthModalHeader
      class="login-modal__header"
      :title="$t('Login.title')"
      :description="$t('Login.subtitle')"
    />
    <div class="login-modal__content">
      <LoginForm @submit="login" />
      <button
        class="link login-modal__registration"
        type="button"
        @click="goToResetPassword"
      >
        {{ $t('Login.forgot_password_link') }}
      </button>

      <ConnectWith
        class="login-modal__connect"
        :is-checkout-flow="isCheckout"
      />

      <AuthSeparator class="login-modal__separator" />

      <div class="login-modal__footer">
        <AppButton
          :title="$t('Login.registration_link')"
          btn-style="light"
          @click="goToRegistration"
        />
      </div>
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import ConnectWith from './ConnectWith.vue'
import AuthModalHeader from './AuthModalHeader.vue'
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import LoginForm from '~/components/auth/LoginForm.vue'
import AppButton from '~/components/common/AppButton.vue'
import AuthSeparator from '~/components/auth/AuthSeparator.vue'

import { useAuthStore } from '~/store/auth'
import { ILoginForm } from '~~/types/auth.interface'
import { EStatus } from '~~/constants/status'
import { EAuth } from '~~/constants/auth'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isCheckout: {
    type: Boolean,
    default: false,
  },
})

const authStore = useAuthStore()
const $route = useRoute()
const $router = useRouter()

const login = async (form: ILoginForm) => {
  await authStore.login(form)

  const status: EStatus = authStore.status

  if (status === EStatus.SUCCESS) {
    closeModal()

    if (props.isCheckout) $router.push('/checkout')

    if ($route.name === 'index') $router.push('/account')

    if ($route.name === 'wishlist') $router.push('/account/favourites')
  }
}

const closeModal = () => {
  const query = { ...$route.query }

  delete query.authAction

  $router.push({
    query,
  })
}

const goToResetPassword = () => {
  const query = { ...$route.query }

  query.authAction = EAuth.RESET_PASSWORD_REQUEST

  $router.push({ query })
}

const goToRegistration = () => {
  const query = { ...$route.query }

  query.authAction = EAuth.REGISTRATION

  $router.push({ query })
}

const handleBack = () => {
  if (props.isCheckout) {
    const query = { ...$route.query }

    query.authAction = EAuth.PRE_AUTH

    $router.push({ query })
  } else {
    closeModal()
  }
}
</script>

<style lang="scss" scoped>
.login-modal {
  &__header {
    margin: 0px 0px 0 0px;
    padding-top: 30px;
  }

  &__content {
    padding: 20px 00px 15px 0;
    width: 100%;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;

    & :deep(.app-button) {
      max-width: 100%;
    }
  }

  &__registration {
    color: $color-black-opacity;
    margin-top: 8px;
    justify-content: center;
    text-align: center;
    width: 100%;
    font-weight: 500;
    font-size: 13px;
    line-height: 14px;
  }

  &__separator {
    margin-top: 16px;
    margin-bottom: 18px;
  }

  &__connect {
    margin-top: 24px;
  }
}

@include media-lg {
  .login-modal {
    &__header {
      margin: 36px 0px 0 0px;
      padding-top: 0px;
    }

    &__content {
      padding: 0;
    }

    &__separator {
      margin-top: 19px;
      margin-bottom: 24px;
    }

    &__connect {
      margin-top: 0px;
    }

    &__registration {
      font-size: 14px;
      line-height: 16px;
      margin-top: 14px;
    }
  }
}
</style>
