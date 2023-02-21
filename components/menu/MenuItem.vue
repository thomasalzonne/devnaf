<template>
  <NuxtLink
    :to="category.slug || '/'"
    class="menu-item"
    :class="{
      'menu-item--disabled': false,
      'menu-item--active': false,
    }"
    @click="clearCollections"
  >
    <div class="menu-item__item-container">
      <div class="menu-item__item-title">
        <span v-if="category.name" class="menu-item__item-title">{{
          category.name
        }}</span>
        <img
          v-if="category.sliver"
          class="menu-item__item-img"
          :src="category.sliver"
          alt="Sun"
        />
        <!-- <AppBadge
          v-if="item.badgeValue"
          class="menu-item__badge"
          :value="item.badgeValue"
        /> -->
      </div>
      <!-- <template v-if="item.subcategories">
        <div class="menu-item__item-line"></div>
        <div class="menu-item__item-category-container">
          <div class="menu-item__item-category">
            <div
              class="menu-item__item-category-title menu-item__item-category-title--active"
            >
              Courtes
            </div>
            <div class="menu-item__item-category-title">Midi</div>
            <div class="menu-item__item-category-title">Longues</div>
            <div class="menu-item__item-category-title">Imprimées</div>
            <div class="menu-item__item-category-title">Fluides</div>
          </div>
        </div>
      </template> -->

      <SvgIcon class="menu-item__item-icon" name="simply_arrow" />
    </div>
    <!-- <p v-if="item.subtitle" class="menu-item__item-text">{{ item.subtitle }}</p> -->
  </NuxtLink>
</template>

<script lang="ts" setup>
import { useCollectionsStore } from '~~/store/collections'
import ICategory from '~~/types/category.interface'

interface IProps {
  category: ICategory
}

defineProps<IProps>()

const collectionsStore = useCollectionsStore()

const clearCollections = () => {
  collectionsStore.$reset()
}
</script>

<style lang="scss" scoped>
.menu-item {
  padding: 10px 10px 11px 10px;
  width: 100%;
  position: relative;
  display: block;

  &:not(:last-child) {
    border-bottom: 1px solid $color-medium-grey;
  }

  &--null-padding {
    padding-top: 0;
  }

  &--disabled {
    color: $color-dark-grey;
    font-size: 22px;

    .menu-item {
      &__item-title {
        font-size: 22px;
        span {
          font-size: 22px;
        }
      }
    }
  }

  &--active {
    .menu-item {
      &__item-line {
        display: none;
      }

      &__item-category-container {
        display: none;
      }
    }
  }

  &__badge {
    background-color: $color-navy;
    margin-top: 4px;
    margin-left: 5px;
    padding: 0px 2px 0 2px;
    min-width: 37px;

    & :deep(.badge__value) {
      font-weight: 700;
      font-size: 12px;
      line-height: 22px;
    }
  }

  &__item-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  &__item-title {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 25px;
    line-height: 44px;
    position: relative;
    display: flex;
    align-items: flex-start;

    span {
      font-family: $font-secondary;
      font-weight: 400;
      font-size: 25px;
      line-height: 44px;
    }
  }

  &__item-text {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    margin-top: -8px;
    text-align: left;
  }

  &__item-badge {
    margin-left: 4px;
  }

  &__item-icon {
    width: 15px;
    height: 15px;
    color: $color-black;
  }

  &__item-img {
    width: 26px;
    height: 26px;
    margin-left: 4px;
  }

  &__item-category {
    position: absolute;
    left: 0;
    top: 25%;
    width: 80px;
    display: flex;
    flex-direction: column;
    color: $color-black;
  }

  &__item-category-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    &:not(:last-child) {
      margin-bottom: 7px;
    }

    &--active {
      color: $color-pink;
    }
  }
}

@include media-lg {
  .menu-item {
    padding: 0px 10px;
    width: 100%;

    &:not(:last-child) {
      border-bottom: none;
    }

    &--active {
      color: $color-pink;

      .menu-item {
        &__item-title {
          display: flex;
          align-items: center;
          width: auto;
        }

        &__item-line {
          display: block;
          height: 1px;
          background-color: $color-pink;
          width: calc(100% - 169px);
          margin: 0 11px;
        }

        &__item-category-container {
          display: block;
          width: 121px;
          height: 44px;
          position: relative;
        }
      }
    }

    &__item-title {
      font-size: 20px;

      span {
        font-size: 20px;
      }
    }

    &__item-badge {
      margin-top: 6px;
    }

    &__item-icon {
      display: none;
    }

    &__item-text {
      margin-top: -15px;
      font-size: 14px;
    }
  }
}
</style>
