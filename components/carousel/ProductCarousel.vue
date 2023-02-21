<template>
  <div class="product-carousel">
    <div class="product-carousel__header" :class="headerClass">
      <h2 v-if="heading" class="product-carousel__heading">
        {{ heading }}
      </h2>
      <slot name="header" />
    </div>
    <div class="product-carousel__content">
      <AppCarousel :item-selector="itemSelector" :arrow-bottom="arrowBottom">
        <slot name="content" />
      </AppCarousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppCarousel from '~/components/common/AppCarousel.vue'

interface IProps {
  heading?: string
  headerClass?: any
  itemSelector: string
  arrowBottom?: boolean
  headerAnimation?: boolean
}

withDefaults(defineProps<IProps>(), {
  heading: '',
  headerClass: '',
  itemSelector: '',
  arrowBottom: false,
  headerAnimation: false,
})
</script>

<style lang="scss" scoped>
.product-carousel {
  position: relative;

  &__header {
    display: flex;
    flex-wrap: wrap;
    column-gap: 60px;
    row-gap: 20px;
    padding: 0px 20px 22px 20px;
    width: 100%;
    max-width: 90vw;
  }

  &__heading {
    font-family: $font-secondary;
    font-size: 40px;
    line-height: 40px;
    font-weight: 400;
  }

  &__content {
    width: 100%;
  }
}

@include media-lg {
  .product-carousel {
    &__header {
      padding: 0px 60px 55px 60px;
    }

    &__heading {
      font-size: 80px;
      line-height: 80px;
      white-space: nowrap;
    }
  }
}

@include media-xxxl {
  .product-carousel {
    &__header {
      max-width: 1800px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
