<template>
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="delete-address"
      :style="{
        top: !isMobile ? `${headerHeight}px` : null,
        height: !isMobile ? `calc(100vh - ${headerHeight}px)` : null,
      }"
      @click="cancelDelete"
    >
      <div class="delete-address__body" @click.stop="">
        <div class="delete-address__header">
          <button class="delete-address__back" @click="cancelDelete">
            <SvgIcon class="delete-addres__arrow" name="arrow_left" />
          </button>
          <button class="delete-address__close" @click="cancelDelete">
            <SvgIcon class="delete-address__cross" name="close" />
          </button>
        </div>
        <div class="delete-address__content">
          <p class="delete-address__greating">
            {{ $t('Account.hello', { n: userName }) }}
          </p>
          <div class="delete-address__message">
            {{ $t('Account.delete_address_message_part_1') }}
            <AppBadge
              v-if="addressName"
              class="delete-address__badge"
              :title="addressName"
            />
            {{ $t('Account.delete_address_message_part_2') }}
          </div>
          <div class="delete-address__buttons">
            <AppButton
              class="delete-address__button"
              :title="$t('Common.delete')"
              :pending="isPending"
              @click="confirmDelete"
            />
            <AppButton
              class="delete-address__button"
              btn-style="outline"
              :title="$t('Common.cancel')"
              @click="cancelDelete"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import AppBadge from '~/components/common/AppBadge.vue'
import { IAddressItem } from '~~/types/addresses.interface'
import { useLayoutStore } from '~~/store/layout'

interface IProps {
  address: IAddressItem
  userName: string
  isPending: boolean
  isOpen: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  address: null,
  userName: '',
  isPending: false,
  isOpen: false,
})

const layoutStore = useLayoutStore()

const addressName = computed(() => {
  return props.address?.company || ''
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const headerHeight = computed(() => {
  return layoutStore.headerHeight
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmDelete = () => {
  emit('confirm')
}

const cancelDelete = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.delete-address {
  position: fixed;
  top: 30px;
  left: 0;
  width: 100vw;
  height: calc(100% - $header-height-mobile);
  background-color: $color-white;
  z-index: $z-index-modal;

  &__body {
    background-color: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 20px;
    width: 100%;
  }

  &__content {
    width: 100%;
  }

  &__greating {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
    text-align: center;
  }

  &__message {
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    text-align: center;
    max-width: 250px;
    margin: 0 auto;
  }

  &__buttons {
    margin-top: 18px;
  }

  &__button {
    &:first-child {
      margin-bottom: 18px;
    }
  }

  &__header {
    display: none;
  }

  &__badge {
    border-radius: 30px;
    display: inline-flex;
    &:deep() {
      .badge {
        &__value {
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
  }
}

@include media-lg {
  .delete-address {
    height: calc(100% - $header-height-desktop);
    top: 0;
    background-color: rgba($color: $color-black, $alpha: 0.5);
    backdrop-filter: blur(10px);

    &__body {
      width: 485px;
      margin-left: auto;
      display: block;
      padding: 23px 37px 20px 51px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__content {
      margin-top: 30px;
      padding: 0 36px 0 23px;
    }

    &__greating {
      text-align: left;
      font-weight: 480;
      font-size: 24px;
      line-height: 44px;
    }

    &__message {
      text-align: left;
      margin-left: 0;
      max-width: 340px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: $color-dark-grey;
      margin-top: 4px;
    }

    &__buttons {
      margin-top: 36px;
    }

    &__close {
      width: 18px;
      height: 18px;
    }

    &__arrow {
      width: 18px;
      height: 18px;
    }

    &__cross {
      width: 12px;
      height: 12px;
    }

    &__back {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__badge {
      &:deep() {
        .badge {
          &__value {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
          }
        }
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;

  & .delete-address__body {
    transition: all 0.3s ease-in-out;
  }
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  & .delete-address__body {
    transform: translateX(100%);
  }
}
</style>
