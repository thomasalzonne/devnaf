<!-- eslint-disable vue/no-v-for-template-key -->
<template>
  <div class="app-breadcrumbs" :class="`app-breadcrumbs--${type}`">
    <NuxtLink to="/" class="app-breadcrumbs__item">{{
      $t('Breadcrumbs.home')
    }}</NuxtLink>
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
      <div class="app-breadcrumbs__icon-container">
        <SvgIcon class="app-breadcrumbs__arrow" name="simply_arrow" />
      </div>
      <NuxtLink :to="breadcrumb.path" class="app-breadcrumbs__item">
        {{ breadcrumb.name }}
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'
import { IBreadcrumbs } from '~~/types/breadcrumbs.interface'

interface IProps {
  type?: 'default' | 'desktop-big'
}

withDefaults(defineProps<IProps>(), {
  type: 'default',
})

const breadcrumbsStore = useBreadcrumbsStore()

const breadcrumbs = computed<IBreadcrumbs[]>(() => {
  return breadcrumbsStore.breadcrumbs
})
</script>

<style lang="scss" scoped>
.app-breadcrumbs {
  display: flex;
  align-items: center;
  padding: 12px 20px 15px 20px;

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__arrow {
    width: 6px;
    height: 6px;
    color: $color-medium-grey;
    margin-left: 5px;
  }

  &__item {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 14px;
    line-height: 32px;
    color: $color-medium-grey;
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    text-transform: uppercase;

    &:not(:first-child) {
      margin-left: 5px;
    }

    &:last-child {
      text-decoration: none;
      pointer-events: none;
      max-width: 450px;
      width: auto;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@include media-lg {
  .app-breadcrumbs {
    padding: 0px 60px 12px 60px;

    &--desktop-big {
      .app-breadcrumbs {
        &__item {
          &:not(:first-child) {
            margin-left: 5px;
          }
        }

        &__arrow {
          margin-left: 5px;
        }
      }
    }

    &__item {
      &:not(:first-child) {
        margin-left: 5px;
      }
    }
  }
}

@include media-xxxl {
  .app-breadcrumbs {
    max-width: 1800px;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
