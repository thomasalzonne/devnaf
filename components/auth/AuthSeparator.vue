<template>
  <div class="separator">
    <div class="separator__line"></div>
    <p class="separator__text">{{ $t('Login.or') }}</p>
    <div class="separator__line"></div>
  </div>
</template>

<style lang="scss" scoped>
.separator {
  display: flex;
  align-items: center;
  gap: 19px;
  margin: 21px 0 53px 0;

  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    text-align: center;
    color: $color-medium-grey;
  }

  &__line {
    height: 1px;
    width: 100%;
    background-color: $color-medium-grey;
  }
}

@include media-lg {
  .separator {
    margin-bottom: 20px;

    &__text {
      font-size: 16px;
    }
  }
}
</style>
