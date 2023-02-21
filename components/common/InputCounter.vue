<template>
  <div class="input-counter" :class="{ 'input-counter--disabled': disabled }">
    <button
      class="input-counter__button"
      :disabled="internalValue === 1"
      @click="decrement"
    >
      <SvgIcon class="input-counter__icon" name="minus" />
    </button>
    <div class="input-counter__value">
      <span v-if="internalValue < 10">0</span>{{ internalValue }}
    </div>
    <button
      class="input-counter__button"
      :disabled="internalValue >= max"
      @click="increment"
    >
      <SvgIcon class="input-counter__icon" name="plus" />
    </button>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  modelValue: number
  disabled: boolean
  max: number
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: 0,
  disabled: false,
  max: 1,
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(value: number) {
    emit('update:modelValue', value)
  },
})

const decrement = () => {
  if (internalValue.value === 1) return

  internalValue.value--
}

const increment = () => {
  if (internalValue.value === props.max) return
  internalValue.value++
}
</script>

<style lang="scss" scoped>
.input-counter {
  border: 1px solid $color-black;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 13px 8px 13px;
  max-width: 97px;

  &--disabled {
    cursor: default;
    pointer-events: none;
    border-color: $color-disabled;

    .input-counter {
      &__value {
        color: $color-disabled;
      }

      &__button {
        color: $color-disabled;

        &:disabled {
          opacity: 1;
        }
      }
    }
  }

  &__button {
    width: 12px;
    height: 12px;

    &:disabled {
      opacity: 0.2;
      cursor: default;
    }
  }

  &__icon {
    width: 12px;
    height: 12px;
  }

  &__value {
    width: 47px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: $color-dark-grey;
  }
}

@include media-lg {
  .input-counter {
    height: 60px;
    width: 140px;
    max-width: 140px;
    padding: 14px 16px 12px 17px;

    &__value {
      font-size: 20px;
      line-height: 32px;
    }

    &__button {
      width: 17px;
      height: 17px;
    }

    &__icon {
      width: 17px;
      height: 17px;
    }
  }
}
</style>
