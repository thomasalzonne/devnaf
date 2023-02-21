<template>
  <div class="price-block">
    <div v-if="discountPercent" class="price-block__percent">
      -{{ discountPercent }} %
    </div>
    <p
      v-if="discountedPrice"
      class="price-block__price price-block__price--discounted"
    >
      {{ $n(+discountedPrice || 0, 'EUR') }}
    </p>
    <p
      v-if="price"
      class="price-block__price"
      :class="{ 'price-block__price--old': discountedPrice }"
    >
      {{ $n(+price || 0, 'EUR') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  price: number
  discountedPrice: number
  discountPercent: number
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.price-block {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 29px;

  &__percent {
    background-color: $color-black;
    border-radius: 5px;
    color: $color-white;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    padding: 4px 7px 4px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__price {
    font-weight: 600;
    font-size: 16px;
    line-height: 44px;

    &--old {
      color: $color-dark-grey;
      text-decoration: line-through;
      font-size: 12px;
      line-height: 14px;
    }

    &--discounted {
      width: max-content;
    }
  }
}

@include media-lg {
  .price-block {
    gap: 10px;
    margin-bottom: 0px;

    &__percent {
      border-radius: 10px;
      font-size: 14px;
      line-height: 16px;
      padding: 5px 8px 5px 7px;
    }

    &__price {
      font-size: 20px;

      &--old {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}
</style>
