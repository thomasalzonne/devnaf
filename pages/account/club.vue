<template>
  <div class="page-club">
    <div class="page-club__wrapper">
      <div class="page-club__content">
        <div class="page-club__points-container">
          <div
            class="page-club__points"
            :class="{ 'page-club__points--active': !!points }"
          >
            {{ points }}
          </div>
          <p
            class="page-club__points-text"
            :class="{ 'page-club__points-text--active': !!points }"
          >
            {{ $t('Account.loyalty_points') }}!
          </p>
        </div>
      </div>

      <div class="page-club__list">
        <AccountPointItem
          v-for="i in 3"
          :key="i"
          :points="points"
          @apply="addPoints"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import AccountPointItem from '~/components/account/AccountPointItem.vue'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const breadcrumbsStore = useBreadcrumbsStore()
const { t } = useI18n()

const points = ref(0)

onMounted(() => {
  breadcrumbsStore.updateBreadcrumbs([
    {
      name: t('Breadcrumbs.account'),
      path: '/account',
    },
    {
      name: t('Breadcrumbs.club'),
      path: '/account/club',
    },
  ])
})

const addPoints = () => {
  points.value += 80
}
</script>

<style lang="scss" scoped>
.page-club {
  &__content {
    margin: 22px 20px 0 20px;
  }

  &__points-container {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  &__points {
    background-color: $color-medium-grey;
    color: $color-dark-grey;
    font-family: $font-secondary;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    width: 87px;
    height: 87px;

    &--active {
      background-color: $color-pink-light;
      color: $color-pink;
    }
  }

  &__points-text {
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: $color-dark-grey;
    text-transform: uppercase;

    &--active {
      color: $color-pink;
    }
  }

  &__list {
    margin: 0 20px;
  }
}

@include media-lg {
  .page-club {
    padding: 60px;

    &__header {
      margin-left: 0;
      margin-bottom: 30px;
      margin-top: 0;
    }

    &__wrapper {
      display: grid;
      grid-template-columns: 424px 1fr;
      gap: 80px;
    }

    &__content {
      margin: 0;
    }

    &__points-container {
      flex-direction: column;
      padding-top: 50px;
      height: 392px;
      box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.1);
    }

    &__points {
      width: 201px;
      height: 201px;
      font-size: 80px;
      line-height: 70px;
    }

    &__list {
      margin: 0;
    }
  }
}

@include media-xl {
  .page-club {
    padding: 60px 60px 60px 172px;

    &__wrapper {
      gap: 136px;
    }

    &__header {
      margin-bottom: 88px;
    }
  }
}

@include media-xxl {
  .page-club {
    &__list {
      max-width: 650px;
    }
  }
}
</style>
