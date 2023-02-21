<template>
  <Swiper
    v-bind="{ ...internalOptions }"
    ref="sliderRef"
    class="app-swiper"
    :modules="internalModules"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
    @progress="onProgress"
  >
    <slot />
  </Swiper>
</template>

<script lang="ts" setup>
import { Swiper } from 'swiper/vue'

import { Pagination, Mousewheel, Scrollbar } from 'swiper'

interface IProps {
  options?: any
  mousewheel?: boolean
  pagination?: boolean
  scrollbar?: boolean
}

const swiper = ref(null)
const isEnd = ref(false)

const emit = defineEmits(['slide-change', 'swiper', 'progress'])
const props = withDefaults(defineProps<IProps>(), {
  options: null,
  mousewheel: false,
  pagination: false,
  scrollbar: false,
})

const internalOptions = computed(() => {
  return {
    mousewheel: props.mousewheel,
    pagination: props.pagination,
    scrollbar: props.scrollbar,
    ...props.options,
  }
})

const internalModules = computed(() => {
  const modules = []

  if (props.mousewheel) modules.push(Mousewheel)
  if (props.pagination) modules.push(Pagination)
  if (props.scrollbar) modules.push(Scrollbar)

  return modules
})

const onSwiper = (e) => {
  swiper.value = e

  isEnd.value = e.isEnd

  emit('swiper', e)
}

const onSlideChange = (e) => {
  emit('slide-change', e)
}

const onProgress = (e) => {
  emit('progress', e)
}

const slideToRight = () => {
  if (swiper.value) {
    swiper.value.slideNext()
  }
}

defineExpose({
  slideToRight,
  isEnd,
})
</script>

<style lang="scss" scoped>
.app-swiper {
  cursor: pointer;

  :deep(.swiper-wrapper) {
    padding-bottom: 33px;
  }

  :deep(.swiper-scrollbar) {
    width: calc(100% - 40px);
    margin: 0 auto;
    overflow: hidden;
    left: 20px;
    bottom: -50px;
    height: 2px;
    background-color: $color-medium-grey;
  }

  :deep(.swiper-scrollbar-drag) {
    background-color: $color-black;
    height: 2px;
  }

  :deep(.swiper-scrollbar-drag:before) {
    content: '';
    background-color: $color-black;
    position: relative;
    left: -100vw;
    top: 0;
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100vw;
    z-index: 999;
  }
}

@include media-lg {
  .app-swiper {
    :deep(.swiper-wrapper) {
      padding-bottom: 40px;
    }

    :deep(.swiper-scrollbar) {
      width: calc(100% - 120px);
      left: 60px;
    }
  }
}

@include media-xxxl {
  .app-swiper {
    :deep(.swiper-scrollbar) {
      max-width: 1800px;
      left: calc((100vw - 1800px) / 2);
    }
  }
}
</style>
