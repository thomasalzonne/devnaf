<template>
  <div class="layout layout--checkout">
    <div class="layout__header">
      <AppHeader v-if="isMobile" />
      <CheckoutHeader v-if="!isMobile" />
    </div>
    <main class="layout__content"><slot /></main>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/header/AppHeader.vue'
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue'
import { useLayoutStore } from '~~/store/layout'

const layoutStore = useLayoutStore()

const isMobile = computed(() => {
  return layoutStore.isMobile
})

onMounted(() => {
  if (!isMobile.value) {
    layoutStore.headerHeight = 81
  }
})
</script>
