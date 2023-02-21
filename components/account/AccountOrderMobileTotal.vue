<template>
  <div
    class="order-mobile-total"
    :class="{
      'order-mobile-total--open': isOpen,
      'order-mobile-total--hide': isOpenSomeModal,
    }"
  >
    <button class="order-mobile-total__toggle" @click="toggle">
      <SvgIcon class="order-mobile-total__icon-toggle" name="chevron" />
    </button>
    <div class="order-mobile-total__body">
      <template v-if="isOpen">
        <div class="order-mobile-total__row order-mobile-total__row--price">
          <p class="order-mobile-total__label">{{ $t('Cart.subtotal') }}</p>
          <div class="order-mobile-total__price-container">
            <p class="order-mobile-total__price">{{ $n(itemsTotal, 'EUR') }}</p>
          </div>
        </div>
        <div
          v-if="orderReductionTotal"
          class="order-mobile-total__row order-mobile-total__row--price"
        >
          <p class="order-mobile-total__label">
            {{ $t('Cart.reduction_total') }}
          </p>
          <div class="order-mobile-total__price-container">
            <p
              class="order-mobile-total__price order-mobile-total__price--accent"
            >
              {{ $n(orderReductionTotal, 'EUR') }}
            </p>
          </div>
        </div>
        <div
          v-if="orderPromotionTotal"
          class="order-mobile-total__row order-mobile-total__row--price"
        >
          <p class="order-mobile-total__label">{{ $t('Cart.code_promo') }}</p>
          <div class="order-mobile-total__price-container">
            <p
              class="order-mobile-total__price order-mobile-total__price--accent"
            >
              {{ $n(orderPromotionTotal, 'EUR') }}
            </p>
          </div>
        </div>
        <div class="order-mobile-total__row order-mobile-total__row--price">
          <p class="order-mobile-total__label">{{ $t('Cart.delivery') }}</p>
          <div class="order-mobile-total__price-container">
            <p v-if="shippingTotal" class="order-mobile-total__price">
              {{ $n(shippingTotal, 'EUR') }}
            </p>
            <p
              v-else
              class="order-mobile-total__price order-mobile-total__price--accent"
            >
              {{ $t('Common.free') }}
            </p>
          </div>
        </div>
      </template>

      <div
        class="order-mobile-total__row"
        :class="{ 'order-mobile-total__row--total': isOpen }"
        @click="toggle"
      >
        <p class="order-mobile-total__total">{{ $t('Cart.total') }}</p>
        <div class="order-mobile-total__price-container">
          <p class="order-mobile-total__total-price">{{ $n(total, 'EUR') }}</p>
        </div>
      </div>

      <div class="order-mobile-total__button-container">
        <AppButton
          class="order-mobile-total__button"
          title="retourner un article"
          @click="submit"
        />
        <NuxtLink class="order-mobile-total__button-wrapper" to="/account/faq">
          <AppButton
            class="order-mobile-total__button"
            btn-style="outline"
            title="BESOIN D’AIDE ?"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import { useLayoutStore } from '~~/store/layout'
import { transformPriceFromSylius } from '~~/utils/sylius'
import { IOrder } from '~~/types/orders.interface'

interface IProps {
  order: IOrder
}

const props = withDefaults(defineProps<IProps>(), {
  order: null,
})

// const emit = defineEmits(['submit'])
const layoutStore = useLayoutStore()
const isOpen = ref(false)

watch(
  () => isOpen.value,
  (value: boolean) => {
    if (value) lockBody()
    else unlockBody()
  }
)

const isOpenSomeModal = computed(() => {
  return layoutStore.isOpenSomeModal || false
})

const itemsTotal = computed(() => {
  return transformPriceFromSylius(props.order?.originalTotal)
})

const orderReductionTotal = computed(() => {
  return transformPriceFromSylius(props.order?.distinctionTotal)
})

const orderPromotionTotal = computed(() => {
  return transformPriceFromSylius(props.order?.orderPromotionTotal)
})

const shippingTotal = computed(() => {
  return transformPriceFromSylius(props.order?.shippingTotal)
})

const total = computed(() => {
  return transformPriceFromSylius(props.order?.total)
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const submit = () => {}
</script>

<style lang="scss" scoped>
.order-mobile-total {
  position: fixed;
  bottom: calc($header-height-mobile - 1px);
  left: 0;
  background-color: $color-white;
  box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  padding: 19px 20px 8px 20px;
  z-index: $z-index-modal;
  transition: $easeOut200;
  max-height: calc(100vh - ($header-height-mobile * 2));
  overflow: auto;

  &--hide {
    display: none;
  }

  &--open {
    .order-mobile-total__toggle {
      top: 6px;
      transform: rotate(180deg);
    }

    .order-mobile-total__total-price {
      padding-right: 0;
    }
  }

  &__toggle {
    position: absolute;
    top: 22px;
    right: 20px;
  }

  &__icon-toggle {
    width: 7px;
    height: 7px;
  }

  &__label {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
  }

  &__total {
    font-weight: 900;
    font-size: 16px;
    line-height: 23px;
    text-transform: uppercase;
  }

  &__price {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    text-align: right;
    white-space: nowrap;

    &--accent {
      color: $color-pink;
    }
  }

  &__total-price {
    font-weight: 900;
    font-size: 16px;
    line-height: 23px;
    text-align: right;
    white-space: nowrap;
    padding-right: 17px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--price {
      padding: 10px 13px;
    }

    &--total {
      padding-top: 28px;
    }
  }

  &__button-container {
    margin-top: 12px;
    display: flex;
    gap: 7px;
  }

  &__button {
    border-radius: 5px;
  }

  &__body {
    height: 100%;
    overflow: auto;
  }

  &__button-wrapper {
    display: block;
    width: 100%;
  }
}
</style>
