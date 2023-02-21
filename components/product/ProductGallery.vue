<template>
  <div class="product-gallery">
    <button v-if="!isMinimized" class="product-gallery__back" @click="goBack">
      <SvgIcon class="product-gallery__back-icon" name="arrow_left" />
    </button>
    <button
      v-if="!isMinimized"
      class="button product-gallery__button"
      @click="openLooksModal"
    >
      {{ $t('Product.buy_look') }}
    </button>

    <div
      v-if="!isMinimized"
      class="product-gallery__wishlist"
      :class="{ 'product-gallery__wishlist--active': isFavourite }"
    >
      <WishlistButton :is-active="isFavourite" @toggle="toggleWishlist" />
    </div>

    <div class="product-gallery__slider-desktop">
      <div class="product-gallery__slider-thumbs">
        <button
          v-for="media in medias"
          :key="media.url"
          class="product-gallery__slider-thumb-container"
          :class="{
            'product-gallery__slider-thumb-container--active':
              currentImage.url === media.url,
          }"
        >
          <img
            class="product-gallery__slider-thumb"
            :src="media.url"
            :alt="media?.title?.toString()"
            @click="selectImage(media)"
          />
        </button>
      </div>

      <div class="product-gallery__slider-imgs">
        <div
          ref="imgRef"
          class="product-gallery__slider-img-container"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @mousemove="handleMouseMove"
          @click="openZoomWindow(currentImage)"
        >
          <div
            :id="`${currentImage?.title}-zoom`"
            class="product-gallery__slider-img-zoom"
            :style="{ 'background-image': `url(${currentImage?.url})` }"
          ></div>
          <img
            :id="`${currentImage?.title}-${1}`"
            class="product-gallery__slider-img"
            :src="currentImage?.url"
            :alt="currentImage?.title?.toString()"
          />
        </div>
      </div>
    </div>

    <ProductSwiper
      class="product-gallery__slider-mobile"
      :medias="medias"
      :is-minimized="isMinimized"
      @openZoom="openZoomWindow"
    />

    <ProductZoom
      v-if="isOpenZoomWindow"
      :images="medias"
      :initial-image="initialImage"
      @close="closeZoomWindow"
    />
  </div>
</template>

<script lang="ts" setup>
import { IProductMedia } from '~~/types/product.interface'

import ProductZoom from '~/components/product/ProductZoom.vue'
import ProductSwiper from '~/components/product/ProductSwiper.vue'
import WishlistButton from '~/components/common/WishlistButton.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

interface IProps {
  medias: IProductMedia[]
  productSlug: string
  percentage: number
  isFavourite: boolean
  isMinimized: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  medias: () => [],
  productSlug: '',
  percentage: null,
  isFavourite: false,
  isMinimized: false,
})
const emit = defineEmits(['openLooksModal', 'toggleWishlist'])

const router = useRouter()
const layoutStore = useLayoutStore()

const imgRef = ref(null)
const activeZoomImg = ref(null)
const isOpenZoomWindow = ref(false)
const initialImage = ref<IProductMedia | null>(null)
const currentImage = ref(props.medias[0])

watch(isOpenZoomWindow, (value) => {
  value
    ? layoutStore.openModal(EModals.PRODUCT_ZOOM)
    : layoutStore.closeModal(EModals.PRODUCT_ZOOM)
})

const toggleWishlist = () => {
  emit('toggleWishlist', !props.isFavourite)
}

const handleMouseEnter = () => {
  const container = imgRef.value
  const img = container?.firstChild

  if (img) {
    img.style.width = `${container.offsetWidth}px`
    img.style.height = `${container.offsetHeight}px`
    img.style.opacity = 1
  }
}

const handleMouseLeave = () => {
  const container = imgRef.value
  const img = container?.firstChild
  activeZoomImg.value = null

  if (img) {
    img.style.opacity = 0
  }
}

const handleMouseMove = (e) => {
  if (!imgRef.value) return

  const container = imgRef.value
  const img = container?.firstChild

  if (img) {
    const offsetX = e.offsetX ? e.offsetX : e.touches[0].pageX
    const offsetY = e.offsetY ? e.offsetY : e.touches[0].pageX

    const x = (offsetX / img.offsetWidth) * 100
    const y = (offsetY / img.offsetHeight) * 100

    img.style.backgroundPositionX = `${x}%`
    img.style.backgroundPositionY = `${y}%`
  }
}

const openZoomWindow = (image: IProductMedia) => {
  initialImage.value = image
  isOpenZoomWindow.value = true
}

const closeZoomWindow = () => {
  isOpenZoomWindow.value = false
  initialImage.value = null
}

const selectImage = (media: IProductMedia) => {
  currentImage.value = media
}

const goBack = () => {
  router.back()
}

const openLooksModal = () => {
  emit('openLooksModal')
}
</script>

<style lang="scss" scoped>
.product-gallery {
  position: relative;

  &__button {
    font-family: $font-secondary;
    padding: 0 12px;
    position: absolute;
    left: 17px;
    bottom: 40px;
    z-index: 100;
    text-transform: uppercase;
    width: auto;
    height: 32px;
    border-radius: 10px;
    background-color: rgba($color: $color-black, $alpha: 0.8);
    font-weight: 460;
    font-size: 13px;
    line-height: 17px;
  }

  &__back {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2px;
    left: 9px;
    width: 40px;
    height: 40px;
    z-index: 100;
  }

  &__back-icon {
    width: 18px;
    height: 18px;
  }

  &__slider-thumbs {
    display: none;
  }

  &__slider-img-container {
    max-width: calc(100vw);
    height: auto;
  }

  &__slider-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    background-color: $color-grey-loading;
  }

  &__slider-desktop {
    display: none;
  }

  &__wishlist {
    position: absolute;
    right: 21px;
    bottom: 40px;
    background-color: $color-white;
    border-radius: 50%;
    height: 31px;
    width: 31px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    &--active {
      & :deep(.wishlist-button--active) {
        .wishlist-button__icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

@include media-lg {
  .product-gallery {
    padding: 0;
    position: relative;

    &__back {
      display: none;
    }

    &__button {
      padding: 0 17px;
      right: 16px;
      top: 17px;
      left: unset;
      bottom: unset;
      line-height: 44px;
      font-size: 14px;
      height: 40px;
    }

    &__wishlist {
      display: none;
    }

    &__slider-thumbs {
      display: flex;
      flex-direction: column;
      gap: 18px;
      position: sticky;
      top: 20px;
      height: max-content;
      margin: 0;
    }

    &__slider-thumb-container {
      display: block;
      border: 1px solid transparent;
      height: 119px;
    }

    &__slider-thumb {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    &__slider-imgs {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }

    &__slider-img-container {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      height: auto;
      position: relative;
      overflow: hidden;
      cursor: zoom-in;

      &:not(:first-child) {
        display: block;
      }
    }

    &__slider-img {
      max-height: 100%;
      animation-iteration-count: 1;
      transition: opacity 0.5s;
    }

    &__slider-img-zoom {
      position: absolute;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      transition: opacity 0.5s;
    }

    &__slider-rail {
      display: none;
    }

    &__slider-mobile {
      display: none;
    }

    &__slider-desktop {
      position: relative;
      display: grid;
      grid-template-columns: 98px auto;
      gap: 20px;
      width: 100%;
      height: auto;
    }
  }
}

@include media-xl {
  .product-gallery {
    &__slider-desktop {
      gap: 36px;
    }
  }
}

@include media-xxl {
  .product-gallery {
    &__slider-thumbs {
      gap: 32px;
    }

    &__slider-thumb-container {
      height: 220px;
    }

    &__slider-imgs {
      gap: 32px;
    }

    &__slider-img-container {
      max-width: 989px;
    }

    &__slider-desktop {
      grid-template-columns: 179px auto;
    }
  }
}
</style>
