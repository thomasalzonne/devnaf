<template>
  <form
    class="registration-name-form"
    autocomplete="off"
    @submit.prevent="submit"
  >
    <AppInput
      v-model="form.firstName"
      class="registration-name-form__input"
      :placeholder="$t('Registration.first_name_placeholder')"
      :validation="true"
      :invalid="v$.firstName.$dirty && v$.firstName.$invalid"
      :error="v$.firstName.$errors"
      :dirty="v$.firstName.$dirty"
      name="given-name"
      @blur="touchField('firstName')"
    />
    <AppInput
      v-model="form.lastName"
      class="registration-name-form__input"
      :placeholder="$t('Registration.last_name_placeholder')"
      :validation="true"
      :invalid="v$.lastName.$dirty && v$.lastName.$invalid"
      :error="v$.lastName.$errors"
      :dirty="v$.lastName.$dirty"
      name="family-name"
      @blur="touchField('lastName')"
    />
    <div class="registration-name-form__button-container">
      <AppButton
        class="registration-name-form__button"
        :title="$t('Registration.next_step_button')"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'
import { IRegistrationStepOneForm } from '~~/types/auth.interface'
import { NAME_REGEX } from '~~/constants/auth'

const emit = defineEmits(['submit'])
const { t } = useI18n()

const form = reactive<IRegistrationStepOneForm>({
  firstName: '',
  lastName: '',
})

const rules = {
  firstName: {
    required: helpers.withMessage(
      t('Validations.name_required').toString(),
      required
    ),
    name_rule: helpers.withMessage(
      t('Validations.name_invalid').toString(),
      helpers.regex(NAME_REGEX)
    ),
  },
  lastName: {
    required: helpers.withMessage(
      t('Validations.surname_required').toString(),
      required
    ),
    name_rule: helpers.withMessage(
      t('Validations.surname_invalid').toString(),
      helpers.regex(NAME_REGEX)
    ),
  },
}

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
.registration-name-form {
  width: 100%;
  &__input {
    margin-bottom: 13px;
  }

  &__button-container {
    margin-top: 15px;
  }

  & :deep(.app-button) {
    max-width: 100%;
  }

  &__error {
    font-weight: 500;
    color: $color-red;
    font-size: 16px;
    margin-bottom: 20px;
  }
}

@include media-lg {
  .registration-name-form {
    margin-top: 16px;

    &__input {
      margin-bottom: 20px;
    }

    &__button-container {
      margin-top: 38px;

      & :deep(.app-button__title) {
        font-size: 18px !important;
      }
    }

    & :deep(.app-button__title) {
      font-size: 18px;
    }
  }
}
</style>
