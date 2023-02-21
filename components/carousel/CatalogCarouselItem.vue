<template v-if="category.length">
  <NuxtLink
    :to="category.slug"
    class="catalog-carousel-item"
    :class="{ 'catalog-carousel-item--active': isActive }"
    @click="clearCollectionOptions"
  >
    <div v-if="category.sliver !== null" class="catalog-carousel-item__sliver">
      <AppImage
        class-name="catalog-carousel-item__sliver-img"
        :image="[category.sliver]"
      />
    </div>
    <div class="catalog-carousel-item__img-container">
      <AppImage
        class-name="catalog-carousel-item__img"
        :image="[category.thumbnail]"
      />
    </div>
    <p class="catalog-carousel-item__title">{{ category.title }}</p>
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppImage from '~/components/common/AppImage.vue'
import { useCollectionsStore } from '~~/store/collections'

export default defineComponent({
  name: 'CatalogCarouselItem',
  components: {
    AppImage,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      default: null,
    },
  },
  methods: {
    clearCollectionOptions() {
      const collectionsStore = useCollectionsStore()

      collectionsStore.$reset()
    },
  },
})
</script>

<style lang="scss" scoped>
.catalog-carousel-item {
  position: relative;
  user-select: none;

  &--active {
    .catalog-carousel-item {
      &__img-container {
        border: 5px solid $color-pink;
      }

      &__title {
        color: $color-pink;
        text-decoration: underline;
      }
    }
  }

  &__img-container {
    width: 78px;
    height: 78px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;

    // For Safari
    -webkit-mask-image: -webkit-radial-gradient(white, black);
  }

  &__title {
    margin: 0 auto;
    text-align: center;
    font-weight: 500;
    margin-top: 5px;
    line-height: 22px;
    font-size: 13px;
    max-width: 78px;
  }

  &__sliver {
    position: absolute;
    left: 0;
    z-index: 10;
    width: max-content;

    & :deep(.catalog-carousel-item__sliver-img) {
      transform: translate(-10px, 2px);
      transition: $easeOut300;
      width: 75%;
    }
  }
}

:deep(.catalog-carousel-item__img) {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transform: scale(1);
  transition: $easeOut300;
  user-select: none;
  pointer-events: none;
}

@include media-lg {
  .catalog-carousel-item {
    &__img-container {
      width: 100px;
      height: 100px;
    }

    & :deep(.catalog-carousel-item__sliver-img) {
      transform: translate(-15px, 10px);
      width: 100%;
    }

    &:hover :deep(.catalog-carousel-item__img) {
      transform: scale(1.5);
    }

    &:hover :deep(.catalog-carousel-item__sliver-img) {
      transform: translate(-15px, 10px) rotateZ(-10deg) scale(1.5);
    }

    &__title {
      margin-top: 8px;
      max-width: 100px;
    }
  }
}
</style>
