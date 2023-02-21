<template>
  <button class="button-close-modal" @click="clickHandler">
    <SvgIcon class="button-close-modal__icon" name="close" />
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits(['click'])

const clickHandler = (event) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.button-close-modal {
  display: flex;
  align-items: center;

  &:active {
    color: $color-pink;
  }

  &:hover .button-close-modal__icon {
    color: $color-pink;
  }

  &__icon {
    transition: $easeOut200;
    transform: rotateZ(0deg);
    width: 15px;
    height: 15px;
  }
}
</style>
