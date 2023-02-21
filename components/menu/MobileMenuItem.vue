<template>
  <div
    class="menu-item"
    :class="{
      'menu-item--children': isChildren,
      'menu-item--active': isActive,
    }"
  >
    <button
      v-if="item?.type === 'blank'"
      class="menu-item__control"
      :class="{ 'menu-item__control--active': isActive }"
      @click="toggleItem"
    >
      <div class="menu-item__container">
        <p class="menu-item__title">
          {{ item?.title || '' }}
        </p>
        <div class="menu-item__icon-container">
          <SvgIcon class="menu-item__icon" name="chevron" />
        </div>
      </div>
      <div v-if="isActive" class="menu-item__children">
        <MobileMenuItem
          v-for="child in children"
          :key="child.slug"
          :item="child"
          :is-children="true"
          @closeMenu="closeMenu"
        />
      </div>
    </button>
    <NuxtLink
      v-if="item?.type === 'category'"
      class="menu-item__link"
      :to="itemLink"
      @click="closeMenu"
    >
      <p class="menu-item__link-title">
        {{ item?.title || '' }}
      </p>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { INavigationItem } from '~~/types/divat.interface'

defineComponent({
  name: 'MobileMenuItem',
})

interface IProps {
  item: INavigationItem
  isChildren: boolean
}

const emit = defineEmits(['closeMenu'])
const props = withDefaults(defineProps<IProps>(), {
  item: null,
  isChildren: false,
})

const isActive = ref(false)

const children = computed(() => {
  return props?.item?.children || []
})

const itemLink = computed(() => {
  return props?.item?.type === 'category'
    ? `/collections/${props.item?.slug}`
    : `/${props?.item?.slug}`
})

const toggleItem = () => {
  isActive.value = !isActive.value
}

const closeMenu = () => {
  emit('closeMenu')
}
</script>

<style lang="scss" scoped>
.menu-item {
  &:not(:last-child) {
    border-bottom: 1px solid $color-grey-lighten;
  }

  &:last-child {
    .menu-item__link {
      padding-bottom: 0;
    }
  }

  &--children {
    &:not(:last-child) {
      border: none;
    }

    .menu-item {
      &__control {
        padding: 0;
      }

      &__link {
        padding: 0;
      }

      &__link-title {
        font-family: $font-primary;
        font-weight: 400;
        font-size: 16px;
        line-height: 33px;
        padding: 0;
        color: $color-black !important;
        text-transform: none;
      }
    }
  }

  &--active {
    .menu-item {
      &__title {
        color: $color-pink;
      }

      &__icon {
        transform: rotate(180deg);
        color: $color-pink;
      }
    }
  }

  &__control {
    display: block;
    width: 100%;
    padding: 12px 0;
  }

  &__link {
    display: block;
    width: 100%;
    padding: 12px 0;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 20px;
    line-height: 32px;
    text-transform: uppercase;
    width: 100%;
    text-align: left;

    &:active {
      text-shadow: $color-pink -1px 1px;
    }
  }

  &__link-title {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 20px;
    line-height: 32px;
    text-transform: uppercase;
    width: 100%;
    text-align: left;

    &:active {
      text-shadow: $color-pink -1px 1px;
    }
  }

  &__icon-container {
    width: 10px;
    height: 10px;
  }

  &__icon {
    width: 10px;
    height: 10px;
  }
}
</style>
