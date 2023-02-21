<template>
  <div
    class="sizes-modal"
    :class="{ 'sizes-modal--full': selectedType && isMobileView }"
    @click="closeModal"
  >
    <div class="sizes-modal__body" @click.stop="">
      <div v-if="selectedType" class="sizes-modal__logo-container">
        <AppLogo class="sizes-modal__logo" />
      </div>

      <ButtonCloseModal class="sizes-modal__close-button" @click="closeModal" />

      <button class="sizes-modal__close" @click="closeModal">
        <SvgIcon class="sizes-modal__close-icon" name="close" />
      </button>
      <button
        v-if="selectedType"
        class="sizes-modal__back-button"
        @click="clearType"
      >
        <SvgIcon class="sizes-modal__back-button-icon" name="simply_arrow" />
      </button>

      <div class="sizes-modal__header">
        <p class="sizes-modal__heading">{{ $t('Product.sizes.size_guide') }}</p>
        <p v-if="selectedType" class="sizes-modal__subheading">
          {{
            selectedType === EModalType.CHOOSE_SIZE
              ? $t('Product.sizes.choose_your_size')
              : $t('Product.sizes.size_conversion')
          }}
        </p>
        <div class="sizes-modal__tabs">
          <button
            class="sizes-modal__tab"
            :class="{
              'sizes-modal__tab--active':
                selectedType === EModalType.SIZE_CONVERSION,
            }"
            @click="selectType(EModalType.SIZE_CONVERSION)"
          >
            {{ $t('Product.sizes.size_conversion') }}
          </button>
          <button
            class="sizes-modal__tab"
            :class="{
              'sizes-modal__tab--active':
                selectedType === EModalType.CHOOSE_SIZE,
            }"
            @click="selectType(EModalType.CHOOSE_SIZE)"
          >
            {{ $t('Product.sizes.choose_your_size') }}
          </button>
        </div>
      </div>
      <div class="sizes-modal__wrapper">
        <div class="sizes-modal__content">
          <div v-if="!selectedType" class="sizes-modal__select-type">
            <AppButton
              class="sizes-modal__button"
              btn-style="light"
              size="small"
              :title="$t('Product.sizes.choose_your_size')"
              @click="selectType(EModalType.CHOOSE_SIZE)"
            />
            <span class="sizes-modal__or"> {{ $t('Product.sizes.or') }} </span>

            <AppButton
              class="sizes-modal__button"
              :title="$t('Product.sizes.size_conversion')"
              @click="selectType(EModalType.SIZE_CONVERSION)"
            />
          </div>

          <SizeHelperChooseState
            v-if="selectedType === EModalType.CHOOSE_SIZE"
          />
          <SizeHelperConversionState
            v-if="selectedType === EModalType.SIZE_CONVERSION"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SizeHelperChooseState from './SizeHelperChooseState.vue'
import SizeHelperConversionState from './SizeHelperConversionState.vue'
import AppButton from '~/components/common/AppButton.vue'
import ButtonCloseModal from '~/components/common/ButtonCloseModal.vue'
import AppLogo from '~/components/common/AppLogo.vue'

import { useLayoutStore } from '~~/store/layout'

const emit = defineEmits(['close'])

const layoutStore = useLayoutStore()

enum EModalType {
  CHOOSE_SIZE = 'choose_size',
  SIZE_CONVERSION = 'size_conversion',
}

const selectedType = ref<EModalType>(null)

const isMobileView = computed(() => {
  return layoutStore.isMobile
})

const selectType = (type: EModalType) => {
  selectedType.value = type
}

const clearType = () => {
  selectedType.value = null
}

onMounted(() => {
  if (!isMobile()) {
    selectedType.value = EModalType.CHOOSE_SIZE
  } else {
    selectedType.value = null
  }
})

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.sizes-modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.7);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: $z-index-modal;

  &--full {
    padding: 0;

    .sizes-modal__body {
      height: 100%;
      top: 0;
    }

    .sizes-modal__wrapper {
      padding: 0px 20px 20px;
    }

    .sizes-modal__close-button {
      top: 80px;
    }

    .sizes-modal__back-button {
      top: 82px;
    }

    .sizes-modal__header {
      padding-top: 86px;
    }
  }

  &__header {
    padding-top: 76px;
  }

  &__logo-container {
    height: 56px;
    width: 100%;
    border-bottom: 2px solid $color-black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__tabs {
    display: none;
  }

  &__wrapper {
    position: relative;
    padding: 0px 40px 40px;
  }

  &__body {
    position: relative;
    background-color: $color-white;
    width: 100%;
    overflow: auto;
    top: -8%;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 30px;
    line-height: 30px;
    color: $color-black;
    text-align: center;
  }

  &__subheading {
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: $color-pink;
    text-align: center;
    margin-top: 0px;
  }

  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }

  &__close-button {
    position: absolute;
    right: 20px;
    top: 21px;
  }

  &__select-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-top: 19px;
  }

  &__or {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  &__back-button {
    position: absolute;
    left: 18px;
    top: 28px;
    width: 20px;
    height: 20px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__back-button-icon {
    width: 24px;
    height: 24px;
    color: $color-pink;
    transform: rotate(180deg);
  }

  &__close {
    display: none;
  }

  & :deep() {
    .app-button {
      &__title {
        text-transform: initial;
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}

@include media-lg {
  .sizes-modal {
    &__logo-container {
      display: none;
    }

    &__back-button {
      display: none;
    }

    &__header {
      padding: 50px 0 0;
    }

    &__heading {
      font-weight: 400;
      font-size: 40px;
      line-height: 40px;
    }

    &__subheading {
      display: none;
    }

    &__wrapper {
      width: 100%;
      padding: 0px 20px 40px 40px;
      overflow: auto;
      max-height: calc(100vh - 189px);

      &::-webkit-scrollbar {
        width: 13px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 30px;
        background-color: $color-white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $color-scrollbar-thumb;
        border-radius: 30px;
      }
    }

    &__body {
      position: relative;
      max-width: 921px;
      max-height: 100vh;
      padding-right: 10px;
      overflow: hidden;
      top: 0;
    }

    &__content {
      margin: 0 auto;
    }

    &__text {
      text-align: center;
      max-width: 493px;
      margin: 0 auto;
    }

    &__close-button {
      display: none;
    }

    &__close {
      position: absolute;
      top: 30px;
      right: 30px;
      color: $color-dark-grey;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__close-icon {
      width: 14px;
      height: 14px;
      color: $color-dark-grey;
    }

    &__tabs {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid rgba(241, 123, 176, 0.3);
      margin-top: 50px;
      margin: 50px 70px 0 70px;
    }

    &__tab {
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      color: $color-black;
      border-bottom: 3px solid transparent;
      padding-bottom: 15px;

      &--active {
        color: $color-pink;
        border-bottom-color: $color-pink;
      }
    }
  }
}
</style>
