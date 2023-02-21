<template>
  <div class="conversion">
    <p class="conversion__heading">
      {{ $t('Product.sizes.sizes_by_country') }}
    </p>
    <p class="conversion__description">
      {{ $t('Product.sizes.sizes_by_country_description') }}
    </p>

    <div class="conversion__select-container">
      <AppSelect v-model="selectedOption" :options="options" title="EU" />
    </div>

    <template v-for="(result, i) in results">
      <div
        v-if="i !== 'EU'"
        :key="i"
        class="conversion__result"
        :class="{ 'conversion__result--pink': i === 'UK' }"
      >
        {{ i }}:
        {{ result }}
      </div>
    </template>

    <table class="conversion__table">
      <thead>
        <th>EU</th>
        <th>UK</th>
        <th>FR</th>
        <th>IT</th>
      </thead>
      <tr v-for="(row, i) in sizesGrid" :key="i">
        <th v-for="(item, x) in row" :key="x">{{ item }}</th>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
import AppSelect from '~/components/common/AppSelect.vue'

const sizesGrid = [
  ['XS', 34, 82, 62],
  ['S', 36, 86, 66],
  ['M', 38, 90, 70],
  ['L', 40, 94, 74],
  ['XL', 42, 98, 78],
  ['XXL', 44, 102, 82],
]

const sizesMap = {
  0: {
    name: 'EU',
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  1: {
    name: 'UK',
    values: [34, 36, 38, 40, 42, 44],
  },
  2: {
    name: 'FR',
    values: [82, 86, 90, 94, 98, 102],
  },
  3: {
    name: 'IT',
    values: [62, 66, 70, 74, 78, 82],
  },
}

const options = [
  {
    value: 'xs',
    name: 'XS',
  },
  {
    value: 's',
    name: 'S',
  },
  {
    value: 'm',
    name: 'M',
  },
  {
    value: 'l',
    name: 'L',
  },
  {
    value: 'xl',
    name: 'XL',
  },
  {
    value: 'xxl',
    name: 'XXL',
  },
]

const selectedOption = ref(null)
const results = reactive({})

watch(
  () => selectedOption.value,
  (value) => {
    const selectedSize = sizesGrid.find((size) => size.includes(value.name))
    selectedSize.forEach((size, i) => {
      results[sizesMap[i].name] = size
    })
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.conversion {
  margin-top: 38px;
  padding-bottom: 100px;

  &__heading {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: $color-black;
    text-align: center;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $color-dark-grey;
    text-align: center;
    margin-top: 30px;
  }

  &__select-container {
    margin: 30px auto;
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__result {
    margin: 11px auto;
    background-color: $color-pink-light;
    color: $color-white;
    max-width: 167px;
    border-radius: 30px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    height: 44px;

    &--pink {
      color: $color-pink;
    }
  }

  &__table {
    display: none;
  }
}

@include media-lg {
  .conversion {
    margin: 42px 64px;
    padding-bottom: 0;

    &__heading {
      text-align: left;
      font-weight: 400;
      font-size: 30px;
      line-height: 30px;
    }

    &__description {
      display: none;
    }

    &__select-container {
      display: none;
    }

    &__result {
      display: none;
    }

    &__table {
      border-collapse: collapse;
      width: 100%;
      display: table;
      margin-top: 26px;

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
        line-height: 20px;
        height: 76px;
      }

      & thead {
        background-color: $color-pink;
      }

      & thead th {
        background-color: $color-pink;
        color: $color-white;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        padding-top: 13px;
        padding-bottom: 13px;
        height: 60px;
      }
    }
  }
}
</style>
