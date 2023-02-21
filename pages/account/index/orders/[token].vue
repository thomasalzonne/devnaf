<template>
  <div class="page-order">
    <AccountMobilePageHeader
      :title="$t('Account.my_orders')"
      icon="bag_outline"
      @back="goBack"
    />
    <div class="page-order__header">
      <div class="page-order__header-content">
        <div v-if="!isPaid && isMobile" class="page-order__paid-icon-container">
          <img class="order-status__img" src="~/assets/svg/info_circle.svg" />
        </div>
        <p class="page-order__heading">{{ $t('Common.ordered') }}</p>
        <p class="page-order__number">{{ orderNumber }}</p>
      </div>
      <button class="page-order__back" @click="goBack">
        <SvgIcon class="page-order__back-icon" name="chevron" />
        <span class="page-order__back-title">{{ $t('Common.back') }}</span>
      </button>
    </div>

    <div class="page-order__content">
      <AccountOrderList
        :is-mobile="isMobile"
        :with-toggle="isReturnActive"
        :order="order"
      />
      <AccountOrderInfo
        :is-mobile="isMobile"
        :is-return-active="isReturnActive"
        :is-show-confirmation="isShowConfirmation"
        :order="order"
        @toggleReturn="toggleReturn"
        @showConfirmation="showConfirmation"
        @cancelReturn="cancelReturn"
        @help="handleHelp"
        @payOrder="payOrder"
      />
    </div>
    <AccountOrderMobileTotal v-if="isMobile" :order="order" />
    <AccountOrderConfirmReturn
      v-if="isShowConfirmation"
      @close="hideConfirmation"
    />
  </div>
</template>

<script lang="ts" setup>
import AccountOrderList from '~/components/account/AccountOrderList.vue'
import AccountOrderInfo from '~/components/account/AccountOrderInfo.vue'
import AccountOrderConfirmReturn from '~/components/account/AccountOrderConfirmReturn.vue'
import AccountOrderMobileTotal from '~/components/account/AccountOrderMobileTotal.vue'

import { useOrdersStore } from '~~/store/orders'
import { EPaymentOrderState, IOrder } from '~~/types/orders.interface'
import { useCartStore } from '~~/store/cart'
import { EStatus } from '~~/constants/status'
import { ICart } from '~~/types/cart.interface'
import { useLayoutStore } from '~~/store/layout'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const router = useRouter()
const route = useRoute()
const ordersStore = useOrdersStore()
const cartStore = useCartStore()
const layoutStore = useLayoutStore()

await useAsyncData('fetchOrderOnInit', () =>
  ordersStore.fetchOrder(route.params.token as string)
)

const isReturnActive = ref(false)
const isShowConfirmation = ref(false)

const order = computed<IOrder>(() => {
  return ordersStore.order
})

const orderNumber = computed(() => {
  return `N° ${order.value.number}`
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const isPaid = computed(() => {
  return order.value.paymentState !== EPaymentOrderState.AWAITING_PAYMENT
})

const toggleReturn = () => {
  isReturnActive.value = !isReturnActive.value
}

const showConfirmation = (): void => {
  isShowConfirmation.value = true
}

const hideConfirmation = (): void => {
  isShowConfirmation.value = false
  isReturnActive.value = false
}

const cancelReturn = () => {
  isReturnActive.value = false
}

const handleHelp = () => {
  navigateTo('/account/faq')
}

const payOrder = () => {
  cartStore.$patch({
    cart: order.value as ICart,
    error: null,
    status: EStatus.INIT,
  })

  router.push({
    path: '/checkout/payment',
    query: {
      order: order.value.tokenValue,
    },
  })
}

const goBack = (): void => {
  router.back()
}
</script>

<style lang="scss" scoped>
.page-order {
  padding-bottom: 37px;

  &__content {
    display: flex;
    gap: 33px;
    margin-top: 10px;
    flex-direction: column;
    padding: 0 20px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-top: 27px;
  }

  &__header-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__heading {
    font-weight: 900;
    font-size: 16px;
    line-height: 22px;
  }

  &__number {
    font-weight: 400;
    font-size: 13px;
    line-height: 28px;
    color: $color-dark-grey;
    font-style: italic;
  }

  &__back {
    display: none;
    align-items: center;
    gap: 3px;
  }

  &__back-icon {
    transform: rotate(90deg);
    width: 10px;
    height: 10px;
  }

  &__back-title {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 10px;
    line-height: 32px;
    text-transform: uppercase;
  }

  &__paid-icon-container {
    width: 22px;
    height: 22px;
  }

  &__paid-icon {
    width: 22px;
    height: 22px;
  }
}

@include media-lg {
  .page-order {
    padding-bottom: 88px;

    &__content {
      gap: 36px;
      margin-top: 36px;
      max-width: 900px;
    }

    &__header {
      max-width: 900px;
      margin-top: 5px;
    }

    &__header-content {
      gap: 20px;
    }

    &__heading {
      font-size: 20px;
      line-height: 22px;
    }

    &__number {
      font-size: 14px;
      line-height: 30px;
      line-height: 32px;
    }

    &__back {
      display: flex;
    }
  }
}

@include media-xl {
  .page-order {
    padding-bottom: 115px;

    &__content {
      display: flex;
      flex-direction: row;
      gap: 45px;
      margin-top: 36px;
      max-width: 900px;
    }
  }
}
</style>
