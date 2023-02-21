<template>
  <div class="page-payment">
    <AccountMobilePageHeader
      icon="account"
      :title="$t('Account.my_payments')"
      :is-child="true"
      :navigation="navigationItems.children"
      @back="goBack"
    />
    <p class="account-page-header page-payment__header">
      {{ $t('Account.payment') }}
    </p>
    <div class="page-payment__body">
      <AppContentCard class="page-payment__card">
        <template #header>
          <p class="account-card-header page-payment__card-header">
            {{ $t('Account.my_payments') }}
          </p>
        </template>
        <template #body>
          <div class="page-payment__card-body">
            <AccountPaymentEmpty v-if="isEmpty" @addPayment="toggleIsEmpty" />
            <AccountPaymentItem v-else @editPayment="toggleIsEmpty" />
          </div>
        </template>
      </AppContentCard>
      <AppButton
        class="page-payment__button"
        :title="$t('Account.add_payment_method')"
        size="medium"
        @click="toggleIsEmpty"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import AppContentCard from '~/components/common/AppContentCard.vue'
import AccountPaymentItem from '~~/components/account/AccountPaymentItem.vue'
import AccountPaymentEmpty from '~/components/account/AccountPaymentEmpty.vue'
import { IProfileNavigationItem } from '~~/types/profile.interface'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const { navigation } = useAccountNavigation()
const router = useRouter()

const isEmpty = ref(false)

const navigationItems = computed(() => {
  return navigation.find(
    (item: IProfileNavigationItem) => item.scope === 'account'
  )
})

const toggleIsEmpty = () => {
  isEmpty.value = !isEmpty.value
}

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.page-payment {
  min-height: 100vh;

  &__header {
    display: none;
  }

  &__body {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(90vh - $header-height-mobile);
  }

  &__card {
    margin-top: 30px;
    width: 100%;
  }

  &__card-header {
    padding: 10px 18px 7px 18px;
  }

  &__card-body {
    padding: 15px 19px 18px 19px;
  }

  &__button {
    margin-top: 20px;
    width: 100%;
  }
}

@include media-lg {
  .page-payment {
    min-height: 100%;

    &__header {
      display: block;
      margin-left: 10px;
    }

    &__body {
      padding: 0;
      display: block;
    }

    &__card-header {
      padding: 18px 20px 18px 26px;
    }

    &__card-body {
      padding: 22px 45px 30px 26px;
    }

    &__button {
      margin-top: 18px;
      max-width: 336px;
    }
  }
}
</style>
