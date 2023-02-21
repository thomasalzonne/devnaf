<template>
  <div v-if="posts?.length" class="insta-block">
    <AppCarousel class="insta-block__carousel" item-selector=".insta-card">
      <template #header>
        <div class="insta-block__header">
          <h2 class="insta-block__heading">#NAFLOVE</h2>
          <p class="insta-block__text">
            Comparte con nosotros tus looks naf naf 😘
          </p>
        </div>
      </template>

      <template #default>
        <a
          v-for="(post, index) in posts"
          :key="index"
          :href="post.link"
          target="_blank"
          rel="nofollow"
          class="insta-card"
        >
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
    </AppCarousel>
  </div>
</template>

<script lang="ts" setup>
import AppCarousel from '~/components/common/AppCarousel.vue'
import { useCommonStore } from '~~/store/common'

const commonStore = useCommonStore()

const posts = computed(() => {
  return commonStore.data?.instagram
})

const imageWidth = ref(500)

onMounted(() => {
  if (window.innerWidth > 992) {
    imageWidth.value = 700
  }
})
</script>

<style lang="scss" scoped>
.insta-block {
  width: 100%;
  padding-left: 20px;

  &__heading {
    font-family: 'Mission Gothic';
    font-style: normal;
    font-weight: 480;
    font-size: 64px;
    line-height: 44px;
    text-transform: uppercase;
    text-shadow: -4px 4px 0px $color-pink;
    margin-bottom: 15px;
  }

  &__text {
    font-family: 'Mission Gothic';
    font-style: normal;
    font-weight: 440;
    font-size: 36px;
    line-height: 44px;
    text-transform: uppercase;
  }
}

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
  .insta-block {
    padding-left: 60px;
  }

  .insta-card {
    &__img-container {
      width: 354px;
      height: 354px;
      position: relative;
    }
  }
}

@include media-xl {
  .insta-block {
    margin-top: 180px;
    padding-left: calc((100vw - 1300px) / 2);
  }
}
</style>
