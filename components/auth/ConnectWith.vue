<template>
  <div class="connect-with">
    <p v-if="label" class="connect-with__title">{{ label }}</p>
    <div class="connect-with__buttons">
      <button
        class="connect-with__button"
        type="button"
        @click.prevent.stop="loginWith(EAuthProviders.GOOGLE)"
      >
        <img
          src="~/assets/svg/google.svg"
          alt="Connect with Google"
          class="connect-with__icon connect-with__icon--google"
        />
      </button>
      <button
        v-if="isShowFacebookButton"
        class="connect-with__button"
        @click.prevent.stop="loginWith(EAuthProviders.FACEBOOK)"
      >
        <img
          src="~/assets/svg/facebook.svg"
          alt="Connect with Google"
          class="connect-with__icon connect-with__icon--facebook"
        />
      </button>
      <AppLoader v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppLoader from '~/components/common/AppLoader.vue'
import { useAuthStore } from '~/store/auth'
import { EAuthProviders } from '~/constants/auth'
import {
  IFacebookCredentialResponse,
  IGoogleCredentialResponse,
  ILoginWithSocialsBody,
  EFacebookStatus,
} from '~~/types/auth.interface'
import { EStatus } from '~~/constants/status'

interface IProps {
  label: string
  isCheckoutFlow: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  isCheckoutFlow: false,
})

const config = useRuntimeConfig()
const route = useRoute()
const authStore = useAuthStore()
const googleTokenClient = ref(null)

const isShowFacebookButton = computed(() => {
  return typeof window !== 'undefined' && 'FB' in window
})

onMounted(() => {
  window.onload = async () => {
    await initGoogleAuth()
  }
})

const initGoogleAuth = async () => {
  // @ts-ignore
  googleTokenClient.value = await google.accounts.oauth2.initTokenClient({
    client_id: config.public.googleClientId,
    scope: 'https://www.googleapis.com/auth/contacts.readonly',
    prompt: 'select_account',
    callback: handleGoogleCredentialResponse,
  })
}

const loginWith = (provider: EAuthProviders) => {
  switch (provider) {
    case EAuthProviders.GOOGLE: {
      openGoogleAuth()
      break
    }
    case EAuthProviders.FACEBOOK:
      openFacebookAuth()
      break
  }
}

const openGoogleAuth = async () => {
  if (googleTokenClient.value !== null) {
    googleTokenClient.value.requestAccessToken()
  } else {
    await initGoogleAuth()

    openGoogleAuth()
  }
}

const openFacebookAuth = () => {
  FB.login(
    function (response: IFacebookCredentialResponse) {
      handleFacebookCredentialResponse(response)
    },
    () => {}
  )
}

const handleFacebookCredentialResponse = async (
  response: IFacebookCredentialResponse
) => {
  if (response.status === EFacebookStatus.CONNECTED) {
    const body: ILoginWithSocialsBody = {
      service: EAuthProviders.FACEBOOK,
      accessToken: response?.authResponse?.accessToken,
    }

    await handleLogin(body)
  }
}

const handleGoogleCredentialResponse = async (
  response: IGoogleCredentialResponse
) => {
  if (response.access_token) {
    const body: ILoginWithSocialsBody = {
      service: EAuthProviders.GOOGLE,
      accessToken: response?.access_token,
    }

    await handleLogin(body)
  }
}

const handleLogin = async (body: ILoginWithSocialsBody) => {
  await authStore.loginWithSocials(body)

  const status = authStore.status

  if (status === EStatus.SUCCESS) {
    if (props.isCheckoutFlow) navigateTo('/checkout')

    if (route.name === 'index') navigateTo('/account')

    if (route.name === 'wishlist') navigateTo('/account/favourites')
  }
}
</script>

<style lang="scss">
.connect-with {
  margin-top: 24px;

  &__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: $color-black-opacity;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 14px;
    width: 100%;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid $color-grey-separator;
    height: 44px;
    padding: 0 40px;

    &:hover {
      background-color: $color-grey-loading;
    }

    &:active {
      border-color: $color-black;
      background-color: $color-grey-loading;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;

    &--facebook {
      color: #1877f2;
    }
  }
}

@include media-sm {
  .connect-with {
    &__buttons {
      justify-content: center;
    }
  }
}

@include media-lg {
  .connect-with {
    &__buttons {
      justify-content: flex-start;
    }

    &__title {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: $color-black-opacity;
    }
  }
}
</style>
