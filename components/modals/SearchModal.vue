<template>
  <div
    v-if="isOpen"
    class="search-modal"
    :style="{
      height: !isMobile ? `calc(100vh -${headerHeight})px` : null,
      top: !isMobile ? `${headerHeight}px` : null,
    }"
  >
    <div class="search-modal__wrapper">
      <div v-if="state === 'start'" class="search-modal__header">
        <button class="search-modal__close" @click="closeModal">
          <span class="search-modal__close-title">
            {{ $t('Common.close') }}
          </span>
          <div class="search-modal__close-icon-container">
            <SvgIcon class="search-modal__close-icon" name="close" />
          </div>
        </button>
      </div>
      <div class="search-modal__body">
        <div v-if="state === 'no_results'" class="search-modal__no-results">
          {{ $t('Search.no_results', { n: search }) }}
        </div>

        <div
          v-if="state == 'start' || state === 'no_results'"
          class="search-modal__recommendations"
        >
          <div class="search-modal__side">
            <div v-if="latestSearches?.length" class="search-modal__latest">
              <p class="search-modal__latest-label">
                ⚡️{{ $t('Search.latest_searches') }}
              </p>
              <div
                v-for="(last, i) in latestSearches"
                :key="last"
                class="search-modal__latest-container"
              >
                <button
                  class="search-modal__latest-item"
                  @click="setLatest(last)"
                >
                  {{ last }}
                </button>
                <button
                  class="search-modal__cross-container"
                  @click="deleteLatest(i)"
                >
                  <SvgIcon class="search-modal__cross" name="close" />
                </button>
              </div>
            </div>
            <template v-if="suggestions?.length">
              <SearchLinkItem
                v-for="(item, index) in suggestions"
                :key="index"
                :item="item"
              />
            </template>
          </div>
          <div class="search-modal__banners">
            <div class="banner">
              <img
                class="banner__img"
                src="~/assets/images/search_banner.png"
                alt="Banner"
              />
              <div class="banner__content">
                <p class="banner__name">Spécial</p>
                <p class="banner__description">SAINT VALENTIN</p>
              </div>
            </div>
            <NoveltyBlock id="search_novelty" />
          </div>
        </div>

        <div v-if="state === 'no_results'" class="search-modal__novelty">
          <NoveltyBlock id="search_novelty" />
        </div>

        <div v-if="state == 'searching'" class="search-modal__catalog">
          <CatalogWrapper
            :for-search="true"
            :search="search"
            @successSearch="handleSuccessSearch"
            @noResults="handleNoResults"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CatalogWrapper from '~~/components/catalog/CatalogWrapper.vue'
import NoveltyBlock from '~/components/blocks/NoveltyBlock.vue'
import SearchLinkItem from '~/components/search/SearchLinkItem.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import { INavigationItem } from '~~/types/divat.interface'
import { useCommonStore } from '~~/store/common'

const LS_LATEST_SEARCH = 'latest_search'

enum ESearchState {
  START = 'start',
  SEARCHING = 'searching',
  NO_RESULTS = 'no_results',
}

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()
const commonStore = useCommonStore()

const state = ref(ESearchState.START)
const latestSearches = ref<string[]>([])

const search = computed<string>(() => {
  return route.query?.search?.toString() || ''
})

const suggestions = computed<INavigationItem[]>(() => {
  return commonStore.data?.navigations?.main || []
})

const isOpen = computed(() => {
  return layoutStore.modals[EModals.SEARCH]
})

const isMobile = computed(() => {
  return layoutStore.isMobile
})

const headerHeight = computed(() => {
  return layoutStore.headerHeight
})

watch(
  () => isOpen.value,
  (value: boolean) => {
    if (value) {
      useLayoutStore().openModal(EModals.SEARCH)

      if (value) {
        state.value =
          search.value.length > 2 ? ESearchState.SEARCHING : ESearchState.START
      }
    } else {
      useLayoutStore().closeModal(EModals.SEARCH)
    }
  }
)

watch(
  () => route.path,
  () => {
    closeModal()
  }
)

watch(
  () => search.value,
  (value: string) => {
    state.value = value.length > 2 ? ESearchState.SEARCHING : ESearchState.START
  }
)

const closeModal = () => {
  const query = { ...route.query }

  delete query.search

  router.replace({ query })

  layoutStore.closeModal(EModals.SEARCH)
}

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
.search-modal {
  position: fixed;
  top: 60px;
  left: 0;
  background-color: $color-white;
  width: 100%;
  height: calc(100vh - 60px);
  z-index: $z-index-modal;

  &__wrapper {
    height: auto;
    max-height: calc(100vh - 60px);
    overflow-y: scroll;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 13px 20px;
  }

  &__body {
    margin: 0 0px 31px 0px;
    padding-bottom: 80px;
    height: 100%;
  }

  &__categories {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 44px;
    row-gap: 6px;
  }

  &__category {
    position: relative;
    &--with-badge {
      padding-right: 10px;
    }
  }

  &__category-title {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
  }

  &__badge {
    position: absolute;
    top: -10px;
    right: -17px;
    background-color: $color-green;
    min-width: 31px;
  }

  &__input-container {
    padding: 15px 20px 0 20px;
    width: 100%;
  }

  &__input {
    width: 100%;
    max-width: 100%;
  }

  &__recommendations {
    display: flex;
    gap: 34px;
    width: 100%;
    padding: 36px 20px 20px 20px;
  }

  &__recommendation-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    color: $color-black;
  }

  &__recommendation-item {
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
  }

  &__recommendation-image {
    width: 100%;
    margin-top: 30px;
    padding: 0;

    img {
      width: 100%;
    }
  }

  &__recommendation-description {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-dark-grey;
  }

  &__scroll-button {
    margin-top: auto;
  }

  &__catalog {
    width: 100%;
    padding-bottom: 120px;
  }

  &__no-results {
    font-weight: 400;
    font-size: 18px;
    line-height: 44px;
    padding: 13px 60px 0 60px;
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
  }

  &__latest-item {
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
  }

  &__latest-label {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    text-transform: uppercase;
  }

  &__latest-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__side {
    min-width: 210px;
  }
}

@include media-sm {
  .search-modal {
    &__input {
      max-width: 536px;
      margin: 0 auto;
    }
  }
}

@include media-lg {
  .search-modal {
    top: 95px;
    height: calc(100vh - 95px);

    &__header {
      margin: 13px auto;
      padding: 0 44px 0 60px;
      width: 100%;
    }

    &__body {
      margin-bottom: 12px;
    }

    &__categories {
      gap: 33px;
      margin-top: -9px;
    }

    &__category {
      &--with-badge {
        padding-right: 0;
      }
    }

    &__badge {
      top: -9px;
      right: -27px;
    }

    &__input {
      margin-top: 9px;
    }

    &__recommendations {
      margin-top: 12px;
      padding: 0px 44px 50px 61px;
    }

    &__recommendation-description {
      margin-top: 3px;
    }

    &__input-container {
      padding-top: 20px;
    }

    &__banners {
      width: 100%;
    }
  }
}

.banner {
  width: 100%;
  position: relative;

  &__img {
    width: 100%;
  }

  &__content {
    position: absolute;
    bottom: 72px;
    left: 60px;
  }

  &__name {
    color: $color-white;
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 36px;
    line-height: 44px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }

  &__description {
    color: $color-white;
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 48px;
    line-height: 44px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    margin-top: 18px;
  }
}
</style>
