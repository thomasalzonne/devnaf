<template>
  <div class="content-card" :class="{ 'content-card--hidden': !isOpen }">
    <div class="content-card__header" @click="toggleAccordion">
      <slot name="header" />
      <SvgIcon v-if="asAccordion" class="content-card__icon" name="chevron" />
    </div>
    <div v-if="isOpen" class="content-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  asAccordion?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  asAccordion: false,
})

const isOpen = ref(true)

const toggleAccordion = () => {
  if (!props.asAccordion) return

  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.content-card {
  border: 1px solid $color-medium-grey;
  border-radius: 8px;

  &--hidden {
    .content-card__header {
      border-bottom: none;
    }
    .content-card__icon {
      transform: rotate(0deg);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $color-light-grey;
    width: 100%;
  }

  &__icon {
    width: 7px;
    height: 7px;
    margin-right: 18px;
    margin-left: auto;
    transform: rotate(180deg);
  }
}
</style>
