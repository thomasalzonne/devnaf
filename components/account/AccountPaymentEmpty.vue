<template>
  <div class="payment-empty__container">
    <div>
      <p class="payment-empty__label">
        {{ $t('Account.my_bank_card') }}
      </p>
      <div class="payment-empty__icons">
        <img class="payment-empty__icon" src="~/assets/svg/visa.svg" />
        <img class="payment-empty__icon" src="~/assets/svg/mastercard.svg" />
        <img class="payment-empty__icon" src="~/assets/svg/cb.svg" />
        <img
          class="payment-empty__icon"
          src="~/assets/svg/american_express.svg"
        />
      </div>
    </div>
    <button class="payment-empty__link" @click="addPayment">
      {{ $t('Common.add') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['addPayment'])

const addPayment = () => {
  emit('addPayment')
}
</script>

<style lang="scss" scoped>
.payment-empty {
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 2px;
  }

  &__icon {
    width: 30px;
    height: 24px;
  }

  &__link {
    display: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: $color-dark-grey;
    text-decoration: underline;
    text-transform: capitalize;
  }
}

@include media-lg {
  .payment-empty {
    &__label {
      font-size: 16px;
    }

    &__icons {
      margin-top: 9px;
    }

    &__link {
      display: block;
    }
  }
}
</style>
