<template>
  <div
    class="header-search"
    :class="{
      'header-search--active': isActive,
      'header-search--opacity': isOpacity,
    }"
  >
    <SearchInput
      v-model="searchString"
      :placeholder="$t('Search.input_placeholder')"
      :is-active="isActive"
      :is-opacity="isOpacity"
      @resetSearch="resetSearch"
      @onInputClick="handleClick"
    />
    <button
      v-if="searchString && isActive"
      class="header-search__clear"
      @click="closeSearch"
    >
      <SvgIcon class="header-search__clear-icon" name="close" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import SearchInput from '~/components/common/SearchInput.vue'

interface IProps {
  isActive: boolean
  isOpacity: boolean
}

const emit = defineEmits(['handleClick', 'closeSearch'])

withDefaults(defineProps<IProps>(), {
  isActive: false,
  isOpacity: false,
})

const route = useRoute()
const router = useRouter()

const searchString = computed<string>({
  get() {
    return route.query?.search?.toString() || ''
  },
  set(value: string) {
    const query = { ...route.query }

    if (!value) {
      delete query.search
    } else {
      query.search = value
    }

    router.replace({ query })
  },
})

const handleClick = () => {
  emit('handleClick')
}

const closeSearch = () => {
  emit('closeSearch')
}

const resetSearch = () => {
  searchString.value = ''
}
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: $color-light;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__clear-icon {
    width: 12px;
    height: 12px;
    color: $color-dark-grey;
  }
}
</style>
