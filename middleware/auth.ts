import { EAppCookie } from '~~/constants/cookie'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie(EAppCookie.AUTH_TOKEN)

  if (!token.value) navigateTo('/')
})
