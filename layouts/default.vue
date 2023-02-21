<template>
  <div class="layout">
    <div class="layout__header">
      <AppHeader />
    </div>
    <main
      class="layout__content"
      :style="{ 'padding-top': !isMobile ? `${headerHeight}px` : null }"
    >
      <slot />
    </main>
    <AppFooter class="layout__footer" />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/header/AppHeader.vue'
import AppFooter from '~/components/footer/AppFooter.vue'
import { useLayoutStore } from '~~/store/layout'
</script>
<script lang="ts">
export default {
  computed: {
    headerHeight() {
      return useLayoutStore().headerHeight
    },
    isMobile() {
      return useLayoutStore().isMobile
    },
  },
  watch: {
    '$route.path': {
      handler() {
        this.changeBgColor()
      },
    },
  },
  mounted() {
    this.changeBgColor()
  },
  methods: {
    changeBgColor() {
      if (this.$route.name === 'collections-collection') {
        ;(
          document.querySelector('.layout__content') as HTMLElement
        ).style.background = '#015F76'
      } else {
        ;(
          document.querySelector('.layout__content') as HTMLElement
        ).style.background = 'white'
      }
    },
  },
}
</script>
