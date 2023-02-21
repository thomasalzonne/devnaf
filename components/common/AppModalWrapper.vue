<template>
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="app-modal-wrapper"
      :class="{ 'app-modal-wrapper--checkout': isCheckout }"
      :style="{
        top: !isMobile ? `${headerHeight}px` : null,
      }"
      @click="closeOnClickBackdrop"
    >
      <div
        class="app-modal-wrapper__wrapper"
        :style="{
          height: !isMobile ? `calc(100vh - ${headerHeight}px)` : null,
        }"
      >
        <button
          class="app-modal-wrapper__back app-modal-wrapper__back--mobile"
          @click="back"
        >
          <SvgIcon class="app-modal-wrapper__back-icon" name="arrow_left" />
        </button>
        <div
          v-if="(isMobile && isShowHeader) || !isMobile"
          class="app-modal-wrapper__header"
        >
          <button
            v-if="isShowBackButton"
            class="app-modal-wrapper__back"
            @click="back"
          >
            <SvgIcon class="app-modal-wrapper__back-icon" name="arrow_left" />
          </button>
          <slot name="header" />
          <div class="app-modal-wrapper__close-container">
            <ButtonCloseModal @click="closeModal" />
          </div>
        </div>
        <div class="app-modal-wrapper__body" @click.stop="">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import ButtonCloseModal from '~/components/common/ButtonCloseModal.vue'
import { useLayoutStore } from '~~/store/layout'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isCloseOnClickOutside: {
    type: Boolean,
    default: false,
  },
  isShowBackButton: {
    type: Boolean,
    default: false,
  },
  isShowHeader: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['close', 'back'])
const route = useRoute()
const layoutStore = useLayoutStore()

const isCheckout = computed(() => {
  const routePath = route.path
  const checkoutRoutes = ['/cart', 'checkout']

  return checkoutRoutes.includes(routePath)
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const headerHeight = computed(() => {
  return layoutStore.headerHeight
})

const closeModal = () => {
  emit('close')
}

const closeOnClickBackdrop = () => {
  if (!props.isCloseOnClickOutside && !isMobile.value) return

  closeModal()
}

const back = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.app-modal-wrapper {
  height: calc(100vh - $header-height-mobile);
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $z-index-modal;

  &--checkout {
    .app-modal-wrapper {
      &__body {
        // margin-top: $header-height-mobile;
      }
    }
  }

  &__wrapper {
    background-color: $color-white;
    position: relative;
    height: calc(100vh - $header-height-mobile);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 37px 0 49px;
  }

  &__body {
    padding: 0px 20px 20px 20px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
  }

  &__close-container {
    display: none;
  }

  &__back {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__back-icon {
    width: 24px;
    height: 24px;
  }
}

@include media-lg {
  .app-modal-wrapper {
    top: $header-height-desktop;
    height: calc(100vh - $header-height-desktop);
    background-color: rgba($color: $color-black, $alpha: 0.5);
    backdrop-filter: blur(2px);

    &--checkout {
      .app-modal-wrapper {
        &__body {
          margin-top: 0;
        }
      }
    }

    &__back {
      position: static;

      &--mobile {
        display: none;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 37px 0 49px;
    }

    &__wrapper {
      width: 485px;
      margin-left: auto;
      height: calc(100vh - $header-height-desktop);
      padding-bottom: 0px;
    }

    &__body {
      padding: 0px 72px 70px 72px;
      display: block;
    }

    &__close-container {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;

  & .app-modal-wrapper__wrapper {
    transition: all 0.3s ease-in-out;
  }
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  & .app-modal-wrapper__wrapper {
    transform: translateX(100%);
  }
}
</style>
