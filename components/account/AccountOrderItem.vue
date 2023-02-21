<template>
  <NuxtLink :to="`/account/orders/${order?.tokenValue}`" class="order-item">
    <div class="order-item__block">
      <p class="order-item__text">{{ orderCompletedAt }}</p>
    </div>

    <div class="order-item__block">
      <p class="order-item__text">
        {{ pluralizationQuantity }}
      </p>
    </div>
    <div class="order-item__block order-item__block--row">
      <p class="order-item__text">{{ $n(itemsTotal, 'EUR') }}</p>
    </div>

    <AccountOrderItemStatus :status="orderStatus" />

    <div class="order-item__block">
      <p class="order-item__text order-item__text--italic">{{ orderNumber }}</p>
    </div>

    <div class="order-item__block">
      <button class="order-item__button">{{ $t('Account.consult') }}</button>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ECheckoutOrderState, IOrderListItem } from '~~/types/orders.interface'
import { transformPriceFromSylius } from '~~/utils/sylius'

interface IProps {
  order: IOrderListItem
}

const props = defineProps<IProps>()
const { $dayjs } = useNuxtApp()
const { t } = useI18n()

const itemsTotal = computed<number>(() => {
  return transformPriceFromSylius(props.order?.itemsTotal)
})

const orderCompletedAt = computed<string>(() => {
  return $dayjs(props.order?.checkoutCompletedAt).format('DD/MM/YYYY')
})

const itemsQuantity = computed<number>(() => {
  return props.order?.countItems || 0
})

const orderStatus = computed<ECheckoutOrderState>(() => {
  return props.order?.checkoutState
})

const pluralizationQuantity = computed<string>(() => {
  // @ts-ignore
  return t('Common.items', itemsQuantity.value, { n: itemsQuantity.value })
})

const orderNumber = computed(() => {
  return `N° ${props.order?.number}`
})
</script>

<style lang="scss" scoped>
.order-item {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  padding: 23px 17px 28px 17px;
  border-bottom: 1px solid $color-medium-grey;
  row-gap: 5px;
  column-gap: 10px;

  &:last-child {
    border-bottom: none;
  }

  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: $color-black-opacity;
    text-align: center;

    &--italic {
      font-style: italic;
      color: $color-dark-grey;
    }
  }

  &__block {
    width: max-content;
    display: flex;

    &:nth-child(2),
    &:nth-child(5) {
      align-items: center;
      margin-left: auto;
      margin-right: auto;
    }

    &:nth-child(3),
    &:nth-child(6) {
      align-items: center;
      margin-left: auto;
    }
  }

  &__button {
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    color: $color-dark-grey;
    text-decoration: underline;
  }
}

@include media-lg {
  .order-item {
    grid-template-columns: 12% 13% 12% 16% 20% 13%;
    padding: 14px 0 10px 0px;
    gap: 24px;

    &__text {
      font-size: 14px;
    }

    &__block {
      width: max-content;
      display: flex;

      &:nth-child(2),
      &:nth-child(5) {
        align-items: flex-start;
        margin: 0;
      }

      &:nth-child(3),
      &:nth-child(6) {
        align-items: flex-start;
        margin: 0;
      }
    }

    &__button {
      font-size: 14px;
    }
  }
}
</style>
