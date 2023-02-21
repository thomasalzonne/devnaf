<template>
  <div class="catalog-carousel">
    <AppCarousel
      class="catalog-carousel__carousel"
      item-selector=".catalog-carousel__item"
      :is-show-scrollbar="false"
      :with-mouse-scroll="false"
      :class="{ entrance: isEntranceEnable && !isCatalog }"
    >
      <CatalogCarouselItem
        v-for="(category, index) in categories"
        :key="index"
        :category="category"
        class="catalog-carousel__item"
        :class="{ 'catalog-carousel__item--with-paddings': !isCatalog }"
      />
    </AppCarousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppCarousel from '~/components/common/AppCarousel.vue'
import CatalogCarouselItem from '~/components/carousel/CatalogCarouselItem.vue'

export default defineComponent({
  name: 'CatalogCarousel',
  components: {
    CatalogCarouselItem,
    AppCarousel,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      },
    },
    isCatalog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEntranceEnable: false,
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.isEntranceEnable = true
    // }, 1000)
  },
})
</script>

<style lang="scss" scoped>
.catalog-carousel {
  padding: 15px 0 8px 0;
  width: 100vw;
  min-height: 105px;

  &__item {
    &:first-child {
      margin-left: 20px;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  & :deep(.app-carousel__overflow) {
    padding-left: 0;
  }
}

@include media-lg {
  .catalog-carousel {
    height: auto;
    width: 100%;
    padding: 27px 0 27px 0;

    &__item {
      &:not(:last-child) {
        margin-right: 60px;
      }

      &:last-child {
        margin-right: 60px;
      }

      &--with-paddings:first-child {
        margin-left: 60px;
      }
    }

    & :deep(.app-carousel__overflow) {
      padding-left: 0;
    }
  }
}

.entrance {
  animation: 2s ease-in-out 0s 1 categoriesSlideIn;
  margin-left: 0vw;
}

@keyframes categoriesSlideIn {
  from {
    margin-left: 0vw;
  }

  50% {
    margin-left: -10vw;
  }

  to {
    margin-left: 0vw;
  }
}
</style>
