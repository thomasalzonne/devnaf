<template>
  <div class="looks-block">
    <div class="looks-block__squiggle">
      <SvgIcon class="looks-block__squiggle-icon" name="squiggle" />
    </div>
    <div class="looks-block__explosion"></div>
    <ProductCarousel
      class="looks-block__content"
      :heading="title"
      header-class="looks-block__header"
      :header-animation="true"
      item-selector=".looks-block__card"
      :arrow-bottom="true"
    >
      <template #content>
        <NuxtLink
          :to="`/collections/${slug}`"
          class="looks-block__product looks-block__card"
        >
          <img class="looks-block__product-img" :src="image" />
        </NuxtLink>
        <div v-if="products?.length">
          <ProductCard
            v-for="(product, productIndex) in products"
            :key="productIndex"
            :product="product"
            type="normal"
            class="looks-block__card"
          />
        </div>
      </template>
      <template #footer></template>
    </ProductCarousel>
  </div>
</template>

<script lang="ts" setup>
import ProductCard from '~/components/cards/ProductCard.vue'
import ProductCarousel from '~/components/carousel/ProductCarousel.vue'
import { useCommonStore } from '~~/store/common'
import { IDivatHomeLook } from '~~/types/divat.interface'

const commonStore = useCommonStore()

const homeLook = computed<IDivatHomeLook>(() => {
  return commonStore.data?.home_looks
})

const products = computed(() => {
  return homeLook.value?.products || []
})

const title = computed(() => {
  return homeLook.value?.name || ''
})

const image = computed(() => {
  return homeLook.value?.image || ''
})

const slug = computed(() => {
  return homeLook.value?.slug || ''
})
</script>

<style lang="scss">
.looks-block {
  position: relative;
  margin-bottom: 60px;
  margin-top: 57px;

  &__squiggle {
    margin-left: -352px;
  }

  &__squiggle-icon {
    height: 22px;
    width: 678px;
    color: $color-green;
  }

  &__explosion {
    display: none;
    z-index: 100;
    width: 169px;
    height: 170px;
    position: absolute;
    top: 142px;
    right: 54px;
  }

  &__explosion-icon {
    width: 100%;
    height: 100%;
    width: 169px;
    height: 170px;
  }

  &__button {
    padding: 11px 30px 13px 30px;
    background-color: $color-white;
    border-radius: 40px;
    width: max-content;
    color: $color-pink;
    border: 2px solid $color-white;
    z-index: 10;
    text-transform: uppercase;
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;

    &--active {
      background-color: $color-pink;
      color: $color-white;
      border-color: $color-pink;
    }
  }

  &__card {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__product {
    display: block;
    width: 194px;
    height: 261px;
    min-width: 194px;
  }

  &__product-img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  &__content {
    padding-top: 43px;
  }
}

@include media-lg {
  .looks-block {
    &__squiggle-icon {
      height: 59px;
    }

    &__container-buttons {
      display: flex;
      margin-top: 0;
    }

    &__button {
      font-size: 20px;
      line-height: 22px;
      padding: 16px 26px 14px 27px;
    }

    &__header {
      display: flex;
      align-items: center;
    }

    &__card {
      &:not(:last-child) {
        margin-right: 60px;
      }
    }

    &__product {
      width: 439px;
      height: 590px;
      min-width: 439px;
    }

    &__content {
      padding-top: 80px;
    }
  }
}
@include media-xl {
  .looks-block {
    &__explosion {
      display: block;
    }
  }
}

@include media-xxxl {
  .looks-block {
    &__explosion {
      display: none;
    }

    &__squiggle-icon {
      width: 678px;
    }

    &__squiggle {
      margin-left: -33px;
    }
  }
}
</style>
