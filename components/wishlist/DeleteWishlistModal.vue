<template>
  <AppModalWrapper
    class="delete-modal"
    :is-open="isOpen"
    :is-close-on-click-outside="true"
    @close="closeModal"
  >
    <div class="delete-modal__header">
      <p class="delete-modal__heading">
        {{ $t('Account.confirm_delete_favourite_item') }}
      </p>
    </div>

    <div class="delete-modal__body">
      <div class="delete-modal__product">
        <div class="delete-modal__product-img-container">
          <img class="delete-modal__product-img" :src="productImage" alt="" />
        </div>
        <div class="delete-modal__product-body">
          <p class="delete-modal__product-name">{{ productName }}</p>
          <div class="delete-modal__product-price-container">
            <p
              class="delete-modal__product-price"
              :class="{
                'delete-modal__product-price--discounted': originalPrice,
              }"
            >
              {{ $n(price, 'EUR') }}
            </p>
            <p
              v-if="originalPrice"
              class="delete-modal__product-price delete-modal__product-price--old"
            >
              {{ $n(originalPrice, 'EUR') }}
            </p>
          </div>
        </div>
      </div>

      <div class="delete-modal__buttons">
        <AppButton :title="$t('Common.yes')" @click="confirmDelete" />
        <AppButton
          :title="$t('Common.no')"
          btn-style="outline"
          @click="cancelDelete"
        />
      </div>
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import AppButton from '~/components/common/AppButton.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import { IWishlistProductVariant } from '~~/types/wishlist.interface'

interface IProps {
  item: IWishlistProductVariant
}
const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps<IProps>()

const route = useRoute()
const layoutStore = useLayoutStore()

const isOpen = computed(() => {
  return layoutStore.modals[EModals.WISHLIST_DELETE]
})

watch(
  () => route.query,
  () => {
    if (isOpen.value && route.query.authAction) {
      closeModal()
    }
  }
)

const productImage = computed(() => {
  return props.item?.product?.pictures?.[0]?.url || ''
})

const productName = computed(() => {
  return props.item?.product?.name || ''
})

const originalPrice = computed(() => {
  const originalPrice = props?.item?.originalPrice
  const price = props?.item?.price

  if (originalPrice === price) return 0
  return transformPriceFromSylius(originalPrice)
})

const price = computed(() => {
  return transformPriceFromSylius(props?.item?.price)
})

const confirmDelete = () => {
  emit('confirm')
}

const cancelDelete = () => {
  emit('cancel')
}

const closeModal = () => {
  layoutStore.closeModal(EModals.WISHLIST_DELETE)
}
</script>

<style lang="scss" scoped>
.delete-modal {
  &__header {
    padding: 0 0 33px 0;
    max-width: 430px;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    max-width: 277px;
  }

  &__body {
    padding: 0px;
    max-width: 430px;
  }

  & :deep(.app-modal-wrapper__body) {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 0px;
    display: block;
    margin-top: $header-height-mobile;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;
  }

  &__product {
    display: flex;
    gap: 13px;
  }

  &__product-img-container {
    width: 130px;
    height: auto;
    flex-shrink: 0;
  }

  &__product-img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  &__product-name {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    text-transform: uppercase;
  }

  &__product-price-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__product-price {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    &--old {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: $color-dark-grey;
      text-decoration: line-through;
    }

    &--discounted {
      font-weight: 600;
      font-size: 16px;
      line-height: 44px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 33px;
  }
}

@include media-sm {
  .delete-modal {
    &__header {
      margin: 0 auto;
    }

    &__body {
      margin: 0 auto;
    }
  }
}

@include media-lg {
  .delete-modal {
    &__header {
      padding: 22px 45px 44px 45px;
      margin: 0;
    }

    &__heading {
      font-size: 24px;
      line-height: 31px;
      text-align: left;
    }

    &__body {
      padding: 0 45px;
      margin: 0;
    }

    & :deep(.app-modal-wrapper__body) {
      display: block;
      padding-left: 29px;
      padding-right: 26px;
      padding-top: 23px;
      margin-top: 0;
    }

    &__buttons {
      margin-top: 35px;
      gap: 18px;
    }
  }
}
</style>
