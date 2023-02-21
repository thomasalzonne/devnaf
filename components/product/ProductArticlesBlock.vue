<template>
  <div class="articles-block">
    <div class="articles-block__separator"></div>
    <ProductCarousel
      item-selector=".articles-block__card"
      header-class="articles-block__header"
    >
      <template #header>
        <h2 class="articles-block__heading articles-block__heading--desktop">
          {{ $t('Product.latest_products_slider_name') }}
        </h2>
      </template>
      <template #content>
        <ProductCard
          v-for="(product, i) in latestProducts"
          :key="i"
          type="big"
          :product="product"
          class="articles-block__card"
        />
      </template>
    </ProductCarousel>
  </div>
</template>

<script lang="ts" setup>
import ProductCard from '~/components/cards/ProductCard.vue'
import ProductCarousel from '~/components/carousel/ProductCarousel.vue'
import { ICatalogProduct } from '~~/types/product.interface'

interface IProps {
  latestProducts: ICatalogProduct[]
}

withDefaults(defineProps<IProps>(), {
  latestProducts: () => [],
})
</script>

<style lang="scss" scoped>
.articles-block {
  position: relative;
  margin-bottom: 0px;
  padding-bottom: 0;

  :deep(.articles-block__header) {
    margin: 53px 0 0px 0;
    padding-bottom: 10px;
  }

  &__heading {
    font-family: $font-secondary;
    font-size: 30px;
    line-height: 40px;
    font-weight: 400;
  }

  &__card {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}

@include media-lg {
  .articles-block {
    padding: 0;

    &__separator {
      height: 0px;
      background-color: $color-black;
      width: auto;
      max-width: 1800px;
      margin: 0 60px 86px 60px;
    }

    & :deep(.product-carousel__header) {
      padding-bottom: 40px;
    }

    &__header {
      margin: 87px 60px 65px 60px;
      display: flex;
      align-items: flex-start;
      gap: 112px;
    }

    &__heading {
      white-space: nowrap;
      display: none;
      font-size: 80px;
      line-height: 80px;
      margin-left: 60px;

      &--desktop {
        display: inline;
        font-size: 40px;
        line-height: 40px;
        margin-left: 0;
        margin-bottom: -20px;
      }
    }

    &__card {
      &:not(:last-child) {
        margin-right: 60px;
      }
    }
  }
}

@include media-xxl {
  .articles-block {
    & :deep(.articles-block__header) {
      max-width: 1800px;
      margin: 86px 0 0 0;
      padding-left: calc((100vw - 1800px) / 2);
      padding-right: calc((100vw - 1800px) / 2);
    }

    &__separator {
      width: 100%;
      margin: 0 auto;
    }

    &__explosion {
      right: 15%;
    }

    & :deep(.app-carousel__overflow) {
      padding-left: calc((100vw - 1800px) / 2);
      padding-right: calc((100vw - 1800px) / 2);
    }

    & :deep(.app-carousel__line--container) {
      padding-left: calc((100vw - 1800px) / 2);
      padding-right: calc((100vw - 1800px) / 2);
    }
  }
}
</style>
