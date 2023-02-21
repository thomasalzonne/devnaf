<template>
  <div class="app-carousel">
    <div class="app-carousel__relative">
      <div class="app-carousel__header">
        <slot name="header" />

        <div class="app-carousel__arrows">
          <div
            class="button_arrow"
            :class="
              isScrollPossible && progress > 0 ? '' : 'button_arrow--disabled'
            "
            @click="scrollTo(false)"
          >
            <SvgIcon class="button_arrow--icon" name="arrow_left" />
          </div>
          <div
            class="button_arrow"
            :class="
              isScrollPossible && progress < 100 ? '' : 'button_arrow--disabled'
            "
            @click="scrollTo()"
          >
            <SvgIcon class="button_arrow--icon" name="arrow_right" />
          </div>
        </div>
      </div>
      <div
        ref="scrollSection"
        class="app-carousel__overflow"
        @scroll="updateProgress()"
      >
        <div
          ref="scrolledSection"
          class="app-carousel__wrapper"
          :style="{ width: width + 'px' }"
        >
          <slot />
        </div>
      </div>
    </div>

    <div
      v-if="isScrollPossible && isShowScrollbar"
      class="app-carousel__line--container"
    >
      <div class="app-carousel__line">
        <div
          class="app-carousel__progress"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  itemSelector: string
  isShowScrollbar?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  itemSelector: null,
  isShowScrollbar: true,
})

const width = ref(5000)
const progress = ref(0)
const isDown = ref(false)
const startX = ref(null)
const scrollLeft = ref(null)
const scrollSection = ref(null)
const scrolledSection = ref(null)
const isScrollPossible = ref(false)

onMounted(() => {
  window.addEventListener('resize', calculateWidth)

  if (scrollSection.value) {
    initSlider()
  }

  setTimeout(() => {
    calculateWidth()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateWidth)
})

const calculateWidth = () => {
  const items = document.querySelectorAll(
    `.app-carousel__wrapper ${props.itemSelector}`
  )

  let $width = items.length * items?.[0]?.clientWidth
  const padding = window.innerWidth > 992 ? 60 : 20

  $width += (items.length - 1) * padding + padding
  width.value = $width

  isScrollPossible.value = scrollSection.value?.clientWidth < $width
}

const initSlider = () => {
  const slider = scrollSection.value

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown.value = true
      startX.value = e.pageX - slider.offsetLeft
      scrollLeft.value = slider.scrollLeft
    })

    slider.addEventListener('mouseleave', () => {
      isDown.value = false
      slider.classList.remove('active')
    })

    slider.addEventListener('mouseup', () => {
      isDown.value = false
      slider.classList.remove('active')
    })

    slider.addEventListener('mousemove', (e) => {
      if (!isDown.value) return

      slider.classList.add('active')
      e.preventDefault()

      const x = e.pageX - slider.offsetLeft
      const walk = x - startX.value
      slider.scrollLeft = scrollLeft.value - walk
    })
  }
}

const updateProgress = () => {
  if (scrollSection.value) {
    let $progress =
      scrollSection.value?.scrollLeft /
      (scrollSection.value?.scrollWidth - scrollSection.value?.clientWidth)
    $progress = $progress > 1 ? 1 : $progress
    $progress = $progress < 0 ? 0 : $progress
    progress.value = Math.round($progress * 100)
  }
}

const scrollTo = ($toRight = true) => {
  if (scrollSection.value && scrolledSection.value) {
    const move =
      (1 /
        document.querySelectorAll(
          `.app-carousel__wrapper ${props.itemSelector}`
        ).length) *
        scrolledSection.value.clientWidth +
      30
    scrollSection.value.scrollLeft += $toRight ? move : -1 * move
  }
}
</script>

<style lang="scss" scoped>
.app-carousel {
  width: 100%;

  &__relative {
    position: relative;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    max-width: 1320px;
    padding-right: 20px;
  }

  &__arrows {
    display: flex;
    gap: 8px;
  }

  &__overflow {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;

    &.active {
      cursor: grab;
      scroll-behavior: unset;

      :deep(a) {
        pointer-events: none;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__wrapper {
    width: 300vw;
    display: flex;
    gap: 20px;
  }

  &__line--container {
    width: 100%;
    padding-top: 20px;
  }

  &__line {
    width: 100%;
    height: 2px;
    background-color: $color-light-grey;
  }

  &__progress {
    width: 0%;
    height: 2px;
    background-color: $color-dark-grey;
    transition: $easeOut200;
    border-radius: 10px;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translate(0px, -50%);
    transition: all 0.2s ease;
    z-index: 30;
    cursor: pointer;
    width: 30px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease, visibility 0 0.2s;

    &--right {
      right: 20px;

      &:hover {
        transform: translate(10px, -50%);
      }
    }

    &--left {
      left: 20px;

      &:hover {
        transform: translate(-10px, -50%);
      }
    }
  }
}

@include media-lg {
  .app-carousel {
    &__relative:hover {
      .app-carousel__arrow {
        visibility: visible;
        opacity: 1;
      }
    }

    &__line--container {
      padding-top: 40px;
    }

    &__line {
      height: 4px;
    }

    &__progress {
      height: 4px;
    }
  }
}
</style>
