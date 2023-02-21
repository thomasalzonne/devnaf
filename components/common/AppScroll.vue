<template>
  <div class="app-scroll" :class="`app-scroll--${direction}`">
    <div
      ref="scrollRef"
      class="app-scroll__wrapper"
      @scroll="calculateScrollDimensions"
      @wheel="calculateScrollDimensions"
      @mousedown.stop="handleMouseDown"
      @mouseup.stop="handleMouseUp"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
      @dragstart.prevent=""
    >
      <div
        ref="scrollContainer"
        class="app-scroll__container"
        :class="[
          containerClass,
          {
            'app-scroll__container--dragging': dragging && mouseDown,
            entrance: entrance,
          },
        ]"
      >
        <slot />
        <div
          class="app-scroll__blank-card"
          :style="{ 'min-width': `${blankCardWidth}px` }"
        ></div>
      </div>
    </div>
    <div
      v-if="withScrollbar && isShowScrollbar"
      ref="scrollbarRef"
      class="app-scroll__scrollbar"
      :class="[
        scrollbarClass,
        {
          'app-scroll__scrollbar--desktop-hide': !scrollbarOnDesktop,
          'app-scroll__scrollbar--mobile-hide': !scrollbarOnMobile,
        },
      ]"
      @click="handleScrollbarClick"
    >
      <div
        class="app-scroll__scroll"
        :style="[
          direction === 'horizontal'
            ? `width: ${scrollProcess + '%'}`
            : `height: ${scrollProcess + '%'}`,
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isMobile } from '~~/utils/mobile'

interface IProps {
  containerClass?: string | string[]
  scrollbarClass?: string | string[]
  withScrollbar?: boolean
  direction?: string
  scrollbarOnDesktop?: boolean
  scrollbarOnMobile?: boolean
  entrance?: boolean
  scrollableByWheel?: boolean
}

const emit = defineEmits(['onScroll'])
const props = withDefaults(defineProps<IProps>(), {
  containerClass: '',
  scrollbarClass: '',
  withScrollbar: false,
  direction: 'horizontal',
  scrollbarOnDesktop: true,
  scrollbarOnMobile: true,
  entrance: false,
  scrollableByWheel: false,
})

const scrollRef = ref(null)
const scrollbarRef = ref(null)
const scrollLength = ref(0)
const scrollStart = ref(0)
const startDragPosition = ref(0)
const endDragPosition = ref(0)
const lastPositionX = ref(0)
const dragging = ref(false)
const mouseDown = ref(false)
const isShowScrollbar = ref(false)
const scrollContainer = ref(null)
const blankCardWidth = ref(0)
const scrollStep = ref(20)

const scrollProcess = computed(() => {
  return (Math.ceil(scrollStart.value) / scrollLength.value) * 100 || 0
})

const isHorizontalScroll = computed(() => {
  return props.direction === 'horizontal'
})

const isMobileView = computed(() => {
  return isMobile()
})

watch(lastPositionX, (value) => {
  const diff = value - endDragPosition.value

  if (diff >= -30 || diff <= 30) {
    dragging.value = false
  }
})

const handleMouseDown = (e) => {
  if (!isHorizontalScroll.value) return

  startDragPosition.value = e.x

  mouseDown.value = true
}

const handleMouseMove = (e) => {
  if (!isHorizontalScroll.value) return

  if (mouseDown.value) {
    dragging.value = true
  } else {
    dragging.value = false
  }

  if (dragging.value) {
    if (e.x > startDragPosition.value) {
      scrollRef.value.scrollTo({
        left: scrollRef.value.scrollLeft - scrollStep.value,
      })
    } else {
      scrollRef.value.scrollTo({
        left: scrollRef.value.scrollLeft + scrollStep.value,
      })
    }

    startDragPosition.value = e.x
  }
}

const handleMouseUp = (e) => {
  if (!isHorizontalScroll.value) return

  endDragPosition.value = e.x

  dragging.value = false
  mouseDown.value = false
}

const handleMouseLeave = () => {
  if (!isHorizontalScroll.value) return

  dragging.value = false
  mouseDown.value = false
}

const handleScrollbarClick = (e) => {
  const scrollbarOffset = isHorizontalScroll.value
    ? scrollbarRef.value.scrollWidth
    : scrollbarRef.value.scrollHeight

  const eventOffset = isHorizontalScroll.value ? e.offsetX : e.offsetY
  const internalScrollLength = scrollLength.value
  const scrollbarPercent = (Math.ceil(eventOffset) / scrollbarOffset) * 100 || 0
  const scrollToValue = (scrollbarPercent / 100) * internalScrollLength

  isHorizontalScroll.value
    ? scrollRef.value.scrollTo({ left: scrollToValue })
    : scrollRef.value.scrollTo({ top: scrollToValue })
}

const triggerScrollRight = (value = 500) => {
  scrollTo(value)
}

const scrollTo = (delta: number, behavior = 'smooth') => {
  const internalScrollLength = scrollLength.value
  let internalScrollStart = scrollStart.value

  if (isHorizontalScroll.value) {
    let left = (internalScrollStart += delta)

    if (left > internalScrollLength) left = internalScrollLength

    scrollRef.value.scrollTo({ left, behavior })
  } else {
    let top = (internalScrollStart += delta)

    if (top > internalScrollLength) top = internalScrollLength

    scrollRef.value.scrollTo({ top, behavior })
  }
}
const calculateScrollDimensions = () => {
  if (isHorizontalScroll.value) {
    scrollStart.value = scrollRef.value.scrollLeft

    scrollLength.value =
      scrollRef.value.scrollWidth - scrollRef.value.offsetWidth

    isShowScrollbar.value = !!(
      scrollRef.value?.scrollWidth > document.documentElement?.clientWidth
    )

    if (!isMobileView.value) {
      blankCardWidth.value = scrollContainer.value.offsetLeft - 60 || 1
    }

    emit('onScroll', scrollProcess.value)
  } else {
    scrollStart.value = scrollRef.value.scrollTop

    scrollLength.value =
      scrollRef.value.scrollHeight - scrollRef.value.offsetHeight
  }
}

const scrollListener = (e: any) => {
  if (!isMobileView.value && !props.scrollableByWheel) return

  e.preventDefault()

  scrollTo(e.deltaY, 'auto')

  emit('onScroll', scrollProcess.value)
}

onMounted(() => {
  setTimeout(() => {
    if (scrollRef.value) {
      scrollRef.value.addEventListener('wheel', scrollListener, false)
      calculateScrollDimensions()
    }
  }, 1000)
})

onUnmounted(() => {
  if (scrollRef.value) {
    scrollRef.value.removeEventListener('wheel', scrollListener, false)
  }
})

defineExpose({
  triggerScrollRight,
  isShowScrollbar,
})
</script>

<style lang="scss">
.app-scroll {
  overflow: scroll;
  transition: all 200ms;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &--horizontal {
    .app-scroll {
      overflow-y: hidden;
      overflow-x: auto;

      &__scrollbar {
        height: 2px;
        margin: 32px 20px 0 20px;
      }

      &__scroll {
        height: 2px;
      }

      &__container {
        width: max-content;
      }
    }
  }

  &--vertical {
    position: relative;
    width: 100%;
    height: 100%;

    .app-scroll {
      &__wrapper {
        padding-left: 23px;
        height: 100%;
      }

      &__scrollbar {
        width: 2px;
        height: 100%;
        margin: 00px;
        position: absolute;
        left: 0;
        top: 0;
      }

      &__scroll {
        width: 2px;
      }
    }
  }

  &__wrapper {
    @extend .app-scroll;
    cursor: pointer;
  }

  &__scrollbar {
    position: relative;
    background-color: $color-medium-grey;
    cursor: pointer;

    &--mobile-hide {
      display: none;
    }
  }

  &__scroll {
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color-black;
    transition: all 200ms;
  }

  &__container {
    &--dragging {
      user-select: none !important;
      pointer-events: none !important;

      :deep(*) {
        user-select: none !important;
        pointer-events: none !important;
      }
    }
  }
}

@include media-lg {
  .app-scroll {
    &--horizontal {
      .app-scroll {
        &__scrollbar {
          margin: 42px 60px 0 60px;

          &--mobile-hide {
            display: block;
          }

          &--desktop-hide {
            display: none;
          }
        }

        &__blank-card {
          min-width: 1px;
        }
      }
    }
  }
}

@include media-xxl {
  .app-scroll {
    &--horizontal {
      .app-scroll {
        &__scrollbar {
          max-width: 1800px;
          margin: 42px auto 0 auto;
        }
      }
    }
  }
}

.entrance {
  animation: 2s ease-in-out 0s 1 categoriesSlideIn;
  margin-left: 0vw;
}

@keyframes categoriesSlideIn {
  from {
    margin-left: 0vw;
  }

  50% {
    margin-left: -10vw;
  }

  to {
    margin-left: 0vw;
  }
}
</style>
