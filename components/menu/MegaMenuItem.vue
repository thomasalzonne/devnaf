<template>
  <NuxtLink :to="linkTo" class="menu-item">
    {{ item?.title }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import { INavigationItem } from '~~/types/divat.interface'

interface IProps {
  item: INavigationItem
}

const props = withDefaults(defineProps<IProps>(), {
  item: null,
})

const linkTo = computed(() => {
  const slugRaw = props?.item?.slug || ''

  return props.item?.type === 'category'
    ? `/collections/${slugRaw}`
    : `/${slugRaw}`
})
</script>

<style lang="scss" scoped>
.menu-item {
  display: block;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  transition: $easeOut200;
  max-width: 156px;

  &:hover {
    text-shadow: $color-pink -1px 1px;
  }
}
</style>
