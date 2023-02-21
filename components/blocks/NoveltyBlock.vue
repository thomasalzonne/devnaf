<template>
  <div class="novelty-block">
    <ProductCarousel
      v-if="products?.length"
      class="novelty-block__content"
      :heading="$t('Novelty.title')"
      :header-animation="true"
      :item-selector="`.novelty-block__card--${id}`"
    >
      <template #content>
        <ProductCard
          v-for="(product, productIndex) in products"
          :key="productIndex"
          :product="product"
          type="big"
          class="novelty-block__card"
          :class="[`novelty-block__card--${id}`]"
        />
      </template>
    </ProductCarousel>
    <div class="novelty-block__btn-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '~/components/cards/ProductCard.vue'
import ProductCarousel from '~/components/carousel/ProductCarousel.vue'

import { useCollectionsStore } from '~~/store/collections'
import { useCommonStore } from '~~/store/common'

export default defineComponent({
  name: 'NoveltyBlock',
  components: {
    ProductCard,
    ProductCarousel,
  },
  props: {
    id: {
      type: String,
      default: 'novelty_block',
    },
  },
  setup() {
    const commonStore = useCommonStore()

    const products = computed(() => {
      return commonStore.data?.home_new_products?.products || []
    })

    const collectionsStore = useCollectionsStore()

    const clearCollectionOptions = () => {
      collectionsStore.$reset()
    }

    return { products, clearCollectionOptions }
  },
  data() {
    return {
      isShowButton: true,
    }
  },
  methods: {
    triggerScroll(): void {
      ;(this.$refs.scroller as any).triggerScrollRight()
    },
    handleScroll(scrollProcess: number): void {
      this.isShowButton = scrollProcess < 90
    },
  },
})
</script>

<style lang="scss">
.novelty-block {
  position: relative;
  padding-top: 40px;

  &__content {
    margin: 0px 0 40px 0;
  }

  &__card {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
    padding: 0 20px;
  }

  & :deep(.app-button) {
    max-width: 100% !important;
  }
}

@include media-sm {
  .novelty-block {
    .app-button {
      max-width: 100%;
    }
  }
}

@include media-lg {
  .novelty-block {
    padding-top: 80px;

    &__content {
      margin: 28px 0 55px 0;
    }

    &__card {
      &:not(:last-child) {
        margin-right: 60px;
      }
    }

    &__btn-container {
      margin: 52px auto;
    }

    .app-button {
      max-width: 252px !important;
    }
    .product-carousel__arrow-button {
      bottom: 219px;
      right: 3%;
    }
  }
}
</style>
