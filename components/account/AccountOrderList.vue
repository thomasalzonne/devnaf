<template>
  <AppContentCard class="order-list" :as-accordion="isMobile">
    <template #header>
      <div class="order-list__header">
        <p class="order-list__heading">{{ $t('Order.order_details') }}</p>
        <p class="order-list__count">{{ pluralizationQuantity }}</p>
      </div>
    </template>
    <template #body>
      <div class="order-list__body">
        <div class="order-list__items">
          <CartProduct
            v-for="(orderItem, i) in orderItems"
            :key="orderItem.id"
            :item="orderItem"
            :inactive="i === 0"
            :for-order="true"
            :with-toggle="withToggle"
          >
            <template v-if="i === 0" #footer>
              <div class="order-list__returned-container">
                <div class="order-list__returned">
                  {{ $t('Account.product_returned') }}
                </div>
              </div>
            </template>
          </CartProduct>
        </div>
        <AccountOrderPrices class="order-list__prices" :order="order" />
      </div>
    </template>
  </AppContentCard>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AppContentCard from '~/components/common/AppContentCard.vue'
import CartProduct from '~/components/cards/CartProduct.vue'
import AccountOrderPrices from '~/components/account/AccountOrderPrices.vue'
import { IOrder } from '~~/types/orders.interface'
import { ICartItem } from '~~/types/cart.interface'

interface IProps {
  withToggle: boolean
  order: IOrder
  isMobile: boolean
}

const { t } = useI18n()

const props = withDefaults(defineProps<IProps>(), {
  withToggle: false,
  order: null,
  isMobile: false,
})

const orderItems = computed<ICartItem[]>(() => {
  return (props.order?.items as ICartItem[]) || []
})

const pluralizationQuantity = computed<string>(() => {
  // @ts-ignore
  return t('Common.items', orderItems.value.length, {
    n: orderItems.value.length,
  })
})
</script>

<style lang="scss" scoped>
.order-list {
  height: max-content;

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 15px 0 15px;
  }

  &__heading {
    font-weight: 480;
    font-size: 16px;
    line-height: 44px;
    font-family: $font-secondary;
  }

  &__count {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 13px;
    line-height: 17px;
  }

  &__body {
    padding: 12px 13px;
  }

  &__items {
    max-height: 580px;
    overflow: auto;
    padding-right: 10px;

    @include custom-scroll;
  }

  &__returned-container {
    margin-top: auto;
    padding-top: 10px;
  }

  &__returned {
    background-color: $color-light-grey;
    border-radius: 30px;
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 10px 4px 10px;
    height: 28px;
    width: max-content;
  }

  &__prices {
    display: none;
  }
}

@include media-lg {
  .order-list {
    min-width: 405px;

    &__header {
      gap: 14px;
      padding: 10px 20px 23px 26px;
    }

    &__heading {
      font-size: 20px;
      line-height: 44px;
    }

    &__count {
      font-weight: 460;
      font-size: 16px;
      line-height: 21px;
    }

    &__body {
      padding: 15px 10px 56px 20px;
    }

    &__prices {
      display: block;
    }

    &__returned {
      font-size: 14px;
    }
  }
}

@include media-xl {
  .order-list {
    &__body {
      padding: 15px 20px 56px 30px;
    }
  }
}
</style>
