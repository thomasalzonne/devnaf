<template>
  <div class="save-address">
    <p class="save-address__label">
      {{ $t('Checkout.save_address') }}
    </p>
    <template v-if="isSaved">
      <div class="save-address__success">
        <div class="save-address__icon-container">
          <SvgIcon class="save-address__icon" name="validation_check" />
        </div>
        <p class="save-address__success-text">
          {{ $t('Checkout.address_was_saved') }}
        </p>
      </div>
    </template>

    <template v-else>
      <div class="save-address__block">
        <input
          v-model="newAddressName"
          class="save-address__input"
          type="text"
          :placeholder="$t('Checkout.address_name')"
        />
        <div class="save-address__button">
          <AppButton
            :title="$t('Checkout.save_button')"
            :disabled="isDisabledButton || !newAddressName"
            btn-style="light"
            @click="onButtonClick"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'

interface IProps {
  isSaved: boolean
  isDisabledButton: boolean
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits(['saveAddress'])

const newAddressName = ref('')

const onButtonClick = () => {
  emit('saveAddress', newAddressName.value)
}

watch(
  () => props.isSaved,
  () => {
    newAddressName.value = ''
  }
)
</script>

<style lang="scss" scoped>
.save-address {
  border: 1px solid $color-pink;
  border-radius: 10px;
  padding: 4px 16px 32px 16px;
  width: 100%;

  &__block {
    border: 1px solid $color-medium-grey;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 0px 7px 18px;
    height: 46px;
    margin-top: 5px;
  }

  &__label {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    text-transform: uppercase;
  }

  &__input {
    border: none;
    outline: none;

    &:placeholder {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      color: $color-black-opacity;
    }
  }

  &__button {
    &:deep(.app-button) {
      min-height: 44px !important;
      height: 44px !important;
    }

    &:deep(.app-button__title) {
      font-weight: 460 !important;
      font-size: 14px !important;
      line-height: 18px !important;
    }
  }

  &__icon-container {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background-color: $color-green-light;
  }

  &__icon {
    color: $color-green;
    width: 21px;
    height: 10px;
  }

  &__success {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    margin-top: 18px;
  }

  &__success-text {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: $color-black-opacity;
  }
}

@include media-lg {
  .save-address {
    max-width: 341px;
    padding: 4px 16px 19px 16px;

    &__label {
      font-size: 16px;
      line-height: 44px;
    }

    &__block {
      height: 50px;
      padding: 7px 8px 7px 18px;
    }

    &__input {
      &:placeholder {
        font-size: 14px;
        line-height: 16px;
      }
    }

    &__button {
      &:deep(.app-button) {
        min-height: 37px !important;
        height: 37px !important;
      }
    }

    &__icon {
      width: 15px;
      height: 15px;
    }

    &__success {
      gap: 15px;
      justify-content: flex-start;
      margin-top: 0px;
    }

    &__success-text {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
