<template>
  <Transition name="slide">
    <div v-if="isOpen" class="product-modal" @click="closeModal">
      <div class="product-modal__wrapper" @click.stop="">
        <div class="product-modal__body">
          <div class="product-modal__header">
            <p class="product-modal__title">{{ product?.name }}</p>
            <WishlistButton
              class="product-modal__wishlist"
              :is-active="isFavourite"
              @toggle="toggleWishlist"
            />
          </div>
          <ProductPriceBlock
            class="product-modal__prices"
            :price="+price"
            :discounted-price="+discountedPrice"
            :discount-percent="discountPercent"
          />

          <div v-if="product?.variants" class="product-modal__colors">
            <p class="product-modal__label">{{ $t('Common.color') }} :</p>
            <div class="product-modal__colors-list">
              <ProductColorButton
                v-for="color in product?.variants"
                :key="color?.slug"
                :color-data="color"
                :is-active="color?.slug === product?.slug"
              />
            </div>
          </div>

          <div v-if="sizes?.length" class="product-modal__sizes">
            <div class="product-modal__row">
              <p class="product-modal__label">{{ $t('Common.sizes') }} :</p>
              <button class="product-modal__link" @click="openSizeHelper">
                {{ $t('Product.sizes.help_choose_size') }}
              </button>
            </div>
            <div class="product-modal__colors-list">
              <ProductSizeButton
                v-for="size in sizes"
                :key="size?.ean"
                :size="size"
                :is-active="isSizeInCart(size)"
                :is-pending="addingSize?.ean === size?.ean"
                @click="selectSize(size)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import WishlistButton from '~/components/common/WishlistButton.vue'
import ProductPriceBlock from '~/components/product/ProductPriceBlock.vue'
import { useCartStore } from '~~/store/cart'
import { ICartItem } from '~~/types/cart.interface'
import { IProduct, IProductSize } from '~~/types/product.interface'

interface IProps {
  product: IProduct
  isOpen: boolean
  isFavourite: boolean
  currentSize: IProductSize
}

const props = withDefaults(defineProps<IProps>(), {
  product: null,
  isOpen: false,
  isFavourite: false,
  currentSize: null,
})

const emit = defineEmits([
  'close',
  'openSizeHelper',
  'selectSize',
  'toggleWishlist',
  'productAdded',
])

const cartStore = useCartStore()

const addingSize = ref<IProductSize>(null)

const sizes = computed<IProductSize[]>(() => {
  return props.product?.sizes || []
})

const cartItems = computed<ICartItem[]>(() => {
  return (cartStore.cart?.items as ICartItem[]) || []
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

const isSizeInCart = (size: IProductSize) => {
  return !!cartItems.value.find(
    (item: ICartItem) => item.variant.code === size?.ean
  )
}

const closeModal = () => {
  emit('close')
}

const openSizeHelper = () => {
  emit('openSizeHelper')
}

const selectSize = async (size: IProductSize) => {
  addingSize.value = size
  await cartStore.handleAddToCart(size?.ean || '')
  addingSize.value = null

  emit('productAdded')
}

const toggleWishlist = () => {
  emit('toggleWishlist', !props.isFavourite)
}
</script>

<style lang="scss" scoped>
.product-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - $header-height-mobile);
  background-color: rgba($color: $color-black, $alpha: 0.5);
  backdrop-filter: blur(2px);
  z-index: $z-index-modal;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &__wrapper {
    background-color: $color-white;
    width: 100%;
    min-height: 48%;
    padding-bottom: 30px;
    padding: 18px 21px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    font-family: $font-secondary;
    text-transform: uppercase;
  }

  &__prices {
    margin-bottom: 0;
  }

  &__colors {
    margin-top: 30px;
  }

  &__colors-list {
    display: flex;
    align-items: center;
    gap: 17px;
    margin-top: 10px;
  }

  &__sizes {
    margin-top: 30px;

    :deep() {
      .sizes-block__label {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }

  &__label {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }

  &__link {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    border-bottom: 1px solid $color-black;
    margin-left: 20px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

@include media-lg {
  .product-modal {
    display: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;

  & .product-modal__wrapper {
    transition: all 0.3s ease-in-out;
  }
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  & .product-modal__wrapper {
    transform: translateY(100%);
  }
}
</style>
