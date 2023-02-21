<template>
  <div class="choose-size">
    <p class="choose-size__heading">
      {{ $t('Product.sizes.calculate_your_size') }}
    </p>
    <div class="choose-size__sliders">
      <p class="choose-size__slider-label">
        {{ $t('Product.sizes.chest_size') }}
      </p>
      <div class="choose-size__slider">
        <Slider
          v-model="chestSize"
          :min="82"
          :max="102"
          :step="4"
          :tooltips="true"
          :show-tooltip="'always'"
          @input="handleSlider($event, 'chestSize')"
        />
      </div>
      <p class="choose-size__slider-label">
        {{ $t('Product.sizes.waist_size') }}
      </p>
      <div class="choose-size__slider">
        <Slider
          v-model="waistSize"
          :min="62"
          :max="82"
          :step="4"
          :tooltips="true"
          :show-tooltip="'always'"
          @input="handleSlider($event, 'waistSize')"
        />
      </div>
      <p class="choose-size__slider-label">
        {{ $t('Product.sizes.tower_basin') }}
      </p>
      <div class="choose-size__slider">
        <Slider
          v-model="towerBazin"
          :min="90"
          :max="110"
          :step="4"
          :tooltips="true"
          :show-tooltip="'always'"
          @input="handleSlider($event, 'towerBasin')"
        />
      </div>
    </div>
    <AppButton
      v-if="result"
      btn-style="light"
      size="small"
      :title="`${$t('Product.sizes.size')} : ${result?.[0]}`"
    />

    <table class="choose-size__table">
      <thead>
        <th>{{ $t('Product.sizes.size') }} SML</th>
        <th>{{ $t('Product.sizes.size') }}</th>
        <th>{{ $t('Product.sizes.chest_size') }}</th>
        <th>{{ $t('Product.sizes.waist_size') }}</th>
        <th>{{ $t('Product.sizes.tower_basin') }}</th>
      </thead>
      <tr v-for="(row, i) in sizesGrid" :key="i">
        <th v-for="(item, x) in row" :key="x">{{ item }}</th>
      </tr>
    </table>

    <p class="choose-size__heading">
      {{ $t('Product.sizes.how_to_take_measurements') }}
    </p>
    <picture class="choose-size__img-container">
      <source
        media="(min-width: 991px)"
        srcset="~/assets/images/size_helper_desktop.png"
      />
      <source
        media="(max-width: 990px)"
        srcset="~/assets/images/size_helper_mobile.png"
      />
      <img class="choose-size__img" alt="Banner" />
    </picture>

    <div class="choose-size__content-container">
      <div class="choose-size__content">
        <p class="choose-size__content-heading">
          {{ $t('Product.sizes.chest_size') }}
        </p>
        <p class="choose-size__content-text">
          {{ $t('Product.sizes.chest_size_description') }}
        </p>
      </div>

      <div class="choose-size__content choose-size__content--pink">
        <p class="choose-size__content-heading">
          {{ $t('Product.sizes.waist_size') }}
        </p>
        <p class="choose-size__content-text">
          {{ $t('Product.sizes.waist_size_description') }}
        </p>
      </div>
      <div class="choose-size__content choose-size__content--pink">
        <p class="choose-size__content-heading">
          {{ $t('Product.sizes.tower_basin') }}
        </p>
        <p class="choose-size__content-text">
          {{ $t('Product.sizes.tower_basin_description') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/default
import Slider from '@vueform/slider'
import AppButton from '~/components/common/AppButton.vue'

const sizesGrid = [
  ['XS', 34, 82, 62, 90],
  ['S', 36, 86, 66, 94],
  ['M', 38, 90, 70, 98],
  ['L', 40, 94, 74, 102],
  ['XL', 42, 98, 78, 106],
  ['XXL', 44, 102, 82, 110],
]

const chestSize = ref(94)
const waistSize = ref(74)
const towerBazin = ref(102)
const result = ref<any>(sizesGrid[2])

const handleSlider = (value, name) => {
  switch (name) {
    case 'chestSize':
      sizesGrid.forEach((row) => {
        if (row[2] === value) {
          result.value = row
        }
      })
      waistSize.value = result.value[3]
      towerBazin.value = result.value[4]
      break
    case 'waistSize':
      sizesGrid.forEach((row) => {
        if (row[3] === value) {
          result.value = row
        }
      })
      chestSize.value = result.value[2]
      towerBazin.value = result.value[4]
      break
    case 'towerBasin':
      sizesGrid.forEach((row) => {
        if (row[4] === value) {
          result.value = row
        }
      })
      waistSize.value = result.value[3]
      chestSize.value = result.value[2]
      break
  }
}
</script>

<style lang="scss" scoped>
.choose-size {
  margin-top: 38px;
  padding-bottom: 100px;

  &__heading {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: $color-black;
    text-align: center;

    &:not(:first-child) {
      margin: 40px 0 32px 0;
    }
  }

  &__sliders {
    display: grid;
    grid-template-columns: 1fr 60%;
    align-items: center;
    gap: 30px;
    margin-top: 30px;
    column-gap: 10px;
    row-gap: 28px;
    max-width: 500px;
    margin: 30px auto 0 auto;
  }

  &__slider-label {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $color-pink;
  }

  &__img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px auto;
    width: 100%;
  }

  &__content {
    background-color: rgba(241, 123, 176, 0.04);
    padding: 16px 26px;

    &:not(:first-child) {
      margin-top: 11px;
    }

    &:nth-child(even) {
      background-color: rgba(241, 123, 176, 0.1);
    }
  }

  &__content-heading {
    font-family: $font-secondary;
    color: $color-pink;
    font-weight: 400;
    font-size: 25px;
    line-height: 30px;
  }

  &__content-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $color-dark-grey;
    margin-top: 8px;
  }

  &__table {
    display: none;
  }

  & :deep() {
    .app-button {
      max-width: 238px;
      margin: 43px auto 0 auto;

      &__title {
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}

@include media-lg {
  .choose-size {
    margin-top: 50px;
    padding-bottom: 0;

    &__sliders {
      display: none;
    }

    &__heading {
      text-align: left;
      font-weight: 400;
      font-size: 30px;
      line-height: 30px;

      &:not(:first-child) {
        margin-top: 57px;
      }
    }

    & :deep() {
      .app-button {
        display: none;
      }
    }

    &__img-container {
      max-height: 436px;
      width: 100%;
      height: auto;
    }

    &__content {
      padding: 32px 100px;

      &:not(:first-child) {
        margin-top: 7px;
      }
    }

    &__content-heading {
      font-weight: 400;
      font-size: 25px;
      line-height: 30px;
    }

    &__content-text {
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
    }

    &__table {
      border-collapse: collapse;
      width: 100%;
      display: table;
      margin-top: 32px;

      & td,
      & th {
        padding: 8px;
      }

      & tr:nth-child(odd) {
        background-color: $color-table-row-light;
      }

      & tr:nth-child(even) {
        background-color: $color-table-row-dark;
      }

      & th {
        padding-top: 20px;
        padding-bottom: 20px;
        font-weight: 400;
        font-size: 16px;
        height: 77px;
        line-height: 20px;

        &:first-child {
          padding-left: 25px;
        }

        &:last-child {
          padding-right: 11px;
        }
      }

      & thead th {
        background-color: $color-pink;
        color: $color-white;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        padding-top: 10px;
        padding-bottom: 13px;
        height: 60px;
      }
    }
  }
}

.choose-size {
  --slider-bg: #f0f0f0;
  --slider-connect-bg: #{$color-pink};
  --slider-connect-bg-disabled: #f0f0f0;
  --slider-height: 3px;
  --slider-vertical-height: 300px;
  --slider-radius: 9999px;

  --slider-handle-bg: #{$color-white};
  --slider-handle-border: 0;
  --slider-handle-width: 10px;
  --slider-handle-height: 10px;
  --slider-handle-radius: 9999px;
  --slider-handle-shadow: 0px 0px 0px 1px #{$color-pink};
  --slider-handle-shadow-active: 0px 0px 0px 1px #{$color-pink};
  --slider-handle-ring-width: 0px;
  --slider-handle-ring-color: #{$color-pink};

  --slider-tooltip-font-size: 16px;
  --slider-tooltip-line-height: 20px;
  --slider-tooltip-font-weight: 400;
  --slider-tooltip-min-width: 20px;
  --slider-tooltip-bg: transparent;
  --slider-tooltip-bg-disabled: #9ca3af;
  --slider-tooltip-color: #{$color-pink};
  --slider-tooltip-radius: 0px;
  --slider-tooltip-py: 2px;
  --slider-tooltip-px: 0px;
  --slider-tooltip-arrow-size: 0px;
  --slider-tooltip-distance: 0px;
}
</style>
