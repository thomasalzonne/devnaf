<template>
  <div class="unset">
    <div class="catalog-tools__filters">
      <li>
        <div class="filter_title" @click="showModal">
          Trier
          <svg
            width="6"
            height="10"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.02051 0.159096L4.82491 3.61591C5.05837 3.82804 5.05837 4.17196 4.82491 4.38409L1.02051 7.8409C0.787057 8.05303 0.408549 8.05303 0.175092 7.8409C-0.0583642 7.62878 -0.0583642 7.28485 0.175093 7.07272L3.55678 4L0.175094 0.927276C-0.058363 0.715149 -0.0583629 0.371223 0.175094 0.159095C0.408551 -0.0530319 0.787058 -0.0530318 1.02051 0.159096Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="filter_sub-menu">
          <div
            class="accordion__content accordion__grid accordion__grid--columns"
          >
            <div class="catalog-filters-modal__sortby">
              <AppRadioButton
                id="recommandations"
                :is-active="sorting.recommandations"
                @select-option="updateSorting"
              >
                {{ $t('Sort.recomendations') }}
              </AppRadioButton>
              <AppRadioButton
                id="news"
                :is-active="sorting.news"
                @select-option="updateSorting"
              >
                {{ $t('Sort.news') }}
              </AppRadioButton>
              <AppRadioButton
                id="price_asc"
                :is-active="sorting.price_asc"
                @select-option="updateSorting"
              >
                {{ $t('Sort.price_asc') }}
              </AppRadioButton>
              <AppRadioButton
                id="price_desc"
                :is-active="sorting.price_desc"
                @select-option="updateSorting"
              >
                {{ $t('Sort.price_desc') }}
              </AppRadioButton>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="filter_title" @click="showModal">
          Type de produit
          <svg
            width="6"
            height="10"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.02051 0.159096L4.82491 3.61591C5.05837 3.82804 5.05837 4.17196 4.82491 4.38409L1.02051 7.8409C0.787057 8.05303 0.408549 8.05303 0.175092 7.8409C-0.0583642 7.62878 -0.0583642 7.28485 0.175093 7.07272L3.55678 4L0.175094 0.927276C-0.058363 0.715149 -0.0583629 0.371223 0.175094 0.159095C0.408551 -0.0530319 0.787058 -0.0530318 1.02051 0.159096Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="filter_sub-menu full center">
          <div
            class="accordion__content accordion__product-grid"
            data-v-cf8dc797=""
          >
            <AppRadioButton
              id="recommandations"
              :is-active="sorting.recommandations"
              @select-option="updateSorting"
            >
              Toutes les robes
            </AppRadioButton>
            <AppRadioButton
              id="news"
              :is-active="sorting.news"
              @select-option="updateSorting"
            >
              Robes midi
            </AppRadioButton>
            <AppRadioButton
              id="price_asc"
              :is-active="sorting.price_asc"
              @select-option="updateSorting"
            >
              Robes courtes
            </AppRadioButton>
            <AppRadioButton
              id="price_desc"
              :is-active="sorting.price_desc"
              @select-option="updateSorting"
            >
              Robes fluides
            </AppRadioButton>
            <AppRadioButton
              id="price_desc"
              :is-active="sorting.price_desc"
              @select-option="updateSorting"
            >
              Robes longues
            </AppRadioButton>
            <AppRadioButton
              id="price_desc"
              :is-active="sorting.price_desc"
              @select-option="updateSorting"
            >
              Robes pull
            </AppRadioButton>
            <AppRadioButton
              id="price_desc"
              :is-active="sorting.price_desc"
              @select-option="updateSorting"
            >
              Robes imprimées
            </AppRadioButton>
            <AppRadioButton
              id="price_desc"
              :is-active="sorting.price_desc"
              @select-option="updateSorting"
            >
              Robes glitters
            </AppRadioButton>
            <AppRadioButton
              id="price_desc"
              :is-active="sorting.price_desc"
              @select-option="updateSorting"
            >
              Robes de soirées
            </AppRadioButton>
            <AppRadioButton
              id="price_desc"
              :is-active="sorting.price_desc"
              @select-option="updateSorting"
            >
              Robes en promotions
            </AppRadioButton>
          </div>
        </div>
      </li>
      <li>
        <div class="filter_title" @click="showModal">
          Coloris
          <svg
            width="6"
            height="10"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.02051 0.159096L4.82491 3.61591C5.05837 3.82804 5.05837 4.17196 4.82491 4.38409L1.02051 7.8409C0.787057 8.05303 0.408549 8.05303 0.175092 7.8409C-0.0583642 7.62878 -0.0583642 7.28485 0.175093 7.07272L3.55678 4L0.175094 0.927276C-0.058363 0.715149 -0.0583629 0.371223 0.175094 0.159095C0.408551 -0.0530319 0.787058 -0.0530318 1.02051 0.159096Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="filter_sub-menu full center coloris">
          <div
            class="accordion__content accordion__colors-grid"
            data-v-cf8dc797=""
          >
            <AppRadioButton
              id="news"
              :is-active="sorting.recommandations"
              @select-option="updateSorting"
            >
              Toutes les couleurs
            </AppRadioButton>
            <button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/4955.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Crudo
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/4962.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Azul
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/4964.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Multicolores
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/4968.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Verde
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/4974.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Rosa
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/4983.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Negro
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/4995.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Rojo
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/5016.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Marrón
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/5033.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Beis
              </p></button
            ><button
              class="catalog-filters-modal__color-button"
              data-v-cf8dc797=""
            >
              <div class="catalog-filters-modal__color" data-v-cf8dc797="">
                <img
                  class="catalog-filters-modal__color-img"
                  src="https://nafnaf.b-cdn.net/colors/5052.png"
                  alt=""
                  data-v-cf8dc797=""
                />
              </div>
              <p class="catalog-filters-modal__color-title" data-v-cf8dc797="">
                Violeta
              </p>
            </button>
          </div>
        </div>
      </li>
      <li>
        <div class="filter_title" @click="showModal">
          Tailles
          <svg
            width="6"
            height="10"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.02051 0.159096L4.82491 3.61591C5.05837 3.82804 5.05837 4.17196 4.82491 4.38409L1.02051 7.8409C0.787057 8.05303 0.408549 8.05303 0.175092 7.8409C-0.0583642 7.62878 -0.0583642 7.28485 0.175093 7.07272L3.55678 4L0.175094 0.927276C-0.058363 0.715149 -0.0583629 0.371223 0.175094 0.159095C0.408551 -0.0530319 0.787058 -0.0530318 1.02051 0.159096Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="filter_sub-menu">
          <div
            class="accordion__content accordion__grid accordion__grid--columns"
            data-v-8a5c1906=""
          >
            <div class="catalog-filters-modal__sortby" data-v-8a5c1906="">
              <div
                class="radio-button radio-button--active"
                data-v-8a5c1906=""
                data-v-83b7e284=""
              >
                <div class="radio-button__icon" data-v-83b7e284="">
                  <div class="radio-button__circle" data-v-83b7e284=""></div>
                </div>
                <div class="radio-button__content" data-v-83b7e284="">
                  <!--[-->Toutes les tailles<!--]-->
                </div>
              </div>
              <div class="radio-button" data-v-8a5c1906="" data-v-83b7e284="">
                <div class="radio-button__icon" data-v-83b7e284="">
                  <div class="radio-button__circle" data-v-83b7e284=""></div>
                </div>
                <div class="radio-button__content" data-v-83b7e284="">
                  <!--[-->36<!--]-->
                </div>
              </div>
              <div class="radio-button" data-v-8a5c1906="" data-v-83b7e284="">
                <div class="radio-button__icon" data-v-83b7e284="">
                  <div class="radio-button__circle" data-v-83b7e284=""></div>
                </div>
                <div class="radio-button__content" data-v-83b7e284="">
                  <!--[-->38<!--]-->
                </div>
              </div>
              <div class="radio-button" data-v-8a5c1906="" data-v-83b7e284="">
                <div class="radio-button__icon" data-v-83b7e284="">
                  <div class="radio-button__circle" data-v-83b7e284=""></div>
                </div>
                <div class="radio-button__content" data-v-83b7e284="">
                  <!--[-->40<!--]-->
                </div>
              </div>
              <div class="radio-button" data-v-8a5c1906="" data-v-83b7e284="">
                <div class="radio-button__icon" data-v-83b7e284="">
                  <div class="radio-button__circle" data-v-83b7e284=""></div>
                </div>
                <div class="radio-button__content" data-v-83b7e284="">
                  <!--[-->42<!--]-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="filter_title" @click="showModal">
          Prix
          <svg
            width="6"
            height="10"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.02051 0.159096L4.82491 3.61591C5.05837 3.82804 5.05837 4.17196 4.82491 4.38409L1.02051 7.8409C0.787057 8.05303 0.408549 8.05303 0.175092 7.8409C-0.0583642 7.62878 -0.0583642 7.28485 0.175093 7.07272L3.55678 4L0.175094 0.927276C-0.058363 0.715149 -0.0583629 0.371223 0.175094 0.159095C0.408551 -0.0530319 0.787058 -0.0530318 1.02051 0.159096Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="filter_sub-menu">
          <div
            class="accordion__content accordion__grid accordion__grid--columns"
          >
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
        </div>
      </li>
    </div>
    <div class="cataglog_tools__filters_mobile">
      <li>
        <div @click="openFilters">Filtres</div>
      </li>
      <li>
        <div class="filter_title" @click="showModal">Trier</div>
        <div class="filter_sub-menu full center">
          <div
            class="accordion__content accordion__grid accordion__grid--columns"
          >
            <div class="catalog-filters-modal__sortby">
              <AppRadioButton
                id="recommandations"
                :is-active="sorting.recommandations"
                @select-option="updateSorting"
              >
                {{ $t('Sort.recomendations') }}
              </AppRadioButton>
              <AppRadioButton
                id="news"
                :is-active="sorting.news"
                @select-option="updateSorting"
              >
                {{ $t('Sort.news') }}
              </AppRadioButton>
              <AppRadioButton
                id="price_asc"
                :is-active="sorting.price_asc"
                @select-option="updateSorting"
              >
                {{ $t('Sort.price_asc') }}
              </AppRadioButton>
              <AppRadioButton
                id="price_desc"
                :is-active="sorting.price_desc"
                @select-option="updateSorting"
              >
                {{ $t('Sort.price_desc') }}
              </AppRadioButton>
            </div>
          </div>
        </div>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppRadioButton from '~/components/common/AppRadioButton.vue'
import RangeSlider from '~/components/common/RangeSlider.vue'
import { SORT_TYPES } from '~/constants/catalog'
import { useCommonStore } from '~~/store/common'

export default defineComponent({
  name: 'CatalogTools',
  components: {
    AppRadioButton,
    RangeSlider,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    // filters: {
    //   type: Object,
    //   default() {
    //     return {}
    //   },
    // },
    sort: {
      type: String,
      default: '',
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
    sortName() {
      switch (this.sort) {
        case SORT_TYPES.RECOMENDATIONS: {
          return this.$t('Sort.recomendations')
        }
        case SORT_TYPES.NEWS: {
          return this.$t('Sort.news')
        }
        case SORT_TYPES.PRICE_ASC: {
          return this.$t('Sort.price_asc')
        }
        case SORT_TYPES.PRICE_DESC: {
          return this.$t('Sort.price_desc')
        }
        default: {
          return ''
        }
      }
    },
    filtersCount() {
      let result = 0
      Object.keys(this.filters).forEach((filter) => {
        if (this.filters[filter].length) {
          result += this.filters[filter].length
        }
      })

      return result
    },
    colors() {
      return useCommonStore().data?.colors || []
    },
  },
  watch: {
    'facets.color': {
      handler() {
        this.updateColors()
      },
    },
    'facets.sizes': {
      handler() {
        // this.updateSizes()
      },
    },
  },
  methods: {
    closeDropdown() {
      const active = document.querySelector('.filter_sub-menu.active')
      const activemenu = document.querySelector('.menuactive')
      if (active && activemenu) {
        active.classList.remove('active')
        activemenu.classList.remove('menuactive')
      }
    },
    showModal(el) {
      const submenu = el.target.nextSibling
      const active = document.querySelector('.filter_sub-menu.active')
      const activemenu = document.querySelector('.menuactive')
      if (submenu.classList.contains('active')) {
        submenu.classList.remove('active')
        activemenu.classList.remove('menuactive')
      } else {
        if (active) {
          active.classList.remove('active')
          activemenu.classList.remove('menuactive')
        }
        el.target.classList.add('menuactive')
        submenu.classList.add('active')
      }
    },
    openFilters(): void {
      this.$emit('openFilters')
    },
    deleteFilter(filter, value): void {
      this.$emit('deleteFilter', {
        type: filter,
        value,
      })
    },
    prevSort() {
      this.$emit('prevSort', this.sort)
    },
    nextSort() {
      this.$emit('nextSort', this.sort)
    },
    updateSorting(id: string) {
      this.currentSortId = id
      this.updateSearch()
    },
    updateSearch() {
      this.$emit('update', {
        filters: this.filters,
        sortId: this.currentSortId,
        min: 0,
        max: 5000,
      })
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
  },
})
</script>
<style lang="scss">
.coloris .radio-button__icon {
  margin-left: 2.5px;
}
</style>
<style lang="scss" scoped>
.unset {
  display: unset;
}
.range-slider {
  width: 70%;
  margin-left: 6px;
}
.catalog-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 13px 20px;
  position: relative;

  &__products-count {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }

  &__sort {
    display: flex;
    align-items: center;
  }

  &__sort-by-container {
    display: flex;
    align-items: center;
    border-left: 1px solid $color-medium-grey;
    margin-left: 16px;
    padding-left: 21px;
    height: 27px;
    display: none;
  }

  &__sort-by-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  &__sort-by-button {
    width: 19px;
    height: 19px;

    &--reverse {
      transform: rotate(180deg);
    }

    &:hover {
      .catalog-tools__sort-by-icon {
        color: $color-pink;
        transform: scale(1.5);
      }
    }
  }

  &__sort-by-icon {
    width: 13px;
    height: 7px;
    color: $color-dark-grey;
    transition: $easeOut200;
  }

  &__sort-by-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;

    &--bold {
      display: inline-block;
      font-weight: 600;
      margin-left: 8px;
    }
  }

  &__filter-badges {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__filter-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: $color-light-grey;
    cursor: pointer;
    transition: 0.2s ease-out all;

    &:hover {
      background-color: $color-medium-grey;
    }

    &:hover .catalog-tools__filter-badge--icon {
      stroke: $color-medium-grey;
    }
  }

  &__filter-badge--icon {
    width: 12px;
    height: 12px;
    stroke: white;
    transition: 0.2s ease-out all;
  }

  &__filter-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 22px;
  }
}
.accordion__product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  -moz-column-gap: 35px;
  column-gap: 35px;
  row-gap: 15px;
  padding: 0;
}
.accordion__colors-grid {
  grid-template-columns: repeat(3, fit-content(40%));
  margin-left: 0;
  row-gap: 15px;
  column-gap: 50px;
  padding: 0;
}
.catalog-tools__filters,
.cataglog_tools__filters_mobile {
  position: sticky;
  top: 100px;
  width: fit-content;
  margin: 20px auto;
  z-index: 10;
  display: flex;
  gap: 23px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  li {
    list-style: none;
  }
}
.radio-button--active .radio-button__icon {
  border-color: unset !important;
}
.rangeslider-container {
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.radio-button.rangeslider {
  align-items: baseline;
  margin-bottom: 5px;
}
.filter_sub-menu {
  position: absolute;
  top: 53px;
  padding: 20px 13px;
  width: max-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: none;
  margin-left: -20px;
  padding-bottom: 24px;
}
.filter_sub-menu.full.center {
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  min-width: 100%;
}
.filter_sub-menu.active {
  display: block !important;
}
.catalog-filters-modal__color-title {
  font-size: 14px;
}
.accordion__content.accordion__colors-grid .radio-button__icon {
  width: 16px;
  height: 16px;
}
.accordion__content.accordion__colors-grid .radio-button__content {
  font-size: 14px;
  flex-shrink: 0;
}
.catalog-filters-modal__sortby {
  gap: 15px;
  display: flex;
  flex-direction: column;
}
.filter_title {
  cursor: pointer;
  user-select: none;
  line-height: 19px;
}
.filter_title svg {
  transition-duration: 0.5s;
  margin-left: 2px;
}
.filter_title.menuactive svg {
  transform: rotateZ(90deg);
}
.filter-button {
  padding: 8px 6px 8px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $color-dark-grey;
  border-radius: 30px;
  color: $color-black;
  transition: 0.2s all ease;

  &:hover {
    color: $color-pink;
    border: 2px solid $color-pink;
  }

  &--active {
    border: 2px solid $color-pink;
  }

  &__icon {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    color: inherit;
  }

  &__title {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: inherit;
  }

  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: $color-pink;
    color: $color-white;
    font-size: 10px;
    line-height: 22px;
    text-align: center;
    font-weight: 700;
    margin-left: 14px;
    border-radius: 50%;
  }
}
.filter_title.menuactive {
  -webkit-text-stroke: 1px black;
}
.select {
  padding: 11px 16px 10px 22px;
  border: 2px solid $color-dark-grey;
  border-radius: 50px;
  display: none;
  color: $color-dark-grey;

  &__title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  &__icon {
    height: 13px;
    width: 13px;
    margin-left: 16px;
  }
}
@media screen and (min-width: 992px) {
  .cataglog_tools__filters_mobile {
    display: none;
  }
}
@media screen and (max-width: 992px) {
  .filter_title.menuactive {
    font-weight: 400;
    color: #ff8da1;
  }
  .catalog-tools__filters {
    display: none;
  }
}
@include media-lg {
  .catalog-tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 31px auto 27px auto;
    max-width: 1800px;
    padding: 0 60px;

    &__filter-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 22px;
    }

    &__products-count {
      font-size: 18px;
    }

    &__sort-by-container {
      display: flex;
    }
  }

  .filter-button {
    padding: 14px 19px 12px 19px;
    border: 2px solid $color-pink;
    color: $color-white;
    background-color: $color-pink;

    &:hover {
      color: $color-pink;
      background-color: $color-white;

      .filter-button__count {
        background-color: $color-pink;
        color: $color-white;
      }
    }

    &--active {
      border: 2px solid $color-pink;
    }

    &__icon {
      width: 22.5px;
      height: 22.5px;
      margin-right: 7.5px;
    }

    &__count {
      background-color: $color-white;
      color: $color-pink;
    }
  }

  .select {
    display: inline-block;
  }
}

@include media-xxl {
  .catalog-tools {
    max-width: 1800px;
    padding: 0;
  }
}
</style>
