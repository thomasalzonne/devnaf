<template>
  <div class="checkout-info-payment">
    <div class="checkout-info-payment__header">
      <div class="checkout-info-payment__icon-container">
        <img
          class="checkout-info-payment__icon"
          src="~/assets/svg/paiements.svg"
        />
      </div>
      <p class="checkout-info-payment__title">
        {{ $t('Cart.payment_title') }}
      </p>
    </div>
    <div class="checkout-info-payment__content">
      <p
        class="checkout-info-payment__text"
        v-html="$t('Cart.payment_text_1')"
      />
      <p
        class="checkout-info-payment__text"
        v-html="$t('Cart.payment_text_2')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout-info-payment {
  border-radius: 10px;
  border: 1px solid $color-medium-grey;
  padding: 30px 30px 30px 40px;
  margin-top: 27px;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__title {
    font-weight: 460;
    font-size: 16px;
    line-height: 21px;
  }

  &__icon-container {
    flex-shrink: 0;
    width: 34px;
    height: 24px;
  }

  &__icon {
    width: 34px;
    height: 24px;
  }

  &__content {
    margin-top: 23px;

    p {
      &:not(:first-child) {
        margin-top: 15px;
      }
    }
  }

  &__text {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $color-black-opacity;

    b {
      font-weight: 500;
    }
  }
}
</style>
