<template>
  <form class="billing-address-form__form" @submit.prevent="submit">
    <div class="billing-address-form__block">
      <AppInput
        v-model="form.firstName"
        class="billing-address-form__input"
        :placeholder="$t('AddressForm.first_name_placeholder')"
        :validation="true"
        :invalid="v$.firstName.$dirty && v$.firstName.$invalid"
        :error="v$.firstName.$errors"
        :dirty="v$.firstName.$dirty"
        name="given-name"
        @blur="touchField('firstName')"
      />
      <AppInput
        v-model="form.lastName"
        class="billing-address-form__input"
        :placeholder="$t('AddressForm.last_name_placeholder')"
        :validation="true"
        :invalid="v$.lastName.$dirty && v$.lastName.$invalid"
        :error="v$.lastName.$errors"
        :dirty="v$.lastName.$dirty"
        name="family-name"
        @blur="touchField('lastName')"
      />
    </div>

    <AppInput
      v-model="form.street"
      class="billing-address-form__input billing-address-form__input--margin"
      :placeholder="$t('AddressForm.street_placeholder')"
      :validation="true"
      :invalid="v$.street.$dirty && v$.street.$invalid"
      :error="v$.street.$errors"
      :dirty="v$.street.$dirty"
      name="street-address"
      @blur="touchField('street')"
    />

    <div class="billing-address-form__block">
      <AppInput
        v-model="form.details"
        class="billing-address-form__input"
        :placeholder="$t('AddressForm.details_placeholder')"
        :validation="false"
        :invalid="v$.details.$dirty && v$.details.$invalid"
        :error="v$.details.$errors"
        :dirty="v$.details.$dirty"
        name="address-line1"
        @blur="touchField('details')"
      />
      <AppInput
        v-model="form.provinceCode"
        class="billing-address-form__input"
        :placeholder="$t('AddressForm.province_placeholder')"
        :validation="true"
        :invalid="v$.provinceCode.$dirty && v$.provinceCode.$invalid"
        :error="v$.provinceCode.$errors"
        :dirty="v$.provinceCode.$dirty"
        type="select"
        :options="provincesOptions"
        name="address-level1"
        @blur="touchField('provinceCode')"
        @input="handleUpdateProvince"
      />
    </div>

    <div class="billing-address-form__block">
      <AppInput
        v-model="form.postcode"
        class="billing-address-form__input"
        :placeholder="$t('AddressForm.postal_code_placeholder')"
        :validation="true"
        :invalid="v$.postcode.$dirty && v$.postcode.$invalid"
        :error="v$.postcode.$errors"
        :dirty="v$.postcode.$dirty"
        name="postal-code"
        @blur="touchField('postcode')"
      />
      <AppInput
        v-model="form.city"
        class="billing-address-form__input"
        :placeholder="$t('AddressForm.city_placeholder')"
        :validation="true"
        :invalid="v$.city.$dirty && v$.city.$invalid"
        :error="v$.city.$errors"
        :dirty="v$.city.$dirty"
        name="address-level2"
        @blur="touchField('city')"
      />
    </div>

    <div class="billing-address-form__block billing-address-form__block--100">
      <AppInput
        id="phone_input"
        v-model="form.phoneNumber"
        class="billing-address-form__input"
        :placeholder="$t('AddressForm.phone_placeholder')"
        :validation="true"
        :invalid="v$.phoneNumber.$dirty && v$.phoneNumber.$invalid"
        :error="v$.phoneNumber.$errors"
        :dirty="v$.phoneNumber.$dirty"
        type="tel"
        name="tel"
        @blur="touchField('phoneNumber')"
        @phoneValidation="phoneValidation"
      />
    </div>

    <div v-if="error" class="page-addresses-edit__error error">
      {{ error }}
    </div>
    <div v-if="withButton" class="billing-address-form__button-container">
      <AppButton
        class="billing-address-form__button"
        :title="$t('Common.update')"
        :animation="false"
        :pending="isPending"
        :disabled="isDisabled"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'
import { EStatus } from '~~/constants/status'
import { useAddressesStore } from '~~/store/addresses'
import { IAddressItem, IProvince } from '~~/types/addresses.interface'
import { IOption } from '~~/types/select.interface'
import { NAME_REGEX } from '~~/constants/auth'
import { IBillingForm } from '~~/types/checkout.interface'

interface IAccountAddressFormProps {
  initialForm?: IAddressItem | null
  isEdit?: boolean
  isCheckout?: boolean
  withButton?: boolean
}

const addressesStore = useAddressesStore()

const props = withDefaults(defineProps<IAccountAddressFormProps>(), {
  initialForm: null,
  isEdit: false,
  isCheckout: false,
  withButton: true,
  isAuthorized: false,
})

const emit = defineEmits(['submit', 'provinceCodeUpdate'])
const { t } = useI18n()
const config = useRuntimeConfig()
const invalidPhone = ref(false)

const provinces = computed<any>(() => addressesStore.country?.provinces || [])

const provincesOptions = computed<IOption[]>(() => {
  return provinces.value.map((province: IProvince) => {
    return {
      value: province.code,
      name: province.name,
    }
  })
})

const form = reactive<IBillingForm>({
  firstName: '',
  lastName: '',
  countryCode: config.public.countryCode,
  provinceCode: '',
  provinceName: '',
  street: '',
  city: '',
  postcode: '',
  details: '',
  phoneNumber: '',
})

const isPending = computed(() => {
  return addressesStore.status === EStatus.PENDING
})

const isDisabled = computed(() => {
  return v$.value.$invalid || !v$.value.$anyDirty
})

const error = computed(() => {
  return addressesStore.error || ''
})

const phoneValidator = () => !invalidPhone.value

const rules = computed(() => {
  const localRules: any = {
    firstName: {
      required: helpers.withMessage(
        t('Validations.name_required').toString(),
        required
      ),
    },
    lastName: {
      required: helpers.withMessage(
        t('Validations.surname_required').toString(),
        required
      ),
    },
    countryCode: {
      required: helpers.withMessage(
        t('Validations.required').toString(),
        required
      ),
    },
    provinceCode: {
      required: helpers.withMessage(
        t('Validations.street_required').toString(),
        required
      ),
    },
    provinceName: {
      required: helpers.withMessage(
        t('Validations.street_required').toString(),
        required
      ),
    },
    street: {
      required: helpers.withMessage(
        t('Validations.street_required').toString(),
        required
      ),
    },
    city: {
      required: helpers.withMessage(
        t('Validations.city_required').toString(),
        required
      ),
    },
    postcode: {
      required: helpers.withMessage(
        t('Validations.postcode_required').toString(),
        required
      ),
    },
    details: {},
    phoneNumber: {
      required: helpers.withMessage(
        t('Validations.phone_required').toString(),
        required
      ),
    },
  }

  if (form.firstName.length) {
    localRules.firstName = {
      name_rule: helpers.withMessage(
        t('Validations.name_invalid').toString(),
        helpers.regex(NAME_REGEX)
      ),
    }
  }

  if (form.lastName.length) {
    localRules.lastName = {
      name_rule: helpers.withMessage(
        t('Validations.surname_invalid').toString(),
        helpers.regex(NAME_REGEX)
      ),
    }
  }

  if (form.phoneNumber?.length) {
    localRules.phoneNumber = {
      isValidPhone: helpers.withMessage(
        t('Validations.phone_invalid').toString(),
        phoneValidator
      ),
    }
  }

  return localRules
})

const v$ = useVuelidate(rules, form)

watch(
  () => form.provinceCode,
  (value: string) => {
    form.provinceName =
      provincesOptions.value.find((option: IOption) => option.value === value)
        ?.name || ''
  },
  {
    immediate: true,
  }
)

watch(
  () => props.initialForm,
  (value) => {
    value ? initForm() : resetForm()
  }
)

const submit = () => {
  v$.value.$touch()

  if (v$.value.$invalid) return

  const formForSubmit = { ...form }

  if (formForSubmit?.details?.length) {
    formForSubmit.street = formForSubmit.street.concat(
      `, Details: ${formForSubmit.details}`
    )
  }

  delete formForSubmit.details

  emit('submit', formForSubmit)
}

const touchField = (field: string) => {
  v$.value[field].$touch()
}

const initForm = () => {
  if (props.initialForm) {
    const initialForm = { ...props.initialForm }
    Object.keys(initialForm).forEach((key) => {
      if (key === 'street') {
        const dividedFields = initialForm[key].split(', Details:')

        form[key] = dividedFields[0]
        form.details = dividedFields[1]?.trim()
      } else {
        form[key] = initialForm[key]
      }
    })
  }
}

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
}

const phoneValidation = (invalid: boolean) => {
  invalidPhone.value = invalid
}

const handleUpdateProvince = () => {
  emit('provinceCodeUpdate', form.provinceCode)
}

onMounted(() => {
  initForm()
})

defineExpose({
  submit,
})
</script>

<style lang="scss" scoped>
.billing-address-form {
  width: 100%;
  height: 100%;

  &__block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    &--100 {
      grid-template-columns: 100%;
    }

    margin-top: 14px;
  }

  &__input {
    width: 100%;

    &--margin {
      margin-top: 14px;
    }
  }

  &__button-container {
    margin-top: 53px;

    &:deep(.app-button) {
      max-width: 100%;
    }
  }
}

@include media-lg {
  .billing-address-form {
    &__block {
      grid-template-columns: 51% auto;
      gap: 23px;

      &:not(:last-child) {
        margin-top: 18px;
      }
    }

    &__input {
      &--margin {
        margin-top: 18px;
      }
    }

    &__button-container {
      margin-top: 30px;

      &:deep(.app-button) {
        max-width: 320px;
      }

      &:deep(.app-button__title) {
        font-size: 18px;
      }
    }
  }
}
</style>
