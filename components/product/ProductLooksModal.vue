<template>
  <Transition name="slide">
    <div v-if="isOpen" class="looks-modal" @click="closeModal">
      <div class="looks-modal__wrapper" @click.stop="">
        <button class="looks-modal__close" @click="closeModal">
          <SvgIcon class="looks-modal__close-icon" name="close" />
        </button>
        <div class="looks-modal__body">
          <div class="looks-modal__looks">
            <p class="looks-modal__title">{{ $t('Product.buy_look') }}</p>
            <div class="looks-modal__slider">
              <ProductLooksSlider :product="product" @onSelect="handleSelect" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { IProduct } from '~~/types/product.interface'

interface IProps {
  product: IProduct
  isOpen: boolean
}

defineProps<IProps>()

const emit = defineEmits(['close', 'openSizeHelper'])

const closeModal = () => {
  emit('close')
}

const handleSelect = () => {}
</script>

<style lang="scss" scoped>
.looks-modal {
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
  }

  &__looks {
    padding: 22px 0px 0px 0px;
  }

  &__title {
    font-weight: 460;
    font-size: 14px;
    line-height: 18px;
    font-family: $font-secondary;
    text-transform: uppercase;
    margin-bottom: 8px;
    padding: 0 20px;
  }

  &__close {
    display: none;
  }
}

@include media-lg {
  .looks-modal {
    height: 100vh;
    align-items: center;
    top: 0;
    z-index: 2000;

    &__wrapper {
      position: relative;
      width: 100%;
      max-width: 86%;
      border-radius: 10px;
    }

    &__looks {
      padding: 67px 0px 36px 0px;
    }

    &__title {
      font-weight: 460;
      font-size: 36px;
      line-height: 44px;
      margin-bottom: 17px;
      padding: 0 44px;
      text-align: center;
      text-transform: capitalize;
    }

    &__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      position: absolute;
      top: 17px;
      right: 17px;
    }

    &__close-icon {
      width: 22px;
      height: 22px;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;

  & .looks-modal__wrapper {
    transition: all 0.3s ease-in-out;
  }
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  & .looks-modal__wrapper {
    transform: translateY(100%);
  }
}
</style>
