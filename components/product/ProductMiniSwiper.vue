<template>
  <div
    class="product-swiper"
    :class="{ 'product-swiper--loading': !isSwiperLoaded }"
  >
    <Swiper
      v-show="isSwiperLoaded"
      :modules="modules"
      :slides-per-view="'auto'"
      :initial-slide="0"
      :loop="false"
      :space-between="10"
      class="swiper"
      @swiper="handleSwiper"
    >
      <SwiperSlide
        v-for="(media, i) in medias"
        :key="i"
        class="product-swiper__slide swiper-slide"
      >
        <div
          class="product-swiper__slide-img-container"
          :class="{
            'product-swiper__slide-img-container--loading': !isImageLoaded,
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
import { IProductMedia } from '~~/types/product.interface'

interface IProps {
  medias: IProductMedia[]
}

withDefaults(defineProps<IProps>(), {
  medias: () => [],
})

const imgRef = ref(null)
const isImageLoaded = ref(false)
const emit = defineEmits(['openZoom'])
const modules = ref([Pagination])
const isSwiperLoaded = ref(false)

const openZoom = (media: IProductMedia) => {
  emit('openZoom', media)
}

const handleImageLoaded = () => {
  isImageLoaded.value = true
}

const handleImageError = () => {
  isImageLoaded.value = false
}

const handleSwiper = () => {
  isSwiperLoaded.value = true
}

onMounted(() => {
  const interval = setInterval(() => {
    if (imgRef.value?.length) {
      if (imgRef.value?.[0]?.complete && imgRef.value?.[0]?.naturalHeight > 0) {
        isImageLoaded.value = true
      }
      clearInterval(interval)
    }
  }, 50)
})
</script>

<style lang="scss" scoped>
.product-swiper {
  position: relative;
  &--loading {
    min-height: 200px;
    background-color: $color-grey-loading;
  }

  &__slide {
    &:first-child {
      margin-left: 20px;
    }

    &:last-child {
      margin-right: 20px;
    }
  }

  &__slide-img-container {
    width: 100%;
    max-width: 156px;
    height: auto;

    &--loading {
      min-height: 200px;
      background-color: $color-grey-loading;
    }
  }

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
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

@include media-lg {
  .product-swiper {
    display: none;
  }
}
</style>
