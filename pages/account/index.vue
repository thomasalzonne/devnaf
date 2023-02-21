<template>
  <div class="page-account">
    <div class="page-account__main-info">
      <div class="page-account__sidebar">
        <AccountNavigation />
      </div>
      <div class="page-account__content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AccountNavigation from '~/components/account/AccountNavigation.vue'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})
</script>

<style lang="scss">
.page-account {
  &__main-info {
    display: grid;
    width: 100%;
  }

  &__sidebar {
    display: none;
  }
}

@include media-lg {
  .page-account {
    &__main-info {
      display: grid;
      grid-template-columns: 250px 1fr;
      column-gap: 20px;
      padding: 0 20px;
      margin-top: 46px;
    }

    &__sidebar {
      display: block;
    }
  }
}

@include media-xl {
  .page-account {
    &__main-info {
      column-gap: 60px;
      padding: 0 60px;
    }
  }
}
</style>
