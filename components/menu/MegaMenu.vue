<template>
  <div v-if="isOpen" class="app-menu">
    <div class="app-menu__body" @click.stop="">
      <div class="app-menu__nav">
        <MegaMenuItem
          v-for="item in items"
          :key="item?.slug"
          class="app-menu__item"
          :item="item"
        />
      </div>
      <div class="app-menu__images">
        <div class="app-menu__image-container">
          <img
            class="app-menu__image"
            src="~/assets/images/nav_img_1.png"
            alt=""
          />
          <p class="app-menu__image-text">Look de fêtes</p>
        </div>
        <div class="app-menu__image-container">
          <img
            class="app-menu__image"
            src="~/assets/images/nav_img_2.png"
            alt=""
          />
          <p class="app-menu__image-text">crazy xmas -30%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MegaMenuItem from './MegaMenuItem.vue'
import { INavigationItem } from '~~/types/divat.interface'

interface IAppMenuProps {
  isOpen: boolean
  group: INavigationItem
}
const props = withDefaults(defineProps<IAppMenuProps>(), {
  isOpen: false,
  group: null,
})

const items = computed(() => {
  return props.group?.children || []
})
</script>

<style lang="scss" scoped>
.app-menu {
  position: absolute;
  top: 100%;
  width: 100vw;
  min-height: 300px;
  border-top: 1px solid $color-light-grey;
  z-index: $z-index-menu;
  display: flex;
  flex-direction: column;
  padding: 38px 60px;
  height: 289px;

  &__body {
    max-width: 915px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    text-align: left;
    height: 100%;
    column-gap: 110px;
    width: 100%;
  }

  &__images {
    display: flex;
    justify-content: flex-end;
    gap: 28px;
  }

  &__image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 214px;
  }

  &__image {
    object-fit: contain;
    height: 100%;
    width: auto;
  }

  &__image-text {
    font-family: $font-secondary;
    position: absolute;
    font-weight: 480;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    text-transform: uppercase;
    color: $color-white;
    width: min-content;
    text-shadow: -1px 0 $color-black, 0 1px $color-black, 1px 0 $color-black,
      0 -1px $color-black;
    opacity: 0.8;
  }

  &__name {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    text-transform: uppercase;
  }

  &__item {
    flex-shrink: 1;
    flex-grow: 0;
  }
}

@include media-lg {
  .app-menu {
    background-color: $color-white;
  }
}
</style>
