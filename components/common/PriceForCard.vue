<template>
  <div class="app-price">
    <div
      v-if="discountedPrice"
      class="app-price__price app-price__price--discounted"
    >
      {{ $n(discountedPrice, 'EUR') }}
    </div>
    <div
      class="app-price__price"
      :class="{ 'app-price__price--old': discountedPrice }"
    >
      {{ $n(originalPrice || 0, 'EUR') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  originalPrice: number
  discountedPrice?: number
}

withDefaults(defineProps<IProps>(), {
  originalPrice: 0,
  discountedPrice: 0,
})
</script>

<style lang="scss" scoped>
.app-price {
  margin-top: 5px;
  display: flex;
  align-items: center;

  &__price {
    text-align: right;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    color: $color-white;

    &--discounted {
      color: $color-white;
      padding: 3px 1px 1px 3px;
      margin-right: 8px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 102%;
        height: 102%;
        top: 0;
        left: 0;
        padding: 3px 1px 1px 3px;
        z-index: -1;
      }
    }

    &--old {
      color: $color-white;
      text-decoration: line-through;
      font-size: 11px;
      font-weight: 600;
    }
  }
}

@include media-lg {
  .app-price {
    &__price {
      font-size: 18px;
      line-height: 21px;

      &--old {
        font-size: 14px;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .app-price {
    &__price--discounted,
    &__price--old {
      color: black;
    }
    &__price {
      color: black;
      font-size: 10px;
      font-weight: 600;
      padding: 0;
    }
  }
}
</style>
