<template>
  <button
    class="app-button"
    :class="[
      `app-button--${btnStyle}`,
      `app-button--${size}`,
      { 'app-button--animation': animation },
      { 'app-button--pending': pending },
      { 'app-button--disabled': disabled },
    ]"
    :disabled="disabled || pending"
  >
    <div v-if="pending">
      <SvgIcon class="app-button__loader" name="loader_white" />
    </div>
    <template v-else>
      <SvgIcon
        v-if="iconLeft"
        class="app-button__icon app-button__icon--left"
        :name="iconLeft"
      />
      <span class="app-button__title">{{ title }}</span>
      <SvgIcon
        v-if="iconRight"
        class="app-button__icon app-button__icon--right"
        :name="iconRight"
      />
    </template>
  </button>
</template>

<script lang="ts" setup>
import { EButtonSizes, EButtonStyles } from '~/constants/buttons'

defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'arrow',
  },
  iconLeft: {
    type: String,
    default: '',
  },
  iconRight: {
    type: String,
    default: '',
  },
  btnStyle: {
    type: String,
    default: EButtonStyles.DEFAULT,
  },
  size: {
    type: String,
    default: EButtonSizes.DEFAULT,
  },
  animation: {
    type: Boolean,
    default: false,
  },
  pending: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.app-button {
  position: relative;
  padding: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: $color-black;
  border-radius: 10px;
  width: 100%;
  color: $color-white;
  overflow: hidden;
  border: 1px solid $color-black;
  z-index: 20;
  min-height: 44px;
  height: 44px;
  transition: box-shadow 0.2s ease-out;

  &:hover {
    box-shadow: 4px 4px 1px 0px $color-pink;
  }

  &:active {
    color: $color-pink;
  }

  &__loader {
    width: 24px;
    height: 24px;
    animation: loader-animation 1s infinite linear;
  }

  &__title {
    font-family: $font-secondary;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 44px;
    font-weight: 460;
    white-space: nowrap;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  //
  // Sizes
  //

  &--small {
    min-height: 44px;
    height: 44px;
    padding: 9px 22px;

    .app-button {
      &__title {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }

  &--medium {
    min-height: 44px;
    height: 44px;
    padding: 9px 22px;

    .app-button {
      &__title {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }

  &--big {
    .app-button {
      &__title {
        font-size: 16px;
        line-height: 22px;
      }
    }
  }

  //
  // Styles
  //

  &--outline {
    background-color: $color-white;
    border-color: $color-black;
    color: $color-black;

    &:hover {
      box-shadow: 4px 4px 1px 0px $color-black;
    }

    &:active {
      color: $color-pink;
    }
  }

  &--light {
    background-color: $color-pink;
    border-color: $color-pink;
    color: $color-white;

    &:hover {
      box-shadow: 4px 4px 1px 0px $color-black;
    }

    &:active {
      color: $color-black;
    }
  }

  &--bw {
    background-color: $color-light-grey;
    border-color: $color-light-grey;
    color: $color-dark-grey;
  }

  &--disabled {
    background-color: $color-light-grey;
    color: $color-black;
    border-color: $color-light-grey;
    pointer-events: none;
  }
}

@include media-lg {
  .app-button {
    min-height: 55px;
    height: 55px;

    &--big {
      padding: 29px;
    }

    &--small {
      height: 37px;
      min-height: 37px;
    }

    &--medium {
      height: 44px;
      min-height: 44px;
    }

    &__title {
      font-size: 16px;
    }
  }
}

@keyframes loader-animation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
