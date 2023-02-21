<template>
  <div class="product-looks-slider">
    <Swiper
      v-show="isSwiperLoaded"
      :modules="modules"
      :pagination="{ type: 'progressbar' } as any"
      :slides-per-view="'auto'"
      :initial-slide="0"
      :loop="false"
      :space-between="15"
      class="swiper"
      @swiper="handleSwiper"
    >
      <SwiperSlide
        v-for="j in 6"
        :key="j"
        class="product-looks-slider__slide swiper-slide"
      >
        <LookCard :product="product" @onSelect="handleSelect" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import { IProduct } from '~~/types/product.interface'

import LookCard from '~/components/cards/LookCard.vue'

interface IProps {
  product: IProduct
}

withDefaults(defineProps<IProps>(), {
  product: null,
})

const emit = defineEmits(['onSelect'])

const modules = ref([Pagination])
const isSwiperLoaded = ref(false)

const handleSwiper = () => {
  isSwiperLoaded.value = true
}

const handleSelect = () => {
  emit('onSelect')
}
</script>

<style lang="scss" scoped>
.product-looks-slider {
  position: relative;

  & :deep() {
    .swiper-wrapper {
      position: relative;
    }

    .swiper-pagination {
      position: relative;
      top: unset;
      bottom: unset;
      left: 0px;
      background: $color-light-grey;
      border-radius: 10px;
      margin-top: 15px;
      margin-left: 20px;
      margin-right: 20px;
      width: calc(100% - 40px);
    }

    .swiper-pagination-progressbar-fill {
      background-color: $color-black;
    }

    .swiper-slide {
      &:first-child {
        margin-left: 20px;
      }

      &:last-child {
        margin-right: 20px;
      }
    }
  }
}

@include media-lg {
  .product-looks-slider {
    & :deep() {
      .swiper-pagination {
        margin-left: 82px;
        margin-right: 82px;
        width: calc(100% - 160px);
      }

      .swiper-slide {
        &:first-child {
          margin-left: 82px;
        }

        &:last-child {
          margin-right: 82px;
        }
      }
    }
  }
}
</style>
