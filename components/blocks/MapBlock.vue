<template>
  <div ref="mapSection" class="map-block">
    <div class="map-block__content">
      <h3 class="map-block__title">
        {{ $t('Date.title_first_line') }}<br />{{
          $t('Date.title_second_line')
        }}
      </h3>
      <div class="map-block__input-container">
        <div class="map-block__input">
          <SvgIcon class="form-input__icon form-input__pin-icon" name="pin" />
          <input
            id="place_search"
            class="form-input__control"
            type="text"
            autocomplete="off"
          />
          <button
            class="form-input__button"
            type="button"
            @click="handleInputButton"
          >
            <SvgIcon
              class="form-input__button-icon"
              :class="{ 'form-input__button-icon--close': selectedPlace }"
              :name="!selectedPlace ? 'arrow' : 'close'"
            />
          </button>
        </div>
      </div>
      <template v-if="stores">
        <MapStores
          :stores="filteredStores"
          :selected-place-coordinates="selectedPlace"
          @showStore="zoomToStore"
        />
      </template>
    </div>
    <div id="map" class="map-block__map"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as clusterPkg from '@googlemaps/markerclusterer'
import MapStores from './MapStores.vue'

import { calcCrow } from '~~/utils/utils'
import { CLUSTER_ICON, COLOR_PINK } from '~~/constants/map'

const { MarkerClusterer } = clusterPkg

declare global {
  interface Window {
    initMap: () => void
  }
}

export default defineComponent({
  name: 'MapBlock',
  components: {
    MapStores,
  },
  props: {
    search: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      map: null,
      stores: null,
      clusters: null,
      placesService: null,
      selectedPlace: null,
      autocompleteInput: null,
      autocompleteService: null,
      markers: [],
      isMapLoaded: false,
    }
  },
  computed: {
    filteredStores() {
      if (this.selectedPlace) {
        const listOfDistances = []
        const stores = []

        this.stores.forEach((store) => {
          listOfDistances.push(
            calcCrow(this.selectedPlace, {
              lat: store.lat,
              lng: store.lng,
            })
          )
        })

        for (let i = 0; i < 3; i++) {
          const min = Math.min(...listOfDistances)
          const index = listOfDistances.findIndex((elem) => elem === min)

          stores.push({
            ...this.stores[index],
            distance: min.toFixed(2),
          })

          listOfDistances[index] = Infinity
        }

        return stores
      } else {
        return this.stores
      }
    },
  },

  watch: {
    filteredStores: {
      handler() {
        if (this.map) {
          this.initMap()
        }
      },
      deep: true,
    },
  },
  mounted() {
    const vm = this

    document.addEventListener(
      'scroll',
      function () {
        if (!vm.isMapLoaded && vm.isInViewport()) {
          vm.isMapLoaded = true
          import('~/assets/data/stores.json').then(function (module) {
            vm.stores = module.default as any
            vm.loadGoogleMaps()
          })
        }
      },
      {
        passive: true,
      }
    )

    // this.$nextTick(function () {
    //   const vm = this

    //   import('~/assets/data/stores.json').then(function (module) {
    //     vm.stores = module.default as any
    //     vm.loadGoogleMaps()
    //   })
    // })
  },
  methods: {
    isInViewport() {
      let bounding = this.$refs.mapSection
      if (!bounding) {
        return false
      }
      bounding = bounding.getBoundingClientRect()
      const myElementHeight = this.$refs.mapSection.offsetHeight - 100

      return (
        bounding.top >= -myElementHeight &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) +
            myElementHeight
      )
    },
    loadGoogleMaps() {
      const vm = this

      if (window.initMap) {
        setTimeout(() => {
          vm.initMap()
        }, 500)

        return
      }

      const script = document.createElement('script')
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDD23aL5cE1Xyyb4zkdqJRibtDZqsBEX84&libraries=places&callback=initMap'
      script.async = true
      document.head.appendChild(script)
      window.initMap = function () {
        setTimeout(() => {
          vm.initMap()
        }, 500)
      }
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.416775, lng: -3.70379 },
        zoom: 6,
        mapId: 'cdd77855dff920fd',
      })

      this.setMarkers()

      if (!this.autocompleteService) {
        this.initAutocomplete()
      }
    },
    setMarkers() {
      const svgMarker = {
        url: '/maps_marker.svg',
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(28, 36),
      }

      const markers = this.filteredStores.map((store, index) => {
        const marker = new google.maps.Marker({
          map: this.map,
          position: {
            lat: parseFloat(store.lat),
            lng: parseFloat(store.lng),
          },
          icon: svgMarker,
        })

        marker.addListener('click', () => {
          this.scrollToStore(index)
        })
        return marker
      })

      this.markers = markers

      this.clusters = new MarkerClusterer({
        map: this.map,
        markers: this.markers,
        renderer: {
          render: (cluster) => {
            const color = COLOR_PINK
            const svg = CLUSTER_ICON(color)

            return new google.maps.Marker({
              position: cluster.position,
              icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(55, 55),
              },
              label: {
                text: String(cluster.markers.length),
                color: '#fff',
                fontSize: '14px',
              },
            })
          },
        },
      })

      const bounds = new google.maps.LatLngBounds()

      const coordinates = this.markers.map((marker) => {
        return {
          lat: marker.position.lat(),
          lng: marker.position.lng(),
        }
      })

      for (let i = 0; i < coordinates.length; i++) {
        bounds.extend(coordinates[i])
      }

      this.map.fitBounds(bounds)
    },
    initAutocomplete() {
      this.autocompleteInput = document.getElementById(
        'place_search'
      ) as HTMLInputElement

      const center = { lat: 40.416775, lng: -3.70379 }
      const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      }

      const options = {
        bounds: defaultBounds,
        fields: ['address_components', 'geometry', 'icon', 'name'],
        strictBounds: false,
        types: ['establishment'],
      }

      this.placesService = new google.maps.places.PlacesService(this.map)

      this.autocompleteService = new google.maps.places.Autocomplete(
        this.autocompleteInput,
        options
      )

      this.autocompleteService.addListener('place_changed', () => {
        const place = this.autocompleteService.getPlace()

        if (place) {
          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()

          this.selectedPlace = {
            lat,
            lng,
          }
        }
      })
    },
    scrollToStore(index) {
      const store = document.querySelectorAll('.map-stores__list-item')[index]
      store.scrollIntoView({ behavior: 'smooth' })
    },
    handleInputButton() {
      if (this.selectedPlace) {
        this.clearSelectedPlace()
      } else {
        const request = {
          query: this.autocompleteInput.value,
          fields: ['name', 'geometry'],
        }

        this.placesService.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            this.selectedPlace = {
              lat: results[0]?.geometry?.location?.lat(),
              lng: results[0]?.geometry?.location?.lng(),
            }
          } else {
            this.clearSelectedPlace()
          }
        })
      }
    },
    clearSelectedPlace() {
      this.selectedPlace = null

      this.autocompleteInput.value = ''

      this.autocompleteService.set('place', null)
    },
    zoomToStore(store) {
      this.map.setZoom(17)
      this.map.setCenter({
        lat: parseFloat(store.lat),
        lng: parseFloat(store.lng),
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.map-block {
  display: flex;
  flex-direction: column;

  &__title {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 40px;
    line-height: 40px;
    margin: 45px 20px 22px 20px;
  }

  &__slider {
    margin: 22px 20px 6px 20px;
  }

  &__input-container {
    margin: 0 20px;
    padding-bottom: 30px;
  }

  &__input {
    padding: 14px 22px 12px 21px;
    height: 58px;
    border: 1px solid $color-black;
    border-radius: 50px;
    display: flex;
    align-items: center;
    background-color: $color-white;
    gap: 10px;
  }

  &__slider-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__slider-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    &--bold {
      line-height: 24px;
      font-weight: 700;
      text-align: right;
    }
  }

  &__map {
    height: 267px;
    background-color: #f0eded;
  }

  &__stores {
    display: none;
  }
}

.form-input {
  &__icon {
    width: 20px;
    height: 20px;
  }

  &__button {
    margin-left: auto;
  }

  &__button-icon {
    width: 30px;
    height: 30px;

    &--close {
      width: 15px;
      height: 15px;
    }

    &:active {
      color: $color-pink;
    }
  }

  &__pin-icon {
    margin-top: -6px;
  }

  &__control {
    border: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    width: 100% !important;
    color: $color-dark-grey;
    background-color: $color-white;

    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: $color-medium-grey;
      background-color: transparent;
    }

    &:-webkit-autofill {
      background-color: $color-white;
    }

    &:-webkit-autofill {
      background-color: $color-white;
    }

    &:-webkit-autofill {
      background-color: $color-white;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

@include media-lg {
  .map-block {
    flex-direction: row;

    &__content {
      min-width: 657px;
    }

    &__title {
      font-size: 60px;
      line-height: 60px;
      margin: 57px 60px 29px 60px;
    }

    &__map {
      min-height: 900px;
      width: 100%;
      height: 100%;
    }

    &__input-container {
      margin: 0 60px;
    }

    &__slider {
      margin: 23px 60px 16px 60px;
    }

    &__slider-text {
      font-size: 20px;
      line-height: 32px;
    }
  }

  .form-input {
    &__icon {
      width: 20px;
      height: 20px;
    }

    &__button-icon {
      width: 30px;
      height: 30px;

      &--close {
        width: 15px;
        height: 15px;
      }

      &:hover {
        color: $color-pink;
      }
    }

    & :deep(.app-input__container) {
      height: 70px;
    }

    & :deep(.app-input__control) {
      &::placeholder {
        font-size: 20px;
        line-height: 32px;
      }
    }
  }
}

@include media-xxxl {
  .map-block {
    max-width: 1800px;
    margin: 0 auto;
  }
}
</style>
