<template>
  <a :href="post.link" target="_blank" rel="nofollow" class="insta-card">
    <div class="insta-card__img-container">
      <img
        class="insta-card__img"
        loading="lazy"
        :src="post.image + '?width=' + imageWidth"
        alt="Insta"
      />
    </div>
  </a>
</template>

<script lang="ts" setup>
import { IDivatInstagram } from '~~/types/divat.interface'

interface IProps {
  post: IDivatInstagram
}

withDefaults(defineProps<IProps>(), {
  post: null,
})

const imageWidth = ref(500)

onMounted(() => {
  if (window.innerWidth > 992) {
    imageWidth.value = 700
  }
})
</script>

<style lang="scss" scoped>
.insta-card {
  &__img-container {
    width: 264px;
    height: 264px;
    overflow: hidden;
    display: block;
    position: relative;
    background-color: $color-light-grey;
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
}

@include media-lg {
  .insta-card {
    &__img-container {
      width: 354px;
      height: 354px;
      position: relative;
    }
  }
}
</style>
