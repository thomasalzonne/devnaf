<template>
  <div class="layout-account layout">
    <div class="layout__header">
      <AppHeader />
    </div>
    <main
      class="layout__content"
      :style="{ 'padding-top': !isMobile ? `${headerHeight}px` : null }"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/header/AppHeader.vue'
import AppFooter from '~/components/footer/AppFooter.vue'
import { useLayoutStore } from '~~/store/layout'

const layoutStore = useLayoutStore()

const headerHeight = computed(() => {
  return layoutStore.headerHeight
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})
</script>

<style lang="scss" scoped>
@include media-lg {
  .layout-account {
    .layout__content {
      padding-bottom: 151px;
    }
  }
}
</style>
