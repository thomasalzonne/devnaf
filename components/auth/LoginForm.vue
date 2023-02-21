<template>
  <form class="login-form" autocomplete="off" @submit.prevent="submit">
    <AppInput
      v-model="form.email"
      class="login-form__input"
      :placeholder="$t('Login.email_placeholder')"
      :validation="true"
      :invalid="(v$.email.$dirty && v$.email.$invalid) || isResponseError"
      :error="v$.email.$errors"
      :dirty="v$.email.$dirty"
      name="email"
      @blur="touchField('email')"
      @input="handleInput"
    />
    <AppInput
      v-model="form.password"
      class="login-form__input"
      type="password"
      :placeholder="$t('Login.password_placeholder')"
      :password-with-toggle="true"
      :validation="true"
      :invalid="(v$.password.$dirty && v$.password.$invalid) || isResponseError"
      :error="v$.password.$errors"
      :dirty="v$.password.$dirty"
      name="current-password"
      @blur="touchField('password')"
      @input="handleInput"
    />
    <div v-if="error" class="login-form__error error">
      {{ error }}
    </div>
    <AppButton
      class="login-form__button"
      :title="$t('Login.submit_button')"
      :pending="pending"
    />
  </form>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'
import { useAuthStore } from '~~/store/auth'
import { EStatus } from '~~/constants/status'

const emit = defineEmits(['submit'])
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remeber: false,
})

const { t } = useI18n()

const rules = computed(() => {
  const localRules: any = {
    email: {
      required: helpers.withMessage(
        t('Validations.email_required').toString(),
        required
      ),
    },
    password: {
      required: helpers.withMessage(
        t('Validations.password_required').toString(),
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

  if (form.password.trim().length) {
    localRules.password = {
      minLength: helpers.withMessage(
        t('Validations.password_min_length').toString(),
        minLength(8)
      ),
    }
  }

  return localRules
})

const pending = computed(() => {
  return authStore.status === EStatus.PENDING
})

const error = computed({
  get() {
    if (authStore.error?.code === 401) {
      return t('Validations.invalid_credentials')
    } else {
      return authStore.error?.message || ''
    }
  },
  set(value: boolean) {
    if (!value) {
      authStore.reset()
    }
  },
})

const isResponseError = computed(() => {
  return authStore.status === EStatus.ERROR
})

const v$ = useVuelidate(rules, form)

const submit = () => {
  v$.value.$touch()

  if (v$.value.$invalid) return

  emit('submit', form)
}

const touchField = (field: string) => {
  v$.value[field].$touch()
}

const handleInput = () => {
  if (error.value) {
    error.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  &__input {
    &:not(:first-child) {
      margin-top: 13px;
    }
  }

  & :deep(.app-button) {
    margin-top: 15px;
  }

  & :deep(.app-button) {
    max-width: 100%;
  }

  &__error {
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
}

@include media-lg {
  .login-form {
    margin-top: 17px;

    &__input {
      &:not(:first-child) {
        margin-top: 20px;
      }
    }

    & :deep(.app-button) {
      margin-top: 38px;
    }
  }
}
</style>
