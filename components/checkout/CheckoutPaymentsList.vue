<template>
  <div class="payments-list">
    <div class="payments-list__item">
      <AppRadioButton
        id="cards"
        :is-active="activeId === 'cards'"
        @selectOption="selectPayment"
      >
        <div class="payments-list__row">
          <div>
            <p class="payments-list__label">
              {{ $t('Payment.my_credit_card') }}
            </p>
            <div class="payments-list__cards">
              <img class="payment-empty__icon" src="~/assets/svg/visa.svg" />
              <img
                class="payment-empty__icon"
                src="~/assets/svg/mastercard.svg"
              />
              <img class="payment-empty__icon" src="~/assets/svg/cb.svg" />
              <img
                class="payment-empty__icon"
                src="~/assets/svg/american_express.svg"
              />
            </div>
          </div>
          <button class="payments-list__button" @click.stop="connectPaypal">
            {{ $t('Common.edit') }}
          </button>
        </div>
      </AppRadioButton>
      <div v-if="activeId === 'cards'" class="payments-list__content">
        Cards form
      </div>
    </div>
    <div class="payments-list__item">
      <AppRadioButton
        id="paypal"
        :is-active="activeId === 'paypal'"
        @selectOption="selectPayment"
      >
        <div class="payments-list__row">
          <div>
            <p class="payments-list__label">
              {{ $t('Payment.pay_via_paypal') }}
            </p>
            <p class="payments-list__description">4X Sans Frais</p>
          </div>
          <button class="payments-list__button" @click.stop="connectPaypal">
            {{ $t('Common.connect') }}
          </button>
        </div>
      </AppRadioButton>
      <div v-if="activeId === 'paypal'" class="payments-list__content">
        Paypal form
      </div>
    </div>
    <div class="payments-list__item">
      <AppRadioButton
        id="giftcard"
        :is-active="activeId === 'giftcard'"
        @selectOption="selectPayment"
      >
        <div>
          <p class="payments-list__label">
            {{ $t('Payment.pay_with_giftcard') }}
          </p>
        </div>
      </AppRadioButton>
      <div v-if="activeId === 'giftcard'" class="payments-list__content">
        Giftcard form
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppRadioButton from '~/components/common/AppRadioButton.vue'

const activeId = ref(null)

const selectPayment = (id: string) => {
  activeId.value = id
}

const connectPaypal = () => {}
</script>

<style lang="scss" scoped>
.payments-list {
  &__item {
    width: 100%;
    padding: 30px 0 20px 0;

    &:not(:last-child) {
      border-bottom: 1px solid $color-medium-grey;
    }
  }

  &__button {
    margin-left: auto;
    font-weight: 500;
    font-size: 14px;
    line-height: 30px;
    text-align: right;
    color: $color-dark-grey;
    text-decoration: underline;
  }

  &__label {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
  }

  &__description {
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: $color-dark-grey;
  }

  &__cards {
    display: flex;
    gap: 16px;
    margin-top: 5px;
  }

  &__icon {
    width: 30px;
    height: 30px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__content {
    margin-top: 20px;
  }
}

@include media-lg {
  .payments-list {
    &__item {
      &:first-child {
        padding-top: 0;
      }
    }
  }
}
</style>
