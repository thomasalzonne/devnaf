<template>
  <div class="sales-line">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SalesLine',
})
</script>

<style lang="scss" scoped>
.sales-line {
  background-color: $color-green;
  height: 36px;
  display: flex;
  align-items: baseline;
  padding: 7px 13px;
  gap: 5px;
  width: 100%;
}

@include media-lg {
  .sales-line {
    justify-content: center;
  }
}
</style>
