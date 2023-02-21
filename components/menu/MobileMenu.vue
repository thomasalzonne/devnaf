<template>
  <Transition name="slide">
    <div v-if="isOpen" class="mobile-menu">
      <div class="mobile-menu__body">
        <MobileSearch :is-active="isActiveSearch" />
        <div v-if="!isActiveSearch" class="mobile-menu__nav-container">
          <MobileMenuItem
            v-for="item in navigations"
            :key="item?.slug"
            :item="item"
            @closeMenu="closeMenu"
          />
        </div>
        <div class="mobile-menu__images">
          <div class="mobile-menu__image-container">
            <img
              class="mobile-menu__image"
              src="~/assets/images/nav_img_1.png"
              alt=""
            />
            <p class="mobile-menu__image-text">Look de fêtes</p>
          </div>
          <div class="mobile-menu__image-container">
            <img
              class="mobile-menu__image"
              src="~/assets/images/nav_img_2.png"
              alt=""
            />
            <p class="mobile-menu__image-text">crazy xmas -30%</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import MobileMenuItem from './MobileMenuItem.vue'
import MobileSearch from '~/components/search/MobileSearch.vue'

import { INavigationItem } from '~~/types/divat.interface'

interface IProps {
  isOpen: boolean
  navigations?: INavigationItem[]
}

const emit = defineEmits(['close'])
const route = useRoute()

withDefaults(defineProps<IProps>(), {
  isOpen: false,
  navigations: null,
})

const isActiveSearch = computed(() => {
  return !!route.query?.search
})

const closeMenu = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.mobile-menu {
  height: calc(100vh - $header-height-mobile);
  width: 100vw;
  position: fixed;
  bottom: $header-height-mobile;
  left: 0;
  background-color: rgba($color: $color-black, $alpha: 0.5);
  backdrop-filter: blur(10px);
  overflow: auto;
  overflow-x: hidden;

  &__body {
    max-width: 400px;
    background-color: $color-white;
  }

  &__search {
    margin-bottom: 15px;
  }

  &__search-container {
    padding: 20px;
  }

  &__nav-container {
    padding: 0 20px;
  }

  &__images {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    justify-content: flex-start;
    gap: 28px;
    width: 100%;
    margin-top: 28px;
    padding: 0 20px 20px;
  }

  &__image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 163px;
  }

  &__image {
    object-fit: cover;
    height: 100%;
    width: 100%;
    object-position: top;
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
}

@include media-lg {
  .mobile-menu {
    display: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;

  .mobile-menu__body {
    transition: all 0.3s ease-in-out;
  }
}

.slide-enter-from,
.slide-leave-to {
  background-color: rgba($color: $color-black, $alpha: 0);

  .mobile-menu__body {
    transform: translateX(-100%);
  }
}
</style>
