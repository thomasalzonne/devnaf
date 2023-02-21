<template>
  <div class="product-info-block__box">
    <AppBreadcrumbs v-if="!isMobile" class="breadcrumbs" />
    <div class="product-info-block__general-info">
      <div class="product-info-block__header">
        <h1 class="product-info-block__title">
          {{ product?.name }}
        </h1>
        <div
          class="product-info-block__wishlist-container"
          :class="{
            'product-info-block__wishlist-container--active': isFavourite,
          }"
        >
          <WishlistButton :is-active="isFavourite" @toggle="toggleWishlist" />
        </div>
      </div>
      <ProductPriceBlock
        :price="+price"
        :discounted-price="+discountedPrice"
        :discount-percent="discountPercent"
      />
    </div>

    <template v-if="product?.variants?.length">
      <p class="product-info-block__label">{{ $t('Common.color') }} :</p>
      <div class="product-info-block__colors">
        <ProductColorButton
          v-for="color in product?.variants"
          :key="color?.slug"
          :color-data="color"
          :is-active="color?.slug === slug"
        />
      </div>
    </template>

    <div class="product-info-block__buttons">
      <template v-if="sizes?.length">
        <ProductSizesBlock
          :sizes="sizes"
          :current-size="currentSize"
          @select-size="selectSize"
          @open-size-helper="openSizeHelper"
        />
      </template>

      <ProductButton
        v-if="!isMobile"
        :is-loading="isLoading"
        :is-in-cart="isInCart"
        :is-in-stock="isInStock"
        @trigger="handleProductButton"
      />
    </div>

    <div class="product-info-block__info">
      <div v-if="product?.tags?.length" class="product-info-block__badges">
        <AppTag title="Coton" />
      </div>

      <div class="accordions product-info-block__accordions">
        <AppAccordion
          v-if="product?.delivery"
          :title="$t('Product.description.title')"
        >
          <div
            class="product-info-block__description"
            v-html="product?.description"
          />
          <p v-if="product?.reference" class="product-info-block__reference">
            Ref : {{ product.reference }}
          </p>
        </AppAccordion>

        <AppAccordion
          v-if="product?.materials"
          :title="$t('Product.materials_and_care.title')"
        >
          <div
            class="product-info-block__description"
            v-html="product?.materials"
          />
        </AppAccordion>
        <AppAccordion
          v-if="product?.materials"
          :title="$t('Product.naf_gold.title')"
        >
          <div class="product-info-block__description">Naf Gold</div>
        </AppAccordion>
      </div>
      <AdvantagesBox class="product-info-block__advantages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductPriceBlock from './ProductPriceBlock.vue'
import AdvantagesBox from '~/components/common/AdvantagesBox.vue'
import AppAccordion from '~/components/common/AppAccordion.vue'
import AppTag from '~/components/common/AppTag.vue'
import WishlistButton from '~/components/common/WishlistButton.vue'
import AppBreadcrumbs from '~/components/common/AppBreadcrumbs.vue'

import {
  IProduct,
  IProductMedia,
  IProductSize,
} from '~~/types/product.interface'
import ProductColorButton from '~/components/product/ProductColorButton.vue'

interface IProps {
  product: IProduct | null
  currentSize: IProductSize | null
  medias: IProductMedia[]
  isFavourite: boolean
  isMinimized: boolean
  isMobile: boolean
  isInCart: boolean
  isInStock: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  product: null,
  currentSize: null,
  medias: () => [],
  isFavourite: false,
  isMinimized: false,
  isMobile: false,
  isInCart: false,
  isInStock: false,
})

const emit = defineEmits([
  'openSizes',
  'selectSize',
  'openSizeHelper',
  'toggleWishlist',
  'openProductModal',
  'addProductToCart',
])
const route = useRoute()
const isLoading = ref(false)

const sizes = computed<IProductSize[]>(() => {
  return props.product?.sizes || []
})

const slug = computed(() => {
  return route.params?.product || ''
})

const price = computed(() => {
  return props.currentSize?.price || props.product?.price || 0
})

const discountedPrice = computed(() => {
  return (
    props.currentSize?.price_discounted || props.product?.price_discounted || 0
  )
})

const discountPercent = computed(() => {
  return props.product?.percentage || 0
})

const handleProductButton = () => {
  if (props.isInCart) {
    navigateTo('/cart')
  } else {
    emit('addProductToCart')
  }
}

const toggleWishlist = () => {
  emit('toggleWishlist', !props.isFavourite)
}

const selectSize = (size: IProductSize) => {
  emit('selectSize', size)
}

const openSizeHelper = () => {
  emit('openSizeHelper')
}
</script>

<style lang="scss" scoped>
@keyframes btnClick {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.hidden {
  display: none !important;
}
.breadcrumbs {
  padding: 9px 21px;
}

.product-info-block {
  position: relative;

  &__general-info {
    margin: 27px 20px 10px 20px;
    position: relative;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-right: 0px;
  }

  &__wishlist-container {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 2px;

    &--active {
      top: -6px;
      right: -6px;
    }
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    text-transform: uppercase;
  }

  &__colors {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 14px;
    row-gap: 30px;
    margin: 9px 20px 10px 20px;
  }

  &__buttons {
    margin: 30px 20px;
    column-gap: 10px;
    row-gap: 22px;
    justify-content: space-between;
  }

  &__label {
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    padding-left: 21px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin: 33px 20px 00px 20px;
  }

  &__badges {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__description {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    margin-top: 10px;

    & :deep(p) {
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
    }

    & :deep(h6) {
      font-family: $font-secondary;
      color: $color-pink;
      font-size: 22px;
      line-height: 20px;
      margin-top: 10px;
      margin-bottom: 4px;
      font-weight: 400;
    }
  }

  &__reference {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    margin: 15px 0 0px 0;
  }

  &__wishlist {
    margin-top: 7px;
    margin-right: -23px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__advantages {
    order: 1;
  }

  &__accordions {
    order: 0;
  }
}

.accordions {
  display: flex;
  flex-direction: column;

  &--mobile {
    margin: 0 20px;
  }

  &--desktop {
    display: none;
  }
}

@include media-sm {
  .product-info-block {
    &__buttons {
      margin: 20px 20px 0 20px;
      row-gap: 10px;
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 10px;
      justify-content: space-between;
    }
  }
}

@include media-lg {
  .accordions {
    display: flex;
    flex-direction: column;

    &--mobile {
      display: none;
    }
  }

  .breadcrumbs {
    padding-left: 0;
  }

  .product-info-block {
    display: grid;
    grid-template-columns: calc(61% - 40px) calc(39% - 40px);
    margin: 0 auto;
    max-width: calc($container-width + 120px);
    padding: 0 60px;
    gap: 80px;

    &__label {
      display: block;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      padding-left: 0;
    }

    &__reference {
      font-size: 14px;
      line-height: 16px;
    }

    &__general-info {
      margin: 0px 0 21px 0;
    }

    &__colors {
      margin: 9px 0 35px 0;
    }

    &__buttons {
      margin: 0;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      row-gap: 10px;
      justify-content: flex-start;
    }

    &__info {
      margin: 16px 0 0;
      display: flex;
      flex-direction: column;
    }

    &__description {
      order: -1;
      font-size: 14px;

      & :deep(p) {
        font-size: 14px;
      }
    }

    &__badges {
      order: 0;
      margin-top: 20px;
      gap: 15px;
    }

    &__title {
      font-weight: 480;
      font-size: 24px;
      line-height: 44px;
    }

    &__wishlist-container {
      position: absolute;
      top: 12px;
      right: -18px;

      &--active {
        top: 7px;
        right: -24px;
      }
    }
  }
}

@media screen and (min-width: 1300px) {
  .product-info-block {
    margin-right: 44px;
  }
}
</style>
