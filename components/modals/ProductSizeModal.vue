<template>
  <div v-if="isOpen" class="modal">
    <div class="modal__container">
      <div class="modal__header">
        <div class="modal__title">{{ $t('Common.size') }}</div>
        <button class="modal__close-button" @click="closeModal">
          <SvgIcon class="modal__close-icon" name="plus" />
        </button>
      </div>
      <div class="modal__content">
        <div class="modal__list">
          <div v-for="size in sizes" :key="size.ean" class="modal__list-item">
            <button
              class="modal__size"
              :disabled="!size.stock"
              :class="{ 'modal__size--disabled': !size.stock }"
              @click="selectSize(size)"
            >
              {{ size.size }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProductSize } from '~~/types/product.interface'

interface IProps {
  isOpen: boolean
  sizes: IProductSize[]
}

withDefaults(defineProps<IProps>(), {
  isOpen: false,
  sizes: () => [],
})

const emit = defineEmits(['close', 'selectSize'])

const selectSize = (size: IProductSize) => {
  emit('selectSize', size)

  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: $color-black, $alpha: 0.7);
  z-index: 100;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__container {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: $color-white;
    height: 529px;
    border-radius: 30px 30px 0 0;
    padding: 22px 16px 20px 21px;
  }

  &__title {
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    margin-left: 10px;
  }

  &__close-icon {
    width: 22px;
    height: 22px;
    transform: rotate(-45deg);
    color: $color-black;
    margin-right: 12px;
  }

  &__content {
    margin-top: 10px;
  }

  &__list {
    overflow: auto;
    max-height: 358px;
    padding-right: 18px;
    margin-top: 22px;

    &::-webkit-scrollbar {
      width: 11px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 30px;
      background-color: $color-light-grey;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $color-black;
      border-radius: 30px;
    }
  }

  &__list-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 4px 9px 5px 11px;
    &:not(:last-child) {
      border-bottom: 1px solid $color-medium-grey;
    }
  }

  &__size {
    font-family: $font-secondary;
    color: $color-pink;
    font-weight: 400;
    font-size: 30px;
    line-height: 50px;
    text-transform: uppercase;
    width: 100%;
    text-align: left;

    &--disabled {
      color: $color-medium-grey;
    }
  }

  &__link {
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    text-align: right;
    text-decoration: underline;
  }

  &__text {
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    text-align: right;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 29px;
  }

  &__info {
    max-width: 143px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: $color-dark-grey;
  }
}
</style>
