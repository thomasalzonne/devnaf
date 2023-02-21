<template>
  <div class="accordion-filter__accordion">
    <div class="accordion-filter__header" @click="toggleAccordion">
      <p class="accordion-filter__title">{{ title }}</p>
      <div class="accordion-filter__buttons">
        <button class="accordion-filter__button">{{ btnTitle }}</button>
        <button v-if="collapsable" class="accordion-filter__toggle-button">
          <SvgIcon
            class="accordion-filter__toggle-button-icon"
            :name="isOpen ? 'minus' : 'plus'"
          />
        </button>
      </div>
    </div>
    <div v-if="isOpen" class="accordion-filter__content">
      <slot />
    </div>
    <div class="accordion-filter__separator"></div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AccordionFilter',
  props: {
    title: {
      type: String,
      default: '',
    },
    btnTitle: {
      type: String,
      default: '',
    },
    collapsable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: true,
    }
  },
  methods: {
    toggleAccordion(): void {
      if (this.collapsable) {
        this.isOpen = !this.isOpen
      }
    },
  },
})
</script>

<style lang="scss">
.accordion-filter {
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid $color-medium-grey;
    padding: 0px 8px 0px 0px;
    cursor: pointer;
    margin-top: 16px;
  }

  &__title {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 20px;
    line-height: 44px;
    font-family: $font-secondary;
  }

  &__buttons {
    display: flex;
    align-items: center;
  }

  &__button {
    color: $color-pink;
    font-size: 14px;
    line-height: 30px;
    text-align: right;
    font-weight: 500;
    text-decoration: underline;
  }

  &__toggle-button {
    margin-left: 15px;
  }

  &__toggle-button-icon {
    width: 20px;
    height: 20px;
  }
  &__separator {
    margin-top: 24px;
    border-bottom: 1px solid $color-medium-grey;
    width: calc(100% - 20px);
  }
}
</style>
