<template>
  <AppModalWrapper
    class="cart-modal"
    :is-open="isOpen && isMobile"
    :is-close-on-click-outside="true"
    :is-show-header="true"
    @close="closeModal"
    @back="closeModal"
  >
    <template #header>
      <div class="cart-modal__header">
        <p class="cart-modal__title">{{ $t('Common.edit') }}</p>
      </div>
    </template>
    <MobileModalProductBlock
      :product="formattedProduct"
      :current-size="currentSize"
      @onButtonClick="handleClick"
      @changeSize="changeSize"
    >
      <template #header-element>
        <AppSelect
          v-model="internalQuantity"
          class="cart-modal__quantity"
          :options="quantityOptions"
        />
      </template>
    </MobileModalProductBlock>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import MobileModalProductBlock from '~/components/common/MobileModalProductBlock.vue'
import AppSelect from '~/components/common/AppSelect.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import {
  ICartItem,
  ICartItemColorGroup,
  ICartItemVariant,
} from '~~/types/cart.interface'
import { ICommonProduct, IProductSize } from '~~/types/product.interface'
import { IOption } from '~~/types/select.interface'

interface IProps {
  product: ICartItem
}

const layoutStore = useLayoutStore()

const props = withDefaults(defineProps<IProps>(), {
  product: null,
})
const emit = defineEmits(['changeQuantity'])

const medias = computed(() => {
  return props?.product?.variant?.product?.pictures || []
})

const originalPrice = computed(() => {
  const originalPrice = props?.product?.variant?.originalPrice
  const price = props?.product?.variant?.price

  if (originalPrice === price) return 0
  return transformPriceFromSylius(originalPrice)
})

const price = computed(() => {
  return transformPriceFromSylius(props?.product?.variant?.price)
})

const percentage = computed(() => {
  return props.product?.percentage || 0
})

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

const internalQuantity = computed<IOption>({
  get() {
    return {
      name: props.product?.quantity?.toString() || '',
      value: props.product?.quantity || 0,
    }
  },
  set(quantity: IOption) {
    emit('changeQuantity', { id: props.product?.id, quantity: quantity.value })
  },
})

const currentSize = computed<IProductSize>(() => {
  return {
    stock: props.product?.variant?.inventorySourceStocksOnHand,
    size: props?.product?.variant?.translation?.name,
    ean: props.product?.variant?.code,
    price: null,
    price_discounted: null,
  }
})

const formattedProduct = computed<ICommonProduct>(() => {
  let sizes = props.product?.variant?.product?.variants
  let colors = props?.product?.variant?.productColorGroup

  sizes = sizes.filter((size: ICartItemVariant) => typeof size !== 'string')
  colors = colors.filter(
    (color: ICartItemColorGroup) => typeof color !== 'string'
  )

  return {
    name: props.product?.productName,
    medias: medias.value,
    percentage: percentage.value,
    price: price.value,
    originalPrice: originalPrice.value,
    quantity: props.product?.quantity,
    id: props.product?.id,
    slug: props.product?.variant?.product?.slug,
    sizes: sizes?.map((variant: ICartItemVariant) => {
      return {
        stock: variant?.inventorySourceStocksOnHand,
        ean: variant?.code,
        size: variant?.translation?.name,
        price: null,
        price_discounted: null,
      }
    }),
    colors: colors.map((color: ICartItemColorGroup) => {
      return {
        type: color.colorType,
        value: color?.colorValue,
        slug: color?.slug,
        image: color?.colorValue,
        color_name: color?.name,
      }
    }),
  }
})

const isOpen = computed(() => {
  return layoutStore.modals[EModals.CART_EDIT_PRODUCT]
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const changeSize = () => {}

const handleClick = () => {
  closeModal()
}

const closeModal = () => {
  layoutStore.closeModal(EModals.CART_EDIT_PRODUCT)
}
</script>

<style lang="scss" scoped>
.cart-modal {
  z-index: 2000;

  & :deep() {
    .app-modal-wrapper {
      &__body {
        margin-top: 0;
        padding: 0;
      }

      &__header {
        padding-top: 3px;
      }

      &__back {
        top: 14px;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    width: 100%;
    margin-bottom: 5px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
  }
}
</style>
