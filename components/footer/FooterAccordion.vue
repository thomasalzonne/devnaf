<template>
  <div
    id="accordion_1"
    class="footer-accordion"
    :class="{ 'footer-accordion--open': isOpen }"
  >
    <div
      class="footer-accordion__header"
      role="button"
      @click="toggleAccordion"
    >
      <span class="footer-accordion__title">{{ title }}</span>
      <SvgIcon class="footer-accordion__icon" name="chevron" />
    </div>
    <Transition name="slide">
      <div v-show="isOpen" class="footer-accordion__content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string
}

withDefaults(defineProps<IProps>(), {
  title: '',
})

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.footer-accordion {
  padding: 14px 0;
  border-bottom: 1px solid $color-medium-grey;

  &:first-child {
    border-top: 1px solid $color-medium-grey;
  }

  &--open {
    .footer-accordion__icon {
      transform: rotate(0);
    }
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
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 15px;
    line-height: 20px;
    text-transform: uppercase;
  }

  &__icon {
    width: 8px;
    height: 8px;
    transform: rotate(-90deg);
  }
}

@include media-lg {
  .footer-accordion {
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
