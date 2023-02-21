<template>
  <div class="app-footer">
    <FooterMainBlock />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FooterMainBlock from './FooterMainBlock.vue'

export default defineComponent({
  name: 'AppFooter',
  components: {
    FooterMainBlock,
  },
})
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  flex-direction: column;
}
</style>
