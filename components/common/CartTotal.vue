<template>
  <div
    class="cart-total"
    :class="{
      'cart-total--open': isOpen,
      'cart-total--hide': isOpenSomeModal,
    }"
  >
    <button class="cart-total__toggle" @click="toggle">
      <SvgIcon class="cart-total__icon-toggle" name="chevron" />
    </button>
    <div class="cart-total__body">
      <template v-if="isOpen">
        <PromoInput
          v-if="isCart"
          v-model="promocode"
          class="cart-total__input"
        />
        <div class="cart-total__row cart-total__row--price">
          <p class="cart-total__label">{{ $t('Cart.subtotal') }}</p>
          <div class="cart-total__price-container">
            <p class="cart-total__price">{{ $n(itemsTotal, 'EUR') }}</p>
          </div>
        </div>
        <div
          v-if="orderReductionTotal"
          class="cart-total__row cart-total__row--price"
        >
          <p class="cart-total__label">{{ $t('Cart.reduction_total') }}</p>
          <div class="cart-total__price-container">
            <p class="cart-total__price cart-total__price--accent">
              {{ $n(orderReductionTotal, 'EUR') }}
            </p>
          </div>
        </div>
        <div
          v-if="orderPromotionTotal"
          class="cart-total__row cart-total__row--price"
        >
          <p class="cart-total__label">{{ $t('Cart.code_promo') }}</p>
          <div class="cart-total__price-container">
            <p class="cart-total__price cart-total__price--accent">
              {{ $n(orderPromotionTotal, 'EUR') }}
            </p>
          </div>
        </div>
        <div class="cart-total__row cart-total__row--price">
          <p class="cart-total__label">{{ $t('Cart.delivery') }}</p>
          <div class="cart-total__price-container">
            <p v-if="shippingTotal" class="cart-total__price">
              {{ $n(shippingTotal, 'EUR') }}
            </p>
            <p v-else class="cart-total__price cart-total__price--accent">
              {{ $t('Common.free') }}
            </p>
          </div>
        </div>
      </template>

      <div
        class="cart-total__row"
        :class="{ 'cart-total__row--total': isOpen }"
        @click="toggle"
      >
        <p class="cart-total__total">{{ $t('Cart.total') }}</p>
        <div class="cart-total__price-container">
          <p class="cart-total__total-price">{{ $n(total, 'EUR') }}</p>
        </div>
      </div>

      <div v-if="isShowButton" class="cart-total__button-container">
        <AppButton
          class="cart-total__button"
          btn-style="light"
          :title="$t('Common.continue')"
          @click="submit"
        />
      </div>

      <div v-if="isOpen && isCart" class="cart-total__advantages" v>
        <AdvantagesBox />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import PromoInput from '~/components/common/PromoInput.vue'
import AdvantagesBox from '~/components/common/AdvantagesBox.vue'
import { useCartStore } from '~~/store/cart'
import { useLayoutStore } from '~~/store/layout'
import { ICart } from '~~/types/cart.interface'
import { transformPriceFromSylius } from '~~/utils/sylius'

interface IProps {
  isShowButton?: boolean
}

withDefaults(defineProps<IProps>(), {
  isShowButton: true,
})
const emit = defineEmits(['submit'])
const cartStore = useCartStore()
const layoutStore = useLayoutStore()
const route = useRoute()
const isOpen = ref(false)
const promocode = ref('')

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

const cart = computed<ICart>(() => {
  return cartStore?.cart || null
})

const itemsTotal = computed(() => {
  return transformPriceFromSylius(cart.value?.originalTotal)
})

const orderReductionTotal = computed(() => {
  return transformPriceFromSylius(cart.value?.distinctionTotal)
})

const orderPromotionTotal = computed(() => {
  return transformPriceFromSylius(cart.value?.orderPromotionTotal)
})

const shippingTotal = computed(() => {
  return transformPriceFromSylius(cart.value?.shippingTotal)
})

const total = computed(() => {
  return transformPriceFromSylius(cart.value?.total)
})

const isCart = computed(() => {
  return route.name === 'cart'
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const submit = () => {
  emit('submit')
}
</script>

<style lang="scss" scoped>
.cart-total {
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
    .cart-total__toggle {
      top: 6px;
      transform: rotate(180deg);
    }

    .cart-total__total-price {
      padding-right: 0;
    }
  }

  &__advantages {
    & :deep() {
      .advantages {
        row-gap: 9px;

        &__card {
          padding: 22px;
          min-height: 73px;
        }
      }
    }
  }

  &__input {
    margin-top: 12px;
    margin-bottom: 25px;
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
  }

  &__button {
    border-radius: 5px;
  }

  &__body {
    height: 100%;
    overflow: auto;
  }
}
</style>
