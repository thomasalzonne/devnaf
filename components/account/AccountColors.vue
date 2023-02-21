<template>
  <div class="account-colors">
    <div class="account-colors__row">
      <div class="account-colors__label">
        {{ $t('Account.my_colors') }}
      </div>
      <button v-if="!withData" class="account-colors__link link">
        {{ $t('Account.redo_test') }}
      </button>
      <button
        v-else
        class="account-colors__link account-colors__colors-link--with-data link link--grey"
      >
        {{ $t('Account.redo_test') }}
      </button>
    </div>
    <!-- <div class="account-colors__list">
      <div class="account-colors__container">
        <img
          class="account-colors__img"
          src="~/assets/images/color_1.png"
          alt="Color 1"
        />
      </div>
      <div class="account-colors__container">
        <img
          class="account-colors__img"
          src="~/assets/images/color_2.png"
          alt="Color 2"
        />
      </div>
      <div class="account-colors__container">
        <img
          class="account-colors__img"
          src="~/assets/images/color_3.png"
          alt="Color 3"
        />
      </div>
      <div class="account-colors__container">
        <img
          class="account-colors__img"
          src="~/assets/images/color_4.png"
          alt="Color 4"
        />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const withData = ref(false)
</script>

<style lang="scss" scoped>
.account-colors {
  margin: 3px 5px 0 -3px;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__link {
    text-align: right;
    font-size: 14px;
    line-height: 30px;

    &--with-data {
      display: none;
    }
  }

  &__list {
    display: none;
    align-items: center;
    gap: 5px;
    margin-top: -2px;
    margin-left: -2px;
  }

  &__container {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    overflow: hidden;
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }
}

@include media-xl {
  .account-colors {
    margin: 15px 5px 0 -2px;
    max-width: 424px;

    &__list {
      margin-left: 0px;
      margin-top: 8px;
    }

    &__link {
      font-size: 18px;
    }

    &__label {
      font-family: $font-secondary;
      font-size: 25px;
      line-height: 30px;
    }
  }
}
</style>
