<template>
  <div
    v-click-outside="closeDropdown"
    class="app-select"
    :class="{ 'app-select--readonly': isReadonly }"
  >
    <button
      class="app-select__trigger"
      :class="{ 'app-select__trigger--active': isOpen }"
      @click="toggleIsOpen"
    >
      <span v-if="valueType === 'text'">
        {{ internalOption?.name || title || $t('Common.select') }}
      </span>
      <template v-if="valueType === 'color'">
        <AppColor v-if="internalOption?.value" :color="internalOption.value" />
        <span v-else>{{ title || $t('Common.select') }}</span>
      </template>
      <SvgIcon v-if="!isReadonly" class="app-select__icon" name="chevron" />
    </button>
    <div v-if="isOpen" class="app-select__dropdown">
      <button
        v-for="(option, i) in options"
        :key="i"
        class="app-select__item"
        :class="{
          'app-select__item--active': internalOption.value === option.value,
        }"
        @click="selectItem(option)"
      >
        <span v-if="valueType === 'text'">
          {{ option.name }}
        </span>

        <AppColor v-if="valueType === 'color'" :color="option.value" />
        <SvgIcon
          v-if="i === 0"
          class="app-select__icon app-select__icon--active"
          name="chevron"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppColor from '~/components/common/AppColor.vue'
import { IOption } from '~~/types/select.interface'

interface IProps {
  options: IOption[]
  valueType: 'text' | 'color'
  modelValue: IOption
  title: string
  isReadonly?: boolean
}

const isOpen = ref(false)
const emit = defineEmits(['select', 'update:modelValue'])

const props = withDefaults(defineProps<IProps>(), {
  options: () => [],
  valueType: 'text',
  modelValue: null,
  title: '',
  isReadonly: false,
})

const internalOption = ref(props.modelValue)

const toggleIsOpen = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectItem = (option: IOption) => {
  internalOption.value = option

  emit('update:modelValue', option)

  toggleIsOpen()
}
</script>

<style lang="scss" scoped>
.app-select {
  position: relative;
  width: max-content;

  &--readonly {
    pointer-events: none;
    user-select: none;

    .app-select {
      &__trigger {
        pointer-events: none;
        min-width: 37px;
        justify-content: center;
        padding: 5px;
      }

      &__icon {
        display: none;
      }
    }
  }

  &__trigger {
    position: relative;
    background-color: $color-white;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    border-radius: 10px;
    height: 37px;
    padding: 11px 0px 10px 12px;
    display: flex;
    align-items: center;
    min-width: 46px;
    z-index: 2;
    border: 1px solid $color-medium-grey;
  }

  &__icon {
    position: absolute;
    width: 8px;
    height: 8px;
    right: 10px;

    &--active {
      transform: rotate(180deg);
      right: 5px;
    }
  }

  &__dropdown {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: auto;
    background-color: $color-white;
    border: 1px solid $color-black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    max-height: 180px;
    overflow: auto;

    @include custom-scroll;
  }

  &__item {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: $color-black;
    text-align: left;
    padding: 11px 12px 11px 11px;
    height: 36px;
    border: 1px solid transparent;

    &--active {
      background-color: $color-light-grey;
    }
  }

  &__image-value {
    width: 25px;
    height: 25px;
  }
}
</style>
