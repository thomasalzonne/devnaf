<template>
  <div
    class="cart-product"
    :class="{
      'cart-product--zero-stock': !inStock,
      'cart-product--for-modal': forModal,
      'cart-product--for-checkout': forCheckout,
      'cart-product--for-order': forOrder,
      'cart-product--inactive': inactive,
    }"
  >
    <div class="cart-product__grid">
      <div class="cart-product__img-block">
        <NuxtLink
          :to="`/products/${productSlug}`"
          class="cart-product__img-container"
          :class="{ 'cart-product__img-container--no-image': !productImage }"
        >
          <img
            v-if="productImage"
            class="cart-product__img"
            :src="productImage"
            :alt="item?.productName"
          />
        </NuxtLink>
      </div>
      <div class="cart-product__info-block">
        <div>
          <div class="cart-product__header">
            <NuxtLink
              :to="`/products/${productSlug}`"
              class="cart-product__name"
            >
              {{ item?.productName || '' }}
            </NuxtLink>
            <div class="cart-product__header-buttons">
              <template v-if="!forCheckout && !forModal && !forOrder">
                <button
                  v-if="isFavourite"
                  class="cart-product__favourite"
                  @click="toggleIsFavourite"
                >
                  <SvgIcon
                    class="cart-product__favourite-icon"
                    name="heart_product_filled"
                  />
                </button>
              </template>

              <button
                v-if="!forOrder"
                class="cart-product__delete"
                @click="deleteItem"
              >
                <SvgIcon class="cart-product__delete-icon" name="close" />
              </button>
            </div>
          </div>
          <div class="cart-product__price-container">
            <AppBadge
              v-if="percentage"
              class="cart-product__badge"
              :title="`-${percentage}%`"
            />
            <div class="cart-product__prices">
              <p
                class="cart-product__price"
                :class="{ 'cart-product__price--discounted': originalPrice }"
              >
                {{ $n(price, 'EUR') }}
              </p>
              <p
                v-if="originalPrice"
                class="cart-product__price cart-product__price--old"
              >
                {{ $n(originalPrice, 'EUR') }}
              </p>
            </div>
          </div>
        </div>
        <div class="cart-product__body">
          <div v-if="forCheckout && isMobile" class="cart-product__info">
            <p class="cart-product__info-text">
              {{ $t('Common.quantity') }}: {{ internalQuantity?.name || '' }}
            </p>
            <p class="cart-product__info-text">
              {{ $t('Common.color') }}:
              <AppColor
                class="cart-product__color"
                :color="colorOptions?.[0]?.value"
              />
            </p>
            <p class="cart-product__info-text">
              {{ $t('Common.size') }}: {{ productSize?.name || '' }}
            </p>
          </div>

          <template v-else>
            <AppSelect
              v-model="productSize"
              :options="sizesOptions"
              value-type="text"
              title="Size"
              :is-readonly="true"
            />
            <AppSelect
              v-model="colorOptions[0]"
              :options="colorOptions"
              title="Color"
              value-type="color"
              :is-readonly="true"
            />
            <AppSelect
              v-model="internalQuantity"
              :options="quantityOptions"
              title="Quantity"
              value-type="text"
              :is-readonly="forModal || forCheckout || forOrder || isMobile"
            />
          </template>
        </div>
        <button v-if="isMobile" class="cart-product__edit" @click="editProduct">
          {{ $t('Common.edit') }}
        </button>

        <slot name="footer" />
        <div v-if="withToggle" class="cart-product__toggle-container">
          <AppToggle class="cart-product__toggle" />
        </div>

        <template v-if="!forCheckout && !forModal && !forOrder">
          <div v-if="!isFavourite && !isMobile" class="cart-product__footer">
            <button
              class="cart-product__add-to-wishlist"
              @click="toggleIsFavourite"
            >
              <SvgIcon
                class="cart-product__add-to-wishlist-icon"
                name="heart_nav"
              />
              <span class="cart-product__add-to-wishlist-title">{{
                $t('Common.add_to_cart')
              }}</span>
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AppSelect from '~/components/common/AppSelect.vue'
import AppToggle from '~/components/common/AppToggle.vue'
import AppBadge from '~/components/common/AppBadge.vue'
import AppColor from '~/components/common/AppColor.vue'
import { useWishlistStore } from '~~/store/wishlist'

import { ICartItem } from '~~/types/cart.interface'
import { IOption } from '~~/types/select.interface'
import { IWishlistProductWrapper } from '~~/types/wishlist.interface'
import { transformPriceFromSylius } from '~~/utils/sylius'
import { useLayoutStore } from '~~/store/layout'

interface IProps {
  item: ICartItem
  forModal?: boolean
  forCheckout?: boolean
  forOrder?: boolean
  currencyCode?: string
  withToggle?: boolean
  inactive?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  forModal: false,
  forCheckout: false,
  forOrder: false,
  currencyCode: 'EUR',
  withToggle: false,
  inactive: false,
})
const emit = defineEmits(['deleteItem', 'changeQuantity', 'editProduct'])

const wishlistStore = useWishlistStore()
const layoutStore = useLayoutStore()
const { toastProductWishlist } = useAppToast()
const { t } = useI18n()

const inStock = computed<boolean>(() => {
  return props.item?.variant?.inStock
})

const internalQuantity = computed<IOption>({
  get() {
    return {
      name: props.item?.quantity?.toString() || '',
      value: props.item?.quantity || 0,
    }
  },
  set(quantity: IOption) {
    emit('changeQuantity', { id: props.item?.id, quantity: quantity.value })
  },
})

const sizesOptions = ref<IOption[]>([
  {
    value: props.item?.variant?.translation?.name,
    name: props.item?.variant?.translation?.name,
  },
])

const colorOptions = ref<IOption[]>([
  {
    value: {
      type: props?.item?.variant?.product?.type || '',
      value: props?.item?.variant?.product?.value || '',
    },
    name: props.item?.variant?.product?.value,
  },
])

const quantityOptions = ref<IOption[]>(
  Array.from(Array(11).keys())
    .map((i) => {
      return {
        value: i,
        name: i.toString(),
      }
    })
    .slice(1)
)

const productSize = computed({
  get() {
    return sizesOptions.value[0]
  },
  set() {},
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const isFavourite = computed<boolean>(() => {
  return !!wishlistStore.wishlist?.wishlistProducts?.find(
    (product: IWishlistProductWrapper) =>
      product.product?.slug === props.item?.variant?.product?.slug
  )
})

const originalPrice = computed(() => {
  const originalPrice = props?.item?.variant?.originalPrice
  const price = props?.item?.variant?.price

  if (originalPrice === price) return 0
  return transformPriceFromSylius(originalPrice)
})

const price = computed(() => {
  return transformPriceFromSylius(props?.item?.variant?.price)
})

const productImage = computed(() => {
  return props.item?.variant?.product?.pictures?.[0]?.url || ''
})

const productSlug = computed(() => {
  return props.item?.variant?.product?.slug || ''
})

const percentage = computed(() => {
  return props.item?.percentage || 0
})

const toggleIsFavourite = async () => {
  !isFavourite.value
    ? await wishlistStore.addToWishlist(productSlug.value)
    : await wishlistStore.removeItem(productSlug.value)

  toastProductWishlist({
    text: isFavourite.value
      ? t('Notifications.added_to_wishlist')
      : t('Notifications.removed_from_wishlist'),
    image: props.item?.variant?.product?.pictures?.[0]?.url,
    isFavourite: isFavourite.value,
  })
}

const deleteItem = () => {
  emit('deleteItem', props.item.id)
}

const editProduct = () => {
  emit('editProduct', props.item)
}
</script>

<style lang="scss" scoped>
.cart-product {
  position: relative;
  padding: 17px 0;
  border-bottom: 1px solid $color-grey-lighten;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    // padding-bottom: 0;
  }

  &--zero-stock {
    .cart-product {
      &__img {
        filter: grayscale(1);
      }

      &__name {
        color: $color-disabled;
        text-decoration: line-through;
      }

      &__price {
        color: $color-disabled;
      }
    }
  }

  &--inactive {
    .cart-product {
      &__img {
        filter: grayscale(1);
      }

      &__name {
        color: $color-medium-grey;
      }

      &__price {
        color: $color-medium-grey;
      }
    }

    & :deep() {
      .app-select {
        &__trigger {
          border-color: $color-medium-grey;
          color: $color-medium-grey;
        }

        .app-color {
          filter: grayscale(1);
        }
      }
    }
  }

  &--for-modal {
    padding: 10px 0 6px 0;

    &:first-child {
      padding-top: 0;
    }

    .cart-product {
      &__grid {
        grid-template-columns: 135px 1fr;
      }

      &__img-container {
        width: 135px;
        height: 192px;

        &--no-image {
          height: 100%;
        }
      }

      &__info-block {
        padding-top: 0;
        display: flex;
      }

      &__body {
        height: 100%;
      }

      &__edit {
        margin-top: auto;
      }

      &__name {
        font-weight: 480;
        font-size: 20px;
        line-height: 26px;
        -webkit-line-clamp: 1;
      }

      &__delete {
        display: none;
      }
    }
  }

  &--for-checkout {
    .cart-product {
      &__grid {
        grid-template-columns: 94px 1fr;
        gap: 10px;
      }

      &__img-block {
        width: 100%;
        height: 100%;
      }

      &__img-container {
        width: 94px;
        height: 133px;
      }

      &__img {
        display: block;
      }

      &__info-block {
        padding-left: 0;
      }

      &__delete {
        display: none;
      }

      &__header {
        margin-top: -3px;
      }

      &__name {
        font-weight: 480;
        font-size: 16px;
        line-height: 21px;
      }

      &__price-container {
        margin: 3px 0 0px 0;
        gap: 3px;
      }

      &__price {
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;

        &--old {
          font-size: 14px;
        }
      }

      &__body {
        gap: 16px;
        margin-top: 0;
        margin-left: 0;
      }

      &__edit {
        display: none;
      }

      &__info {
      }

      &__info-text {
        font-weight: 400;
        font-size: 13px;
        line-height: 22px;
        display: flex;
        align-items: center;
        gap: 3px;
      }

      &__color {
        width: 16px;
        height: 16px;
      }
    }
  }

  &--for-order {
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .cart-product {
      &__grid {
        grid-template-columns: 130px 1fr;
        gap: 14px;
      }

      &__img-container {
        width: 130px;
      }

      &__name {
        font-weight: 480;
        font-size: 16px;
        line-height: 21px;
      }

      &__price {
        font-size: 16px;
        line-height: 24px;

        &--old {
          font-size: 12px;
        }
      }

      &__body {
        margin-left: 0;
        margin-top: 10px;
      }

      &__edit {
        display: none;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 14px;
  }

  &__img-block {
    display: block;
    height: 185px;
  }

  &__img-container {
    width: auto;
    height: 185px;
    display: block;

    &--no-image {
      background-color: $color-light-grey;
      height: 100%;
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }

  &__header-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    margin-top: 4px;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__name {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    max-width: 150px;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__price-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 5px;
  }

  &__price {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;

    &--old {
      font-weight: 600;
      font-size: 14px;
      line-height: 14px;
      color: $color-dark-grey;
      text-decoration: line-through;
    }

    &--discounted {
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
    }
  }

  &__body {
    display: flex;
    gap: 16px;
    margin-top: 12px;
    margin-left: 6px;
  }

  &__edit {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-decoration: underline;
    width: max-content;
    margin-top: auto;
  }

  &__delete {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }

  &__delete-icon {
    width: 14px;
    height: 14px;
  }

  &__footer {
    margin-top: auto;
  }

  &__add-to-wishlist {
    align-items: center;
    gap: 8px;
    display: none;
  }

  &__add-to-wishlist-icon {
    width: 20px;
    height: 20px;
  }

  &__add-to-wishlist-title {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-decoration: underline;
  }

  &__favourite {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  &__favourite-icon {
    width: 20px;
    height: 20px;
    color: $color-pink;
  }

  &__toggle-container {
    margin-top: auto;
    padding-top: 10px;
  }

  &__info-block {
    padding: 0px 0 0px 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__label {
    font-weight: 400;
    font-size: 13px;
    line-height: 21px;
    display: flex;
    align-items: center;
    gap: 4px;

    & :deep(.app-color) {
      width: 15px;
      height: 15px;
    }
  }

  &__prices {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

@include media-lg {
  .cart-product {
    padding: 22px 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $color-medium-grey;
    }

    &--zero-stock {
      .cart-product {
        &__img {
          filter: grayscale(1);
        }

        &__name {
          color: $color-disabled;
          text-decoration: line-through;
        }

        &__price {
          color: $color-disabled;
        }
      }
    }

    &--inactive {
      .cart-product {
        &__img {
          filter: grayscale(1);
        }

        &__name {
          color: $color-medium-grey;
        }

        &__price {
          color: $color-medium-grey;
        }
      }

      & :deep() {
        .app-select {
          &__trigger {
            border-color: $color-medium-grey;
            color: $color-medium-grey;
          }

          .app-color {
            filter: grayscale(1);
          }
        }
      }
    }

    &--for-modal {
      padding: 10px 0 15px 0;

      &:first-child {
        padding-top: 0;
      }

      .cart-product {
        &__grid {
          grid-template-columns: 154px 1fr;
          gap: 10px;
        }

        &__img-container {
          width: 154px;
          height: auto;

          &--no-image {
            height: 100%;
          }
        }

        &__body {
          height: auto;
        }

        &__info-block {
          padding-top: 0;
        }

        &__name {
          font-weight: 480;
          font-size: 20px;
          line-height: 26px;
        }

        &__price-container {
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
        }

        &__price {
          font-weight: 600;
          font-size: 20px;
          line-height: 44px;

          &--old {
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
          }
        }

        &__delete {
          display: none;
        }
      }
    }

    &--for-checkout {
      .cart-product {
        &__grid {
          grid-template-columns: 130px 1fr;
          gap: 13px;
        }

        &__img-block {
          width: 100%;
          height: 100%;
        }

        &__img-container {
          width: 130px;
          height: auto;
        }

        &__info-block {
          padding-left: 0;
        }

        &__delete {
          display: none;
        }

        &__name {
          font-weight: 480;
          font-size: 16px;
          line-height: 21px;
        }

        &__price-container {
          margin: 7px 0 12px 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        &__price {
          font-weight: 600;
          font-size: 16px;
          line-height: 34px;

          &--old {
            font-size: 14px;
          }
        }

        &__body {
          gap: 16px;
          margin-top: -9px;
        }
      }
    }

    &--for-order {
      .cart-product {
        &__grid {
          grid-template-columns: 130px 1fr;
          gap: 14px;
        }

        &__img-container {
          width: 130px;
        }

        &__name {
          font-weight: 480;
          font-size: 16px;
          line-height: 21px;
        }

        &__price-container {
          flex-direction: column;
          align-items: flex-start;
          margin-top: 7px;
          gap: 7px;
        }

        &__price {
          font-size: 16px;
          line-height: 24px;

          &--old {
            font-size: 14px;
          }
        }
      }
    }

    &__grid {
      grid-template-columns: 242px 1fr;
      gap: 24px;
    }

    &__img-block {
      display: block;
      width: 242px;
      height: auto;
    }

    &__img-container {
      width: 242px;
      height: auto;
    }

    &__name {
      font-size: 20px;
      line-height: 26px;
      max-width: 326px;
    }

    &__price-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__price {
      font-size: 20px;
      line-height: 44px;

      &--old {
        font-size: 14px;
        line-height: 16px;
      }

      &--discounted {
        font-size: 20px;
        line-height: 44px;
      }
    }

    &__body {
      align-items: center;
      flex-direction: row;
      margin-top: 10px;
      margin-left: 0;
    }

    &__add-to-wishlist {
      display: flex;
    }

    &__info-block {
      padding: 0px 0 0px 0px;
    }
  }
}
</style>
