<template>
  <div>
    <transition name="backdrop">
      <div
        v-if="isOpen"
        class="catalog-filters-backdrop"
        @click="closeModal"
      ></div>
    </transition>
    <transition name="modal">
      <div v-if="isOpen" id="modal_filters" class="catalog-filters-modal">
        <div class="catalog-filters-modal__body">
          <div class="catalog-filters-modal__header">
            <ButtonCloseModal @click="closeModal" />
          </div>
          <div class="accordion__product-type accordion-filter__accordion">
            <div class="accordion-filter__header">
              <div class="accordion-filter__title">Types de produit</div>
            </div>
            <div class="accordion-filter__content">
              <div class="accordion__content type-container" data-v-cf8dc797="">
                <button
                  class="catalog-filters-modal__product-type-button active"
                  data-v-cf8dc797=""
                >
                  Toutes les robes
                </button>

                <button
                  class="catalog-filters-modal__product-type-button"
                  data-v-cf8dc797=""
                >
                  Toutes les robes
                </button>

                <button
                  class="catalog-filters-modal__product-type-button"
                  data-v-cf8dc797=""
                >
                  Toutes les robes
                </button>

                <button
                  class="catalog-filters-modal__product-type-button"
                  data-v-cf8dc797=""
                >
                  Toutes les robes
                </button>
                <button
                  class="catalog-filters-modal__product-type-button"
                  data-v-cf8dc797=""
                >
                  Toutes les robes
                </button>
                <button
                  class="catalog-filters-modal__product-type-button"
                  data-v-cf8dc797=""
                >
                  Toutes les robes
                </button>
                <button
                  class="catalog-filters-modal__product-type-button"
                  data-v-cf8dc797=""
                >
                  Toutes les robes
                </button>
              </div>
            </div>
            <div class="accordion-filter__separator"></div>
          </div>
          <AccordionFilter
            v-if="Object.keys(listOfColors).length"
            class="accordion accordion--colors"
            :title="$t('Common.colors')"
            :collapsable="false"
          >
            <div class="accordion__content colors-container">
              <button
                v-for="(color, name) in listOfColors"
                :key="name"
                class="catalog-filters-modal__color-button"
                :class="
                  filters['color'].includes(name)
                    ? 'catalog-filters-modal__color-button--active'
                    : ''
                "
                @click="filterSearch('color', name)"
              >
                <div class="catalog-filters-modal__color">
                  <img
                    v-if="(color as any).pattern !== null"
                    class="catalog-filters-modal__color-img"
                    :src="`${imgUrl}${(color as any).pattern}`"
                    alt=""
                  />
                  <div
                    v-else
                    class="catalog-filters-modal__color-img"
                    :style="{ backgroundColor: (color as any)?.hexacode }"
                  ></div>
                </div>
                <p class="catalog-filters-modal__color-title">{{ name }}</p>
              </button>
            </div>
          </AccordionFilter>

          <AccordionFilter
            v-if="Object.keys(listOfSizes).length"
            class="accordion accordion--size"
            :title="$t('Common.sizes')"
            :collapsable="false"
          >
            <div class="accordion__content size-container">
              <button
                v-for="(_, name) in listOfSizes"
                :key="name"
                class="catalog-filters-modal__filter-button"
                :class="
                  filters['sizes'].includes(name)
                    ? 'catalog-filters-modal__filter-button--active'
                    : ''
                "
                @click="filterSearch('sizes', name)"
              >
                {{ name }}
              </button>
            </div>
          </AccordionFilter>

          <AccordionFilter
            class="accordion accordion--size"
            :title="$t('Common.price')"
            :collapsable="false"
          >
            <div class="accordion__content">
              <div class="catalog-filters-modal__sortby">
                <div class="radio-button" data-v-8a5c1906="" data-v-83b7e284="">
                  <div class="radio-button__icon" data-v-83b7e284="">
                    <div class="radio-button__circle" data-v-83b7e284=""></div>
                  </div>
                  <div class="radio-button__content" data-v-83b7e284="">
                    <!--[-->Tout les prix<!--]-->
                  </div>
                </div>
                <div
                  class="radio-button rangeslider"
                  data-v-8a5c1906=""
                  data-v-83b7e284=""
                >
                  <div class="radio-button__icon" data-v-83b7e284="">
                    <div class="radio-button__circle" data-v-83b7e284=""></div>
                  </div>
                  <div
                    class="radio-button__content rangeslider-container"
                    data-v-83b7e284=""
                  >
                    <div class="radio-button__content" data-v-83b7e284="">
                      <!--[-->Entre {{ initPrices.min }}€ et
                      {{ initPrices.max }}€<!--]-->
                    </div>
                    <RangeSlider
                      v-model="pricesRange"
                      :min="initPrices.min"
                      :max="initPrices.max"
                      :step="1"
                    />
                  </div>
                </div>
                <div class="radio-button" data-v-8a5c1906="" data-v-83b7e284="">
                  <div class="radio-button__icon" data-v-83b7e284="">
                    <div class="radio-button__circle" data-v-83b7e284=""></div>
                  </div>
                  <div class="radio-button__content" data-v-83b7e284="">
                    <!--[-->Articles en réduction<!--]-->
                  </div>
                </div>
              </div>
            </div>
          </AccordionFilter>
        </div>
        <div class="catalog-filters-modal__footer">
          <button
            class="catalog-filters-modal__footer-button"
            @click="closeModal"
          >
            <span class="catalog-filters-modal__footer-button-title">
              {{ $t('Common.view_items') }}</span
            >
            <span class="catalog-filters-modal__footer-button-count">{{
              count
            }}</span>
          </button>
          <button
            class="catalog-filters-modal__reset-button"
            @click="resetFilters"
          >
            {{ $t('Common.reset') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import AccordionFilter from '~/components/common/AccordionFilter.vue'
import ButtonCloseModal from '~/components/common/ButtonCloseModal.vue'
import RangeSlider from '~/components/common/RangeSlider.vue'
import { SORT_TYPES } from '~~/constants/catalog'
import { debounce } from '~~/utils/utils'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import { useCommonStore } from '~~/store/common'

export default defineComponent({
  name: 'CatalogFiltersModal',
  components: {
    AccordionFilter,
    ButtonCloseModal,
    RangeSlider,
  },
  emit: ['close', 'update'],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
    facets: {
      type: Object,
      default() {
        return {}
      },
    },
    prices: {
      type: Object,
      default() {
        return {
          min: 0,
          max: 1000,
        }
      },
    },
    sorting: {
      type: Object,
      default() {
        return {
          recommandations: true,
          news: false,
          price_asc: false,
          price_desc: false,
        }
      },
    },
    initFilters: {
      type: Object,
      default() {
        return {
          sizes: [],
          color: [],
        }
      },
    },
    selectedPrice: {
      type: Object,
      default() {
        return {
          min: 0,
          max: 9999,
        }
      },
    },
    initSortId: {
      type: String,
      default: SORT_TYPES.RECOMENDATIONS,
    },
  },
  data() {
    return {
      currentSortId: this.initSortId,
      filters: {
        sizes: this.initFilters?.sizes || [],
        color: this.initFilters?.color || [],
      },
      initPrices: {
        updated: false,
        min: this.prices?.min || 0,
        max: this.prices?.max || 1000,
      },
      listOfColors: {},
      listOfSizes: {},
      min: this.selectedPrice?.min || 0,
      max: this.selectedPrice?.max || 9999,
      imgUrl: useRuntimeConfig().public.baseImageUrl,
    }
  },
  computed: {
    pricesRange: {
      get() {
        return [this.min, this.max]
      },
      set(value) {
        this.min = value[0]
        this.max = value[1]

        this.updateSearch()
      },
    },
    colors() {
      return useCommonStore().data?.colors || []
    },
  },
  watch: {
    isOpen(value: Boolean): void {
      if (!this.initPrices.updated && this.prices.max < 9999) {
        this.initPrices.min = this.prices.min
        this.initPrices.max = this.prices.max

        this.initPrices.updated = true

        this.min = this.prices?.min || 0
        this.max = this.prices?.max || 9999
      }

      if (value) {
        this.updateColors()
        this.updateSizes()

        useLayoutStore().openModal(EModals.FILTERS)
      } else {
        useLayoutStore().closeModal(EModals.FILTERS)
      }
    },
    'facets.color': {
      handler() {
        this.updateColors()
      },
    },
    'facets.sizes': {
      handler() {
        this.updateSizes()
      },
    },
  },
  methods: {
    handleMin: debounce(function (e) {
      this.min = e.target.value
      this.updateSearch()
    }, 150),
    handleMax: debounce(function (e) {
      this.max = e.target.value
      this.updateSearch()
    }, 150),
    closeModal(): void {
      this.$emit('close')
    },
    filterSearch(type, filter): void {
      if (!this.filters[type].includes(filter)) {
        this.filters[type]?.push(filter)
      } else {
        this.filters[type] = this.filters[type].filter(
          (item) => item !== filter
        )
      }

      this.updateSearch()
    },
    resetFilters(): void {
      this.filters.sizes = []
      this.filters.color = []
      this.min = this.initPrices.min
      this.max = this.initPrices.max
      this.initPrices.updated = false
      this.currentSortId = SORT_TYPES.RECOMENDATIONS

      this.$emit('reset')
    },
    updateColors() {
      if (this.facets?.color) {
        for (const color in this.colors) {
          if (this.facets.color?.[color]) {
            this.listOfColors[color] = this.colors[color]
          }
        }
      }
    },
    updateSizes() {
      if (this.facets?.sizes) {
        for (const size in this.facets?.sizes) {
          if (this.facets.sizes?.[size]) {
            this.listOfSizes[size] = this.facets.sizes[size]
          }
        }
      }
    },
    updateSearch() {
      this.$emit('update', {
        filters: this.filters,
        sortId: this.currentSortId,
        min: this.min,
        max: this.max,
      })
    },
    updateSorting(id: string) {
      this.currentSortId = id
      this.updateSearch()
    },
  },
})
</script>

<style lang="scss" scoped>
button.catalog-filters-modal__filter-button {
  line-height: 20px;
  text-align: center;
  border: 1px solid #cdcdcd;
  font-weight: 400;
  font-size: 14px;
  height: 38px;
  width: 38px;
  padding: 0;
  border-radius: 5px;
  flex-shrink: 0;
  transition-duration: 0.5s;
}
.accordion__product-type.accordion-filter__accordion,
.accordion-filter__accordion.accordion.accordion--colors,
.accordion-filter__accordion.accordion.accordion--size {
  width: calc(100vw - 17px);
}
button.catalog-filters-modal__product-type-button {
  line-height: 20px;
  text-align: center;
  border: 1px solid #cdcdcd;
  font-weight: 400;
  font-size: 14px;
  border-radius: 5px;
  transition-duration: 0.5s;
  padding: 10px 14px;
  flex-shrink: 0;
  transition-duration: 0.5s;
}
button.catalog-filters-modal__product-type-button.active {
  background-color: #ff8da1;
  border-color: #ff8da1;
  color: white;
}
.accordion__content.type-container {
  gap: 15px;
  display: flex;
  overflow-x: scroll;
}
.colors-container {
  display: flex;
  overflow-x: scroll;
  gap: 20px;
}
button.catalog-filters-modal__filter-button--active {
  background-color: #ff8da1;
  border-color: #ff8da1;
  color: white;
}
.size-container {
  display: flex;
  gap: 20px;
  overflow: scroll;
}
div.catalog-filters-modal__color {
  height: 18px;
  width: 18px;
  padding: 0;
  border-radius: 100px;
  overflow: hidden;
}
img.catalog-filters-modal__color-img {
  border-radius: 0;
  width: 50px;
  height: 50px;
}
/**
  Backdrop animation
*/
.backdrop-enter-active {
  transition: opacity 0.4s ease-out;
}
.backdrop-leave-active {
  animation-delay: 0.2s;
  transition: opacity 0.2s ease-out;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.backdrop-enter-to,
.backdrop-leave-from {
  opacity: 1;
}
/**
  Modal animation
*/
.modal-enter-active {
  animation-delay: 0.4s;
  transition: transform 0.4s ease-out;
}
.modal-leave-active {
  transition: transform 0.2s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(100%);
}

.modal-enter-to,
.modal-leave-from {
  transform: translateY(0%);
}

.select {
  padding: 13px 16px 9px 22px;
  border: 2px solid $color-dark-grey;
  border-radius: 50px;
  display: none;

  &__title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $color-dark-grey;
  }

  &__icon {
    height: 13px;
    width: 13px;
    margin-left: 16px;
  }
}
.accordion {
  margin-bottom: 17px;

  &--finitions {
    .accordion {
      &__content {
        padding: 12px 0 7px;
      }

      &__grid {
        column-gap: 6px;
      }
    }
  }

  &--product-type {
    .accordion {
      &__grid {
        column-gap: 4px;
      }
    }
  }

  &--formes {
    .accordion {
      &__grid {
        column-gap: 8px;
        row-gap: 11px;
      }
    }
  }

  &--materials {
    .accordion {
      &__content {
        padding: 12px 0 0 0;
      }

      &__grid {
        column-gap: 4px;
      }
    }
  }

  &__content {
    &--size {
      padding: 7px 0;
    }
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 14.5px;
    row-gap: 7px;

    &--columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      row-gap: 7px;
      column-gap: 12.5px;
    }
  }

  &__colors-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-left: -7px;
    column-gap: 35px;
    row-gap: 10px;
  }
}

.catalog-filters-backdrop {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 60px);
  z-index: 900;
  background-color: rgba($color: $color-black, $alpha: 0.2);
}
.catalog-filters-modal {
  position: fixed;
  top: 60px;
  right: 0;
  height: calc(100vh - 60px);
  z-index: 950;
  overflow: auto;
  width: 100%;
  background-color: $color-white;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  overflow-x: hidden;

  &__body {
    position: relative;
    padding: 0 17px 0 20px;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 46px 2px 30px 0;
  }

  &__close-button {
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover .catalog-filters-modal__close-button-title {
      color: $color-pink;
    }
    &:hover .catalog-filters-modal__close-icon {
      transform: rotateZ(90deg);
      color: $color-pink;
    }
  }

  &__close-button-title {
    text-transform: uppercase;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
  }

  &__close-icon {
    transition: 0.3s ease-out all;
    transform: rotateZ(0deg);
    width: 15px;
    height: 15px;
  }

  &__sortby {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__sort-by-label {
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    font-feature-settings: 'calt' off;
  }

  &__select {
    display: flex;
    align-items: center;
    padding: 16px 17px 14px 23px;

    .select {
      &__icon {
        width: 17px;
        height: 21px;
        margin-left: 17px;
      }
    }
  }

  &__filter-button {
    color: $color-dark-grey;
    line-height: 20px;
    text-align: center;
    padding: 8px 25px;
    border: 2px solid $color-dark-grey;
    border-radius: 25px;
    font-weight: 400;
    font-size: 16px;

    &--active {
      border-color: $color-pink;
      color: $color-pink;
      font-weight: 700;
    }
  }

  &__morphology-button {
    width: 97px;
    height: 97px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid $color-dark-grey;
    border-radius: 50%;
    overflow: hidden;
    color: $color-dark-grey;

    &--active {
      border-color: $color-pink;
      color: $color-pink;
      font-weight: 700;

      .catalog-filters-modal__morphology-button-title {
        font-weight: 700;
      }
    }
  }

  &__morphology-button-title {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }

  &__morphology-icon {
    width: 38px;
    height: 38px;
  }

  &__formes-icon {
    width: 60px;
    height: 60px;
  }

  &__color-button {
    display: flex;
    align-items: center;
    gap: 10px;
    &--active {
      .catalog-filters-modal__color {
        border-color: $color-pink;
      }
    }
  }

  &__color {
    border: 2px solid transparent;
    padding: 8px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__color-img {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  &__color-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  &__toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 10px;
  }

  &__toggle-title {
    font-family: $font-secondary;
    font-size: 20px;
    line-height: 60px;
    font-weight: 400;
  }

  &__toggle {
    margin-top: -10px;
  }

  &__footer {
    width: 100%;
    min-height: 112px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: auto;
  }

  &__footer-button {
    color: $color-white;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 44px;
    border-radius: 10px;
    width: 90%;
  }

  &__footer-button-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    text-transform: uppercase;
  }

  &__footer-button-count {
    font-weight: 400;
    font-size: 16px;
  }

  &__reset-button {
    font-weight: 400;
    font-size: 13px;
    line-height: 30px;
    color: black;
    text-decoration: underline;
    text-align: right;
  }
}

.price_range-block {
  position: relative;
  margin-top: 30px;
}

@include media-lg {
  .catalog-filters-backdrop {
    height: calc(100vh - 94px);
    top: 94px;
  }
  .catalog-filters-modal {
    height: calc(100vh - 95px);
    top: 95px;
    max-width: 457px;
    margin-left: auto;
    padding-bottom: 112px;

    &__body {
      padding: 0 73px 60px 64px;
    }

    &__header {
      padding: 40px 0 30px 0;
    }

    &__select {
      padding: 15px 16px 14px 21px;

      .select {
        &__icon {
          height: 20px;
        }
      }
    }

    &__footer {
      max-width: 457px;
    }
  }
}
@media screen and (max-width: 992px) {
  div.catalog-filters-modal__sortby {
    gap: 20px;
  }
  .range-slider {
    margin-top: 20px;
    width: 80%;
  }
  button.catalog-filters-modal__color-button {
    flex-direction: column;
  }
  div.catalog-filters-modal__color {
    height: 38px;
    width: 38px;
    padding: 0;
    border-radius: 5px;
    overflow: hidden;
  }
}
.accordion__content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.accordion__content {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
