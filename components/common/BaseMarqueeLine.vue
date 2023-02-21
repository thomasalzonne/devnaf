<template>
  <MarqueeLine class="common-marquee-line">
    <span class="common-marquee-line__text common-marquee-line__text--main"
      >Envíos gratis</span
    >
    <span class="common-marquee-line__text common-marquee-line__text--secondary"
      >a partir de 49,90€*</span
    >
    <!-- <img
      src="~/assets/images/stickers/smiley.png"
      class="common-marquee-line__icon"
    />
    <img
      src="~/assets/images/stickers/explosion.png"
      class="common-marquee-line__icon"
    />
    <img
      src="~/assets/images/stickers/flower.png"
      class="common-marquee-line__icon"
    /> -->
  </MarqueeLine>
</template>

<script lang="ts" setup>
import MarqueeLine from '~/components/common/MarqueeLine.vue'
</script>

<style lang="scss" scoped>
.common-marquee-line {
  display: flex;
  background-color: $color-green;
  height: 50px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &__text {
    margin-left: 20px;

    &--main {
      font-family: $font-secondary;
      color: $color-yellow;
      font-size: 20px;
      line-height: 1;
    }

    &--secondary {
      font-size: 14px;
      line-height: 1;
      font-weight: 400;
      margin-left: 4px;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}

@include media-lg {
  .common-marquee-line {
    height: 71px;

    &__text {
      &--main {
        font-size: 40px;
      }

      &--secondary {
        font-size: 23px;
        margin-bottom: 4px;
      }
    }

    &__icon {
      width: 39px;
      height: 39px;
    }
  }
}
</style>
