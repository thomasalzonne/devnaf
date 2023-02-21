<template>
  <div class="nav-item">
    <NuxtLink
      v-if="item?.to"
      class="nav-item__button"
      :class="{
        'nav-item__button--active': item.scope === activeScope,
        'nav-item__button--disabled': item.disable,
      }"
      :to="item.to"
      @click="setActiveScope"
    >
      <SvgIcon
        v-if="item.iconName"
        class="nav-item__icon"
        :name="item.iconName"
      />
      <span class="nav-item__title">{{ item?.title }}</span>
    </NuxtLink>
    <button
      v-else
      class="nav-item__button"
      :class="{ 'nav-item__button--active': activeScope === item.scope }"
      :disabled="item.disable"
      @click="item.callback ? handleClick() : toggleChildren()"
    >
      <SvgIcon
        v-if="item.iconName"
        class="nav-item__icon"
        :name="item.iconName"
      />
      <span class="nav-item__title">{{ item?.title }}</span>
      <SvgIcon
        v-if="item?.children?.length"
        class="nav-item__arrow"
        :class="{ 'nav-item__arrow--active': isShowChildren }"
        name="chevron"
      />
    </button>
    <template v-if="item?.children?.length">
      <div v-show="isShowChildren" class="nav-item__children">
        <AccountNavigationItem
          v-for="(children, i) in item.children"
          :key="i"
          class="nav-item__child"
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
.nav-item {
  display: flex;
  flex-direction: column;
  width: 100%;

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
      .nav-item__title {
        font-weight: 700;
      }
    }
  }

  .router-link-exact-active {
    .nav-item__title {
      font-weight: 700;
    }
  }

  &__icon {
    width: 12px;
    height: 12px;
  }

  &__title {
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
  }

  &__arrow {
    width: 8px;
    height: 8px;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__children {
    display: flex;
    flex-direction: column;
    margin-left: 24px;

    .nav-item__title {
      font-weight: 400;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
