<template>
  <div class="app-sale-badge">
    <span class="app-sale-badge__text">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppSaleBadge',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.app-sale-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    color: $color-yellow;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &__text {
    font-family: $font-primary;
    line-height: 20px;
    text-align: center;
    color: $color-white;
    z-index: 2;
    font-weight: 400;
    font-size: 20px;
    padding: 6px 8px 4px 7px;
  }
}
@media screen and (max-width: 500px) {
  .app-sale-badge {
    &__text {
      font-size: 13px;
      line-height: 13px;
      padding: 7px;
    }
  }
}
</style>
