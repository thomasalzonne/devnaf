<template>
  <div class="checkout-info-delivery">
    <div class="checkout-info-delivery__header">
      <div class="checkout-info-delivery__icon-container">
        <img
          class="checkout-info-delivery__icon"
          src="~/assets/svg/delivery.svg"
        />
      </div>
      <p class="checkout-info-delivery__title">
        {{ $t('Cart.delivery_and_return') }}
      </p>
    </div>
    <div class="checkout-info-delivery__content">
      <p
        class="checkout-info-delivery__text"
        v-html="$t('Cart.delivery_text')"
      />
      <p class="checkout-info-delivery__text" v-html="$t('Cart.return_text')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout-info-delivery {
  border-radius: 10px;
  border: 1px solid $color-medium-grey;
  padding: 15px 13px 16px 13px;
  margin-top: 26px;

  &__header {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 15px;
    line-height: 20px;
  }

  &__icon-container {
    flex-shrink: 0;
    width: 46px;
    height: 25px;
  }

  &__icon {
    width: 46px;
    height: 25px;
  }

  &__content {
    margin-top: 12px;
    padding-left: 4px;

    p {
      &:not(:first-child) {
        margin-top: 16px;
      }
    }
  }

  &__text {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-black;

    b {
      font-weight: 500;
    }
  }
}
</style>
