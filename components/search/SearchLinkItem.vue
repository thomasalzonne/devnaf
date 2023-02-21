<template>
  <div class="link-item">
    <NuxtLink
      v-if="item.type === 'category'"
      class="link-item__title link-item__title--link"
      :to="`/collections/${item.slug}`"
      >{{ item.title }}</NuxtLink
    >
    <p v-else class="link-item__title">{{ item?.title }}</p>
    <div v-if="item?.children?.length" class="link-item__children">
      <NuxtLink
        v-for="child in item?.children"
        :key="child?.slug"
        class="link-item__child"
        :to="`/collections/${child?.slug}`"
      >
        {{ child?.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { INavigationItem } from '~~/types/divat.interface'

interface IProps {
  item: INavigationItem
}

withDefaults(defineProps<IProps>(), {
  item: null,
})
</script>

<style lang="scss" scoped>
.link-item {
  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    text-transform: uppercase;
    transition: $easeOut200;

    &--link {
      &:hover {
        text-shadow: $color-pink -1px 1px;
      }
    }
  }

  &__children {
    display: flex;
    flex-direction: column;
  }

  &__child {
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    transition: $easeOut200;

    &:hover {
      text-shadow: $color-pink -1px 1px;
    }
  }
}
</style>
