<template>
  <div class="cart-info">
    <div class="cart-info__info-wrapper">
      <div v-if="!isCompact" class="cart-info__input-container">
        <PromoInput v-model="promocode" />
      </div>

      <div v-if="!isCompact" class="cart-info__prices">
        <div class="cart-info__row cart-info__row--space-between">
          <p class="cart-info__label">{{ $t('Cart.subtotal') }}</p>
          <p class="cart-info__price">
            {{ $n(itemsTotal, 'EUR') }}
          </p>
        </div>

        <div
          v-if="orderReductionTotal"
          class="cart-info__row cart-info__row--space-between"
        >
          <p class="cart-info__label">{{ $t('Cart.reduction_total') }}</p>
          <p class="cart-info__price cart-info__price--accent">
            -{{ $n(orderReductionTotal, 'EUR') }}
          </p>
        </div>

        <div
          v-if="orderPromotionTotal"
          class="cart-info__row cart-info__row--space-between"
        >
          <p class="cart-info__label">{{ $t('Cart.code_promo') }}</p>
          <p class="cart-info__price cart-info__price--accent">
            {{ $n(orderPromotionTotal, 'EUR') }}
          </p>
        </div>
        <div class="cart-info__row cart-info__row--space-between">
          <p class="cart-info__label">{{ $t('Cart.delivery') }}</p>
          <p v-if="shippingTotal" class="cart-info__price">
            {{ $n(shippingTotal, 'EUR') }}
          </p>
          <p v-else class="cart-info__price cart-info__price--accent">
            {{ $t('Common.free') }}
          </p>
        </div>
        <div class="cart-info__row cart-info__row--space-between">
          <p class="cart-info__label">{{ $t('Cart.is_for_gift') }}</p>
          <AppToggle v-model="internalIsGift" class="cart-info__toggle" />
        </div>
      </div>
      <div class="cart-info__total-container">
        <div class="cart-info__total-row">
          <p class="cart-info__total-title">{{ $t('Cart.total') }}</p>
          <div class="cart-info__total-price-container">
            <p class="cart-info__total-price">
              {{ $n(total, 'EUR') }}
            </p>
          </div>
        </div>
        <AppButton
          v-if="isShowButton"
          class="cart-info__total-button"
          :title="$t('Common.continue')"
          :disabled="isDisabledButton"
          :pending="isLoading"
          @click="triggerContinue"
        />
      </div>
    </div>
    <AdvantagesBox :horizontal="true" class="cart-info__advantages-block" />
  </div>
</template>

<script lang="ts" setup>
import AdvantagesBox from '~/components/common/AdvantagesBox.vue'
import AppButton from '~/components/common/AppButton.vue'
import AppToggle from '~/components/common/AppToggle.vue'
import PromoInput from '~/components/common/PromoInput.vue'
import { useCartStore } from '~~/store/cart'
import { ICart } from '~~/types/cart.interface'
import { transformPriceFromSylius } from '~~/utils/sylius'

interface IProps {
  isDisabledButton?: boolean
  isCompact?: boolean
  isLoading?: boolean
  isGift?: boolean
  isShowButton?: boolean
}

const emit = defineEmits(['submit', 'toggleIsGift'])
const props = withDefaults(defineProps<IProps>(), {
  isDisabledButton: false,
  isCompact: false,
  isLoading: false,
  isGift: false,
  isShowButton: true,
})

const cartStore = useCartStore()
const promocode = ref('')

const cart = computed<ICart>(() => {
  return cartStore?.cart
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

const internalIsGift = computed({
  get() {
    return props.isGift
  },
  set(value: boolean) {
    if (props.isLoading) return

    if (value !== props.isGift) {
      emit('toggleIsGift', value)
    }
  },
})

const triggerContinue = () => {
  emit('submit')
}
</script>

<style lang="scss" scoped>
.cart-info {
  margin: 28px 20px 20px;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
  }

  &__label {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  }

  &__link {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $color-pink;
    text-decoration: underline;

    &--desktop {
      display: none;
    }
  }

  &__content-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__points {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    padding: 14px 0;

    &--desktop {
      display: none;
    }

    &--mobile {
      display: flex;
    }
  }

  &__advantages-block {
    display: none;
  }
}

@include media-lg {
  .cart-info {
    margin: 0;

    &__info-wrapper {
      border: 1px solid $color-medium-grey;
      border-radius: 10px;
      padding: 0;
    }

    &__row {
      justify-content: flex-start;
      margin: 20px 0 31px 0;

      &--space-between {
        justify-content: space-between;
        margin: 13px 0;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    &__link {
      font-size: 14px;
      line-height: 22px;

      &--mobile {
        display: none;
      }

      &--desktop {
        display: block;
      }

      &--right-align {
        text-align: right;
      }
    }

    &__points {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 14px 0;
      border-bottom: 1px solid $color-medium-grey;
      margin: 0px 38px;

      &--desktop {
        display: flex;
      }

      &--mobile {
        display: none;
      }
    }

    &__label {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: $color-black;

      &--grey {
        color: $color-dark-grey;
      }

      &--gift {
        font-size: 16px;
        margin-top: 2px;
      }
    }

    &__prices {
      margin: 19px 0 22px 0;
      padding: 0 35px;
    }

    &__price {
      text-transform: uppercase;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;

      &--accent {
        font-weight: 700;
        color: $color-pink;
      }
    }

    &__input-container {
      padding: 19px 30px 0 30px;
    }

    &__total-container {
      padding: 0px 32px 26px 32px;
    }

    &__total-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      &--flex-end {
        justify-content: flex-end;
        margin-top: -9px;
      }
    }

    &__total-title {
      font-weight: 900;
      font-size: 20px;
      line-height: 22px;
      text-transform: uppercase;
    }

    &__total-price-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    &__total-price {
      font-weight: 900;
      font-size: 20px;
      line-height: 22px;
      text-align: right;
    }

    &__total-tax {
      font-weight: 400;
      font-size: 10px;
      line-height: 30px;
      text-align: right;
      color: $color-dark-grey;
    }

    &__total-button {
      max-width: 100%;
    }

    &__badge {
      margin-left: 4px;
    }

    &__advantages-block {
      display: grid;
      margin-top: 24px;
    }
  }
}

@include media-xl {
  .cart-info {
    &__total-container {
      padding: 0px 32px 26px 32px;
    }
  }
}
</style>
