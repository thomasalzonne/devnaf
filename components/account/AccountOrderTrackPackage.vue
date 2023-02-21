<template>
  <AppContentCard :as-accordion="isMobile">
    <template #header>
      <div class="track-order__header">
        <p class="track-order__heading">{{ $t('Order.track_package') }}</p>
        <a href="#" class="track-order__link" target="_blank">{{
          $t('Order.track_link')
        }}</a>
      </div>
    </template>
    <template #body>
      <div class="track-order__body">
        <div class="track-order__row">
          <div class="track-order__circle track-order__circle--active"></div>
          <div class="track-order__title">
            {{ $t('Order.order_validated_at', { date: '22/04/2022' }) }}
          </div>
        </div>
        <div class="track-order__row">
          <div class="track-order__circle track-order__circle--active"></div>
          <div class="track-order__title">
            {{ $t('Order.order_shipped_at', { date: '24/04/2022' }) }}
          </div>
        </div>
        <div class="track-order__row">
          <div class="track-order__circle"></div>
          <div class="track-order__title">{{ $t('Order.order_on_way') }}</div>
        </div>
        <div class="track-order__row">
          <div class="track-order__circle"></div>
          <div class="track-order__title">
            {{ $t('Order.package_delivered') }}
          </div>
        </div>
      </div>
    </template>
  </AppContentCard>
</template>

<script lang="ts" setup>
import AppContentCard from '~/components/common/AppContentCard.vue'

interface IProps {
  isMobile: boolean
}

withDefaults(defineProps<IProps>(), {
  isMobile: false,
})
</script>

<style lang="scss" scoped>
.track-order {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 15px 0 15px;
  }

  &__heading {
    font-weight: 480;
    font-size: 16px;
    line-height: 44px;
    font-family: $font-secondary;
  }

  &__link {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $color-black-opacity;
    text-decoration: underline;
    display: none;
  }

  &__body {
    padding: 21px;
    display: flex;
    flex-direction: column;
    gap: 29px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 21px;

    &:not(:last-child) {
      .track-order__circle {
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 100%;
          height: 48px;
          width: 1px;
          background-color: $color-pink;
        }
      }
    }
  }

  &__circle {
    width: 8px;
    height: 8px;
    background-color: $color-pink;
    border-radius: 50%;
    position: relative;

    &--active {
      box-shadow: 0px 0px 0px 7px $color-red-light;
    }
  }

  &__title {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: $color-dark-grey;
  }
}

@include media-lg {
  .track-order {
    &__header {
      padding: 9px 22px 5px 28px;
    }

    &__heading {
      font-size: 20px;
      line-height: 44px;
    }

    &__link {
      display: block;
    }

    &__body {
      padding: 35px 41px;
      gap: 51px;
    }

    &__row {
      &:not(:last-child) {
        .track-order__circle {
          &::after {
            height: 70px;
          }
        }
      }
    }

    &__title {
      font-size: 14px;
      line-height: 22px;
    }
  }
}
</style>
