<template>
  <div class="delivery-progress">
    <p v-if="text" class="delivery-progress__title">
      {{ text }}
    </p>
    <div class="delivery-progress__container">
      <div class="delivery-progress__progress-container">
        <div
          class="delivery-progress__progress"
          :class="{ 'delivery-progress__progress--pink': progress === 100 }"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      <div v-if="progress < 100" class="delivery-progress__price">
        {{ $n(freeDeliveryPrice, 'EUR') }}
      </div>
      <div v-else class="delivery-progress__free">{{ $t('Common.free') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  price: number
  text?: string
}

const props = withDefaults(defineProps<IProps>(), {
  price: 0,
  text: '',
})

const config = useRuntimeConfig()

const freeDeliveryPrice = +config.public.freeDeliveryPrice

const progress = computed(() => {
  let value = (+props.price / freeDeliveryPrice) * 100

  if (value > 100) value = 100

  return value
})
</script>

<style lang="scss" scoped>
.delivery-progress {
  &__title {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 16px;
    line-height: 18px;
  }

  &__container {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  &__progress-container {
    position: relative;
    height: 5px;
    width: 100%;
    border-radius: 10px;
    background-color: $color-light-grey;
  }

  &__progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 5px;
    z-index: 100;
    background-color: $color-black;

    &--pink {
      background-color: $color-pink;
    }
  }

  &__price {
    font-weight: 600;
    font-size: 13px;
    line-height: 30px;
  }

  &__free {
    font-weight: 600;
    font-size: 13px;
    line-height: 30px;
    color: $color-pink;
    text-transform: uppercase;
  }
}

@include media-lg {
  .delivery-progress {
    &__container {
      gap: 14px;
    }

    &__progress-container {
      height: 4px;
    }

    &__progress {
      height: 4px;

      &--pink {
        background-color: $color-pink;
      }
    }

    &__price {
      font-size: 16px;
    }

    &__free {
      font-size: 16px;
      line-height: 44px;
    }
  }
}
</style>
