<template>
  <div
    class="search-input"
    :class="{
      'search-input--active': isActive,
      'search-input--opacity': isOpacity,
    }"
  >
    <SvgIcon class="search-input__icon" name="search" />
    <input
      v-model="searchString"
      class="search-input__input"
      type="text"
      :placeholder="placeholder"
      autocomplete="off"
      name="search"
      @click="handleClick"
    />
    <button
      v-if="searchString && isActive"
      class="search-input__reset"
      @click="resetSearch"
    >
      {{ $t('Common.reset') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  modelValue: string
  isActive: boolean
  placeholder: string
  isOpacity: boolean
}

const emit = defineEmits(['update:modelValue', 'onInputClick', 'resetSearch'])
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  isActive: false,
  placeholder: '',
  isOpacity: false,
})

const searchString = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const handleClick = () => {
  emit('onInputClick')
}

const resetSearch = () => {
  emit('update:modelValue', '')
}
</script>

<style lang="scss" scoped>
.search-input {
  border: 1px solid $color-medium-grey;
  display: flex;
  align-items: center;
  padding: 10px 24px;
  width: 100%;

  &--opacity {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: transparent;
    .search-input {
      &__input {
        color: $color-white;

        &::placeholder {
          color: $color-white;
        }
      }

      &__icon {
        color: $color-white;
      }
    }
  }

  &--active {
    background-color: $color-search-bg;
    border-color: $color-search-bg;
    .search-input {
      &__icon {
        color: $color-dark-grey;
      }

      &__input {
        &::placeholder {
          color: $color-dark-grey;
        }
      }
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    color: $color-medium-grey;
  }

  &__input {
    background-color: transparent;
    outline: none;
    border: none;
    margin-left: 10px;
    width: 100%;
    color: $color-black;

    &::placeholder {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: $color-medium-grey;
    }
  }
}

@include media-lg {
  .search-input {
    padding: 10px 14px;

    &__input {
      margin-left: 13px;
    }
  }
}
</style>
