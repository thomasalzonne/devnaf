<template>
  <div v-if="posts?.length" class="insta-block">
    <h2 class="insta-block__heading">#NAFASHION</h2>
    <p class="insta-block__text">
      Comparte tus looks en Instagram con #NAFASHION y @NAFNAF 😘
    </p>
    <div class="insta-block__squiggle">
      <SvgIcon class="insta-block__squiggle-icon" name="squiggle" />
    </div>

    <AppCarousel class="insta-block__carousel" item-selector=".insta-card">
      <InstaCard
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        class="insta-block__card"
      />
    </AppCarousel>
  </div>
</template>

<script lang="ts" setup>
import AppCarousel from '~/components/common/AppCarousel.vue'
import InstaCard from '~/components/cards/InstaCard.vue'
import { useCommonStore } from '~~/store/common'

const commonStore = useCommonStore()

const posts = computed(() => {
  return commonStore.data?.instagram || []
})
</script>

<style lang="scss" scoped>
.insta-block {
  padding: 87px 0px 0px 00px;
  position: relative;
  display: none;

  &__heading {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 40px;
    line-height: 40px;
    text-align: center;
  }

  &__text {
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    margin-top: 20px;
  }

  &__squiggle {
    position: absolute;
    top: 85px;
    right: -333px;
  }

  &__squiggle-icon {
    width: 650px;
    height: 45px;
    color: $color-orange;
    transform: rotate(180deg);
  }

  &__carousel {
    margin: 29px 0 0;
  }

  &__card {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}

@include media-lg {
  .insta-block {
    display: block;

    &__card {
      &:not(:last-child) {
        margin-right: 60px;
      }
    }
  }
}

@include media-xxl {
  .insta-block {
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

@include media-xxxl {
  .insta-block {
    &__squiggle {
      right: 0;
    }

    &__squiggle-icon {
      width: 506px;
      height: 44px;
      transform: rotate(0);
    }
  }
}
</style>
