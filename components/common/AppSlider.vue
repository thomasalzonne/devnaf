<template>
  <div class="app-slider">
    <div class="app-slider__rail">
      <div class="app-slider__circle"></div>
    </div>
    <div class="app-slider__data-container">
      <p class="app-slider__data">0 km</p>
      <p class="app-slider__data">100 km</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppSlider',
})
</script>

<style lang="scss" scoped>
.app-slider {
  padding: 16px 0;

  &__rail {
    height: 1px;
    background-color: $color-medium-grey;
    width: 100%;
    position: relative;
  }

  &__circle {
    width: 20px;
    height: 20px;
    background-color: $color-pink;
    position: absolute;
    transform: translateY(-50%);
    left: 0;
    border-radius: 50%;
  }

  &__data-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
  }

  &__data {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    color: $color-dark-grey;
  }
}

@include media-lg {
  .app-slider {
    &__circle {
      width: 35px;
      height: 35px;
    }

    &__data-container {
      margin-top: 14px;
    }

    &__data {
      font-size: 18px;
      line-height: 30px;
    }
  }
}
</style>
