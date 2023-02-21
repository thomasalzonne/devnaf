<template>
  <AppModalWrapper
    class="reset-password-modal"
    :is-open="isOpen"
    @close="closeModal"
  >
    <div class="reset-password-modal__body">
      <AuthModalHeader
        class="reset-password-modal__header"
        :title="$t('ResetPassword.title')"
        :description="$t('ResetPassword.subtitle')"
      />
      <ResetPasswordForm @submit="resetPassword" />
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { IResetPasswordForm } from '~~/types/auth.interface'
import { useAuthStore } from '~~/store/auth'
import { EStatus } from '~~/constants/status'

import ResetPasswordForm from '~/components/auth/ResetPasswordForm.vue'
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import { EAuth } from '~~/constants/auth'

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

  delete query.token

  query.authAction = EAuth.LOGIN

  $router.push({
    query,
  })
}

const resetPassword = async (form: IResetPasswordForm) => {
  const token: string = $route.query?.token as string

  await authStore.resetPassword(form, token, locale.value)

  const status: EStatus = authStore.status

  if (status === EStatus.SUCCESS) {
    toastSuccess({
      text: t('ResetPassword.success_message'),
    })

    closeModal()
  }
}
</script>

<style lang="scss" scoped>
.reset-password-modal {
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
  .reset-password-modal {
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
