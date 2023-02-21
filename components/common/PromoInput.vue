<template>
  <div class="input">
    <input
      v-model="value"
      class="input__control"
      type="text"
      :placeholder="$t('Cart.code_promo')"
    />
    <button class="input__button">
      {{ $t('Cart.apply_promocode') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  modelValue: string
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss" scoped>
.input {
  border: 1px solid $color-medium-grey;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 14px 12px 12px;
  height: 44px;

  &__control {
    width: 55%;
    outline: none;
    border: none;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;

    &::placeholder {
      font-weight: 400;
      font-size: 13px;
      line-height: 15px;
    }
  }

  &__button {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    width: 45%;
    text-align: right;
    text-transform: uppercase;
    transition: $easeOut200;

    &:hover {
      text-shadow: 1px 1px 1px $color-pink;
    }
  }
}

@include media-lg {
  .input {
    padding: 11px 20px 11px 15px;

    &__control {
      font-size: 14px;
      line-height: 16px;

      &::placeholder {
        font-size: 14px;
        line-height: 16px;
      }
    }

    &__button {
      font-family: $font-secondary;
      font-weight: 480;
      font-size: 20px;
      line-height: 26px;
      width: 45%;
      text-align: right;
      text-transform: uppercase;
      transition: $easeOut200;

      &:hover {
        text-shadow: 1px 1px 1px $color-pink;
      }
    }
  }
}
</style>
