<template>
  <form class="request-reset-password-form" @submit.prevent="submit">
    <AppInput
      v-model="form.email"
      class="request-reset-password-form__input"
      :placeholder="$t('RequestResetPassword.email_placeholder')"
      :validation="true"
      :invalid="v$.email.$dirty && v$.email.$invalid"
      :error="v$.email.$errors"
      :dirty="v$.email.$dirty"
      name="email"
      @blur="touchField('email')"
    />
    <div
      v-if="isResponseError"
      class="request-reset-password-form__error error"
    >
      {{ error }}
    </div>
    <div class="request-reset-password-form__button-container">
      <AppButton
        :title="$t('RequestResetPassword.submit_button')"
        :pending="pending"
      />
      <button class="request-reset-password-form__link" @click="back">
        {{ $t('RequestResetPassword.found_my_password') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import { EStatus } from '~~/constants/status'
import { useAuthStore } from '~~/store/auth'
import { IRequestResetPasswordForm } from '~~/types/auth.interface'

import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const emit = defineEmits(['submit', 'back'])
const form: IRequestResetPasswordForm = reactive({
  email: '',
})

const rules = computed(() => {
  const localRules: any = {
    email: {
      required: helpers.withMessage(
        t('Validations.new_email_required').toString(),
        required
      ),
    },
  }

  if (form.email.trim().length) {
    localRules.email = {
      email: helpers.withMessage(
        t('Validations.email_invalid').toString(),
        email
      ),
    }
  }

  return localRules
})

const v$ = useVuelidate(rules, form)

const pending = computed(() => {
  return authStore.status === EStatus.PENDING
})

const error = computed(() => {
  return authStore.error?.code === 404
    ? t('RequestResetPassword.email_not_found')
    : authStore.error?.message || ''
})

const isResponseError = computed(() => {
  return !!error.value
})

const submit = () => {
  v$.value.$touch()

  if (v$.value.$invalid) return

  emit('submit', form)
}

const touchField = (field: string) => {
  v$.value[field].$touch()
}

const back = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.request-reset-password-form {
  width: 100%;
  &__button-container {
    margin-top: 28px;
  }

  &__error {
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  &__link {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    margin-top: 14px;
    color: $color-black-opacity;
    width: 100%;
    text-decoration: underline;
  }

  &__button-container {
    margin-top: 14px;

    & :deep(.app-button) {
      max-width: 100%;
    }
  }
}

@include media-lg {
  .request-reset-password-form {
    padding: 20px 0px 20px 0px;

    &__button-container {
      margin-top: 38px;

      & :deep(.app-button) {
        max-width: 100%;
      }
    }

    &__link {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
