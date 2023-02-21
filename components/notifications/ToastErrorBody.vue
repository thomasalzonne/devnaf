<template>
  <div class="toast-error">
    <div class="toast-error__icon-container">
      <SvgIcon class="toast-error__icon" name="close" />
    </div>
    <div class="toast-error__content">
      <p v-if="title" class="toast-error__title">{{ title }}</p>
      <p v-if="text" class="toast-error__text">{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title?: string
  text?: string
}

withDefaults(defineProps<IProps>(), {
  title: '',
  text: '',
})
</script>

<style lang="scss" scoped>
.toast-error {
  display: flex;
  gap: 10px;
  padding: 8px 13px 7px 12px;
  cursor: pointer;

  &__icon-container {
    width: 22px;
    height: 22px;
    background-color: $color-error-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__icon {
    width: 8px;
    height: 8px;
    color: $color-red;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 14px;
    line-height: 20px;
    color: $color-black;
  }

  &__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    color: $color-black;
    margin-left: -32px;
    margin-top: 2px;
  }
}

@include media-lg {
  .toast-error {
    align-items: center;
    gap: 21px;
    padding: 31px 28px;

    &__icon-container {
      width: 39px;
      height: 39px;
    }

    &__icon {
      width: 15px;
      height: 15px;
    }

    &__title {
      font-size: 24px;
      line-height: 44px;
    }

    &__text {
      font-size: 14px;
      line-height: 22px;
      margin-left: 0;
      margin-top: -6px;
    }
  }
}
</style>
