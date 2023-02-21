<template>
  <button
    id="addToCart"
    class="button"
    type="button"
    :disabled="!isInStock || isLoading"
    :class="{ 'button--disabled': !isInStock }"
    @click="handleProductButton"
  >
    <!-- <client-only>
          <Vue3Lottie
            id="anim"
            ref="lottieBtn"
            class="button__lottie hidden"
            animation-link="/lotties/add_to_cart.json"
            :loop="false"
            :auto-play="false"
            :delay="2000"
            @onComplete="lottieBtn.stop()"
          />
        </client-only> -->
    <div v-if="isLoading" class="button__loader">
      <AppLoader type="white" />
    </div>
    <template v-else>
      <template v-if="!isInStock">
        <span class="button__title">
          {{ $t('Common.product_out_of_stock') }}
        </span>
      </template>
      <template v-if="isInCart && isInStock">
        <span class="button__title">
          {{ $t('Common.go_to_cart') }}
        </span>
      </template>
      <template v-if="isInStock && !isInCart">
        <span class="button__title button__title--mobile">
          {{ $t('Common.add') }}
        </span>
        <span class="button__title button__title--desktop">
          {{ $t('Common.add_to_cart') }}
        </span>
      </template>
    </template>
  </button>
</template>

<script lang="ts" setup>
import AppLoader from '~/components/common/AppLoader.vue'

interface IProps {
  isInStock: boolean
  isInCart: boolean
  isLoading: boolean
}

defineProps<IProps>()
const emit = defineEmits(['trigger'])

const handleProductButton = () => {
  emit('trigger')
}
</script>

<style lang="scss" scoped>
.button__pushed {
  animation-name: btnClick;
  animation-duration: 700ms;
  animation-delay: 0;
  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  animation-iteration-count: 1;
}

.button {
  padding: 5px;
  z-index: 10;
  position: relative;
  z-index: 100;
  display: none;
  height: 44px;

  &__title {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 14px;
    line-height: 15px;
    position: relative;
    z-index: 95;

    &--mobile {
      margin-left: 3px;
    }

    &--desktop {
      display: none;
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    margin-top: -3px;
    position: relative;
    z-index: 95;
  }
}

@include media-lg {
  .button {
    display: flex;
    height: 55px;

    &__title {
      font-size: 16px;
      line-height: 44px;
      &--mobile {
        display: none;
      }

      &--desktop {
        display: block;
      }
    }
  }
}
</style>
