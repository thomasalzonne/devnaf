<template>
  <div class="catalog-wrapper">
    <CatalogGridControll
      :current-grid-view="currentGridView"
      @updateGrid="setGridView"
    />
    <CatalogTools
      :count="nbResults"
      :filters="filters"
      :sort="currentSortId"
      :facets="facets"
      :prices="prices"
      :sorting="sorting"
      :selected-price="selectedPrice"
      :init-filters="filters"
      :init-sort-id="currentSortId"
      @openFilters="toggleFilters"
      @deleteFilter="removeFilter"
      @prevSort="changeSort($event, 'prev')"
      @nextSort="changeSort($event, 'next')"
      @update="updateFilters"
    />

    <div
      class="container page-catalog__grid"
      :class="{
        'page-catalog__grid--small': currentGridView === EGridView.SMALL,
      }"
    >
      <ProductCard
        v-for="(product, productIndex) in products"
        :id="product.slug"
        :key="productIndex"
        :product="product"
        class="page-catalog__card"
        type="medium"
        @click="saveProductPosition(product.slug)"
      />

      <template v-if="loadingResults && nbResults < products?.length">
        <ProductCardLoading v-for="i in 4" :key="i" />
      </template>
    </div>

    <CatalogFiltersModal
      :is-open="isOpenFiltersModal"
      :facets="facets"
      :count="nbResults"
      :prices="prices"
      :sorting="sorting"
      :selected-price="selectedPrice"
      :init-filters="filters"
      :init-sort-id="currentSortId"
      @close="toggleFilters"
      @update="updateFilters"
      @reset="resetFilters"
    />
  </div>
</template>

<script lang="ts" setup>
import algoliasearch from 'algoliasearch'
import CatalogFiltersModal from '~/components/modals/CatalogFiltersModal.vue'
import CatalogTools from '~/components/catalog/CatalogTools.vue'
import ProductCard from '~/components/cards/ProductCard.vue'
import ProductCardLoading from '~/components/cards/ProductCardLoading.vue'
import CatalogGridControll from '~/components/catalog/CatalogGridControll.vue'
import { EGridView, SORT_TYPES } from '~~/constants/catalog'
import { useCollectionsStore } from '~~/store/collections'
import { scrollToTop } from '~~/utils/utils'

interface IProps {
  forSearch?: boolean
  search?: string
  category?: string
}

const props = withDefaults(defineProps<IProps>(), {
  forSearch: false,
  search: '',
  category: '',
})

const emit = defineEmits(['noResults', 'successSearch'])

const $router = useRouter()
const $route = useRoute()
const collectionsStore = useCollectionsStore()

const client = algoliasearch('AETSWGFZE8', 'a93cdba41341bb0687bc09a0b4568352')
const isOpenFiltersModal = ref(false)
const products = ref<any>([])
const nbResults = ref(0)
const page = ref(0)
const nbPages = ref(1)
const facets = ref<any>([])
const filters = ref<any>({})
const sorting = ref<any>({
  recommandations: true,
  news: false,
  price_asc: false,
  price_desc: false,
})

const prices = ref({
  min: 0,
  max: 9999,
})
const selectedPrice = ref<any>({
  min: 0,
  max: 9999,
})

const loadingResults = ref(false)
const scrolledElement = ref<any>(null)
const currentSortId = ref(SORT_TYPES.RECOMENDATIONS)
const currentGridView = ref(EGridView.BIG)

watch(
  () => props.search,
  async (value) => {
    resetProducts()

    if (value?.length === 0 && props.forSearch) {
      return
    }

    await searchProducts()
  }
)

watch(
  () => loadingResults.value,
  async (value) => {
    if (value && page.value < nbPages.value) {
      page.value++
      await searchProducts()
    }
  }
)

onMounted(() => {
  if (props.forSearch) {
    scrolledElement.value = document.querySelector('.search-modal__wrapper')

    if (scrolledElement.value?.length === 0) {
      return
    }

    scrolledElement.value?.addEventListener('scroll', handleCatalogScroll)
  } else {
    window.addEventListener('scroll', handleCatalogPageScroll)

    handleCatalogPageScroll()

    window.scrollTo({ top: 0 })

    if (
      collectionsStore.productId &&
      collectionsStore.scrollTop &&
      collectionsStore.slug === props.category &&
      !props.forSearch
    ) {
      location.hash = ''
      window.scrollTo({ top: collectionsStore.scrollTop })

      const interval = setInterval(() => {
        if (!loadingResults.value) {
          location.hash = '#' + collectionsStore.productId

          clearInterval(interval)
        }
      }, 100)
    } else {
      scrollToTop()

      collectionsStore.slug = props.category
      collectionsStore.scrollTop = 0
      collectionsStore.productId = null
      collectionsStore.hitsPerPage = 20
    }
  }
})

const saveProductPosition = (id: string) => {
  if (!props.forSearch) {
    collectionsStore.productId = id

    const scrollTop: number = Math.max(
      window.pageYOffset || 0,
      document.documentElement.scrollTop
    )

    collectionsStore.scrollTop = scrollTop
    collectionsStore.hitsPerPage = 1000
  }
}

onUnmounted(() => {
  if (props.forSearch) {
    scrolledElement.value?.removeEventListener('scroll', handleCatalogScroll)
  } else {
    $router.replace({ hash: null })

    window.removeEventListener('scroll', handleCatalogPageScroll)
  }
})

const toggleFilters = (): void => {
  isOpenFiltersModal.value = !isOpenFiltersModal.value
}

const searchProducts = async () => {
  if (page.value === nbPages.value) return

  const facet: any = []

  if (!props.forSearch) {
    facet.push('categories:' + props.category)
  }

  if (filters.value.sizes !== undefined && filters.value.sizes.length) {
    facet.push([])
    const facetIndex = facet.length - 1
    for (let index = 0; index < filters.value.sizes?.length; index++) {
      facet[facetIndex].push('sizes:' + filters.value.sizes[index])
    }
  }

  if (filters.value.color !== undefined && filters.value.color.length) {
    facet.push([])
    const facetIndex = facet.length - 1
    for (let index = 0; index < filters.value.color?.length; index++) {
      facet[facetIndex].push('color:' + filters.value.color[index])
    }
  }

  const priceRange =
    'price:' + selectedPrice.value.min + ' TO ' + selectedPrice.value.max

  const indexLabel = getSortingName()
  const index = client.initIndex(indexLabel)
  const hitsPerPage = !props.forSearch ? collectionsStore.hitsPerPage : 20

  await index
    .search(props.search, {
      filters: 'in_stock:true AND active:true AND ' + priceRange,
      facets: ['*'],
      facetFilters: facet,
      hitsPerPage,
      page: page.value,
    })
    .then((data) => {
      nbResults.value = data.nbHits
      nbPages.value = data.nbPages
      facets.value = data.facets

      if (page.value === 0) {
        products.value = data.hits
      } else {
        products.value = products.value.concat(data.hits)
      }

      prices.value.min =
        data.facets_stats !== undefined
          ? Math.floor(data.facets_stats.price.min)
          : 0
      prices.value.max =
        data.facets_stats !== undefined
          ? Math.floor(data.facets_stats.price.max)
          : 9999

      loadingResults.value = false

      if (props.forSearch && products.value?.length) {
        emit('successSearch', props.search)
      }

      if (!products.value?.length) emit('noResults')
    })
}

const getSortingName = () => {
  let indexLabel = 'dev_SPAIN'

  if (Object.keys(sorting.value).length) {
    if (sorting.value.price_asc) {
      indexLabel = 'dev_SPAIN_price_asc'
    }

    if (sorting.value.price_desc) {
      indexLabel = 'dev_SPAIN_price_desc'
    }

    if (sorting.value.news) {
      indexLabel = 'dev_SPAIN_newest'
    }
  }

  return indexLabel
}

const updateFilters = async (value: any) => {
  filters.value = value.filters
  selectedPrice.value.min = value.min
  selectedPrice.value.max = value.max
  updateSortingObject(value.sortId)
  page.value = 0

  if (!props.forSearch) {
    updateRouteQuery()
  }

  await searchProducts()
}

const updateSortingObject = (id: string) => {
  sorting.value[currentSortId.value] = false
  sorting.value[id] = true
  currentSortId.value = id
}

const removeFilter = async (filter: any) => {
  const index = filters.value[filter.type].indexOf(filter.value)
  if (index !== -1) {
    filters.value[filter.type].splice(index, 1)

    if (!props.forSearch) {
      updateRouteQuery()
    }

    await searchProducts()
  }
}

const resetFilters = async () => {
  updateSortingObject(SORT_TYPES.RECOMENDATIONS)
  selectedPrice.value.min = 0
  selectedPrice.value.max = 9999
  filters.value = {}

  if (!props.forSearch) {
    await $router.replace({ query: undefined, hash: null })
  }

  await getQueryFromUrl(true)
}

const resetProducts = () => {
  products.value = []
  page.value = 0
}

const handleCatalogScroll = (e: any) => {
  const target = e.target
  const { scrollTop, clientHeight, scrollHeight } = target

  if (scrollTop + clientHeight + 1 >= scrollHeight && !loadingResults.value) {
    loadingResults.value = true
  }
}

const handleCatalogPageScroll = () => {
  const scrollTop = Math.max(
    window.pageYOffset || 0,
    document.documentElement.scrollTop
  )
  const clientHeight = window.innerHeight
  const scrollHeight = document.querySelector('.catalog-wrapper')?.clientHeight

  if (scrollTop + clientHeight + 1 >= scrollHeight && !loadingResults.value) {
    loadingResults.value = true
  }
}

const updateRouteQuery = () => {
  const query: any = {}

  Object.keys(filters.value).forEach((key) => {
    query[key] = [...filters.value[key]]
  })

  Object.keys(selectedPrice.value).forEach((key) => {
    query[key] = selectedPrice.value[key]
  })

  if (currentSortId.value) {
    query.sort = currentSortId.value
  }

  Object.keys(query).forEach((key) => {
    if (!query[key]) delete query[key]
  })

  $router.replace({ query, hash: null })
}

const getQueryFromUrl = async (reset: boolean = false) => {
  const query = { ...$route.query }

  if (!Object.keys(query).length) {
    await searchProducts()

    return
  }

  const selectedOptions: any = {
    filters: {
      color: [],
      sizes: [],
    },
    sortId: SORT_TYPES.RECOMENDATIONS,
    min: 0,
    max: 9999,
  }

  if (query?.color) {
    if (Array.isArray(query.color)) {
      selectedOptions.filters.color = [...query.color]
    } else {
      selectedOptions.filters.color = [query.color]
    }
  }

  if (query?.sizes) {
    if (Array.isArray(query.sizes)) {
      selectedOptions.filters.sizes = [...query.sizes]
    } else {
      selectedOptions.filters.sizes = [query.sizes]
    }
  }

  if (query?.min) {
    selectedOptions.min = query.min || 0
  }

  if (query?.max) {
    selectedOptions.max = query.max || 9999
  }

  if (query?.sort) {
    updateSortingObject(query.sort.toString())
    selectedOptions.sortId = query.sort
  }

  filters.value = selectedOptions.filters
  selectedPrice.value.min = selectedOptions.min
  selectedPrice.value.max = selectedOptions.max
  updateSortingObject(selectedOptions.sortId)

  if (!props.forSearch && reset) {
    updateRouteQuery()
  }

  await searchProducts()
}

const changeSort = async (id: string, action: string) => {
  const keys = Object.keys(sorting.value)
  let newKey: any = ''

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== id) {
      sorting.value[keys[i]] = false
      continue
    }

    if (action === 'prev') newKey = getPrevObjectKey(keys, i)
    else newKey = getNextObjectKey(keys, i)
  }

  updateSortingObject(newKey)
  page.value = 0

  if (!props.forSearch) {
    updateRouteQuery()
  }

  await searchProducts()
}

const getPrevObjectKey = (keys: string[], index: number) => {
  if (index > 0) {
    return keys[index - 1]
  }

  if (index === 0) {
    return keys[keys.length - 1]
  }
}

const getNextObjectKey = (keys: string[], index: number) => {
  if (index < keys.length - 1) {
    return keys[index + 1]
  }

  if (index === keys.length - 1) {
    return keys[0]
  }
}

const setGridView = (key: EGridView) => {
  currentGridView.value = key
}

if (props.forSearch) {
  await searchProducts()
} else {
  await getQueryFromUrl()
}
</script>

<style lang="scss" scoped>
.page-catalog {
  overflow: hidden;
  position: relative;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    row-gap: 18px;
    column-gap: 16px;
    margin: 20px;
  }

  &__card {
    min-width: 152px;
    width: 100%;

    & :deep(.product-card) {
      width: 100%;
    }

    & :deep(.product-card__container) {
      width: 100%;
    }
  }
}

.catalog-wrapper {
  position: relative;
}

@include media-sm {
  .page-catalog {
    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }
  }
}

@include media-md {
  .page-catalog {
    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }

    &__card {
      min-width: 240px;
    }
  }
}

@include media-lg {
  .page-catalog {
    &__grid {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 25px;
      row-gap: 42px;
      max-width: 1800px;
      margin: 0 auto;
      padding: 0 60px;

      &--small {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
    }

    &__card {
      min-width: 260px;
    }
  }
}

@include media-xxl {
  .page-catalog {
    &__grid {
      max-width: 1800px;
      margin: 0 auto;
      padding: 0;
    }
  }
}
</style>
