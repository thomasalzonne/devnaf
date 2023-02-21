<template>
  <div id="page_orders" class="page-orders">
    <p class="page-orders__heading">{{ $t('Account.orders') }}</p>
    <AccountMobilePageHeader
      :title="$t('Account.my_orders')"
      icon="bag_outline"
      @back="goBack"
    />
    <div
      class="page-orders__container"
      :class="{ 'page-orders__container--empty': !isOrders }"
    >
      <AccountOrdersEmpty v-if="!isOrders" />
      <div v-else class="page-orders__content">
        <div class="page-orders__list">
          <div class="page-orders__list-heading">
            {{ $t('Account.my_orders') }}
          </div>
          <div class="page-orders__list-body">
            <AccountOrderItem
              v-for="order in orders"
              :key="order.id"
              :order="order"
            />
          </div>
        </div>
        <div v-if="isLoading" class="page-orders__loader">
          <AppLoader />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AccountOrdersEmpty from '~/components/account/AccountOrdersEmpty.vue'
import AccountOrderItem from '~/components/account/AccountOrderItem.vue'
import AppLoader from '~/components/common/AppLoader.vue'

import { useOrdersStore } from '~/store/orders'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'
import { IOrderListItem } from '~~/types/orders.interface'

definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const ordersStore = useOrdersStore()
const breadcrumbsStore = useBreadcrumbsStore()
const router = useRouter()

const isLoading = ref<boolean>(false)
const page = ref<number>(1)

await useAsyncData('fetchOrders', () => ordersStore.fetchOrders())

const orders = computed<IOrderListItem[]>(() => {
  return ordersStore.orders || []
})

const totalItems = computed<number>(() => {
  return ordersStore.totalItems || 0
})

const isOrders = computed<boolean>(() => {
  return !!orders.value.length
})

const fetchOrders = async (): Promise<void> => {
  await ordersStore.fetchOrders(page.value)

  isLoading.value = false
}

const handleCatalogScroll = (): void => {
  const scrollTop: number = Math.max(
    window.pageYOffset || 0,
    document.documentElement.scrollTop
  )
  const clientHeight: number = window.innerHeight
  const scrollHeight: number =
    document.querySelector('#page_orders').clientHeight

  if (
    scrollTop + clientHeight + 1 >= scrollHeight &&
    !isLoading.value &&
    orders.value.length < totalItems.value
  ) {
    isLoading.value = true
  }
}

const goBack = () => {
  router.back()
}

watch(
  () => isLoading.value,
  (value: boolean) => {
    if (value && orders.value.length < totalItems.value) {
      page.value++

      fetchOrders()
    }
  }
)

onMounted(() => {
  window.addEventListener('scroll', handleCatalogScroll, { passive: true })

  breadcrumbsStore.updateBreadcrumbs([
    {
      name: t('Breadcrumbs.account'),
      path: '/account',
    },
  ])
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleCatalogScroll)
})
</script>

<style lang="scss" scoped>
.page-orders {
  &__heading {
    display: none;
  }

  &__container {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
    min-height: calc(100vh - $header-height-mobile - 40px);

    &--empty {
      display: block;
    }
  }

  &__content {
    width: 100%;
  }

  &__list-heading {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 44px;
    padding: 10px 18px 7px 18px;
    border-bottom: 1px solid $color-medium-grey;
  }

  &__list {
    border: 1px solid $color-medium-grey;
    border-radius: 10px;
  }

  &__empty {
    margin-top: 100px;
  }

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
}

@include media-lg {
  .page-orders {
    &__heading {
      display: block;
      font-family: $font-secondary;
      font-weight: 480;
      font-size: 36px;
      line-height: 44px;
      margin-bottom: 30px;
      margin-left: 12px;
    }

    &__container {
      margin: 0;
      margin-top: 10px;
      padding: 0px;
      display: block;
      max-width: 784px;
      min-height: 100%;
    }

    &__list-heading {
      font-family: $font-primary;
      font-weight: 900;
      font-size: 20px;
      line-height: 22px;
      padding: 18px 20px;
    }

    &__list-body {
      padding: 10px 33px 10px 24px;
    }
  }
}
</style>
