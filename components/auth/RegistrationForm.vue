<template>
  <form class="registration-form" autocomplete="off" @submit.prevent="submit">
    <AppInput
      v-model="form.email"
      class="registration-form__input"
      :placeholder="$t('Registration.email_placeholder')"
      :validation="true"
      :invalid="
        (v$.email.$dirty && v$.email.$invalid) ||
        (responseEmailError && v$.email.$dirty)
      "
      :error="v$.email.$errors"
      :dirty="v$.email.$dirty"
      name="email"
      @blur="touchField('email')"
    />
    <div
      v-if="responseEmailError && v$.email.$dirty"
      class="registration-form__error error"
    >
      {{ responseEmailError }}
    </div>

    <AppInput
      v-model="form.password"
      class="registration-form__input"
      type="password"
      :placeholder="$t('Registration.password_placeholder')"
      :validation="true"
      :password-with-toggle="true"
      :invalid="v$.password.$dirty && v$.password.$invalid"
      :error="v$.password.$errors"
      :dirty="v$.password.$dirty"
      name="new-password"
      @blur="touchField('password')"
    />
    <div v-if="responsePasswordError" class="registration-form__error error">
      {{ responsePasswordError }}
    </div>
    <div>
      <AppCheckbox
        v-model="form.subscribedToNewsletter"
        class="registration-form__checkbox"
        checkbox-style="black"
        :value="false"
        :label="$t('Registration.subscribe_to_newsletters')"
      />
      <AppCheckbox
        v-model="form.accept_privacy"
        class="registration-form__checkbox"
        checkbox-style="black"
      >
        <template #label>
          <div
            class="registration-form__checkbox-label"
            :class="{
              'registration-form__checkbox-label--invalid':
                v$.accept_privacy.$invalid && v$.accept_privacy.$dirty,
            }"
          >
            <span>
              {{ $t('Registration.policy_text') }}
            </span>
            <a href="#">{{ $t('Registration.policy_link') }}</a>
          </div>
        </template>
      </AppCheckbox>
    </div>
    <div class="registration-form__button-container">
      <AppButton
        class="registration-form__button"
        :title="$t('Registration.submit_button')"
        :pending="pending"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'
import AppCheckbox from '~/components/common/AppCheckbox.vue'

import { useAuthStore } from '~~/store/auth'
import { EStatus } from '~~/constants/status'
import { PASSWORD_REGEX } from '~~/constants/auth'

const emit = defineEmits(['submit'])
const authStore = useAuthStore()
const { t } = useI18n()

defineProps({
  error: {
    type: String,
    default: '',
  },
})

const form = reactive({
  email: '',
  password: '',
  subscribedToNewsletter: false,
  accept_privacy: false,
})

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
        t('Validations.register_password_required').toString(),
        required
      ),
    },
    accept_privacy: {
      sameAs: helpers.withMessage(t('Validations.required'), sameAs(true)),
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
      password_rule: helpers.withMessage(
        t('Validations.password_rule').toString(),
        helpers.regex(PASSWORD_REGEX)
      ),
    }
  }

  return localRules
})

const pending = computed<boolean>(() => {
  return authStore.status === EStatus.PENDING
})

const responseEmailError = computed(() => {
  return authStore?.error?.violations?.find(
    (property) => property.propertyPath === 'email'
  )?.message
})

const responsePasswordError = computed(() => {
  return authStore?.error?.violations?.find(
    (property) => property.propertyPath === 'password'
  )?.message
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
</script>

<style lang="scss" scoped>
.registration-form {
  &__input {
    &:not(:first-child) {
      margin-top: 13px;
    }
  }

  &__button-container {
    margin-top: 19px;
  }

  & :deep(.app-button) {
    max-width: 100%;
  }

  &__error {
    margin: 10px 20px 20px;
  }

  &__checkbox {
    padding-left: 0;
    margin-left: -3px;

    &:not(:last-child) {
      margin-top: 21px;
    }

    &:last-child {
      margin-top: 15px;
    }
    & :deep() {
      .app-checkbox__label {
        color: $color-black;
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
      }
    }
  }

  &__checkbox-label {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    cursor: pointer;
    color: $color-black;
    margin-left: 14px;

    a {
      font-weight: 500;
      text-decoration: underline;
      margin-left: 4px;
    }

    &--invalid {
      color: $color-error;

      a {
        color: $color-error;
      }
    }
  }
}

@include media-lg {
  .registration-form {
    margin-top: 20px;

    &__input {
      &:not(:first-child) {
        margin-top: 20px;
      }
    }

    &__button-container {
      margin-top: 33px;
    }

    &__checkbox-label {
      margin-left: 12px;
    }

    &__checkbox {
      &:not(:last-child) {
        margin-top: 20px;
      }

      &:last-child {
        margin-top: 2px;
      }
      & :deep() {
        .app-checkbox__label {
          color: $color-black;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }

    &__checkbox-label {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      color: $color-black;

      a {
        font-weight: 500;
        text-decoration: underline;
        margin-left: 4px;
      }

      &--invalid {
        color: $color-error;

        a {
          color: $color-error;
        }
      }
    }
  }
}
</style>
