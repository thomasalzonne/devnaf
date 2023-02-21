<template>
  <AppContentCard class="user-password">
    <template #header>
      <p class="account-card-header user-password__heading">
        {{ $t('Account.change_password') }}
      </p>
    </template>
    <template #body>
      <div class="user-password__content">
        <form @submit.prevent.stop="submit">
          <AppInput
            v-model="form.currentPassword"
            class="user-password__input"
            type="password"
            :validation="true"
            :password-with-toggle="true"
            :label="$t('PasswordForm.current_password_label')"
            :placeholder="$t('PasswordForm.current_password_placeholder')"
            :invalid="
              (v$.currentPassword.$dirty && v$.currentPassword.$invalid) ||
              isResponseError
            "
            :error="v$.currentPassword.$errors"
            :dirty="v$.currentPassword.$dirty"
            name="current-password"
            @blur="touchField('currentPassword')"
            @input="handleInput"
          />
          <AppInput
            v-model="form.newPassword"
            class="user-password__input"
            type="password"
            :validation="true"
            :password-with-toggle="true"
            :label="$t('PasswordForm.new_password_label')"
            :placeholder="$t('PasswordForm.new_password_placeholder')"
            :invalid="
              (v$.newPassword.$dirty && v$.newPassword.$invalid) ||
              isResponseError
            "
            :error="v$.newPassword.$errors"
            :dirty="v$.newPassword.$dirty"
            name="new-password"
            @blur="touchField('newPassword')"
            @input="handleInput"
          />

          <div v-if="isResponseError" class="user-password__error error">
            {{ error }}
          </div>

          <AppButton
            class="user-password__button"
            :title="$t('Common.update')"
            btn-style="light"
            size="small"
            :pending="pending"
            :disabled="isDisabled"
          />
        </form>
      </div>
    </template>
  </AppContentCard>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import {
  helpers,
  minLength,
  required,
  sameAs,
  not,
} from '@vuelidate/validators'
import AppContentCard from '~/components/common/AppContentCard.vue'
import { useProfileStore } from '~~/store/profile'
import { EStatus } from '~~/constants/status'
import { IProfileEditPassword } from '~~/types/profile.interface'
import { PASSWORD_REGEX } from '~~/constants/auth'

import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'

const form: IProfileEditPassword = reactive({
  currentPassword: '',
  newPassword: '',
})

const isButtonClicked = ref(false)

const { t } = useI18n()
const profileStore = useProfileStore()

const rules = computed(() => {
  const localRules: any = {
    currentPassword: {
      required: helpers.withMessage(
        t('Validations.current_password_required').toString(),
        required
      ),
    },
    newPassword: {
      required: helpers.withMessage(
        t('Validations.reset_password_required').toString(),
        required
      ),
    },
  }

  if (form.currentPassword.trim().length) {
    localRules.currentPassword = {
      minLength: helpers.withMessage(
        t('Validations.password_min_length').toString(),
        minLength(8)
      ),
    }
  }

  if (form.newPassword.trim().length) {
    localRules.newPassword = {
      password_rule: helpers.withMessage(
        t('Validations.password_rule').toString(),
        helpers.regex(PASSWORD_REGEX)
      ),
      not_same: helpers.withMessage(
        t('Validations.same_password').toString(),
        not(sameAs(form.currentPassword))
      ),
    }
  }
  return localRules
})

const isOpenModal = ref(false)
const v$ = useVuelidate(rules, form)

const pending = computed(() => {
  return isButtonClicked.value && profileStore.status === EStatus.PENDING
})

const isDisabled = computed(() => {
  return !v$.value.$anyDirty || v$.value.$invalid
})

const error = computed<any>({
  get() {
    return t('Validations.current_password_invalid')
  },
  set() {
    profileStore.clear()
  },
})

const isResponseError = computed(() => {
  return profileStore.status === EStatus.ERROR
})

const submit = async () => {
  v$.value.$touch()

  if (v$.value.$invalid) return

  isButtonClicked.value = true

  const body: IProfileEditPassword = { ...form }

  body.confirmNewPassword = body.newPassword

  await profileStore.editPassword(body)

  if (profileStore.status === EStatus.SUCCESS) {
    isOpenModal.value = true
    form.currentPassword = ''
    form.newPassword = ''
    v$.value.$reset()
    profileStore.clear()
  }

  isButtonClicked.value = false
}

const touchField = (field: string) => {
  v$.value[field].$touch()
}

const handleInput = () => {
  if (error.value) {
    error.value = false
  }
}

onMounted(() => {
  profileStore.clear()
})
</script>

<style lang="scss" scoped>
.user-password {
  &__heading {
    padding: 10px 18px 7px 18px;
  }

  &__content {
    padding: 22px 18px 19px 18px;
  }

  &__input {
    margin-bottom: 14px;
  }

  &__button {
    margin-top: 22px;
    align-self: center;
  }
}

@include media-lg {
  .user-password {
    &__heading {
      padding: 20px 22px;
    }

    &__content {
      padding: 20px 22px 28px 22px;
    }

    &__input {
      margin-bottom: 24px;
    }

    &__button {
      margin-top: 30px;
      width: max-content;
      min-width: 209px;
      align-self: center;
    }
  }
}
</style>
