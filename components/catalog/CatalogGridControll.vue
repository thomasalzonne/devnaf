<template>
  <div class="grid-controll">
    <button
      class="grid-controll__controll"
      :class="{
        'grid-controll__controll--active': currentGridView === EGridView.BIG,
      }"
    >
      <SvgIcon
        class="grid-controll__controll-icon"
        name="grid_big"
        @click="setGridView(EGridView.BIG)"
      />
    </button>
    <button
      class="grid-controll__controll"
      :class="{
        'grid-controll__controll--active': currentGridView === EGridView.SMALL,
      }"
    >
      <SvgIcon
        class="grid-controll__controll-icon"
        name="grid_small"
        @click="setGridView(EGridView.SMALL)"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { EGridView } from '~~/constants/catalog'

interface IProps {
  currentGridView: string
}

withDefaults(defineProps<IProps>(), {
  currentGridView: 'small',
})

const emit = defineEmits(['updateGrid'])

const setGridView = (grid: EGridView) => {
  emit('updateGrid', grid)
}
</script>

<style lang="scss" scoped>
.grid-controll {
  background-color: $color-white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 10px;
  right: 8px;
  display: flex;
  align-items: center;
  padding: 10px 14px;
  gap: 9px;
  display: none;

  &__controll {
    width: 20px;
    height: 20px;

    &--active {
      .grid-controll__controll-icon {
        color: $color-black;
      }
    }
  }

  &__controll-icon {
    width: 20px;
    height: 20px;
    color: $color-medium-grey;
  }
}

@include media-xl {
  .grid-controll {
    display: flex;
  }
}
</style>
