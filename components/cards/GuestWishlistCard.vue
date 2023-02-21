<template>
  <div class="wishlist-card">
    <NuxtLink :to="`/products/${productSlug}`" class="wishlist-card__container">
      <div
        class="wishlist-card__img-container"
        :class="{
          'wishlist-card__img-container--loading':
            !isImageLoaded || !productImage,
        }"
      >
        <img
          v-if="productImage"
          ref="mainImage"
          class="wishlist-card__img"
          :src="productImage"
          :alt="productName"
          @load="handleImageLoaded"
          @error="handleImageError"
        />
        <WishlistButton
          class="wishlist-card__favourite-button"
          :is-active="true"
          @toggle="removeFromWishlist"
        />
      </div>
      <div class="wishlist-card__content">
        <h4 class="wishlist-card__title">{{ productName }}</h4>
        <PriceForCard
          class="wishlist-card__price-container"
          :original-price="originalPrice"
          :discounted-price="discountedPrice"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import WishlistButton from '~/components/common/WishlistButton.vue'
import PriceForCard from '~/components/common/PriceForCard.vue'

import { IWishlistProductVariant } from '~~/types/wishlist.interface'

interface IProps {
  variant: IWishlistProductVariant
}

const props = defineProps<IProps>()
const emit = defineEmits(['remove'])

const isImageLoaded = ref(false)
const mainImage = ref(null)

const productName = computed(() => {
  return props.variant?.product?.name || ''
})

const productImage = computed(() => {
  return props.variant?.product?.pictures?.[0]?.url || ''
})

const productSlug = computed(() => {
  return props.variant?.product?.slug || ''
})

const originalPrice = computed(() => {
  return transformPriceFromSylius(props.variant?.originalPrice)
})

const discountedPrice = computed(() => {
  const price = transformPriceFromSylius(props.variant?.price)

  return originalPrice.value === price ? 0 : price
})

onMounted(() => {
  const interval = setInterval(() => {
    if (mainImage.value) {
      if (mainImage.value.complete && mainImage.value.naturalHeight > 0) {
        isImageLoaded.value = true
      }
      clearInterval(interval)
    }
  }, 50)
})

const removeFromWishlist = () => {
  emit('remove', productSlug.value)
}

const handleImageLoaded = () => {
  isImageLoaded.value = true
}

const handleImageError = () => {
  isImageLoaded.value = false
}
</script>

<style lang="scss" scoped>
.wishlist-card {
  cursor: pointer;

  &__container {
    display: block;
    position: relative;
  }

  &__img {
    width: 100%;
    height: auto;
  }

  &__content {
    margin-top: 3px;
  }

  &__title {
    font-family: $font-secondary;
    font-size: 16px;
    line-height: 18px;
    color: $color-pink;
    font-weight: 400;
    max-width: 412px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    -webkit-line-clamp: 3;
  }

  &__favourite-button {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 100;
  }

  & :deep(.wishlist-button) {
    width: 40px;
    height: 40px;
  }

  &__img-container {
    &--loading {
      min-height: 204px;
      background-color: $color-grey-loading;
    }
  }

  &__price-container {
    margin-top: 5px;
    display: flex;
    align-items: center;
  }
}

@include media-lg {
  .wishlist-card {
    &__content {
      margin-top: 16px;
    }

    &__title {
      font-size: 22px;
      line-height: 24px;
    }

    &__img-container {
      &--loading {
        min-height: 400px;
        background-color: $color-grey-loading;
      }
    }
  }
}
</style>
