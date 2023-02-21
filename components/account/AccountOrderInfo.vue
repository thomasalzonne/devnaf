<template>
  <div class="order-info">
    <AccountOrderDeliveryDetails
      class="order-info__block"
      :order="order"
      :is-mobile="isMobile"
    />
    <AccountOrderTrackPackage
      class="order-info__block"
      :order="order"
      :is-mobile="isMobile"
    />
    <AppButton
      v-if="isAwaitingPayment"
      class="order-info__button"
      title="Pay order"
      btn-style="light"
      icon-right="arrow_right"
      @click="payOrder"
    />
    <AppButton
      v-if="!isAwaitingPayment"
      class="order-info__button"
      :title="isReturnActive ? 'confirm return' : 'return'"
      @click="isReturnActive ? showConfirmation() : toggleReturn()"
    />
    <AppButton
      class="order-info__button"
      :title="isReturnActive ? 'Cancel return' : 'besoin d’aide ?'"
      btn-style="outline"
      @click="isReturnActive ? cancelReturn() : goToHelp()"
    />
  </div>
</template>

<script lang="ts" setup>
import AccountOrderDeliveryDetails from '~/components/account/AccountOrderDeliveryDetails.vue'
import AccountOrderTrackPackage from '~/components/account/AccountOrderTrackPackage.vue'
import AppButton from '~/components/common/AppButton.vue'
import { EPaymentOrderState, IOrder } from '~~/types/orders.interface'

interface IProps {
  order: IOrder
  isReturnActive: boolean
  isMobile: boolean
}

const emit = defineEmits([
  'toggleReturn',
  'showConfirmation',
  'cancelReturn',
  'help',
  'payOrder',
])
const props = withDefaults(defineProps<IProps>(), {
  order: null,
  isReturnActive: false,
  isMobile: false,
})

const isAwaitingPayment = computed(() => {
  return props.order.paymentState === EPaymentOrderState.AWAITING_PAYMENT
})

const toggleReturn = () => {
  emit('toggleReturn')
}

const showConfirmation = () => {
  emit('showConfirmation')
}

const cancelReturn = () => {
  emit('cancelReturn')
}

const goToHelp = () => {
  emit('help')
}

const payOrder = () => {
  emit('payOrder')
}
</script>

<style lang="scss" scoped>
.order-info {
  width: 100%;
  flex-shrink: 1;

  &__block {
    &:not(:first-child) {
      margin-top: 33px;
    }
  }

  &__button {
    display: none;
    margin-top: 31px;

    &:last-child {
      margin-top: 20px;
    }
  }
}

@include media-lg {
  .order-info {
    &__button {
      display: flex;
    }
  }
}
</style>
