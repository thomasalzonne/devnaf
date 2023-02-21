<template>
  <div
    class="product-swiper"
    :class="{ 'product-swiper--loading': !isSwiperLoaded }"
  >
    <Swiper
      v-show="isSwiperLoaded"
      :modules="modules"
      :pagination="{ type: 'progressbar' } as any"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      class="swiper"
      @swiper="handleSwiper"
    >
      <SwiperSlide
        v-for="(media, i) in medias"
        :key="i"
        class="product-swiper__slide swiper-slide"
        :class="{ 'product-swiper__slide--mini': isMinimized }"
      >
        <div
          class="product-swiper__slide-img-container"
          :class="{
            'product-swiper__slide-img-container--loading': !isImageLoaded,
            'product-swiper__slide-img-container--mini': isMinimized,
          }"
          :style="{
            height: !isMinimized
              ? `calc(${windowHeight}px - 75px - 55px)`
              : null,
          }"
          @click="openZoom(media)"
        >
          <img
            ref="imgRef"
            class="product-swiper__img"
            :src="media.url"
            @load="i === 0 ? handleImageLoaded() : null"
            @eror="i === 0 ? handleImageError() : null"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import * as SwiperType from 'swiper/types'

import { IProductMedia } from '~~/types/product.interface'

interface IProps {
  medias?: IProductMedia[]
  isMinimized: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  medias: () => [],
  isMinimized: false,
})

const imgRef = ref(null)
const isImageLoaded = ref(false)
const emit = defineEmits(['openZoom'])
const modules = ref([Pagination])
const isSwiperLoaded = ref(false)

const slidesPerView = ref<number | 'auto'>(1)
const spaceBetween = ref<number>(0)
const swiper = ref<SwiperType.Swiper>(null)
const windowHeight = ref(0)

const openZoom = (media: IProductMedia) => {
  emit('openZoom', media)
}

const handleImageLoaded = () => {
  isImageLoaded.value = true
}

const handleImageError = () => {
  isImageLoaded.value = false
}

const handleSwiper = (value: SwiperType.Swiper) => {
  swiper.value = value

  isSwiperLoaded.value = true
}

watch(
  () => props.isMinimized,
  (value: boolean) => {
    if (value) {
      swiper.value.params.slidesPerView = 'auto'
      swiper.value.params.spaceBetween = 10
      swiper.value.pagination.destroy()
    } else {
      swiper.value.params.slidesPerView = 1
      swiper.value.params.spaceBetween = 0
      swiper.value.pagination.init()
    }
  }
)
onMounted(() => {
  const interval = setInterval(() => {
    if (imgRef.value?.length) {
      if (imgRef.value?.[0]?.complete && imgRef.value?.[0]?.naturalHeight > 0) {
        isImageLoaded.value = true
      }
      clearInterval(interval)
    }
  }, 50)

  if (process.client) {
    windowHeight.value = window.innerHeight
  }
})
</script>

<style lang="scss" scoped>
.product-swiper {
  position: relative;
  max-width: 100vw;
  max-height: calc(100vh - $header-height-mobile - 55px);

  &--loading {
    min-height: 500px;
    background-color: $color-grey-loading;
  }

  &__slide {
    height: 100%;
    transition: all 0.6s ease-out;

    &--mini {
      &:first-child {
        margin-left: 20px;
      }

      &:last-child {
        margin-right: 20px;
      }
    }
  }

  &__slide-img-container {
    width: 100vw;
    height: calc(100vh - $header-height-mobile - 55px);
    max-width: 100vw;
    transition: all 0.6s ease-out;

    &--mini {
      width: 156px;
      height: 221px;
    }
  }

  &__img {
    transition: $easeOut200;
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-color: $color-grey-loading;
  }

  :deep(.swiper-wrapper) {
    position: relative;
  }

  :deep(.swiper-pagination) {
    position: absolute;
    top: unset;
    bottom: 20px;
    left: 0px;
    margin: 0 20px 0 20px;
    width: calc(100% - 40px);
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  :deep(.swiper-pagination-progressbar-fill) {
    background-color: $color-white;
  }
}

@include media-sm {
  .product-swiper {
    &--loading {
      min-height: calc(100vw + 200px);
    }

    :deep(.swiper-wrapper) {
      position: relative;
      height: 100%;
    }
  }
}
</style>
