<template>
  <form class="reset-password-form" autocomplete="off" @submit.prevent="submit">
    <AppInput
      v-model="form.password"
      class="reset-password-form__input"
      :placeholder="$t('ResetPassword.password_placeholder')"
      :validation="true"
      :invalid="v$.password.$dirty && v$.password.$invalid"
      :error="v$.password.$errors"
      :dirty="v$.password.$dirty"
      :password-with-toggle="true"
      type="password"
      name="new-password"
      @blur="touchField('password')"
    />
    <div v-if="isResponseError" class="reset-password-form__error error">
      {{ error }}
    </div>
    <div class="reset-password-form__button-container">
      <AppButton
        :title="$t('ResetPassword.submit_button')"
        :pending="pending"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import { EStatus } from '~~/constants/status'
import { useAuthStore } from '~~/store/auth'
import { IResetPasswordForm } from '~~/types/auth.interface'

import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'
import { PASSWORD_REGEX } from '~~/constants/auth'

const { t } = useI18n()
const authStore = useAuthStore()
const emit = defineEmits(['submit'])
const form: IResetPasswordForm = reactive({
  password: '',
})

const rules = computed(() => {
  const localRules: any = {
    password: {
      required: helpers.withMessage(
        t('Validations.reset_password_required').toString(),
        required
      ),
    },
  }

  if (form.password.trim().length) {
    localRules.password = {
      password_rule: helpers.withMessage(
        t('Validations.password_rule').toString(),
        helpers.regex(PASSWORD_REGEX)
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
    ? t('ResetPassword.token_expired')
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
</script>

<style lang="scss" scoped>
.reset-password-form {
  &__button-container {
    margin-top: 28px;
  }

  &__error {
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  &__button-container {
    margin-top: 14px;

    & :deep(.app-button) {
      max-width: 100%;
    }
  }
}

@include media-lg {
  .reset-password-form {
    padding: 20px 0px 20px 0px;

    &__button-container {
      margin-top: 38px;

      & :deep(.app-button) {
        max-width: 100%;
      }
    }
  }
}
</style>
