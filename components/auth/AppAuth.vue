<template>
  <div v-if="!isAuthorized">
    <LoginModal
      :is-open="currentAction === EAuth.LOGIN && isOpenModal"
      :is-checkout="isCheckout"
    />
    <RegistrationModal
      :is-open="currentAction === EAuth.REGISTRATION && isOpenModal"
      :is-checkout="isCheckout"
    />
    <RequestResetPasswordModal
      :is-open="currentAction === EAuth.RESET_PASSWORD_REQUEST && isOpenModal"
      :is-checkout="isCheckout"
    />
    <ResetPasswordModal
      :is-open="currentAction === EAuth.RESET_PASSWORD && isOpenModal"
      :is-checkout="isCheckout"
    />
    <PreAuthModal :is-open="currentAction === EAuth.PRE_AUTH && isOpenModal" />
  </div>
</template>

<script lang="ts" setup>
import LoginModal from '~/components/auth/LoginModal.vue'
import RegistrationModal from '~/components/auth/RegistrationModal.vue'
import RequestResetPasswordModal from '~/components/auth/RequestResetPasswordModal.vue'
import ResetPasswordModal from '~/components/auth/ResetPasswordModal.vue'
import PreAuthModal from '~/components/auth/PreAuthModal.vue'

import { EAuth } from '~~/constants/auth'
import { useAuthStore } from '~~/store/auth'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

const $route = useRoute()
const $router = useRouter()
const authStore = useAuthStore()
const layoutStore = useLayoutStore()

const currentAction = computed(() => {
  const { authAction } = $route.query

  return authAction || null
})

const isCheckout = computed(() => {
  const routePath = $route.path
  const checkoutRoutes = ['/cart', 'checkout']

  return checkoutRoutes.includes(routePath)
})

const isAuthorized = computed(() => {
  return authStore.isAuthorized
})

const isOpenModal = computed(() => {
  return layoutStore.modals[EModals.AUTH]
})

watch(
  () => $route.query?.authAction,
  (value, oldValue) => {
    if (value !== oldValue) authStore.reset()

    if (isAuthorized.value) {
      const query = { ...$route.query }

      delete query.authAction

      $router.replace({ query })
    }
  }
)

watch(
  currentAction,
  (value) => {
    value
      ? layoutStore.openModal(EModals.AUTH)
      : layoutStore.closeModal(EModals.AUTH)

    if (!value) authStore.reset()
  },
  { immediate: true }
)

watch(isOpenModal, (value) => {
  if (!value) {
    const query = { ...$route.query }

    delete query.authAction

    $router.push({ query })
  }
})
</script>
