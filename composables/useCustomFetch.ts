import { EAppCookie } from '~~/constants/cookie'
import { useAuthStore } from '~~/store/auth'

type CustomFetchResult<T> = {
  data: T
  error: any
}

export const useCustomFetch = async <DataT>(
  url: string,
  options?: any
): Promise<CustomFetchResult<DataT>> => {
  const token = useCookie(EAppCookie.AUTH_TOKEN)
  const config = useRuntimeConfig()

  const headers: any = {
    ...options.headers,
  }

  if (token.value) {
    headers.Authorization = token.value
    headers['Accept-Language'] = config.public.locale
  }

  let error: any = null

  const data: DataT | null = await $fetch(url, {
    ...options,
    headers: {
      ...headers,
    },
    onResponse({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore()
        const $router = useRouter()
        const $route = useRoute()

        if (!$route.query?.authAction) {
          authStore.logout()
          $router.push('/')
        }
      }
    },
  })
    .then((response) => response as DataT)
    .catch((e) => {
      error = e?.data
      return null
    })

  const result: CustomFetchResult<DataT> = {
    data: data as DataT,
    error,
  }

  return result
}
