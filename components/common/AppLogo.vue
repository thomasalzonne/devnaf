<template>
  <NuxtLink to="/" class="logo" @click="closeModals">
    <SvgIcon class="logo__icon" name="logo" />
  </NuxtLink>
</template>

<script lang="ts" setup>
import { EModals } from '~~/constants/modals'
import { useLayoutStore } from '~~/store/layout'

const layoutStore = useLayoutStore()

const closeModals = () => {
  layoutStore.closeModal(EModals.SEARCH)
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  z-index: 1000;

  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
