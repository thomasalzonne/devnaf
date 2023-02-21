<template>
  <div class="account-payment-item">
    <div class="account-payment-item__content">
      <p class="account-payment-item__title">
        {{ $t('Account.my_bank_card') }}
      </p>
      <div class="account-payment-item__container">
        <img class="account-payment-item__icon" src="~/assets/svg/visa.svg" />
        <div>
          <div class="account-payment-item__number-container">
            <div
              v-for="i in 12"
              :key="i"
              class="account-payment-item__circle"
            ></div>
            <div class="account-payment-item__number">3954</div>
          </div>
          <div>
            <p class="account-payment-item__text">Exp : 09/26</p>
            <p class="account-payment-item__text">Laure Artiaque</p>
          </div>
        </div>
      </div>
    </div>
    <div class="account-payment-item__link-container">
      <button class="link account-payment-item__link" @click="editPayment">
        {{ $t('Common.edit') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['editPayment'])

const editPayment = () => {
  emit('editPayment')
}
</script>

<style lang="scss" scoped>
.account-payment-item {
  display: flex;
  justify-content: space-between;

  &__title {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
  }

  &__container {
    display: flex;
    gap: 10px;
  }

  &__number-container {
    display: flex;
    align-items: center;
    margin-top: 4px;
  }

  &__circle {
    width: 9px;
    height: 9px;
    background-color: $color-dark-grey;
    border-radius: 50%;
    margin-right: 2px;

    &:nth-child(4n) {
      margin-right: 7px;
    }
  }

  &__number {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-dark-grey;
    margin-left: 1px;
  }

  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-dark-grey;
    margin-top: -1px;
  }

  &__link-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__link {
    display: none;

    text-align: right;
    color: $color-dark-grey;
    text-decoration: underline;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
  }

  &__icon {
    width: 30px;
    height: 24px;
  }
}

@include media-lg {
  .account-payment-item {
    &__title {
      font-size: 16px;
    }

    &__container {
      gap: 16px;
      margin-top: 9px;
    }

    &__circle {
      width: 6px;
      height: 6px;
      margin-right: 8px;

      &:nth-child(4n) {
        margin-right: 11px;
      }
    }

    &__number {
      font-size: 16px;
      line-height: 24px;
      margin-left: 4px;
    }

    &__text {
      font-size: 16px;
      line-height: 24px;
    }

    &__link {
      display: block;
    }
  }
}
</style>
