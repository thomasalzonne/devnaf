<template>
  <div>
    <div ref="dropinContainer" class="adyen-form"></div>
    <div class="adyen-form-loader">
      <AppLoader v-if="!checkoutInstance" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISessionData } from '~~/types/checkout.interface'

import AppLoader from '~/components/common/AppLoader.vue'

import '@adyen/adyen-web/dist/adyen.css'
let AdyenCheckout

interface IProps {
  sessionData: ISessionData
}

const props = defineProps<IProps>()
const emit = defineEmits(['completed', 'select'])

const config = useRuntimeConfig()
const route = useRoute()

const dropinContainer = ref(null)
const checkoutInstance = ref(null)

const sessionData = reactive(props.sessionData)

const configuration = computed(() => {
  return {
    session: sessionData,
    clientKey: config.public.adyenClientKey,
    environment: config.public.adyenEnv,
    locale: config.public.locale,
    paymentMethodsConfiguration: {
      card: {
        showPayButton: false,
      },
    },
    onPaymentCompleted: (result) => {
      emit('completed', result.resultCode)
    },
    onError: (error) => {
      createError({ statusCode: error.name, message: error.message })
    },
  }
})

onMounted(async () => {
  const module = await import('@adyen/adyen-web')
  AdyenCheckout = module.default

  const query = route.query

  if (query?.sessionId && query?.redirectResult) {
    sessionData.id = query.sessionId as string

    finalizeCheckout()
  }

  createAdyenCheckout()
})

const createAdyenCheckout = async (): Promise<any> => {
  try {
    checkoutInstance.value = await AdyenCheckout(configuration.value)

    checkoutInstance.value
      .create('dropin', {
        onSelect: onSelectPayment,
      })
      .mount(dropinContainer.value)
    // debugger
  } catch (error) {
    createError(error)
  }
}

const onSelectPayment = (e) => {
  emit('select', e.type)
}

const finalizeCheckout = async () => {
  try {
    checkoutInstance.value = await createAdyenCheckout()

    checkoutInstance.value.submitDetails({
      details: route.query.redirectResult,
    })
  } catch (error) {
    createError(error)
  }
}

const submitForm = () => {
  checkoutInstance.value.components[0].submit()
}

defineExpose({
  submitForm,
})
</script>

<style lang="scss" scoped>
.adyen-form-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.adyen-form {
  & :deep() {
    .adyen-checkout {
      &__spinner {
        border-color: $color-medium-grey;
      }

      &__payment-method {
        border: 1px solid $color-medium-grey;
        border-radius: 10px;
        border-bottom: 1px solid $color-light-grey;

        &:not(:last-child) {
          margin-bottom: 11px;
        }

        &__details {
          padding: 0;
        }

        &--selected {
          background: transparent;
          border-color: $color-medium-grey;
        }

        &__header {
          background: transparent;
        }

        &__name {
          font-family: $font-primary;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          color: $color-black;
        }

        &__radio {
          width: 18px;
          height: 18px;
          border: 1px solid $color-black;
          border-radius: 5px;

          &:hover {
            box-shadow: none;
            outline: none;
          }

          &--selected {
            background-color: $color-white;

            &::after {
              background-color: $color-pink;
              width: 12px;
              height: 12px;
              border-radius: 3px;
            }
          }
        }
      }

      &__paypal {
        &__buttons {
          padding: 0 20px;
        }
      }

      &__card {
        &__form {
          padding: 0 20px;
        }

        &__cardNumber {
          &__brandIcon {
            margin-right: 21px;
            right: 0;
          }
        }

        &__cvc {
          &__hint {
            &__wrapper {
              margin-right: 21px;
            }
          }
        }
      }

      &__label {
        &--focused {
          .adyen-checkout__label__text {
            color: $color-black;
          }
        }
        .adyen-checkout__label__text {
          display: none;
        }
      }

      &__input {
        border: 1px solid $color-medium-grey;
        border-radius: 10px;
        padding: 17px 18px;
        height: 50px;

        &--focus {
          box-shadow: none;
          background-color: transparent;
        }
      }
    }
  }
}

@include media-lg {
  .adyen-form {
    & :deep() {
      .adyen-checkout {
        &__spinner {
          border-color: $color-medium-grey;
        }

        &__payment-method {
          border: none;
          border-radius: 0;
          border-bottom: 1px solid $color-light-grey;

          &:not(:last-child) {
            margin-bottom: 0px;
          }

          &--selected {
            background: transparent;
            border-color: transparent;
          }

          &__paypal {
            &__buttons {
              padding: 0;
            }
          }
        }

        &__card {
          &__form {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
