<template>
  <div class="account-page-header">
    <div class="account-page-header__content">
      <p class="account-page-header__title">{{ title }}</p>
      <p
        class="account-page-header__subtitle"
        :class="{ 'account-page-header--left': withButton }"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  withButton: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
.account-page-header {
  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
  }

  &__subtitle {
    font-weight: 440;
    font-size: 13px;
    line-height: 17px;
    color: $color-dark-grey;
  }
}

@include media-lg {
  .account-page-header {
    display: flex;
    align-items: flex-start;
    gap: 25px;
    margin: 58px 0px 92px 0px;

    &__title {
      font-size: 36px;
      line-height: 44px;
    }

    &__subtitle {
      font-size: 14px;
      line-height: 22px;
      margin-top: 19px;
    }
  }
}
</style>
