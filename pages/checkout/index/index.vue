<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="page-delivery"
    :class="{
      'page-delivery--edit': isEdit,
      'page-delivery--guest': !isAuthorized,
    }"
  >
    <CheckoutHeader
      v-if="isMobile"
      @back="handleHeaderBack"
      @close="handleHeaderClose"
    />
    <div class="page-delivery__block">
      <template v-if="(isMobile && !isEdit) || !isMobile">
        <AppPageHeader
          v-if="isAuthorized"
          class="page-delivery__header"
          :title="$t('Checkout.delivery_title')"
          :subtitle="addresses.length ? $t('Checkout.select_your_address') : ''"
        />
        <div
          v-if="isAuthorized && !!addresses?.length"
          class="page-delivery__list"
        >
          <div v-if="isPending" class="page-delivery__loader-container">
            <AppLoader class="page-delivery__loader" />
          </div>
          <CheckoutAddresses
            v-else
            :addresses="addresses"
            :readonly="true"
            :selected-address-id="initialForm?.id"
            @selectAddress="selectAddress"
            @editAddress="editAddress"
          />

          <AppButton
            class="page-delivery__button"
            :title="$t('Common.add_address')"
            btn-style="outline"
            @click="createAddress"
          />
        </div>
      </template>

      <div
        v-if="isShippingNif && !isEdit && isAuthorized"
        class="page-delivery__nif-container"
      >
        <p class="page-delivery__nif-label">
          {{ $t('Checkout.nif_label') }}
        </p>
        <AppInput
          v-model="shippingNif"
          class="page-delivery__nif-input"
          :placeholder="$t('Checkout.nif_placeholder')"
        />
      </div>

      <div
        v-show="
          !isAuthorized ||
          (isAuthorized && isEdit) ||
          (isAuthorized && !addresses?.length)
        "
        class="page-delivery__form-container"
      >
        <AppPageHeader
          v-if="isMobile || (!isMobile && !isAuthorized)"
          class="page-delivery__form-header"
          :title="$t('Checkout.delivery_title')"
        />
        <AccountAddressForm
          ref="shippingFormRef"
          class="page-delivery__form"
          :class="{
            'page-delivery__form--no-address': !addresses?.length,
          }"
          :is-authorized="isAuthorized"
          :is-fake-email="isFakeEmail"
          :is-checkout="true"
          :initial-form="initialForm"
          :with-button="false"
          :email-error="isEmailAlreadyExist"
          @provinceCodeUpdate="handleProvinceCodeUpdate"
          @submit="handleShippingForm"
        />

        <div v-if="isShippingNif" class="page-delivery__nif-container">
          <p class="page-delivery__nif-label">
            {{ $t('Checkout.nif_label') }}
          </p>
          <AppInput
            v-model="shippingNif"
            class="page-delivery__nif-input"
            :placeholder="$t('Checkout.nif_placeholder')"
          />
        </div>

        <div class="page-delivery__checkboxes">
          <AppCheckbox
            v-model="isSameAddressForBilling"
            class="page-delivery__checkbox"
            checkbox-style="black"
            :label="$t('Checkout.same_address_for_billing')"
          />

          <BillingAddressForm
            v-if="!isSameAddressForBilling"
            ref="billingFormRef"
            class="page-delivery__form page-delivery__form--billing"
            :initial-form="initialBillingForm"
            :with-button="false"
            @submit="handleBillingForm"
            @provinceCodeUpdate="handleBillingProvinceCodeUpdate"
          />

          <div v-if="isBillingNif" class="page-delivery__nif-container">
            <p class="page-delivery__nif-label">
              {{ $t('Checkout.nif_label') }}
            </p>
            <AppInput
              v-model="billingNif"
              class="page-delivery__nif-input"
              :placeholder="$t('Checkout.nif_placeholder')"
            />
          </div>

          <AppCheckbox
            v-if="!isAuthorized"
            v-model="isSubscribeToNewsletter"
            class="page-delivery__checkbox"
            checkbox-style="black"
            :label="$t('Checkout.subscribe_to_newsletter')"
          />
        </div>
      </div>

      <div
        v-if="(isEdit && isAuthorized && !initialForm?.id) || isSavedAddress"
        class="page-delivery__save-address"
      >
        <SaveAddressBlock
          :is-disabled-button="isValidAddressForm"
          :is-saved="isSavedAddress"
          @saveAddress="saveAddressToProfile"
        />
      </div>

      <div class="page-delivery__button-submit-container">
        <AppButton
          class="page-delivery__button-submit"
          :title="$t('Common.continue')"
          icon-right="arrow_right"
          btn-style="light"
          :disabled="isDisabledButton"
          :pending="isLoading"
          @click="triggerForm"
        />
      </div>

      <div
        v-if="!isAuthorized"
        class="page-delivery__privacy"
        v-html="
          $t('Checkout.policy', {
            conditions_link:
              'https://v3.nuxtjs.org/api/composables/use-head#meta',
            policy_link: 'https://v3.nuxtjs.org/api/composables/use-head#meta',
          })
        "
      ></div>
      <div class="page-delivery__delivery-info">
        <CheckoutInfoDelivery />
      </div>
    </div>
    <div class="page-delivery__info">
      <CheckoutInfo :cart="cart" page="delivery" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { useAddressesStore } from '~~/store/addresses'
import { useAuthStore } from '~~/store/auth'
import { IAddressAddForm, IAddressItem } from '~~/types/addresses.interface'
import { useProfileStore } from '~~/store/profile'
import { EStatus } from '~~/constants/status'

import CheckoutAddresses from '~~/components/checkout/CheckoutAddresses.vue'
import AccountAddressForm from '~/components/account/AccountAddressForm.vue'
import AppPageHeader from '~/components/common/AppPageHeader.vue'
import AppButton from '~/components/common/AppButton.vue'
import AppCheckbox from '~/components/common/AppCheckbox.vue'
import AppLoader from '~/components/common/AppLoader.vue'
import BillingAddressForm from '~/components/checkout/BillingAddressForm.vue'
import SaveAddressBlock from '~/components/checkout/SaveAddressBlock.vue'
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue'
import CheckoutInfoDelivery from '~/components/checkout/CheckoutInfoDelivery.vue'
import AppInput from '~/components/common/AppInput.vue'

import { useCheckoutStore } from '~~/store/checkout'
import {
  ICheckoutInfoPayload,
  IShippingForm,
  IBillingForm,
} from '~~/types/checkout.interface'
import { useLayoutStore } from '~~/store/layout'
import { EAppCookie } from '~~/constants/cookie'
import { useCartStore } from '~~/store/cart'
import { IBillingAddress, IShippingAddress } from '~~/types/cart.interface'

definePageMeta({
  layout: 'checkout',
})

const CANARIAN_CODE = 'CI-ES'

const authStore = useAuthStore()
const addressesStore = useAddressesStore()
const profileStore = useProfileStore()
const checkoutStore = useCheckoutStore()
const cartStore = useCartStore()

const initialForm = ref(null)
const initialBillingForm = ref(null)
const shippingFormRef = ref(null)
const billingFormRef = ref(null)
const isSameAddressForBilling = ref(true)
const isSubscribeToNewsletter = ref(false)
const shippingForm = reactive<IAddressAddForm | {}>({})
const billingForm = reactive({})
const isLoading = ref(false)
const layoutStore = useLayoutStore()
const isEdit = ref(false)
const isSavedAddress = ref(false)
const shippingNif = ref('')
const currentShippingProvinceCode = ref('')
const billingNif = ref('')
const currentBillingProvinceCode = ref('')

const v$ = useVuelidate()

const isAuthorized = computed(() => {
  return authStore.isAuthorized
})

const isFakeEmail = computed(() => {
  return profileStore?.profile?.user?.isFakeEmail
})

const isPending = computed(() => {
  return addressesStore.status === EStatus.PENDING
})

const addresses = computed<IAddressItem[]>(() => {
  return addressesStore?.addresses || []
})

const isDisabledButton = computed(() => {
  return v$.value.$invalid
})

const isValidAddressForm = computed(() => {
  return shippingFormRef?.value?.isDisabled
})

const cart = computed(() => {
  return cartStore.cart
})

const initialShippingAddress = computed<IShippingAddress>(() => {
  return cart.value.shippingAddress || null
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const checkoutError = computed(() => {
  return checkoutStore?.error || ''
})

const isEmailAlreadyExist = computed(() => {
  return checkoutError.value?.includes('email is already used')
})

const isShippingNif = computed(() => {
  return currentShippingProvinceCode.value === 'CI-ES'
})

const isBillingNif = computed(() => {
  return (
    !isSameAddressForBilling.value &&
    currentBillingProvinceCode.value === 'CI-ES'
  )
})

const authToken = useCookie(EAppCookie.AUTH_TOKEN)

if (authToken.value) {
  await useAsyncData('fetchAddressesCheckout', () =>
    addressesStore.fetchAddresses()
  )

  if (!addresses.value?.length) {
    isEdit.value = true
  }
}

watch(
  () => authToken.value,
  (value: string) => {
    if (value) {
      addressesStore.fetchAddresses()
    }
  }
)

const selectAddress = (id: number) => {
  v$.value.$reset()

  const address = addresses.value.find(
    (address: IAddressItem) => address.id === id
  )

  Object.keys(address).forEach((key) => {
    initialForm.value[key] = address[key]
  })

  isEdit.value = false
  isSavedAddress.value = false
  isSameAddressForBilling.value = true

  if (initialForm.value?.provinceCode === CANARIAN_CODE) {
    currentShippingProvinceCode.value = initialForm.value?.provinceCode
    shippingNif.value = ''
  } else {
    currentShippingProvinceCode.value = ''
  }
}

const editAddress = (id: number) => {
  v$.value.$reset()

  const address = addresses.value.find(
    (address: IAddressItem) => address.id === id
  )

  Object.keys(address).forEach((key) => {
    initialForm.value[key] = address[key]
  })

  isEdit.value = true
  isSavedAddress.value = false
  isSameAddressForBilling.value = true

  if (initialForm.value?.provinceCode === CANARIAN_CODE) {
    currentShippingProvinceCode.value = initialForm.value?.provinceCode
    shippingNif.value = ''
  } else {
    currentShippingProvinceCode.value = ''
  }
}

const createAddress = () => {
  v$.value.$reset()
  initialForm.value = null

  nextTick(() => {
    fillEmail()
  })

  isEdit.value = true
  isSavedAddress.value = false
  isSameAddressForBilling.value = true

  currentShippingProvinceCode.value = ''
  currentBillingProvinceCode.value = ''
  shippingNif.value = ''
  billingNif.value = ''
}

const saveAddressToProfile = async (addressName: string) => {
  shippingFormRef.value.submit()

  const form: IAddressAddForm = { ...(shippingForm as IAddressAddForm) }

  form.company = addressName

  if ('@id' in form) {
    delete form['@id']
  }

  if ('@type' in form) {
    delete form['@type']
  }

  if ('id' in form) {
    delete form.id
  }

  const data = await addressesStore.addAddress(form)

  await addressesStore.fetchAddresses()

  if (data?.id) {
    const address = addresses.value.find(
      (address: IAddressItem) => address.id === data?.id
    )

    Object.keys(address).forEach((key) => {
      initialForm.value[key] = address[key]
    })

    isSavedAddress.value = true
  }
}

const handleShippingForm = (form) => {
  Object.keys(form).forEach((key) => {
    shippingForm[key] = form[key]
  })
}

const handleBillingForm = (form) => {
  Object.keys(form).forEach((key) => {
    billingForm[key] = form[key]
  })
}

const submitAddress = async () => {
  const form: any = { ...shippingForm }

  const payload: ICheckoutInfoPayload = {
    shippingAddress: { ...form },
    billingAddress: { ...form },
  }

  if (isAuthorized.value) {
    payload.email = profileStore.profile?.email || null
  } else {
    payload.email = form?.email || ''
  }

  if (isShippingNif.value && shippingNif.value) {
    payload.shippingAddress.nif = shippingNif.value
  }

  if (!isSameAddressForBilling.value) {
    payload.billingAddress = null

    // @ts-ignore
    payload.billingAddress = { ...billingForm }

    if (isBillingNif.value && billingNif.value) {
      payload.billingAddress.nif = billingNif.value
    }
  }

  delete payload.shippingAddress.email
  delete payload.billingAddress.email

  isLoading.value = true

  await checkoutStore.setDeliveryInfo(payload)

  if (!isAuthorized.value && isSubscribeToNewsletter.value) {
    await checkoutStore.subscribeToNewsletter(payload.email)
  }

  const status: EStatus = checkoutStore.status

  if (status === EStatus.SUCCESS) {
    await checkoutStore.setShipmentMethod()

    navigateTo('/checkout/payment')
  }

  isLoading.value = false
}

const triggerForm = () => {
  shippingFormRef.value.submit()

  if (!isSameAddressForBilling.value) {
    billingFormRef.value.submit()
  }

  if (!v$.value.$invalid) {
    submitAddress()
  }
}

const fillEmail = () => {
  if (isAuthorized.value) {
    if (initialForm.value !== null) {
      initialForm.value.email = profileStore.profile?.email || ''
    } else {
      initialForm.value = {
        email: profileStore.profile?.email || '',
      }
    }
  }
}

const fillShippingForm = () => {
  if (initialShippingAddress.value) {
    const form: IShippingForm | {} = {}

    Object.keys(initialShippingAddress.value).forEach((key) => {
      if (initialShippingAddress.value[key]) {
        form[key] = initialShippingAddress.value[key]
      }
    })

    if ('@id' in form) {
      delete form['@id']
    }

    if ('@type' in form) {
      delete form['@type']
    }

    if ('id' in form) {
      delete form.id
    }

    if ('provinceCode' in form && form.provinceCode === CANARIAN_CODE) {
      currentShippingProvinceCode.value = form.provinceCode

      if ('nif' in form && !!form.nif) {
        shippingNif.value = form.nif as string
      }
    }

    initialForm.value = form
  }
}

const fillBillingForm = () => {
  if (cart.value?.billingAddress) {
    const billingAddress = cart.value?.billingAddress
    const form: IBillingForm | {} = {}

    Object.keys(billingAddress).forEach((key) => {
      if (billingAddress[key]) {
        form[key] = billingAddress[key]
      }
    })

    if ('@id' in form) {
      delete form['@id']
    }

    if ('@type' in form) {
      delete form['@type']
    }

    if ('id' in form) {
      delete form.id
    }

    if ('provinceCode' in form && form.provinceCode === CANARIAN_CODE) {
      currentBillingProvinceCode.value = form.provinceCode

      if ('nif' in form && !!form.nif) {
        billingNif.value = form.nif as string
      }
    }

    initialBillingForm.value = form
  }
}

const handleHeaderBack = () => {
  if (!isEdit.value) {
    navigateTo('/cart')
  } else {
    isEdit.value = false
    isSavedAddress.value = false
  }
}

const handleHeaderClose = () => {
  navigateTo('/cart')
}

const compareAddresses = () => {
  const shippingAddress = serializeAddress(cart.value?.shippingAddress)
  const billingAddress = serializeAddress(cart.value?.billingAddress)

  return JSON.stringify(shippingAddress) === JSON.stringify(billingAddress)
}

const serializeAddress = (address: IShippingAddress | IBillingAddress) => {
  const result = {}
  Object.keys(address).forEach((key) => {
    if (address[key]) {
      result[key] = address[key]
    }
  })

  if ('@id' in result) {
    delete result['@id']
  }

  if ('@type' in result) {
    delete result['@type']
  }

  if ('id' in result) {
    delete result.id
  }

  return result
}

watch(
  () => initialShippingAddress.value,
  (value: IShippingAddress | null) => {
    if (value) {
      fillShippingForm()

      isSameAddressForBilling.value = compareAddresses()

      if (!isSameAddressForBilling.value) {
        fillBillingForm()
      }

      isEdit.value = true
    }
  },
  {
    immediate: true,
  }
)

const handleProvinceCodeUpdate = (value: string) => {
  currentShippingProvinceCode.value = value
}

const handleBillingProvinceCodeUpdate = (value: string) => {
  currentBillingProvinceCode.value = value
}

onMounted(() => {
  fillEmail()
})

onUnmounted(() => {
  checkoutStore.clearError()
})
</script>

<style lang="scss" scoped>
.page-delivery {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
  padding-top: 24px;

  &--edit {
    padding-top: 12px;
  }

  &--guest {
    padding-top: 12px;
  }

  &__block {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 12px;
    height: 100%;
    width: 100%;
  }

  &__header {
    margin: 0px auto 18px auto;
    width: max-content;
    max-width: 335px;
    text-align: center;
  }

  &__list {
    padding: 0 20px;
    margin-bottom: 13px;
    width: 100%;
  }

  &__form-container {
    width: 100%;
  }

  &__main-label {
    font-family: $font-secondary;
    font-size: 25px;
    line-height: 30px;
    font-weight: 400;
    margin: 30px 20px 24px 20px;

    &--billing {
      margin-top: 42px;
      margin-bottom: -10px;
    }
  }

  &__form-header {
    width: max-content;
    margin: 0 auto;
  }

  &__form {
    padding: 8px 20px 0 20px;

    &--billing {
      margin-bottom: 26px;
      margin-top: 26px !important;
    }
  }

  &__form-button-container {
    padding: 0 20px;
    margin-top: 20px;
  }

  &__form-button {
    max-width: 100%;
  }

  &__checkboxes {
    margin-top: 30px;
    margin-bottom: 15px;
    width: 100%;

    & :deep(.app-checkbox__label) {
      font-weight: 400;
      color: $color-black;
      margin-left: 15px;
      margin-top: -2px;
    }
  }

  &__checkbox {
    margin-left: 17px;
    margin-right: 20px;
  }

  &__privacy {
    color: $color-dark-grey;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    padding: 14px 20px;
    text-align: center;

    & :deep(a) {
      color: $color-dark-grey;
      text-decoration: underline !important;
    }
  }

  &__info {
    display: none;
  }

  &__loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 120px;
  }

  &__button {
    min-width: 338px;
    // max-width: 341px;
    margin: 20px auto 0 auto;
  }

  &__button-submit-container {
    width: 100%;
    padding: 0 20px;
  }

  &__save-address {
    padding: 0px 20px 20px 20px;
    width: 100%;
  }

  &__delivery-info {
    width: 100%;
    padding: 0 20px;
  }

  &__nif-container {
    margin-top: 40px;
    margin-bottom: 52px;
  }

  &__nif-label {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  &__nif-input {
    max-width: 305px;
    margin-top: 6px;
  }
}

@include media-lg {
  .page-delivery {
    display: grid;
    grid-template-columns: calc(55% - 15px) calc(45% - 15px);
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    width: 100%;
    padding-top: 0;

    &--guest {
      padding-top: 0;
    }

    &__block {
      display: block;
      height: auto;
      padding-bottom: 0;
    }

    &__header {
      padding: 71px 0px 0px 0px;
      gap: 16px;
      margin: 0px auto 0px auto;
      max-width: 100%;
      width: 100%;
      text-align: left;
    }

    &__list {
      padding: 0px;
      margin-top: 30px;
      margin-bottom: 0;
    }

    &__form-button {
      display: none;
    }

    &__form-container {
      position: static;
      display: block;
      height: auto;
      padding-bottom: 0px;
    }

    &__form-header {
      margin: 0;
      margin-top: 70px;
    }

    &__form {
      padding: 0;
      margin-top: 13px;

      &--no-address {
        margin-top: 10px;
      }
    }

    &__main-label {
      font-size: 40px;
      line-height: 40px;
      margin: 0px 0 40px 0;

      &--billing {
        margin-top: 50px !important;
        margin-bottom: 40px;
      }
    }

    &__info-block {
      margin: 0;
      position: sticky;
      top: 20px;
      height: max-content;
    }

    &__info {
      margin-top: 25px;
      display: block;
    }

    &__checkboxes {
      margin-left: 0px;
      margin-bottom: 12px;
      margin-top: 26px;
    }

    &__checkbox {
      margin-left: 43px;
      margin-right: 43px;
    }

    &__checkbox {
      margin-left: 0px;
      width: max-content;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    &__button {
      margin-top: 30px;
      min-width: 338px;
      max-width: 341px;
      margin-bottom: 20px;
      margin-left: 0;
    }

    &__save-address {
      padding: 22px 0px 19px 0px;
    }

    &__privacy {
      font-size: 14px;
      line-height: 22px;
      padding: 26px 0px;
      text-align: left;
    }

    &__button-submit-container {
      padding: 0;
    }

    &__button-submit {
      max-width: 341px;
    }

    &__delivery-info {
      display: none;
    }
  }
}

@media screen and (min-width: 1439px) {
  .page-delivery {
    grid-template-columns: calc(58% - 25px) calc(41% - 25px);
    gap: 62px;
  }
}
</style>
