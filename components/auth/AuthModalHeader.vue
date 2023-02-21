<template>
  <div class="auth-modal-header">
    <p class="auth-modal-header__title">{{ title }}</p>
    <p v-if="description" class="auth-modal-header__description">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string
  description?: string
}

withDefaults(defineProps<IProps>(), {
  title: '',
  description: '',
})
</script>

<style lang="scss" scoped>
.auth-modal-header {
  padding: 0 40px;

  &__title {
    font-weight: 480;
    font-size: 20px;
    line-height: 33px;
    font-family: $font-secondary;
    text-align: center;
  }

  &__description {
    font-weight: 400;
    font-size: 13px;
    line-height: 21px;
    text-align: center;
    margin-top: 0px;
  }
}

@include media-lg {
  .auth-modal-header {
    padding: 0;
    &__title {
      font-size: 24px;
      line-height: 44px;
      text-align: left;
    }

    &__description {
      font-size: 16px;
      text-align: left;
    }
  }
}
</style>
