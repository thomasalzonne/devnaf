<template>
  <div
    ref="zoomContainerRef"
    class="product-zoom"
    @click="closeZoomWindowOnBackdropClick"
  >
    <div class="product-zoom__thumbs">
      <div
        v-for="image in images"
        :key="image.url"
        class="product-zoom__thumb-container"
        @mouseenter="updateCurrentImage(image)"
        @click.stop=""
      >
        <img
          class="product-zoom__thumb"
          :src="image.url"
          :alt="image?.title?.[locale]"
        />
      </div>
    </div>
    <div
      ref="imageRef"
      class="product-zoom__wrapper"
      @mousemove="handleMouseMove"
    >
      <div class="product-zoom__image-container">
        <img class="product-zoom__image" :src="currentImage.url" />
      </div>
    </div>

    <ButtonCloseModal class="product-zoom__close" @click="closeZoomWindow" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { IProductMedia } from '~~/types/product.interface'

import ButtonCloseModal from '~/components/common/ButtonCloseModal.vue'
import { isMobile } from '~~/utils/mobile'

interface IProps {
  images: IProductMedia[]
  initialImage: IProductMedia
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits(['close'])
const currentImage = ref(props.initialImage)
const imageRef = ref(null)
const zoomContainerRef = ref(null)
const { locale } = useI18n()

const updateCurrentImage = (image: IProductMedia) => {
  currentImage.value = image
}

const handleMouseMove = (e) => {
  const img = imageRef.value

  if (img) {
    const clientHeight = img.offsetHeight
    const scrollHeight = img.scrollHeight

    const pointerMovePercent = (e.y / clientHeight) * 100
    const scrollToValue = (scrollHeight / 100) * pointerMovePercent

    img.scrollTo({ top: scrollToValue })
  }
}

const closeZoomWindowOnBackdropClick = () => {
  if (isMobile()) return

  closeZoomWindow()
}

const closeZoomWindow = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.product-zoom {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: $color-white;
  z-index: $z-index-modal;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2000;

  &__thumbs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
    z-index: 2;
    position: fixed;
  }

  &__thumb-container {
    width: 50px;
    height: auto;
  }

  &__thumb {
    object-fit: contain;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    transition: $easeOut200;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &__wrapper {
    width: 100vw;
    height: 100%;
    overflow: auto;
  }

  &__image-container {
    height: auto;
    min-height: 100%;
    width: auto;
  }

  &__image {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    object-fit: cover;
    margin-bottom: -5px;
  }

  &__close {
    position: fixed;
    right: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@include media-lg {
  .product-zoom {
    height: 100vh;
    overflow: hidden;

    &__wrapper {
      cursor: zoom-out;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    &__close {
      right: 40px;
      top: 40px;
    }
  }
}
</style>
