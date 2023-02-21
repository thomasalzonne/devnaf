<template>
  <form class="page-address-edit__form" @submit.prevent="submit">
    <div
      v-if="!isCheckout"
      class="page-address-edit__block page-address-edit__block--100"
    >
      <AppInput
        v-model="form.company"
        class="page-address-edit__input"
        :placeholder="$t('AddressForm.address_name_placeholder')"
        :invalid="v$.company.$dirty && v$.company.$invalid"
        :validation="false"
        :error="v$.company.$errors"
        :dirty="v$.company.$dirty"
        name="organization"
        @blur="touchField('company')"
      />
    </div>

    <div class="page-address-edit__block">
      <AppInput
        v-model="form.firstName"
        class="page-address-edit__input"
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
        class="page-address-edit__input"
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
      class="page-address-edit__input page-address-edit__input--margin"
      :placeholder="$t('AddressForm.street_placeholder')"
      :validation="true"
      :invalid="v$.street.$dirty && v$.street.$invalid"
      :error="v$.street.$errors"
      :dirty="v$.street.$dirty"
      name="street-address"
      @blur="touchField('street')"
    />

    <div class="page-address-edit__block">
      <AppInput
        v-model="form.details"
        class="page-address-edit__input"
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
        class="page-address-edit__input"
        :placeholder="$t('AddressForm.province_placeholder')"
        :validation="true"
        :invalid="v$.provinceCode.$dirty && v$.provinceCode.$invalid"
        :error="v$.provinceCode.$errors"
        :dirty="v$.provinceCode.$dirty"
        type="select"
        :options="provincesOptions"
        name="address-level1"
        @blur="touchField('provinceCode')"
        @input="handleProvinceCode"
      />
    </div>

    <div class="page-address-edit__block">
      <AppInput
        v-model="form.postcode"
        class="page-address-edit__input"
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
        class="page-address-edit__input"
        :placeholder="$t('AddressForm.city_placeholder')"
        :validation="true"
        :invalid="v$.city.$dirty && v$.city.$invalid"
        :error="v$.city.$errors"
        :dirty="v$.city.$dirty"
        name="address-level2"
        @blur="touchField('city')"
      />
    </div>

    <AppInput
      v-if="isShowEmailField"
      v-model="form.email"
      class="page-address-edit__input page-address-edit__input--margin"
      :placeholder="$t('AddressForm.email_placeholder')"
      :validation="true"
      :invalid="v$.email.$dirty && v$.email.$invalid"
      :error="v$.email.$errors"
      :dirty="v$.email.$dirty"
      name="email"
      @blur="touchField('email')"
    />

    <div
      v-if="emailError && !isAuthorized"
      class="page-address-edit__server-errors"
    >
      <p class="page-address-edit__error error">
        {{ $t('Validations.email_exist') }}
        <button class="page-address-edit__error-button" @click="openLogin">
          {{ $t('Common.login') }}
        </button>
      </p>
    </div>

    <div class="page-address-edit__block page-address-edit__block--100">
      <AppInput
        id="phone_input"
        v-model="form.phoneNumber"
        class="page-address-edit__input"
        :placeholder="$t('AddressForm.phone_placeholder')"
        :validation="true"
        :invalid="v$.phoneNumber.$dirty && v$.phoneNumber.$invalid"
        :error="v$.phoneNumber.$errors"
        :dirty="v$.phoneNumber.$dirty"
        type="tel"
        name="tel"
        @blur="touchField('phoneNumber')"
      />
    </div>

    <div v-if="error" class="page-addresses-edit__error error">
      {{ error }}
    </div>

    <div
      v-if="isSaved || withButton"
      class="page-address-edit__block page-address-edit__block--footer"
    >
      <div v-if="isSaved" class="page-address-edit__success-container">
        <img
          src="~/assets/svg/check_circle.svg"
          class="page-address-edit__success-icon"
          alt="success"
        />
        <p class="page-address-edit__success-message">
          {{ $t('AddressForm.address_saved') }}
        </p>
      </div>
      <AppButton
        v-if="withButton"
        class="page-address-edit__button"
        size="small"
        :title="!isSaved ? $t('Common.update') : $t('Common.back')"
        :pending="isPending"
        :disabled="isDisabled"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'
import { EStatus } from '~~/constants/status'
import { useAddressesStore } from '~~/store/addresses'
import {
  IAddressAddForm,
  IAddressItem,
  IProvince,
} from '~~/types/addresses.interface'
import { IOption } from '~~/types/select.interface'
import { EAuth, NAME_REGEX } from '~~/constants/auth'
import { MOBILE_REGEX } from '~~/constants/regex'

interface IAccountAddressFormProps {
  initialForm?: IAddressItem | null
  isEdit?: boolean
  isCheckout?: boolean
  withButton?: boolean
  isAuthorized?: boolean
  isFakeEmail?: boolean
  isSaved?: boolean
  emailError?: boolean
}

const addressesStore = useAddressesStore()

await useAsyncData('fetchCountryForAddressForm', () =>
  addressesStore.fetchCountry()
)

const props = withDefaults(defineProps<IAccountAddressFormProps>(), {
  initialForm: null,
  isEdit: false,
  isCheckout: false,
  withButton: true,
  isAuthorized: false,
  isFakeEmail: false,
  isSaved: false,
  emailError: false,
})

const emit = defineEmits(['submit', 'submitWhenSaved', 'provinceCodeUpdate'])
const { t } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const provinces = computed<any>(() => addressesStore.country?.provinces || [])

const provincesOptions = computed<IOption[]>(() => {
  return provinces.value.map((province: IProvince) => {
    return {
      value: province.code,
      name: province.name,
    }
  })
})

const form = reactive<IAddressAddForm>({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  company: '',
  countryCode: config.public.countryCode || 'ES',
  provinceCode: '',
  provinceName: '',
  street: '',
  city: '',
  postcode: '',
  details: '',
  email: '',
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

const isShowEmailField = computed(() => {
  return (
    (props.isCheckout && !props.isAuthorized) ||
    (props.isCheckout && props.isAuthorized && props.isFakeEmail)
  )
})

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
    phoneNumber: {
      required: helpers.withMessage(
        t('Validations.phone_required').toString(),
        required
      ),
    },
    company: {},
    countryCode: {
      required: helpers.withMessage(
        t('Validations.street_required').toString(),
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
    email: {},
  }

  if (form.firstName?.length) {
    localRules.firstName = {
      name_rule: helpers.withMessage(
        t('Validations.name_invalid').toString(),
        helpers.regex(NAME_REGEX)
      ),
    }
  }

  if (form.lastName?.length) {
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
        helpers.regex(MOBILE_REGEX)
      ),
    }
  }

  if (isShowEmailField.value) {
    localRules.email = {
      required: helpers.withMessage(
        t('Validations.email_required').toString(),
        required
      ),
    }

    if (form.email?.length) {
      localRules.email = {
        email: helpers.withMessage(
          t('Validations.email_invalid').toString(),
          email
        ),
      }
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
  },
  {
    deep: true,
  }
)
const submit = () => {
  if (props.isSaved) {
    emit('submitWhenSaved')
    return
  }
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

const handleProvinceCode = () => {
  emit('provinceCodeUpdate', form.provinceCode)
}

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })

  form.countryCode = config.public.countryCode || 'ES'
}

const openLogin = () => {
  const query = { ...route.query }

  query.authAction = EAuth.LOGIN

  router.replace({ query })
}

onMounted(() => {
  initForm()
})

defineExpose({
  submit,
  isDisabled,
})
</script>

<style lang="scss" scoped>
.page-address-edit {
  width: 100%;
  height: 100%;

  &__block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    &--100 {
      grid-template-columns: 100%;
    }

    &:not(:first-child) {
      margin-top: 14px;
    }

    &--footer {
      grid-template-columns: 1fr;
      margin-top: 0px !important;
      align-items: center;
    }
  }

  &__input {
    width: 100%;

    &--margin {
      margin-top: 14px;
    }
  }

  &__button {
    margin-top: 18px;
  }

  &__success-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0px 0 0px 0;
    margin-top: 25px;
  }

  &__success-icon {
    width: 18px;
    height: 18px;
  }

  &__success-message {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-black-opacity;
  }

  &__server-errors {
    margin-left: 19px;
    margin-top: 4px;
  }

  &__error-button {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-dark-grey;
    text-decoration: underline;
  }
}

@include media-lg {
  .page-address-edit {
    &__block {
      display: grid;
      grid-template-columns: 51% auto;
      gap: 23px;

      &:not(:first-child) {
        margin-top: 18px;
      }

      &--footer {
        margin-top: 30px !important;
        align-items: center;
      }
    }

    &__button {
      margin-top: 0;
    }

    &__input {
      &--margin {
        margin-top: 18px;
      }
    }

    &__success-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      margin-top: 0;
    }

    &__success-icon {
      width: 34px;
      height: 34px;
    }

    &__success-message {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
