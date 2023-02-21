<template>
  <AppModalWrapper
    class="request-reset-password-modal"
    :is-open="isOpen"
    :is-show-back-button="true"
    @close="closeModal"
    @back="goToLogin"
  >
    <div class="request-reset-password-modal__body">
      <AuthModalHeader
        class="request-reset-password-modal__header"
        :title="$t('RequestResetPassword.title')"
        :description="$t('RequestResetPassword.subtitle')"
      />
      <RequestResetPasswordForm
        @submit="requestResetPassword"
        @back="goToLogin"
      />
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { IRequestResetPasswordForm } from '~~/types/auth.interface'
import { useAuthStore } from '~~/store/auth'
import { EStatus } from '~~/constants/status'

import RequestResetPasswordForm from '~/components/auth/RequestResetPasswordForm.vue'
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import AuthModalHeader from '~/components/auth/AuthModalHeader.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const { locale, t } = useI18n()
const $route = useRoute()
const $router = useRouter()
const authStore = useAuthStore()
const { toastSuccess } = useAppToast()

const closeModal = () => {
  const query = { ...$route.query }

  delete query.authAction

  $router.replace({
    query,
  })
}

const goToLogin = () => {
  $router.back()
}

const requestResetPassword = async (form: IRequestResetPasswordForm) => {
  await authStore.requestResetPassword(form.email, locale.value)

  const status: EStatus = authStore.status

  if (status === EStatus.SUCCESS) {
    toastSuccess({
      text: t('RequestResetPassword.success_message'),
    })

    closeModal()
  }
}
</script>

<style lang="scss" scoped>
.request-reset-password-modal {
  & :deep(.app-modal-wrapper__body) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 0;
  }

  &__header {
    padding: 0;
    margin-bottom: 22px;
  }
}

@include media-lg {
  .request-reset-password-modal {
    & :deep(.app-modal-wrapper__body) {
      display: block;
      padding-bottom: 70px;
    }

    &__header {
      padding: 0;
      margin-bottom: 0;
    }

    &__body {
      padding-top: 36px;
    }
  }
}
</style>
