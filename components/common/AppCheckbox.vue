<template>
  <div
    class="app-checkbox"
    :class="[
      { 'app-checkbox--checked': isChecked },
      `app-checkbox--${checkboxStyle}`,
    ]"
    role="checkbox"
    tabindex="0"
    :aria-checked="isChecked"
    @click="clickHandler"
  >
    <div class="app-checkbox__icon-container">
      <div v-if="isChecked" class="app-checkbox__icon"></div>
    </div>

    <div v-if="label" class="app-checkbox__label">{{ label }}</div>
    <slot name="label" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  // default | black
  checkboxStyle: {
    type: String,
    default: 'default',
  },
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed<boolean>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const clickHandler = (): void => {
  isChecked.value = !isChecked.value
}
</script>

<style lang="scss" scoped>
.app-checkbox {
  padding: 3px;
  display: flex;

  &__label {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-dark-grey;
    margin-left: 12px;
    cursor: pointer;
    width: max-content;
  }

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid $color-black;
    border-radius: 5px;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    padding: 2px;
  }

  &__icon {
    width: 100%;
    height: 100%;
    background-color: $color-pink;
    border-radius: 3px;
  }
}

@include media-lg {
  .app-checkbox {
    align-items: flex-start;

    &__label {
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
      margin-left: 12px;
    }
  }
}
</style>
