<template>
  <div class="looks-block">
    <div
      class="looks-block__squiggle"
      :class="`looks-block__squiggle--${squiggle}`"
    >
      <SvgIcon
        class="looks-block__squiggle-icon"
        :color="squiggleColor"
        name="squiggle"
      />
    </div>
    <ProductCarousel
      item-selector=".looks-block__card"
      header-class="looks-block__header"
    >
      <template #header>
        <h2 class="looks-block__heading">{{ title }}</h2>
      </template>

      <template #content>
        <ProductCard
          v-for="(product, i) in products"
          :key="i"
          :product="product"
          type="big"
          class="looks-block__card"
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
  title: string
  squiggle: 'desktop' | 'mobile' | 'both' | 'none'
  squiggleColor: string
  products: ICatalogProduct[]
}

withDefaults(defineProps<IProps>(), {
  title: '',
  squiggle: 'none',
  squiggleColor: '#54B94A',
  products: () => [],
})
</script>

<style lang="scss" scoped>
.looks-block {
  position: relative;
  padding-bottom: 0px;
  margin-bottom: 40px;
  margin-top: 42px;
  padding-top: 24px;

  &__squiggle {
    position: absolute;
    top: -30px;
    left: -300px;
    transform: rotate(180deg);

    &--none {
      display: none;
    }

    &--both {
      display: block;
    }

    &--desktop {
      display: none;
    }

    &--mobile {
      display: block;
    }
  }

  &__squiggle-icon {
    height: 22px;
    width: 550px;
  }

  &__explosion {
    display: none;
    z-index: 100;
    width: 169px;
    height: 170px;
    position: absolute;
    right: -5px;
    top: 43px;
  }

  &__explosion-icon {
    width: 100%;
    height: 100%;
    width: 169px;
    height: 170px;
  }

  & :deep(.looks-block__header) {
    padding-bottom: 12px;
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
  .looks-block {
    padding: 0 0px 100px 0px;
    margin-top: 36px;

    &--mobile {
      display: none;
    }

    &__squiggle {
      top: -19px;
      right: -320px;
      left: unset;
      transform: rotate(0);

      &--none {
        display: none;
      }

      &--both {
        display: block;
      }

      &--mobile {
        display: none;
      }

      &--desktop {
        display: block;
      }
    }

    &__squiggle-icon {
      width: 550px;
      height: 90px;
    }

    &__explosion {
      display: block;
    }

    & :deep(.looks-block__header) {
      padding-bottom: 35px;
    }

    & :deep(.product-carousel__arrow-button) {
      bottom: 245px;
    }

    &__heading {
      white-space: nowrap;
      font-size: 40px;
      line-height: 40px;
      margin-left: 0;
    }

    &__card {
      &:not(:last-child) {
        margin-right: 60px;
      }
    }
  }
}

@include media-xxxl {
  .looks-block {
    &__squiggle {
      right: 0;
    }
  }
}
</style>
