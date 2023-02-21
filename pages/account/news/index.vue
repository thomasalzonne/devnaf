<template>
  <div class="page-news">
    <div v-if="isNewsList" class="page-news__content">
      <div class="page-news__list">
        <AccountNewsCard v-for="i in 4" :key="i" class="page-news__card" />
      </div>
      <div class="page-news__internal">
        <AccountInternalNews v-if="isShowInternalNews" />
      </div>
    </div>
    <div v-else class="page-news__empty">
      <div class="page-news__icon-container">
        <SvgIcon class="page-news__icon" name="news" />
      </div>
      <p class="page-news__empty-text">{{ $t('Account.no_news_text') }}</p>
      <AppButton
        class="page-news__empty-button"
        :title="$t('Account.no_news_button')"
        btn-style="light"
        @click="showNews"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AccountNewsCard from '~/components/account/AccountNewsCard.vue'
import AccountInternalNews from '~/components/account/AccountInternalNews.vue'
import AppButton from '~/components/common/AppButton.vue'
import { lockBody, unlockBody } from '~~/utils/body-locker'
import { isMobile } from '~~/utils/mobile'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const isShowInternalNews = ref(false)
const isNewsList = ref(false)

const { t } = useI18n()
const $route = useRoute()
const breadcrumbsStore = useBreadcrumbsStore()

watch(
  () => $route.query,
  (value) => {
    isShowInternalNews.value = Boolean(value.news)

    if (isMobile()) {
      isShowInternalNews.value ? lockBody() : unlockBody()
    }
  },
  { immediate: true }
)

const showNews = () => {
  isNewsList.value = true
}

onMounted(() => {
  breadcrumbsStore.updateBreadcrumbs([
    {
      name: t('Breadcrumbs.account'),
      path: '/account',
    },
    {
      name: t('Breadcrumbs.news'),
      path: '/account/news',
    },
  ])
})
</script>

<style lang="scss" scoped>
.page-news {
  &__list {
    margin: 0 20px;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 60px;
  }

  &__empty-text {
    color: $color-medium-grey;
    font-weight: 400;
    text-align: center;
    line-height: 22px;
    font-size: 14px;
    margin-top: 8px;
  }

  &__icon {
    width: 200px;
    height: 200px;
    color: $color-light-grey;
  }

  &__empty-button {
    margin-top: 50px;
    max-width: 182px;
    font-size: 12px;
  }

  & :deep(.app-button__title) {
    font-size: 18px !important;
  }
}

@include media-lg {
  .page-news {
    padding: 60px;
    min-height: 600px;

    &__header {
      margin-bottom: 60px !important;
      margin-top: 0 !important;
    }

    &__content {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 100px;
    }

    &__list {
      width: 100%;
      margin: 0px 30px 30px;
    }

    &__icon {
      width: 340px;
      height: 340px;
    }

    &__empty {
      margin-top: 140px;
      margin-left: -41px;
    }
  }
}

@include media-xl {
  .page-news {
    padding: 60px 88px 60px 173px;

    &__header {
      column-gap: 17px !important;
    }

    &__content {
      gap: 198px;
    }
  }
}
</style>
