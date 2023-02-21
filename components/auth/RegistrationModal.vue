<template>
  <AppModalWrapper
    class="registration-modal"
    :class="{ 'registration-modal--checkout': isCheckout }"
    :is-open="isOpen"
    :is-show-back-button="true"
    @close="closeModal"
    @back="handleBack"
  >
    <AuthModalHeader
      class="registration-modal__header"
      :title="
        !step
          ? $t('Registration.title')
          : $t('Registration.hello', { n: nameForm.firstName || '' })
      "
      :description="
        !step ? $t('Registration.subtitle') : $t('Registration.subtitle_2')
      "
    />
    <div class="registration-modal__content">
      <RegistrationNameForm v-if="!step" @submit="nextStep" />
      <RegistrationForm v-else @submit="registration" />
      <AuthSeparator class="registration-modal__separator" />
      <ConnectWith
        class="registration-modal__connect"
        :label="$t('Registration.connect_with')"
      />
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import RegistrationForm from '~/components/auth/RegistrationForm.vue'
import RegistrationNameForm from '~/components/auth/RegistrationNameForm.vue'
import AuthSeparator from '~/components/auth/AuthSeparator.vue'
import ConnectWith from '~/components/auth/ConnectWith.vue'

import { useAuthStore } from '~/store/auth'
import {
  IRegistrationStepTwoForm,
  IRegistrationStepOneForm,
  IRegistrationForm,
} from '~~/types/auth.interface'
import { EStatus } from '~~/constants/status'

interface IRegistrationModalProps {
  isOpen: boolean
  isCheckout: boolean
}

const props = withDefaults(defineProps<IRegistrationModalProps>(), {
  isOpen: false,
  isCheckout: false,
})

const { locale } = useI18n()
const authStore = useAuthStore()
const $route = useRoute()
const $router = useRouter()
const step = ref<number>(0)

const nameForm = reactive<IRegistrationStepOneForm>({
  firstName: '',
  lastName: '',
})

const nextStep = (form: IRegistrationStepOneForm): void => {
  step.value++

  const { firstName, lastName } = form

  nameForm.firstName = firstName
  nameForm.lastName = lastName
}

const registration = async (form: IRegistrationStepTwoForm): Promise<void> => {
  const registerForm = { ...form }

  delete registerForm.accept_privacy

  const body: IRegistrationForm = {
    ...nameForm,
    ...registerForm,
  }

  await authStore.registration(body, locale.value)

  const status: EStatus = authStore.status

  if (status === EStatus.SUCCESS) {
    closeModal()

    props.isCheckout ? $router.push('/checkout') : $router.push('/account')
  }
}

const handleBack = (): void => {
  if (step.value) {
    step.value--
  } else {
    $router.back()
  }
}

const closeModal = (): void => {
  const query = { ...$route.query }

  delete query.authAction

  $router.replace({
    query,
  })
}

watch(
  () => props.isOpen,
  (value) => {
    if (!value) {
      step.value = 0
    }
  }
)
</script>

<style lang="scss" scoped>
.registration-modal {
  &__header {
    margin-top: 30px;
  }

  &__content {
    margin-top: 20px;
    width: 100%;
  }

  &__separator {
    margin-top: 13px;
    margin-bottom: 12px;
  }

  &__connect {
    margin-top: 0px;
  }
}

@include media-lg {
  .registration-modal {
    &__header {
      margin-top: 26px;
    }

    &__content {
      margin-top: 0;
    }

    &__separator {
      margin-top: 46px;
      margin-bottom: 24px;
    }
  }
}
</style>
