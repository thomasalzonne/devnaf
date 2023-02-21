<template>
  <div id="accordion_1" class="app-accordion">
    <div class="app-accordion__header" role="button" @click="toggleAccordion">
      <span class="app-accordion__title">{{ title }}</span>
      <SvgIcon class="app-accordion__icon" :name="isOpen ? 'minus' : 'plus'" />
    </div>
    <Transition name="slide">
      <div v-show="isOpen" class="app-accordion__content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppAccordion',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleAccordion(): void {
      this.isOpen = !this.isOpen
    },
  },
})
</script>

<style lang="scss" scoped>
.app-accordion {
  padding: 20px 15px 16px 2px;
  border-bottom: 1px solid $color-medium-grey;

  &:first-child {
    border-top: 1px solid $color-medium-grey;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  &__content {
    padding: 0px 0px;
    overflow: hidden;
  }

  &__title {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
  }

  &__icon {
    width: 8px;
    height: 8px;
  }
}

@include media-lg {
  .app-accordion {
    &__title {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
  }
}

.slide-enter-active {
  animation: slide-animation 0.4s;
}

.slide-leave-active {
  animation: slide-animation 0.4s reverse;
}

@keyframes slide-animation {
  0% {
    opacity: 0;
    max-height: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    max-height: 1000px;
  }
}
</style>
