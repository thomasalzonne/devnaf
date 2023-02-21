<template>
  <div class="mobile-search">
    <div
      class="mobile-search__input-container"
      :class="{ 'mobile-search__input-container--active': isActive }"
    >
      <SearchInput
        v-model="searchString"
        class="mobile-menu__search"
        placeholder="Chercher un produit"
        :is-active="isActive"
      />
      <div v-if="state === 'no_results'" class="mobile-search__no-results">
        {{ $t('Search.no_results', { n: search }) }}
      </div>
    </div>

    <template v-if="isActive">
      <div
        v-if="
          (state == 'start' && latestSearches?.length) ||
          (state === 'no_results' && latestSearches?.length)
        "
        class="mobile-search__latest"
      >
        <p class="mobile-search__latest-label">
          ⚡️ {{ $t('Search.latest_searches') }}
        </p>
        <div class="mobile-search__latest-items">
          <div
            v-for="(last, i) in latestSearches"
            :key="last"
            class="mobile-search__latest-container"
          >
            <button class="mobile-search__latest-item" @click="setLatest(last)">
              {{ last }}
            </button>
            <button
              class="mobile-search__cross-container"
              @click="deleteLatest(i)"
            >
              <SvgIcon class="mobile-search__cross" name="close" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="state === 'no_results'" class="mobile-search__novelty">
        <NoveltyBlock id="search_novelty" />
      </div>

      <div v-if="state == 'searching'" class="mobile-search__catalog">
        <CatalogWrapper
          :for-search="true"
          :search="search"
          @successSearch="handleSuccessSearch"
          @noResults="handleNoResults"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import CatalogWrapper from '~~/components/catalog/CatalogWrapper.vue'
import NoveltyBlock from '~/components/blocks/NoveltyBlock.vue'
import SearchInput from '~/components/common/SearchInput.vue'

const LS_LATEST_SEARCH = 'latest_search'

enum ESearchState {
  START = 'start',
  SEARCHING = 'searching',
  NO_RESULTS = 'no_results',
}

interface IProps {
  isActive: boolean
}

const route = useRoute()
const router = useRouter()

withDefaults(defineProps<IProps>(), {
  isActive: false,
})

const state = ref(ESearchState.START)
const latestSearches = ref<string[]>([])

const search = computed<string>(() => {
  return route.query?.search?.toString() || ''
})

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

watch(
  () => search.value,
  (value: string) => {
    state.value = value.length > 2 ? ESearchState.SEARCHING : ESearchState.START
  }
)

const handleNoResults = () => {
  state.value = ESearchState.NO_RESULTS
}

const handleSuccessSearch = (value: string) => {
  const lsLatestSearches = JSON.parse(localStorage.getItem(LS_LATEST_SEARCH))

  if (lsLatestSearches?.length) {
    if (lsLatestSearches.includes(value)) return

    const isInList = lsLatestSearches.find(
      (l: string) => l.includes(value) || value.includes(l)
    )

    if (isInList) {
      const index = lsLatestSearches.indexOf(isInList)
      let valueForSave = isInList

      if (valueForSave.length < value.length) {
        valueForSave = value
      }

      lsLatestSearches.splice(index, 1, valueForSave)

      localStorage.setItem(LS_LATEST_SEARCH, JSON.stringify(lsLatestSearches))

      latestSearches.value = [...lsLatestSearches]

      return
    }
  }

  if (lsLatestSearches) {
    localStorage.setItem(
      LS_LATEST_SEARCH,
      JSON.stringify([...lsLatestSearches, value])
    )

    latestSearches.value = [...lsLatestSearches, value]
  } else {
    localStorage.setItem(LS_LATEST_SEARCH, JSON.stringify([value]))

    latestSearches.value = [value]
  }
}

const setLatest = (item: string) => {
  const query = { ...route.query }

  query.search = latestSearches.value.find((i) => i === item)

  router.replace({ query })
}

const deleteLatest = (index: number) => {
  const lsLatest = JSON.parse(localStorage.getItem(LS_LATEST_SEARCH))

  lsLatest.splice(index, 1)

  latestSearches.value = lsLatest

  localStorage.setItem(LS_LATEST_SEARCH, JSON.stringify(lsLatest))
}

onMounted(() => {
  const lsLatestSearches = localStorage.getItem(LS_LATEST_SEARCH)

  if (lsLatestSearches) {
    latestSearches.value = [...JSON.parse(lsLatestSearches)]
  }
})
</script>

<style lang="scss" scoped>
.mobile-search {
  background-color: $color-white;
  width: 100%;

  &__input-container {
    padding: 20px;

    &--active {
      border-bottom: 0.5px solid $color-light-grey;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    }
  }

  &__catalog {
    position: relative;
    width: 100%;
    padding: 0 20px 20px;
  }

  &__no-results {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    margin-top: 16px;
  }

  &__novelty {
    max-width: 100vw;
  }

  &__close {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    text-decoration: underline;
  }

  &__close-icon-container {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: $color-light-grey;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__close-icon {
    width: 12px;
    height: 12px;
  }

  &__cross-container {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cross {
    width: 8px;
    height: 8px;
  }

  &__latest {
    margin-bottom: 30px;
    padding: 20px;
  }

  &__latest-item {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
  }

  &__latest-label {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  &__latest-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    border: 1px solid $color-black;
    border-radius: 50px;
    height: 31px;
    width: max-content;
    padding: 7px 12px 9px 14px;
  }

  &__latest-items {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__side {
    min-width: 210px;
  }

  & :deep() {
    .cataglog_tools__filters_mobile {
      margin: 0 auto;
      top: 10px;
    }

    .page-catalog__grid {
      margin: 0;
    }

    .unset {
      display: block;
      height: 0px;
      position: absolute;
      margin: 0 auto;
      width: 100%;
      top: 10px;
    }

    .product-card__container {
      width: 160px;
    }
  }
}

@include media-lg {
  .mobile-search {
    display: none;
  }
}
</style>
