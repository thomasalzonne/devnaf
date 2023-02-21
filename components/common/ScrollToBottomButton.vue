<template>
  <button class="scroll-button">
    <SvgIcon class="scroll-button__icon" name="arrow" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ScrollToBottomButton',
})
</script>

<style lang="scss" scoped>
.scroll-button {
  background-color: $color-pink-light;
  width: 87px;
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-top: auto;

  &__icon {
    width: 30px;
    height: 30px;
    color: $color-white;
    transform: rotate(90deg);
  }
}
</style>
