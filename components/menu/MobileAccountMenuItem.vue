<template>
  <div class="mobile-account-nav-item">
    <NuxtLink
      v-if="item?.to"
      class="mobile-account-nav-item__button"
      :class="{
        'mobile-account-nav-item__button--active': item.scope === activeScope,
        'mobile-account-nav-item__button--disabled': item.disable,
      }"
      :to="item.to"
      @click="setActiveScope"
    >
      <div v-if="item.iconName" class="mobile-account-nav-item__icon-container">
        <SvgIcon class="mobile-account-nav-item__icon" :name="item.iconName" />
      </div>

      <span class="mobile-account-nav-item__title">{{ item?.title }}</span>
    </NuxtLink>
    <button
      v-else
      class="mobile-account-nav-item__button"
      :class="{
        'mobile-account-nav-item__button--active': activeScope === item.scope,
      }"
      :disabled="item.disable"
      @click="item.callback ? handleClick() : toggleChildren()"
    >
      <SvgIcon
        v-if="item.iconName"
        class="mobile-account-nav-item__icon"
        :name="item.iconName"
      />
      <span class="mobile-account-nav-item__title">{{ item?.title }}</span>
      <SvgIcon
        v-if="item?.children?.length"
        class="mobile-account-nav-item__arrow"
        :class="{ 'mobile-account-nav-item__arrow--active': isShowChildren }"
        name="chevron"
      />
    </button>
    <template v-if="item?.children?.length">
      <div v-show="isShowChildren" class="mobile-account-nav-item__children">
        <MobileAccountMenuItem
          v-for="(children, i) in item.children"
          :key="i"
          class="mobile-account-nav-item__child"
          :active-scope="activeScope"
          :item="children"
          @setActiveScope="setActiveScope"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { IProfileNavigationItem } from '~/types/profile.interface'
interface IProps {
  item: IProfileNavigationItem
  activeScope: string
}

const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits(['click', 'setActive', 'setActiveScope'])

const isShowChildren = ref(false)

const route = useRoute()

const isActive = computed(() => {
  return props?.item?.to && route.fullPath === props?.item?.to
})

watch(
  () => isActive.value,
  (value: boolean) => {
    if (value) {
      emit('setActive', value)
    }
  }
)

watch(
  () => props.activeScope,
  (value: string) => {
    if (props.item?.children?.length && value === props.item.scope) {
      isShowChildren.value = true
    }
  },
  { immediate: true }
)

const toggleChildren = () => {
  isShowChildren.value = !isShowChildren.value
}

const handleClick = () => {
  emit('click', props?.item?.callback)
}

const setActiveScope = () => {
  emit('setActiveScope', props.item.scope)
}
</script>

<style lang="scss">
.mobile-account-nav-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid $color-grey-lighten;
  padding: 12px 0 14px 6px;

  &__button {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--active {
      .mobile-account-nav-item {
        &__title {
          color: $color-pink;
          font-weight: 460;
        }

        &__icon {
          color: $color-pink;
        }

        &__arrow {
          color: $color-pink;
        }
      }
    }
  }

  .router-link-exact-active {
    .mobile-account-nav-item__title {
      color: $color-pink;
      font-weight: 460;
    }

    .mobile-account-nav-item__icon {
      color: $color-pink;
    }

    .mobile-account-nav-item__children {
      .mobile-account-nav-item__title {
        color: $color-black;
      }
    }
  }

  &__icon-container {
    width: 14px;
    height: 14px;
  }

  &__icon {
    width: 14px;
    height: 14px;
  }

  &__title {
    font-family: $font-secondary;
    text-align: left;
    font-weight: 460;
    font-size: 20px;
    line-height: 32px;
    text-transform: uppercase;
  }

  &__arrow {
    width: 10px;
    height: 10px;
    margin-left: auto;
    transform: rotate(-90deg);

    &--active {
      transform: rotate(180deg);
    }
  }

  &__children {
    display: flex;
    flex-direction: column;
    margin-top: 5px;

    .mobile-account-nav-item {
      border-bottom: none;
      padding: 0;

      &__button {
        &--active {
          .mobile-account-nav-item__title {
            color: $color-black;
          }
        }
      }
    }

    .router-link-exact-active {
      .mobile-account-nav-item {
        &__title {
          color: $color-black;
          font-weight: 700;
        }
      }
    }

    .mobile-account-nav-item__title {
      font-family: $font-primary;
      font-weight: 400;
      font-size: 16px;
      line-height: 30px;
      text-transform: none;
    }
  }
}
</style>
