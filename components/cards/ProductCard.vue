<template>
  <div v-if="product" class="product-card" :class="`product-card--${type}`">
    <NuxtLink
      :to="`/products/${product.slug}`"
      class="product-card__container"
      @click="goToProduct"
    >
      <div
        class="product-card__img-main-container"
        :class="{ 'product-card__img-main-container--loading': !isImageLoaded }"
      >
        <div class="product-card__img-container">
          <Transition name="fade">
            <img
              v-show="hoveringColorUrl"
              :src="hoveringColorUrl + '?&width=' + width"
              class="product-card__img--second"
            />
          </Transition>

          <img
            ref="mainImage"
            class="product-card__img"
            :src="product.thumbnail_url + '?&width=' + width"
            :alt="product.name"
            @load="handleImageLoaded"
            @error="handleImageError"
          />
        </div>

        <AppSaleBadge
          v-if="product.percentage"
          :text="`- ${product.percentage} %`"
          class="product-card__discount"
        />
      </div>
      <div class="product-card__content">
        <div class="product-card__title-and-favorite">
          <h4 class="product-card__title">{{ product.name }}</h4>

          <WishlistButton
            class="product-card__favourite-button"
            :is-active="isProductInWishlist"
            @toggle="toggleWishlist"
          />
        </div>
        <div class="product-card__details-product">
          <PriceForCard
            class="product-card__price-container"
            :original-price="product?.price"
            :discounted-price="product?.price_discounted"
          />
          <div class="product-card__sizes-content">
            <h4 class="product-card__sizes-title">Ajouter ma taille</h4>
            <div class="product-card__sizes-container">
              <span class="product-card__size"
                ><p class="product-card__size-number">34</p></span
              ><span class="product-card__size product-card__size-invailable">
                <p class="product-card__size-number">36</p></span
              >
              <span class="product-card__size"
                ><p class="product-card__size-number">38</p></span
              ><span class="product-card__size"
                ><p class="product-card__size-number">40</p></span
              ><span class="product-card__size"
                ><p class="product-card__size-number">42</p></span
              >
              <span class="product-card__size"
                ><p class="product-card__size-number">44</p></span
              >
            </div>
          </div>
          <div
            v-if="product.variants?.length"
            class="product-card__content-block"
          >
            <div class="product-card__colors-block">
              <NuxtLink
                v-for="(variant, index) in product.variants"
                :key="index"
                :to="`/products/${variant.slug}`"
                class="product-card__color"
                :data-url="variant.image"
                :style="variantStyle(variant)"
                @mouseenter="colorMouseEnter"
                @mouseleave="colorMouseLeave"
              ></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import AppSaleBadge from '~/components/common/AppSaleBadge.vue'
import WishlistButton from '~/components/common/WishlistButton.vue'
import PriceForCard from '~/components/common/PriceForCard.vue'

import { useProductsStore } from '~~/store/products'
import { useWishlistStore } from '~~/store/wishlist'
import { IWishlistProductWrapper } from '~~/types/wishlist.interface'

export default defineComponent({
  name: 'ProductCard',
  components: {
    WishlistButton,
    AppSaleBadge,
    PriceForCard,
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    product: {
      type: Object,
      default() {
        return { slug: '', thumbnail: '' }
      },
    },
  },
  data() {
    return {
      wishlistStore: useWishlistStore(),
      productsStore: useProductsStore(),
      width: 800,
      isProductInWishlist: false,
      isImageLoaded: false,
      hoveringColorUrl: '',
    }
  },
  computed: {
    wishlistProducts() {
      return this.wishlistStore.wishlist?.wishlistProducts || []
    },
    isProductInWishlistStore() {
      return !!this.wishlistProducts?.find(
        (item: IWishlistProductWrapper) =>
          item?.product?.slug === this.product?.slug
      )
    },
  },
  watch: {
    isProductInWishlistStore(value: boolean) {
      this.isProductInWishlist = value
    },
  },
  mounted() {
    const screen = window.innerWidth

    if (screen <= 767) {
      this.width = 500
    } else if (screen > 992 && screen <= 1200) {
      this.width = 1000
    }

    this.isProductInWishlist = this.checkInWishlistProduct()

    const interval = setInterval(() => {
      if (this.$refs.mainImage) {
        if (
          this.$refs.mainImage.complete &&
          this.$refs.mainImage.naturalHeight > 0
        ) {
          this.isImageLoaded = true
        }
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    async toggleWishlist() {
      const slug = this.product?.slug
      const inWishlist = this.isProductInWishlist

      const { toastProductWishlist } = useAppToast()

      this.isProductInWishlist = !this.isProductInWishlist

      !inWishlist
        ? await this.wishlistStore.addToWishlist(slug)
        : await this.wishlistStore.removeItem(slug)

      this.isProductInWishlist = this.checkInWishlistProduct()

      toastProductWishlist({
        text: this.isProductInWishlist
          ? this.$t('Notifications.added_to_wishlist')
          : this.$t('Notifications.removed_from_wishlist'),
        image: this.product?.thumbnail_url,
        isFavourite: this.isProductInWishlist,
      })
    },
    variantStyle(variant) {
      if (variant.type === 'hexacode') {
        return { 'background-color': variant.value }
      }

      return {
        'background-image': "url('" + variant.value + "')",
        'background-size': 'cover',
      }
    },
    goToProduct() {
      this.productsStore.addProductInStash(this.product)
    },
    checkInWishlistProduct() {
      return !!this.wishlistProducts?.find(
        (item: IWishlistProductWrapper) =>
          item?.product?.slug === this.product?.slug
      )
    },
    handleImageLoaded() {
      this.isImageLoaded = true
    },
    handleImageError() {
      this.isImageLoaded = false
    },
    colorMouseEnter(event) {
      this.hoveringColorUrl = event.target.dataset.url
    },
    colorMouseLeave() {
      this.hoveringColorUrl = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.product-card {
  cursor: pointer;

  &--big {
    min-width: 208px;

    .product-card {
      &__container {
        width: 208px;
        height: auto;
      }
    }
  }

  &__container {
    display: block;
    position: relative;
    width: 152px;
    height: auto;
    transition: 0.2s ease-out;

    &:hover {
      box-shadow: 9px 9px 0 $color-black;
      transform: translateY(-5px);

      &:hover .product-card__details-product {
        max-height: 400px;
        transition: 1.3s ease-out;
      }
    }

    &:after {
      content: '';
      z-index: 0;
      position: absolute;
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 33%;
      left: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 100%
      );
    }
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
    background-color: $color-grey-loading;

    &--second {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      object-fit: cover;
      background-color: $color-grey-loading;
    }
  }

  &__details-product {
    max-height: 0;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title-and-favorite {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &__content {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 12px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__sizes-content {
    color: $color-white;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__sizes-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 44px;
  }

  &__sizes-container {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__size {
    background: rgba(217, 217, 217, 0.01);
    border: 1px solid $color-white;
    backdrop-filter: blur(2px);
    border-radius: 10px;
    height: 37px;
    width: 37px;
    display: flex;

    p {
      margin: auto;
      font-size: 14px;
    }

    &:hover {
      border-color: black;
      p {
        color: black;
      }
    }
  }

  &__size-invailable {
    border: 1px solid #cdcdcd;
    color: #cdcdcd;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(0);

    &:hover {
      border-color: #cdcdcd;
    }

    &::after {
      content: '';
      position: absolute;
      width: 240%;
      border: 1px solid #cdcdcd;
      transform: rotate(45deg);
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }

  &__content-block {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 8px;

    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }

  &__colors-block {
    display: flex;
    gap: 6px;
    margin-left: 4px;
    margin-bottom: 3px;
  }

  &__title {
    font-family: $font-secondary;
    font-size: 16px;
    line-height: 18px;
    color: $color-white;
    font-weight: 400;
    width: 80%;

    max-width: 412px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    -webkit-line-clamp: 3;
  }

  &__price-container {
    margin-top: 5px;
    align-items: center;
    color: white;
    line-height: 44px;
  }

  &__favourite-button {
    z-index: 100;
  }

  & :deep(.wishlist-button) {
    width: 20px;
    height: 20px;
    color: $color-white;
  }

  &__color {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &:hover {
      outline: 1.4px solid $color-white !important;
      outline-offset: 2px;
    }
  }

  &__discount {
    position: absolute;
    right: 19px;
    top: 18px;
    background-color: $color-black;
    border-radius: 10px;
  }

  &__img-main-container {
    &--loading {
      min-height: 204px;
      background-color: $color-grey-loading;
    }
  }

  &__img-container {
    position: relative;
    overflow: hidden;
  }
}

@include media-lg {
  .product-card {
    min-width: 354px;

    &--big {
      .product-card {
        &__container {
          width: 354px;
          height: auto;
        }
      }
    }

    &--normal {
      .product-card {
        &__container {
          width: 354px;
          height: auto;
        }
      }
    }

    &__container {
      width: 311px;
      height: auto;
    }

    &__content {
      margin-top: 20px;
    }

    &__colors-block {
      gap: 8px;
    }

    &__title {
      font-size: 18px;
      line-height: 24px;
    }

    &__color {
      width: 20px;
      height: 20px;
    }

    &__img-main-container {
      &--loading {
        min-height: 200px;
        background-color: $color-grey-loading;
      }
    }
  }
}
a.product-card__container:hover .product-card__content {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
@include media-xxxl {
  .product-card {
    min-width: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 500px) {
  .product-card {
    &__container::after {
      content: unset;
    }
    &__content {
      position: unset;
      background: unset;
      padding-left: 0;
    }
    &__title {
      font-size: 13px;
      color: black;
    }
    &__price-container {
      margin-top: 0;
    }
    &__details-product {
      max-height: unset;
    }
    &__sizes-content {
      display: none;
    }
    &__discount {
      right: 7px;
      top: 7px;
    }
    &__favourite-button {
      position: absolute;
      right: 7px;
      top: 65%;
    }
    &__content-block {
      display: none;
    }
    &__container:hover {
      box-shadow: unset;
      transform: unset;
    }
  }
  a.product-card__container:hover .product-card__content {
    background: transparent;
  }
}
</style>
