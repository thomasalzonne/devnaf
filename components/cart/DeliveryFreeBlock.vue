<template>
  <div class="delivery-free-block">
    <div class="delivery-free-block__content">
      <div class="delivery-free-block__icon-container">
        <img
          class="delivery-free-block__icon"
          src="~/assets/svg/delivery.svg"
        />
      </div>
      <p
        v-if="price <= freeDeliveryPrice"
        class="delivery-free-block__text"
        v-html="
          $t('Cart.add_for_free_delivery', { n: $n(amountToFree, 'EUR') })
        "
      ></p>
      <p v-else class="delivery-free-block__text">
        {{ $t('Cart.free_delivery_text') }}
      </p>
    </div>
    <DeliveryFreeProgress :price="price" />
  </div>
</template>

<script lang="ts" setup>
import DeliveryFreeProgress from './DeliveryFreeProggress.vue'

interface IProps {
  price: number
  amountToFree: number
}

withDefaults(defineProps<IProps>(), {
  price: 0,
  amountToFree: 0,
})

const config = useRuntimeConfig()

const freeDeliveryPrice = +config.public.freeDeliveryPrice
</script>

<style lang="scss" scoped>
.delivery-free-block {
  border: 1px solid $color-medium-grey;
  border-radius: 10px;
  padding: 16px 11px 6px 13px;
  display: grid;
  grid-template-columns: 100%;
  width: 100%;

  &__icon-container {
    display: none;
  }

  &__text {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 13px;
    line-height: 17px;

    &:deep(span) {
      font-weight: 460;
    }
  }
}

@include media-lg {
  .delivery-free-block {
    display: grid;
    grid-template-columns: 55% 43%;
    gap: 24px;
    padding: 24px 29px 23px 30px;

    &__content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    &__icon-container {
      display: block;
      width: 64px;
      height: 34px;
    }

    &__icon {
      width: 64px;
      height: 34px;
    }

    &__text {
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
