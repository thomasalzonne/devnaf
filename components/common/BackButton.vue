<template>
  <button class="back-button" @click="handleClick">
    <SvgIcon class="back-button__icon" name="chevron" />
    <span class="back-button__title">{{ $t('Common.back') }}</span>
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits(['back'])

const handleClick = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.back-button {
  display: flex;
  align-items: center;

  &__icon {
    width: 18px;
    height: 18px;
    transform: rotate(90deg);
  }

  &__title {
    font-weight: 460;
    font-size: 10px;
    line-height: 32px;
    font-family: $font-secondary;
    text-transform: uppercase;
    margin-bottom: -3px;
  }
}
</style>
