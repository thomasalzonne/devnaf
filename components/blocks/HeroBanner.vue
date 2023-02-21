<template>
  <div class="hero-banner">
    <div>
      <div
        class="hero-banner-left-arrow button_arrow button_arrow--white"
        @click="prev"
      >
        <SvgIcon class="button_arrow--icon" name="arrow_left" />
      </div>
      <div
        class="hero-banner-right-arrow button_arrow button_arrow--white"
        @click="next"
      >
        <SvgIcon class="button_arrow--icon" name="arrow_right" />
      </div>
    </div>
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="images[currentIndex]" />
      </div>
    </transition-group>
    <div>
      <div class="hero-banner__dots">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="hero-banner__dot"
          :class="{ 'hero-banner__dot--active': index == currentIndex }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

const currentIndex = ref(0)
const timer = ref(null)

const images = [
  'https://nafnaf.b-cdn.net/home/SPAIN/BANNER-WEB-1.webp',
  'https://nafnaf.b-cdn.net/home/SPAIN/BANNER-WEB-2.gif',
  'https://nafnaf.b-cdn.net/home/SPAIN/BANNER-WEB-3.jpg',
  'https://nafnaf.b-cdn.net/home/SPAIN/BANNER-WEB-4.jpg',
]

const startSlide = () => {
  timer.value = setInterval(next, 4000)
}

onMounted(() => {
  startSlide()
})

const next = () => {
  currentIndex.value += 1
  if (currentIndex.value > images.length - 1) {
    currentIndex.value = 0
  }
}

const prev = () => {
  currentIndex.value -= 1
  if (currentIndex.value < 0) {
    currentIndex.value = images.length - 1
  }
}
</script>

<style lang="scss">
fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

.hero-banner {
  position: relative;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: calc(100vw * 0.5);
  }

  &-left-arrow {
    display: none;
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    z-index: 10;
  }

  &-right-arrow {
    display: none;
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    z-index: 10;
  }

  &__dots {
    display: flex;
    align-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $color-white;
    margin: 0 5px;
    cursor: pointer;
    opacity: 0.45;
    transition: $easeOut200;

    &--active {
      background-color: $color-white;
      opacity: 1;
    }
  }
}

@include media-lg {
  .hero-banner {
    &-left-arrow {
      display: flex;
    }

    &-right-arrow {
      display: flex;
    }
  }
}
</style>
