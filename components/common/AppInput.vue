<template>
  <div
    :id="id"
    class="app-input"
    :class="{
      'app-input--invalid': invalid || invalidPhone,
      'app-input--disabled': disabled,
    }"
  >
    <div class="app-input__container">
      <label
        v-if="label && !placeholder"
        class="app-input__label"
        :class="{ 'app-input__label--active': modelValue }"
        :for="name"
        @click="focusInput"
        >{{ label }}</label
      >

      <slot name="left" />
      <select
        v-if="type === 'select'"
        ref="input"
        v-model="value"
        class="app-input__control app-input__control--select"
        :class="{ 'app-input__control--selected': !!value }"
        :type="type"
        :placeholder="placeholder"
        required
        @blur="handleBlur"
        @change="handleInput"
      >
        <option
          class="app-input__placeholder"
          value=""
          disabled
          selected
          hidden
        >
          {{ placeholder }}
        </option>
        <option
          v-for="option in optionNames"
          :key="option"
          :value="getOptionValue(option)"
        >
          {{ option }}
        </option>
      </select>
      <input
        v-else-if="type === 'birthday'"
        ref="input"
        v-model="value"
        v-maska
        data-maska="##/##/####"
        :name="name"
        class="app-input__control"
        :type="internalType"
        :placeholder="placeholder"
        autocomplete="on"
        @blur="handleBlur"
        @input="handleInput"
      />
      <input
        v-else
        ref="input"
        v-model="value"
        :name="name"
        class="app-input__control"
        :type="internalType"
        :placeholder="placeholder"
        autocomplete="on"
        @blur="handleBlur"
        @input="handleInput"
      />

      <button
        v-if="type === 'password' && passwordWithToggle"
        type="button"
        class="app-input__eye-button"
        @click="togglePassword"
      >
        <SvgIcon
          class="app-input__eye-icon"
          :class="{
            'app-input__eye-icon--active': internalType === 'text',
          }"
          name="eye"
        />
      </button>
      <div
        v-if="(validation && dirty) || (invalidPhone && dirty)"
        class="app-input__validation-icon-container"
      >
        <img
          v-if="invalid || invalidPhone"
          src="~/assets/svg/alert-circle.svg"
          class="app-input__validation-icon app-input__validation-icon--error"
        />
        <img
          v-else
          src="~/assets/svg/check_circle.svg"
          class="app-input__validation-icon app-input__validation-icon--success"
        />
      </div>
      <slot name="right" />
    </div>
    <div v-if="message" class="app-input__message">
      {{ message }}
    </div>
    <div v-if="invalid && error?.length" class="app-input__errors">
      <p v-for="e in error" :key="e.$uid" class="app-input__error error">
        {{ e.$message }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vMaska } from 'maska'
import { IOption } from '~~/types/select.interface'

interface IAppInputProps {
  placeholder?: string
  label?: string
  name?: string
  type?: string
  invalid?: boolean
  modelValue?: string | number | null
  error?: any
  validation?: boolean
  dirty?: boolean
  message?: string
  passwordWithToggle?: boolean
  options?: IOption[]
  disabled?: boolean
  id?: string
}

const input = ref(null)
const props = withDefaults(defineProps<IAppInputProps>(), {
  placeholder: '',
  label: '',
  name: '',
  type: 'text',
  error: '',
  message: '',
  passwordWithToggle: true,
  options: () => [],
  disabled: false,
  id: '',
  dirty: false,
  invalid: false,
  validation: false,
  modelValue: '',
})
const emit = defineEmits([
  'update:modelValue',
  'blur',
  'input',
  'phoneValidation',
])
const invalidPhone = ref(false)
const value = computed({
  get() {
    if (props?.type === 'select') {
      return (
        props.options.find((e: IOption) => e.value === props.modelValue)
          ?.value || ''
      )
    }

    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const optionNames = computed<string[]>(() => {
  return props.options.map((option: IOption) => {
    return option.name
  })
})

const getOptionValue = (optionName: string): string => {
  return (
    props.options.find((option: IOption) => option.name === optionName)
      ?.value || ''
  )
}

const internalType = ref(props.type)

const togglePassword = () => {
  internalType.value === 'text'
    ? (internalType.value = 'password')
    : (internalType.value = 'text')
}

const handleBlur = () => {
  emit('blur')
}

const handleInput = (e) => {
  emit('input', e.target.value)
}

const focusInput = () => {
  input.value.focus()
}
</script>

<style lang="scss" scoped>
.app-input {
  width: 100%;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--invalid {
    .app-input__container {
      border-color: $color-error;
    }
  }

  &__container {
    padding: 17px 14px 17px 18px;
    height: 44px;
    border: 1px solid $color-medium-grey;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-color: $color-white;
    position: relative;
  }

  &__control {
    border: none;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    width: 100% !important;
    color: $color-black;
    background-color: $color-white;

    &::placeholder {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      color: $color-dark-grey;
      background-color: transparent;
    }

    &:-webkit-autofill {
      background-color: $color-white;
    }

    &:-webkit-autofill {
      background-color: $color-white;
    }

    &:-webkit-autofill {
      background-color: $color-white;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &--select {
      margin-left: -4px;
      cursor: pointer;
      color: $color-dark-grey;
    }

    &--selected {
      color: $color-black;
    }
  }

  &__label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-dark-grey;
    cursor: text;

    &--active {
      top: 0;
      left: 14px;
      background-color: $color-white;
      padding: 0 4px;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
    }
  }

  &__eye-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__eye-icon {
    width: 20px;
    height: 20px;
    transition: color 200ms;
    color: $color-medium-grey;

    &--active {
      color: $color-pink;
    }
  }

  &__errors {
    margin-left: 19px;
    margin-top: 4px;
  }

  &__error {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__validation-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }

  &__validation-icon {
    width: 16px;
    height: 16px;

    &--success {
      width: 22px;
      height: 22px;
      color: $color-green;
    }

    &--error {
      color: $color-red;
    }
  }

  &__message {
    margin-top: 10px;
    margin-left: 20px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-dark-grey;
  }
}

@include media-lg {
  .app-input {
    &__container {
      height: 50px;
      padding: 17px 15px 17px 18px;
    }

    &__control {
      font-size: 14px;
      line-height: 16px;

      &::placeholder {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: $color-dark-grey;
        background-color: transparent;
      }
    }

    &__label {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;

      &--active {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
}
</style>
