<template>
  <div class="page-favourites" :class="{ 'page-favourites--empty': isEmpty }">
    <AccountMobilePageHeader
      icon="heart"
      :title="$t('Account.my_favourites')"
      @back="goBack"
    />
    <p class="account-page-header page-favourites__header">
      {{ $t('Account.my_favourites_title') }}
    </p>
    <p v-if="!isEmpty" class="page-favourites__count">
      {{ wishlistProducts?.length }} {{ $t('Common.products') }}
    </p>
    <div class="page-favourites__content">
      <EmptyAccountContent
        v-if="isEmpty"
        :title="$t('Wishlist.empty_heading')"
        :text="$t('Account.favourites_empty')"
        :button-title="$t('Wishlist.empty_button')"
      />
      <div v-else class="page-favourites__grid">
        <AccountFavouriteItem
          v-for="product in wishlistProducts"
          :key="product?.product?.id"
          :product="product"
          :cart-items="cartItems"
          :adding-size="addingSize"
          @removeItem="openDeleteModal"
          @addToCart="handleAddToCart"
          @openMobileModal="openMobileModal"
        />
      </div>
    </div>
    <WishlistModalProduct
      :product="selectedProductForViewing"
      :wishlist-products="wishlistProducts"
      @onClose="clearSelectedProduct"
    />

    <DeleteWishlistModal
      :item="itemForDelete"
      @confirm="deleteItem"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import EmptyAccountContent from '~/components/account/EmptyAccountContent.vue'
import AccountFavouriteItem from '~/components/account/AccountFavouriteItem.vue'
import { EModals } from '~~/constants/modals'
import { useCartStore } from '~~/store/cart'
import { useLayoutStore } from '~~/store/layout'

import { useWishlistStore } from '~~/store/wishlist'
import { ICartItem } from '~~/types/cart.interface'
import { IProductSize } from '~~/types/product.interface'
import {
  IWishlistProductVariant,
  IWishlistProductWrapper,
} from '~~/types/wishlist.interface'

definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const router = useRouter()
const layoutStore = useLayoutStore()
const { toastProductAddedToCart } = useAppToast()

const addingSize = ref<IProductSize>(null)
const selectedProductForViewing = ref<IWishlistProductVariant>(null)
const itemForDelete = ref<IWishlistProductVariant>(null)

const wishlistProducts = computed<IWishlistProductWrapper[]>(() => {
  return wishlistStore.wishlist?.wishlistProducts || []
})

const isEmpty = computed(() => {
  return !wishlistProducts?.value?.length
})

const cartItems = computed<ICartItem[]>(() => {
  return (cartStore.cart?.items as ICartItem[]) || []
})

const openDeleteModal = (variant: IWishlistProductVariant) => {
  itemForDelete.value = variant

  layoutStore.openModal(EModals.WISHLIST_DELETE)
}

const closeDeleteModal = () => {
  itemForDelete.value = null

  layoutStore.closeModal(EModals.WISHLIST_DELETE)
}

const deleteItem = async () => {
  const slugForDelete = itemForDelete.value.product.slug

  await wishlistStore.removeItem(slugForDelete)

  closeDeleteModal()
}

const handleAddToCart = async ({ size, image }) => {
  addingSize.value = size
  await cartStore.handleAddToCart(size?.ean || '')

  toastProductAddedToCart({
    text: t('Notifications.added_to_cart'),
    image,
  })

  addingSize.value = null
}

const clearSelectedProduct = () => {
  selectedProductForViewing.value = null
}

const openMobileModal = (product: IWishlistProductVariant) => {
  layoutStore.openModal(EModals.WISHLIST_VIEW_PRODUCT)
  selectedProductForViewing.value = product
}

const goBack = () => {
  router.back()
}

const WishlistModalProduct = defineAsyncComponent(
  () => import('~/components/wishlist/WishlistModalProduct.vue')
)

const DeleteWishlistModal = defineAsyncComponent(
  () => import('~/components/wishlist/DeleteWishlistModal.vue')
)
</script>

<style lang="scss">
.page-favourites {
  &--empty {
    .page-favourites {
      &__content {
        padding: 0;
        padding-bottom: 28px;
        margin-top: 0;
      }
    }
  }

  &__header {
    display: none;
    font-weight: 480;
    font-size: 48px;
    line-height: 44px;
  }

  &__content {
    margin-top: 18px;
    padding: 0 20px;
  }

  &__count {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    margin-top: 9px;
    text-transform: lowercase;
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    column-gap: 15px;
    row-gap: 25px;
  }
}

@include media-sm {
  .page-favourites {
    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
}

@include media-md {
  .page-favourites {
    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
}

@include media-lg {
  .page-favourites {
    &--empty {
      .page-favourites {
        &__content {
          min-height: 100%;
          margin-top: 25px;
          max-width: 700px;
        }
      }
    }

    &__header {
      display: block;
    }

    &__content {
      margin-top: 13px;
      padding: 0;
    }

    &__count {
      font-size: 18px;
      line-height: 44px;
      margin-top: 3px;
      text-align: left;
    }

    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      column-gap: 17px;
      row-gap: 20px;
    }
  }
}
</style>
