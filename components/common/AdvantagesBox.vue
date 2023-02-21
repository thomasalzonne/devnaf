<template>
  <div class="advantages" :class="{ 'advantages--horizontal': horizontal }">
    <div
      class="advantages__card"
      :class="{
        'advantages__card--active': isOpenPayment,
        'advantages__card--compact': isOpenDelivery && !horizontal,
      }"
      @click="toggleContent(EContent.PAYMENT)"
    >
      <SvgIcon
        class="advantages__icon"
        :name="isOpenPayment ? 'minus' : 'plus'"
      />
      <div class="advantages__content">
        <div class="advantages__icon-container">
          <img
            class="advantages__content-icon advantages__content-icon--payment"
            src="~/assets/svg/paiements.svg"
            alt=""
          />
        </div>

        <div class="advantages__text">
          <p class="advantages__content-title">
            {{ $t('Product.payment.title') }}
          </p>
          <p class="advantages__content-description">
            {{ $t('Product.payment.text') }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="advantages__card"
      :class="{
        'advantages__card--active': isOpenDelivery,
        'advantages__card--compact': isOpenPayment && !horizontal,
      }"
      @click="toggleContent(EContent.DELIVERY)"
    >
      <SvgIcon
        class="advantages__icon"
        :name="isOpenDelivery ? 'minus' : 'plus'"
      />
      <div class="advantages__content">
        <div class="advantages__icon-container">
          <img
            class="advantages__content-icon advantages__content-icon--delivery"
            src="~/assets/svg/delivery.svg"
          />
        </div>

        <div class="advantages__text">
          <p class="advantages__content-title">
            {{ $t('Product.delivery_and_refund.title') }}
          </p>
          <p class="advantages__content-description">
            {{ $t('Product.delivery_and_refund.text') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isOpenDelivery = ref(false)
const isOpenPayment = ref(false)

enum EContent {
  DELIVERY = 'delivery',
  PAYMENT = 'payment',
}

interface IProps {
  horizontal?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  horizontal: false,
})

watch(
  () => isOpenDelivery.value,
  (value: boolean) => {
    if (value && !props.horizontal) {
      isOpenPayment.value = false
    }
  }
)

watch(
  () => isOpenPayment.value,
  (value: boolean) => {
    if (value && !props.horizontal) {
      isOpenDelivery.value = false
    }
  }
)

const toggleContent = (type: EContent) => {
  switch (type) {
    case EContent.DELIVERY:
      isOpenDelivery.value = !isOpenDelivery.value
      break
    case EContent.PAYMENT:
      isOpenPayment.value = !isOpenPayment.value
      break
  }
}
</script>

<style lang="scss" scoped>
.advantages {
  display: flex;
  column-gap: 38px;
  row-gap: 10px;
  margin-top: 30px;
  width: 100%;
  flex-direction: column;

  &__card {
    border: 1px solid $color-medium-grey;
    border-radius: 10px;
    padding: 21px 30px 22px 23px;
    display: flex;
    align-items: center;
    position: relative;
    min-height: 93px;
    flex-grow: 1;
    flex-shrink: 1;
    cursor: pointer;
    width: 100%;

    &--active {
      .advantages__content-description {
        display: block;
      }
    }
  }

  &__icon {
    width: 8px;
    height: 8px;
    position: absolute;
    top: 11px;
    right: 13px;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 23px;
  }

  &__content-icon {
    height: 34px;
    max-width: 63px;

    &--payment {
      width: 34px;
      height: 24px;
    }

    &--delivery {
      width: 46px;
      height: 25px;
    }
  }

  &__content-title {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 15px;
    line-height: 20px;
  }

  &__content-description {
    display: none;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
  }
}

@include media-lg {
  .advantages {
    row-gap: 18px;
    margin-top: 25px;

    &--horizontal {
      flex-wrap: wrap;

      .advantages__card--active {
        padding: 30px 30px 20px 30px;
      }
    }

    &__card {
      padding: 30px 30px 20px 30px;

      &--active {
        padding: 30px 17px 20px 17px;
      }

      &--compact {
        width: max-content;
        .advantages__text {
          display: none;
        }
      }
    }

    &__content {
      gap: 15px;
    }

    &__content-title {
      font-size: 16px;
      line-height: 21px;
    }

    &__content-description {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
    }

    &__content-icon {
      &--delivery {
        width: 63px;
        height: 34px;
      }
    }
  }
}

@include media-xl {
  .advantages {
    flex-direction: row;
  }
}
</style>
