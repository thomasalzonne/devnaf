<template>
  <picture>
    <source
      v-for="source in srcSet"
      :key="source.src"
      :media="source.media"
      :srcset="source.srcset"
    />
    <img
      :src="srcSet[0].srcset"
      :alt="srcSet[0].alt"
      class="app-image"
      :class="className"
      loading="lazy"
      onerror="this.style.display='none'"
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { IImageSrcSet } from '~/types/images'
import { IMAGES_MEDIA } from '~/constants/images'

export default defineComponent({
  name: 'AppImage',
  props: {
    image: {
      type: Array,
      default: () => [
        '/assets/images/hero_image.png',
        '/assets/images/hero_image_2.png',
      ],
    },
    className: {
      type: [String, Array, Object],
      default: '',
    },
  },
  computed: {
    srcSet(): IImageSrcSet[] {
      return (this.image as any).map((img: string, i: number) => {
        return {
          media: IMAGES_MEDIA[i],
          srcset: img,
          alt: img,
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.app-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
