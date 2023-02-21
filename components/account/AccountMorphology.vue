<template>
  <div class="account-morphology">
    <div class="account-morphology__label-container">
      <div class="account-morphology__label">
        {{ $t('Account.my_morphology') }}
      </div>
      <div class="account-morphology__type">
        <div class="account-morphology__img-container">
          <SvgIcon
            class="account-morphology__img"
            name="morphology_sablier_plus"
          />
        </div>
        <p class="account-morphology__name">Sablier +</p>
      </div>
    </div>
    <button v-if="!withData" class="account-morphology__link link">
      {{ $t('Account.find_my_morphology') }}
    </button>
    <button
      v-else
      class="account-morphology__morphology-link account-morphology__morphology-link--with-data link link--grey"
    >
      {{ $t('Account.redo_test') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const withData = ref(false)
</script>

<style lang="scss" scoped>
.account-morphology {
  margin: 8px 5px 0 -3px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__label-container {
    display: flex;
    align-items: center;
  }

  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }

  &__type {
    display: none;
    align-items: center;
    gap: 4px;
    margin-left: 11px;
  }

  &__img {
    width: 28px;
    height: 28px;
  }

  &__name {
    color: $color-dark-grey;
    font-weight: 500;
    font-size: 11px;
    line-height: 22px;
    margin-left: -5px;
  }

  &__link {
    text-align: right;
    font-size: 14px;
    line-height: 30px;

    &--with-data {
      display: none;
    }
  }
}

@include media-xl {
  .account-morphology {
    margin: 28px 5px 0 -2px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 424px;

    &__label-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__label {
      font-family: $font-secondary;
      font-size: 25px;
      line-height: 30px;
    }

    &__type {
      margin-left: 0px;
      margin-top: 8px;
    }

    &__img {
      width: 40px;
      height: 40px;
    }

    &__name {
      color: $color-dark-grey;
      font-size: 16px;
      line-height: 24px;
      margin-left: -5px;
    }

    &__link {
      text-align: right;
      font-size: 18px;
      line-height: 30px;

      &--with-data {
        display: none;
      }
    }
  }
}
</style>
