<template>
  <NuxtLink :to="`/products/${productSlug}`" class="account-favourite-item">
    <div
      class="account-favourite-item__img-container"
      :class="{
        'account-favourite-item__img-container--no-image': !productImage,
      }"
    >
      <img
        v-if="productImage"
        class="account-favourite-item__img"
        :src="productImage"
        alt="Favourite product"
      />
    </div>
    <div class="account-favourite-item__gradient"></div>
    <div class="account-favourite-item__header">
      <AppBadge
        v-if="percentage"
        class="account-favourite-item__percentage"
        :title="`-${percentage} %`"
      />
      <WishlistButton
        :is-active="true"
        class="account-favourite-item__favourite-button"
        @toggle="removeItem"
      />
    </div>
    <div class="account-favourite-item__content">
      <p class="account-favourite-item__name">{{ productName }}</p>
      <PriceForCard
        class="account-favourite-item__price-container"
        :original-price="originalPrice"
        :discounted-price="discountedPrice"
      />

      <div
        v-if="colors?.length"
        class="account-favourite-item__colors-container"
      >
        <p class="account-favourite-item__colors-label">
          {{ $t('Common.colors') }}
        </p>
        <div class="account-favourite-item__colors">
          <ProductColorButton
            v-for="color in colors"
            :key="color.slug"
            :color-data="color"
            @click="goToProduct(color)"
          />
        </div>
      </div>

      <div v-if="sizes?.length" class="account-favourite-item__sizes-container">
        <p class="account-favourite-item__sizes-label">
          {{ $t('Account.add_my_size') }}
        </p>
        <div class="account-favourite-item__sizes">
          <ProductSizeButton
            v-for="size in sizes"
            :key="size.ean"
            class="account-favourite-item__size"
            :size="size"
            :is-active="isSizeInCart(size)"
            :is-pending="addingSize?.ean === size?.ean"
            @click.prevent.stop="addToCart(size)"
          />
        </div>
      </div>
      <div class="account-favourite-item__button-container">
        <button
          class="account-favourite-item__button"
          @click.prevent.stop="openMobileModal"
        >
          {{ $t('Common.add') }}
        </button>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import ProductSizeButton from '~/components/product/ProductSizeButton.vue'
import AppBadge from '~/components/common/AppBadge.vue'
import WishlistButton from '~/components/common/WishlistButton.vue'
import PriceForCard from '~/components/common/PriceForCard.vue'
import ProductColorButton from '~/components/product/ProductColorButton.vue'

import {
  IColorGroupItem,
  IWishlistProductInnerVariant,
  IWishlistProductWrapper,
} from '~~/types/wishlist.interface'
import { transformPriceFromSylius } from '~~/utils/sylius'
import { IProductColor, IProductSize } from '~~/types/product.interface'
import { ICartItem } from '~~/types/cart.interface'

interface IProps {
  product: IWishlistProductWrapper
  cartItems: ICartItem[]
  addingSize: IProductSize
}

const props = withDefaults(defineProps<IProps>(), {
  product: null,
})

const emit = defineEmits(['removeItem', 'addToCart', 'openMobileModal'])

const originalPrice = computed(() => {
  return transformPriceFromSylius(props.product?.variant?.originalPrice)
})

const discountedPrice = computed(() => {
  const price = transformPriceFromSylius(props.product?.variant?.price)

  return originalPrice.value === price ? 0 : price
})

const productName = computed(() => {
  return props.product?.variant?.product?.name || ''
})

const productSlug = computed(() => {
  return props.product?.product?.slug || ''
})

const productImage = computed(() => {
  return props.product?.product?.pictures?.[0]?.url || ''
})

const sizes = computed<IProductSize[]>(() => {
  let variants = props.product?.variant?.product?.variants || []

  variants = variants.filter((variant) => typeof variant === 'object')

  return variants?.map((variant: IWishlistProductInnerVariant) => {
    return {
      ean: variant?.code || variant?.ean || '',
      price: null,
      price_discounted: null,
      size: variant?.translation?.name || variant?.name || '',
      stock: variant?.inventorySourceStocksOnHand,
    }
  })
})

const percentage = computed(() => {
  return props.product?.variant?.percentage || 0
})

const colors = computed<IProductColor[]>(() => {
  return props.product?.variant?.productColorGroup.map(
    (color: IColorGroupItem) => {
      return {
        type: color.colorType,
        value: color.colorValue,
        slug: color.slug,
        image: color.colorValue,
        color_name: color.name,
      }
    }
  )
})

const isSizeInCart = (size: IProductSize) => {
  return !!props.cartItems.find(
    (item: ICartItem) => item?.variant?.ean === size?.ean
  )
}

const removeItem = () => {
  emit('removeItem', props.product?.variant)
}

const addToCart = (size: IProductSize) => {
  isSizeInCart(size)
    ? navigateTo(`/products/${props.product?.product?.slug}`)
    : emit('addToCart', {
        size,
        image: props.product?.product?.pictures?.[0]?.url,
      })
}

const openMobileModal = () => {
  emit('openMobileModal', props.product?.variant)
}

const goToProduct = (color: IProductColor) => {
  navigateTo(`/products/${color.slug}`)
}
</script>

<style lang="scss" scoped>
.account-favourite-item {
  height: auto;
  position: relative;
  border-radius: 0 0 5px 5px;
  overflow: hidden;

  &__img-container {
    width: 100%;
    height: auto;
    background-color: $color-light-grey;

    &--no-image {
      background-color: $color-light-grey;
      height: 100%;
    }
  }

  &__img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__content {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__header {
    position: absolute;
    top: 0;
    right: 0;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__name {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 13px;
    line-height: 17px;
    color: $color-white;
    padding: 6px 12px;
  }

  &__price-container {
    margin-top: 0;
    display: none;

    & :deep() {
      .app-price {
        &__price {
          color: $color-white;

          &--old {
            color: $color-white;
          }
        }
      }
    }
  }

  &__price {
    color: $color-white;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
  }

  &__favourite-button {
    display: none;
  }

  &__gradient {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    backdrop-filter: blur(1.5px);
  }

  &__sizes-container {
    display: none;
  }

  &__sizes-label {
    font-weight: 400;
    font-size: 18px;
    line-height: 36px;
    color: $color-white;
  }

  &__sizes {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 13px;
  }

  &__button-container {
    width: 100%;
  }

  &__colors-container {
    display: none;
  }

  &__button {
    width: 100%;
    background-color: $color-black;
    color: $color-white;
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 13px;
    line-height: 32px;
    text-transform: uppercase;
  }

  &__percentage {
    display: none;
  }
}

@include media-lg {
  .account-favourite-item {
    border-radius: 0;

    &__img-container {
      min-height: 300px;
    }

    &__content {
      padding: 0 12px 16px 12px;
    }

    &__header {
      padding: 18px 16px;
      gap: 18px;
    }

    &__name {
      font-size: 18px;
      line-height: 23px;
      padding: 0px;
    }

    &__price-container {
      display: flex;
      align-items: center;
      margin-top: 0;
      margin-bottom: 16px;

      & :deep() {
        .app-price {
          &__price {
            color: $color-white;
            padding-left: 0;

            &--old {
              color: $color-white;
            }
          }
        }
      }
    }

    &__favourite-button {
      display: flex;
    }

    &__sizes-container {
      display: block;
    }

    &__sizes {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 13px;

      & :deep() {
        .product-size-button {
          color: $color-white;
          border-color: $color-white;
          background-color: transparent;
          border-width: 1px;

          &--active {
            background-color: $color-pink;
            color: $color-white;
            border-color: $color-pink;

            .product-size-button__size-caption {
              font-weight: 700;
            }
          }
        }
      }
    }

    &__colors-container {
      display: flex;
      gap: 12px;
    }

    &__colors-label {
      font-weight: 400;
      font-size: 18px;
      line-height: 44px;
      color: $color-white;
    }

    &__colors {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 24px;

      & :deep() {
        .product-color-button {
          &:hover {
            .product-color-button__color-container {
              border-color: $color-white;
            }
          }
          &__color-container {
            border-color: transparent;
          }
        }
      }
    }

    &__percentage {
      display: flex;
    }

    &__button {
      display: none;
    }
  }
}
</style>
