<template>
  <div class="sizes-block">
    <div class="sizes-block__sizes-container">
      <p class="sizes-block__label">{{ $t('Common.size') }} :</p>
      <button class="sizes-block__size-modal-link" @click="openSizeHelper">
        {{ $t('Product.sizes.help_choose_size') }}
      </button>
    </div>

    <div class="sizes-block__size-list">
      <ProductSizeButton
        v-for="size in sizes"
        :key="size?.ean"
        :size="size"
        :is-active="size?.ean === currentSize?.ean"
        @click="selectSize(size)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductSizeButton from './ProductSizeButton.vue'
import { IProductSize } from '~~/types/product.interface'

interface IProps {
  sizes: IProductSize[]
  currentSize: IProductSize
}

defineProps<IProps>()
const emit = defineEmits(['select-size', 'open-size-helper'])

const selectSize = (size: IProductSize) => {
  emit('select-size', size)
}

const openSizeHelper = () => {
  emit('open-size-helper')
}
</script>

<style lang="scss" scoped>
.sizes-block {
  &__sizes-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__size-modal-link {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    border-bottom: 1px solid $color-black;
    margin-left: 20px;
  }

  &__size-list {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 14px;
    margin-top: 10px;
  }

  &__label {
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
  }
}

@include media-lg {
  .sizes-block {
    width: max-content;

    &__size-list {
      margin-top: 10px;
      gap: 16px;
      margin-bottom: 10px;
    }

    &__size-modal-link {
      font-size: 12px;
      line-height: 14px;
    }

    &__label {
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>
