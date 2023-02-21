<template>
  <div class="faq-item" :class="{ 'faq-item--active': isActive }">
    <div class="faq-item__header" @click="changeActiveIndex">
      <p class="faq-item__title">{{ index }}. Test</p>
      <div class="faq-item__icon-container">
        <SvgIcon class="faq-item__icon" :name="isActive ? 'minus' : 'plus'" />
      </div>
    </div>
    <div v-if="isActive" class="faq-item__body">
      <FaqSubitem
        v-for="i in 1"
        :key="i"
        class="faq-item__subitem"
        :index="i"
        :active-index="activeSubIndex"
        @changeActiveIndex="changeActiveSubIndex"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FaqSubitem from '~/components/common/FaqSubitem.vue'

interface IProps {
  index: number
  activeIndex: number
}

const props = withDefaults(defineProps<IProps>(), {
  index: 1,
  activeIndex: null,
})

const activeSubIndex = ref<number>(null)

const emit = defineEmits(['changeActiveIndex'])

const isActive = computed(() => {
  return props.activeIndex === props.index
})

const changeActiveIndex = () => {
  emit('changeActiveIndex', props.index)
}

const changeActiveSubIndex = (index: number) => {
  activeSubIndex.value === index
    ? (activeSubIndex.value = null)
    : (activeSubIndex.value = index)
}
</script>

<style lang="scss" scoped>
.faq-item {
  border: 1px solid $color-medium-grey;

  &:first-child {
    border-radius: 10px 10px 0 0;
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
  }

  &:not(:last-child) {
    border-bottom: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 13px 23px;
  }

  &__title {
    font-weight: 900;
    font-size: 14px;
    line-height: 22px;
  }

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 10px;
    height: 10px;
  }

  &__body {
    padding: 0px 8px 12px 8px;
  }

  &__subitem {
    &:not(:first-child) {
      margin-top: 15px;
    }
  }
}

@include media-lg {
  .faq-item {
    border: 1px solid $color-medium-grey;
    border-radius: 10px;

    &:first-child {
      border-radius: 10px;
    }

    &:last-child {
      border-radius: 10px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $color-medium-grey;
    }

    &--active {
      .faq-item {
        &__header {
          border-bottom: 1px solid $color-light-grey;
        }
      }
    }

    &__header {
      padding: 17px 25px 17px 31px;
    }

    &__title {
      font-size: 20px;
      line-height: 22px;
    }

    &__icon {
      width: 18px;
      height: 18px;
    }

    &__body {
      padding: 18px 28px 28px 25px;
    }

    &__subitem {
      &:not(:first-child) {
        margin-top: 17px;
      }
    }
  }
}
</style>
