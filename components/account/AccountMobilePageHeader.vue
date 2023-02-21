<template>
  <div
    class="account-page-header"
    :class="{ 'account-page-header--child': isChild }"
  >
    <button class="account-page-header__icon-container" @click.stop="goBack">
      <SvgIcon class="account-page-header__back-icon" name="arrow_left" />
    </button>
    <div class="account-page-header__content" @click="openDropdown">
      <div class="account-page-header__page-icon-container">
        <SvgIcon class="account-page-header__page-icon" :name="icon" />
      </div>
      <p class="account-page-header__title">{{ title }}</p>
      <SvgIcon class="account-page-header__chevron" name="chevron" />
    </div>
    <div class="account-page-header__blank"></div>
    <div
      v-if="isOpen"
      v-click-outside="closeDropdown"
      class="account-page-header__dropdown"
    >
      <NuxtLink
        v-for="link in navigation"
        :key="link.title"
        :to="link.to"
        class="account-page-header__link"
        >{{ link.title }}</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProfileNavigationItem } from '~~/types/profile.interface'

interface IProps {
  title: string
  icon: string
  isChild?: boolean
  navigation?: IProfileNavigationItem[]
}

withDefaults(defineProps<IProps>(), {
  title: '',
  icon: '',
  isChild: false,
  navigation: null,
})

const isOpen = ref(false)

const emit = defineEmits(['back'])

const goBack = () => {
  emit('back')
}

const openDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.account-page-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 20px 0 20px;
  z-index: 1000;

  &--child {
    .account-page-header {
      &__page-icon {
        color: $color-pink;
      }

      &__title {
        font-family: $font-primary;
        font-weight: 700;
        font-size: 16px;
        line-height: 30px;
        text-transform: none;
        width: auto;
      }

      &__chevron {
        display: block;
        width: 7px;
        height: 7px;
      }

      &__content {
        gap: 11px;
      }

      &__blank {
        width: 0;
      }
    }
  }

  &__chevron {
    display: none;
  }

  &__icon-container {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__back-icon {
    width: 18px;
    height: 18px;
  }

  &__blank {
    width: 18px;
    height: 18px;
  }

  &__title {
    font-weight: 460;
    font-size: 20px;
    line-height: 32px;
    font-family: $font-secondary;
    text-transform: uppercase;
  }

  &__page-icon-container {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__page-icon {
    width: 14px;
    height: 14px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  &__dropdown {
    position: absolute;
    left: 0;
    top: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    background-color: $color-white;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
  }

  &__link {
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
}

@include media-lg {
  .account-page-header {
    display: none;
  }
}
</style>
