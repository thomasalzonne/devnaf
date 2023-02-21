<template>
  <div class="faq-page">
    <AccountMobilePageHeader
      icon="info"
      :title="$t('Account.need_help')"
      @back="goBack"
    />
    <div class="faq-page__header">
      <p class="account-page-header faq-page__heading">
        {{ $t('Account.need_help') }}
      </p>
      <div class="faq-page__search-container">
        <SearchInput
          :is-active="true"
          :placeholder="$t('Account.faq_search_placeholder')"
        />
      </div>
    </div>
    <div class="faq-page__body">
      <FaqItem
        v-for="i in 5"
        :key="i"
        class="faq-page__item"
        :index="i"
        :active-index="activeIndex"
        @changeActiveIndex="changeActiveIndex"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AccountMobilePageHeader from '~/components/account/AccountMobilePageHeader.vue'
import SearchInput from '~/components/common/SearchInput.vue'
import FaqItem from '~/components/common/FaqItem.vue'

const router = useRouter()

const activeIndex = ref<number>(null)

const changeActiveIndex = (index: number) => {
  activeIndex.value !== index
    ? (activeIndex.value = index)
    : (activeIndex.value = null)
}

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.faq-page {
  min-height: 100vh;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 34px;
    padding: 8px 20px 0 20px;
  }

  &__heading {
    display: none;
    width: 100%;
    max-width: 300px;
    margin-left: 11px;
    max-width: 227px;
  }

  &__search-container {
    width: 100%;
  }

  &__body {
    margin-top: 18px;
    padding: 0 20px;
  }
}

@include media-lg {
  .faq-page {
    min-height: 100%;

    &__header {
      padding: 0;
    }

    &__heading {
      display: block;
    }

    &__body {
      margin-top: 30px;
      padding: 0;
    }

    &__item {
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
}
</style>
