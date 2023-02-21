<template>
  <div v-if="isOpen" class="menu-category">
    <div class="menu-category__header" @click="closeCategory">
      <SvgIcon class="menu-category__header-icon" name="simply_arrow" />
      <span class="menu-category__header-title"
        >Soldes <span class="menu-category__header-title--small"> jusqu’à</span>
      </span>
      <AppSaleBadge class="menu-category__sale-badge" text="-70%" />
    </div>
    <AppAccordion class="menu-category__accordion" title="Robes">
      <div class="menu-category__subcategory">Robes imprimées</div>
      <div class="menu-category__subcategory">Robes unies</div>
      <div class="menu-category__subcategory">Toutes les robes</div>
    </AppAccordion>

    <AppAccordion class="menu-category__accordion" title="Tops">
      <div class="menu-category__subcategory">Robes imprimées</div>
      <div class="menu-category__subcategory">Robes unies</div>
      <div class="menu-category__subcategory">Toutes les robes</div>
    </AppAccordion>
    <div class="menu-category__item">Shorts</div>
    <div class="menu-category__item">Outlet</div>
    <div class="menu-category__item">Tout voir</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppAccordion from '~/components/common/AppAccordion.vue'
import AppSaleBadge from '~/components/common/AppSaleBadge.vue'

export default defineComponent({
  name: 'MenuCategory',
  components: {
    AppAccordion,
    AppSaleBadge,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    closeCategory(): void {
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
.menu-category {
  position: fixed;
  left: 0;
  top: 60px;
  background-color: $color-white;
  width: 100vw;
  height: calc(100vh - 132px);
  flex-direction: column;
  z-index: 100;
  display: flex;
  max-width: 360px;
  overflow: auto;

  &__header {
    background-color: $color-pink;
    color: $color-white;
    padding: 1px 20px 0px 17px;
    display: flex;
    align-items: center;
  }

  &__header-title {
    font-family: $font-secondary;
    font-size: 25px;
    line-height: 60px;
    font-weight: 400;
    margin-left: 16px;

    &--small {
      @extend .menu-category__header-title;
      font-size: 15px;
      margin-left: 6px;
    }
  }

  &__header-icon {
    width: 18px;
    height: 18px;
    transform: rotate(180deg);
  }

  &__subcategory {
    font-weight: 400;
    font-size: 20px;
    line-height: 49px;
  }

  &__item {
    font-family: $font-secondary;
    font-size: 25px;
    line-height: 44px;
    border-bottom: 1px solid $color-medium-grey;
    padding: 13px 4px 9px 11px;
    margin: 0 20px;
  }

  &__sale-badge {
    margin-left: 6px;
  }

  &__accordion {
    margin: 0px 20px;

    & :deep(.app-accordion) {
      padding: 13px 4px 9px 11px;
    }
  }
}

@include media-lg {
  .menu-category {
    display: none;
  }
}
</style>
