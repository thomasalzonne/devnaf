<template>
  <NuxtLink :to="`/products/${slug}`">
    <div class="secondary-card">
      <div class="secondary-card__img-container">
        <div class="secondary-card__gradient"></div>
        <img class="secondary-card__img" :src="image" alt="" />
        <AppBadge class="secondary-card__badge" :title="`-${percentage}%`" />

        <div class="secondary-card__body">
          <p class="secondary-card__title">
            {{ name }}
          </p>
          <div class="secondary-card__desktop">
            <ProductPriceBlock
              :price="originalPrice"
              :discount-percent="percentage"
              :discounted-price="price"
            />
            <p class="secondary-card__label">{{ $t('Common.sizes') }}</p>
            <div class="secondary-card__sizes">
              <ProductSizeButton
                v-for="size in productSizes"
                :key="size?.ean"
                :size="size"
                :is-active="checkIfSizeInCart(size?.ean)"
                class="secondary-card__size"
                @click.prevent.stop="addToCart(size)"
              />
            </div>
          </div>
        </div>

        <WishlistButton
          class="secondary-card__wishlist"
          :is-active="isFavourite"
          @toggle="toggleIsFavourite"
        />
      </div>
      <button class="secondary-card__button" @click.prevent.stop="selectCard">
        {{ $t('Common.add') }}
      </button>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import WishlistButton from '~/components/common/WishlistButton.vue'
import ProductSizeButton from '~/components/product/ProductSizeButton.vue'
import ProductPriceBlock from '~/components/product/ProductPriceBlock.vue'
import AppBadge from '~/components/common/AppBadge.vue'
import { useCartStore } from '~~/store/cart'
import { ICartItem } from '~~/types/cart.interface'
import { IProductSize } from '~~/types/product.interface'
import {
  IWishlistProductInnerVariant,
  IWishlistProductVariant,
} from '~~/types/wishlist.interface'

const emit = defineEmits([
  'onSelect',
  'removeFromWishlist',
  'addToWishlist',
  'addToCart',
])

interface IProps {
  image: string
  name: string
  isFavourite: boolean
  slug: string
  variant: IWishlistProductVariant
}

const props = withDefaults(defineProps<IProps>(), {
  image: '',
  name: '',
  isFavourite: false,
  slug: '',
})

const cartStore = useCartStore()

const cartProducts = computed<ICartItem[]>(() => {
  return (cartStore.cart?.items as ICartItem[]) || []
})

const productSizes = computed<IProductSize[]>(() => {
  let sizes = props.variant?.product?.variants || []

  sizes = sizes?.filter(
    (size: IWishlistProductInnerVariant) => typeof size !== 'string'
  )

  return sizes?.map((variant: IWishlistProductInnerVariant) => {
    return {
      stock: variant?.inventorySourceStocksOnHand || 0,
      ean: variant?.code || '',
      size: variant?.translation?.name || '',
      price: '',
      price_discounted: '',
    }
  })
})

const originalPrice = computed(() => {
  const originalPrice = props.variant?.originalPrice
  const price = props?.variant?.price

  if (originalPrice === price) return 0
  return transformPriceFromSylius(originalPrice)
})

const price = computed(() => {
  return transformPriceFromSylius(props?.variant?.price)
})

const percentage = computed(() => {
  return props.variant?.percentage || 0
})

const selectCard = () => {
  emit('onSelect')
}

const toggleIsFavourite = () => {
  props.isFavourite ? removeFromWishlist() : addToWishlist()
}
const checkIfSizeInCart = (ean: string) => {
  return !!cartProducts.value?.find(
    (product: ICartItem) => product?.variant?.ean === ean
  )
}

const removeFromWishlist = () => {
  emit('removeFromWishlist', props.variant)
}

const addToWishlist = () => {
  emit('addToWishlist', props.slug)
}

const addToCart = (size: IProductSize) => {
  emit('addToCart', { ean: size.ean, image: props.image })
}
</script>

<style lang="scss" scoped>
.secondary-card {
  min-width: 160px;
  height: auto;

  &__img-container {
    position: relative;
    width: 100%;
    background-color: $color-light-grey;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__button {
    background-color: $color-black;
    color: $color-white;
    font-weight: 460;
    font-size: 12px;
    line-height: 44px;
    font-family: $font-secondary;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 0 0 5px 5px;
    width: 100%;
  }

  &__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 80%;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }

  &__body {
    position: absolute;
    bottom: 7px;
    left: 12px;
    padding-right: 12px;
  }

  &__title {
    font-weight: 460;
    font-size: 13px;
    line-height: 17px;
    font-family: $font-secondary;
    color: $color-white;
  }

  &__wishlist {
    position: absolute;
    top: 9px;
    right: 6px;
    width: 22px;
    height: 22px;
  }

  &__price {
    display: none;
  }

  &__label {
    display: none;
  }

  &__sizes {
    display: none;
  }

  &__badge {
    display: none;
  }

  &__desktop {
    display: none;
  }

  & :deep() {
    .wishlist-button {
      &--active {
        .wishlist-button__icon {
          color: $color-pink;
        }
      }

      &__icon {
        color: $color-white;
        width: 22px;
        height: 22px;
      }
    }
  }
}

@include media-lg {
  .secondary-card {
    width: 100%;
    height: auto;

    &__img-container {
      position: relative;
      width: 100%;
      height: auto;
      background-color: $color-light-grey;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__button {
      display: none;
    }

    &__body {
      bottom: 18px;
      left: 13px;
      z-index: 100;
    }

    &__title {
      font-weight: 460;
      font-size: 18px;
      line-height: 23px;
    }

    &__price {
      display: block;
      font-weight: 400;
      font-size: 18px;
      line-height: 44px;
      color: $color-white;
    }

    &__label {
      display: block;
      font-weight: 400;
      font-size: 18px;
      line-height: 44px;
      color: $color-white;
      margin-top: 2px;
    }

    &__wishlist {
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
    }

    &__sizes {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    &__badge {
      display: flex;
      position: absolute;
      top: 26px;
      right: 75px;
    }

    &__desktop {
      display: block;
    }

    & :deep() {
      .wishlist-button {
        &__icon {
          width: 36px;
          height: 36px;
        }
      }

      .product-size-button {
        background-color: transparent;

        &--active {
          background-color: $color-pink;
        }

        &__size-caption {
          color: $color-white;
        }
      }

      .price-block {
        &__price {
          color: $color-white;
        }

        &__percent {
          display: none;
        }
      }
    }
  }
}
</style>
