<template>
  <div class="marquee-line">
    <div v-for="i in 20" :key="i" class="marquee-line__container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MarqueeLine',
})
</script>

<style lang="scss" scoped>
.marquee-line {
  width: 100%;
  overflow: hidden;

  &__container {
    width: 10000px;
    display: inline-flex;
    align-items: flex-end;
    gap: 9px;
    width: max-content;
    animation: marquee-animation 10s linear infinite;
    line-height: 1;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

@keyframes marquee-animation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
