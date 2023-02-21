<template>
  <div class="map-stores">
    <p class="map-stores__text">
      {{ stores.length }} tiendas y cornes encontrados:
    </p>
    <div class="map-stores__list">
      <MapStoreItem
        v-for="(store, index) in stores"
        :key="index"
        :store="store"
        :day="day"
        :days="days"
        :date="date"
        @showStore="showStore"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MapStoreItem from '~/components/blocks/MapStoreItem.vue'

export default defineComponent({
  name: 'MapStores',
  components: {
    MapStoreItem,
  },
  props: {
    stores: {
      type: Array,
      default: () => {
        return []
      },
    },
    selectedPlaceCoordinates: {
      type: [Object, null],
      default: () => {
        return {
          lat: 0,
          lng: 0,
        }
      },
    },
  },
  data() {
    return {
      date: new Date(),
      day: null,
      days: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
    }
  },
  created() {
    this.day = this.days[this.date.getDay()]
  },
  methods: {
    showStore(store) {
      this.$emit('showStore', store)
    },
  },
})
</script>

<style lang="scss" scoped>
.map-stores {
  display: none;
}

@include media-lg {
  .map-stores {
    display: block;
    padding: 24px 60px;
    border-top: 1px solid $color-medium-grey;

    &__list {
      max-height: 450px;
      overflow-y: scroll;
      padding-right: 20px;
      margin-top: 25px;

      &::-webkit-scrollbar {
        width: 11px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 30px;
        background-color: $color-light-grey;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $color-black;
        border-radius: 30px;
      }
    }
  }
}
</style>
