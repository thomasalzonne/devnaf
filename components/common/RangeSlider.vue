<template>
  <div class="range-slider">
    <Slider
      v-model="internalValue"
      :min="min"
      :max="max"
      :step="step"
      :tooltips="tooltips"
      :show-tooltip="showTooltip"
      :format="format"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

// eslint-disable-next-line import/default
import Slider from '@vueform/slider'

interface IProps {
  modelValue: any
  min: number
  max: number
  step: number
  tooltips: boolean
  showTooltip: 'always' | 'focus' | 'drag'
  merge: number
}

const { n } = useI18n()
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<IProps>(), {
  modelValue: [20, 500],
  min: 0,
  max: 1000,
  step: 1,
  tooltips: true,
  showTooltip: 'drag',
  merge: -1,
})

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const format = (value) => {
  return n(value, 'EUR')
}
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss" scoped>
.range-slider {
  --slider-bg: #cdcdcd;
  --slider-connect-bg: #000000;
  --slider-connect-bg-disabled: #cdcdcd;
  --slider-height: 1px;
  --slider-vertical-height: 300px;
  --slider-radius: 9999px;

  --slider-handle-bg: #616161;
  --slider-handle-border: 0;
  --slider-handle-width: 11px;
  --slider-handle-height: 11px;
  --slider-handle-radius: 9999px;
  --slider-handle-shadow: 0.5px 0.5px 2px 1px rgba(#f17bb0, 0.42);
  --slider-handle-shadow-active: 0.5px 0.5px 2px 1px rgba(#f17bb0, 0.42);
  --slider-handle-ring-width: 3px;
  --slider-handle-ring-color: #f17bb0;

  --slider-tooltip-font-size: 0.875rem;
  --slider-tooltip-line-height: 1.25rem;
  --slider-tooltip-font-weight: 600;
  --slider-tooltip-min-width: 20px;
  --slider-tooltip-bg: #f17bb0;
  --slider-tooltip-bg-disabled: #9ca3af;
  --slider-tooltip-color: #fff;
  --slider-tooltip-radius: 5px;
  --slider-tooltip-py: 2px;
  --slider-tooltip-px: 6px;
  --slider-tooltip-arrow-size: 5px;
  --slider-tooltip-distance: 3px;
}
</style>
