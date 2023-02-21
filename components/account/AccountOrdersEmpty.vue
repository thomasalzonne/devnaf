<template>
  <div class="orders-empty">
    <div class="orders-empty__img-container">
      <img
        class="orders-empty__img"
        src="~/assets/images/piggy.png"
        alt="No orders"
      />
    </div>

    <p class="orders-empty__heading">
      {{ $t('Account.orders_empty') }}
    </p>

    <p class="orders-empty__text">
      {{ $t('Account.orders_empty_description') }}
    </p>

    <AppButton
      class="orders-empty__button"
      size="medium"
      :title="$t('Account.find_my_order')"
    />
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
</script>

<style lang="scss" scoped>
.orders-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  height: calc(100vh - $header-height-mobile - 39px);

  &__img-container {
    width: 180px;
    height: 180px;
  }

  &__img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  &__heading {
    font-weight: 480;
    font-size: 24px;
    line-height: 44px;
    font-family: $font-secondary;
    text-align: center;
    margin-top: 24px;
    max-width: 290px;
  }

  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: $color-dark-grey;
    text-align: center;
    margin-top: 10px;
    max-width: 289px;
  }

  &__button {
    margin-top: 24px;
    width: max-content;
    padding: 5px 32px;
    width: 100%;
  }
}

@include media-lg {
  .orders-empty {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 700px;
    margin: 0;
    margin-top: -7px;
    height: auto;

    &__img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }

    &__heading {
      font-weight: 480;
      font-size: 24px;
      line-height: 44px;
      max-width: 465px;
    }

    &__text {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: $color-dark-grey;
      text-align: center;
      max-width: 339px;
    }

    &__button {
      margin-top: 24px;
      width: max-content;
      padding: 5px 32px;
      min-height: 37px;
      height: 37px;

      &:deep() {
        .app-button {
          &__title {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
