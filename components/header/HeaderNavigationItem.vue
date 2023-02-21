<template>
  <button
    class="header-navigation-item"
    :class="{ 'header-navigation-item--active': isActive }"
    type="button"
    :disabled="isDisabled"
    @click="onClick"
  >
    <SvgIcon class="header-navigation-item__icon" :name="icon" />
    <SvgIcon
      class="header-navigation-item__icon header-navigation-item__icon--hovered"
      :name="icon"
    />
    <span v-if="badgeValue" class="header-navigation-item__badge">
      {{ badgeValue }}
    </span>
  </button>
</template>

<script lang="ts" setup>
interface IProps {
  isDisabled?: boolean
  icon: string
  badgeValue?: number | string | null
  isActive?: boolean
}

const emit = defineEmits(['trigger'])

withDefaults(defineProps<IProps>(), {
  isDisabled: false,
  icon: 'account',
  badgeValue: null,
  isActive: false,
})

const onClick = () => {
  emit('trigger')
}
</script>

<style lang="scss" scoped>
.header-navigation-item {
  position: relative;
  transition: $easeOut200;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }

  &--active {
    .header-navigation-item__icon {
      &--hovered {
        opacity: 1;
      }
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
    transition: $easeOut200;

    &:active {
      color: $color-pink;
    }

    &--hovered {
      position: absolute;
      top: 1px;
      right: -1px;
      color: $color-pink;
      opacity: 0;
    }
  }

  &__badge {
    position: absolute;
    top: -4px;
    right: -8px;
    background-color: $color-pink;
    color: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
  }
}

@include media-lg {
  .header-navigation-item {
    &:hover {
      &:not(:disabled) {
        .header-navigation-item__icon--hovered {
          opacity: 1;
        }
      }
    }

    &__icon {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
