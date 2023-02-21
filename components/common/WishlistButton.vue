<template>
  <button
    class="wishlist-button"
    :class="{ 'wishlist-button--active': isActive }"
    @click.stop.prevent="toggleButton"
  >
    <SvgIcon
      class="wishlist-button__icon"
      :name="isActive ? 'heart_product_filled' : 'heart_product_outline'"
    />
  </button>
</template>

<script lang="ts" setup>
interface IProps {
  isActive: boolean
}

const emit = defineEmits(['toggle'])

withDefaults(defineProps<IProps>(), {
  isActive: false,
})

const toggleButton = (): void => {
  emit('toggle')
}
</script>

<style lang="scss" scoped>
.wishlist-button {
  width: 20px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  margin-left: 1px;

  &:hover {
    .wishlist-button__icon {
      color: $color-pink;
    }
  }

  &--active {
    width: 32px;
    height: 32px;
    .wishlist-button__icon {
      width: 32px;
      height: 32px;
      color: $color-pink;
    }
  }

  &__icon {
    width: 20px;
    height: 18px;
  }
}
a.product-card__container:hover .wishlist-button__icon {
  width: 16.86px;
  height: 14.96px;
}
</style>
