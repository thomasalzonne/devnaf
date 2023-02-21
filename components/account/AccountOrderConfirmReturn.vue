<template>
  <AppModalWrapper :is-open="true" @close="closeModal">
    <div class="confirm-return__body">
      <div class="confirm-return__header">
        <SvgIcon class="confirm-return__icon" name="check_circle" />
        <p class="confirm-return__heading">
          {{ $t('Order.return_validated') }}
        </p>
      </div>
      <p class="confirm-return__message">
        {{ $t('Account.order_confirmation') }}
      </p>

      <AppButton
        class="confirm-return__button"
        :title="$t('Common.back')"
        @click="closeModal"
      />
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import AppButton from '~/components/common/AppButton.vue'

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.confirm-return {
  &__body {
    padding: 32px 0;
  }

  &__icon {
    width: 34px;
    height: 34px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 23px;
  }

  &__heading {
    font-weight: 480;
    font-size: 24px;
    line-height: 44px;
    font-family: $font-secondary;
  }

  &__message {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $color-dark-grey;
    margin-top: 7px;
  }

  &__button {
    margin-top: 45px;
  }
}
</style>
