<template>
  <div
    class="radio-button"
    :class="{ 'radio-button--active': isActive }"
    @click="selectOption"
  >
    <div class="radio-button__icon">
      <div class="radio-button__circle" />
    </div>
    <div class="radio-button__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  isActive: boolean
  id: any
}

const props = withDefaults(defineProps<IProps>(), {
  isActive: false,
  id: 'radio',
})
const emit = defineEmits(['selectOption'])

const selectOption = () => {
  emit('selectOption', props.id)
}
</script>

<style lang="scss" scoped>
.radio-button {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &--active {
    .radio-button {
      &__icon {
        // border-color: $color-pink;
      }

      &__circle {
        border-color: $color-white;
        background-color: $color-pink;
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__circle {
    background-color: transparent;
    border: 2px solid transparent;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__content {
    width: 100%;
    font-size: 14px;
    flex-shrink: 0;
  }
}
</style>
