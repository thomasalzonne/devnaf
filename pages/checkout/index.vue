<template>
  <div class="page-checkout">
    <div
      class="page-checkout__wrapper"
      :class="{ 'page-checkout__wrapper--success': isSuccessPage }"
    >
      <NuxtPage />
      <CartTotal v-if="!isSuccessPage && isMobile" :is-show-button="false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CartTotal from '~/components/common/CartTotal.vue'
import { useCartStore } from '~~/store/cart'
import { useLayoutStore } from '~~/store/layout'
definePageMeta({
  layout: 'checkout',
})

const route = useRoute()
const layoutStore = useLayoutStore()
const cartStore = useCartStore()

const isSuccessPage = computed(() => {
  return route.name === 'checkout-index-success'
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

onUnmounted(() => {
  const order = route.query?.order || ''

  if (order) {
    cartStore.clear()
  }
})
</script>

<style lang="scss" scoped>
.page-checkout {
  overflow: hidden;

  &__wrapper {
    height: calc(100vh - (($header-height-mobile * 2) + 44px));
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__content {
    height: auto;
  }
}

@include media-lg {
  .page-checkout {
    &__wrapper {
      height: 100%;
      padding: 0 60px 130px 60px;
      margin: 0 auto;
      width: 100%;

      &--success {
        padding: 0;
      }
    }
  }
}

@include media-xl {
  .page-checkout {
    &__wrapper {
      padding: 0 123px 130px 122px;

      &--success {
        padding: 0;
      }
    }
  }
}
</style>
