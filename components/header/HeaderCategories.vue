<template>
  <div
    class="header-categories"
    :class="{ 'header-categories--opacity': isOpacity }"
  >
    <button
      v-for="item in categories"
      :key="item.slug"
      class="header-categories__link"
      @click="selectCategory(item)"
      @mouseenter="openMenu(item)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { INavigationItem } from '~~/types/divat.interface'

interface IProps {
  categories: INavigationItem[]
  isOpacity: boolean
}

withDefaults(defineProps<IProps>(), {
  categories: null,
  isOpacity: false,
})
const emit = defineEmits(['select-category'])

const selectCategory = (item: INavigationItem) => {
  item.type === 'category'
    ? navigateTo(`/collections/${item.slug}`)
    : emit('select-category', item)
}

const openMenu = (item: INavigationItem) => {
  if (item.type !== 'blank') return

  emit('select-category', item)
}
</script>

<style lang="scss" scoped>
.header-categories {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;

  &--opacity {
    .header-categories__link {
      color: $color-white;
    }
  }

  &__link {
    font-weight: 460;
    font-size: 14px;
    line-height: 32px;
    text-transform: uppercase;
    transition: $easeOut200;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--active {
      text-shadow: $color-pink -1px 1px;
    }

    &:hover {
      text-shadow: $color-pink -1px 1px;
    }
  }
}
</style>
