import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'NafNaf',
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/piggy.png' },
      ],
      meta: [
        {
          name: 'google-site-verification',
          content: 'jBr-0Ju2vWpxQIv7Dcg7-vlrLO6r0ypMt85dFcB2u1g',
        },
      ],
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
          async: true,
          defer: true,
        },
        {
          src: 'https://connect.facebook.net/en_US/sdk.js',
          async: true,
          defer: true,
          crossorigin: 'anonymous',
        },
        {
          children: `window.fbAsyncInit = function() {FB.init({appId: '${process.env.NUXT_PUBLIC_FACEBOOK_APP_ID}',autoLogAppEvents: true,xfbml: true,version: 'v15.0'});};`,
        },
      ],
    },
  },

  css: [
    '@/assets/styles/main.scss',
    '@/assets/styles/layout.scss',
    '@/assets/styles/fonts.scss',
    '@/assets/styles/buttons.scss',
    '@/assets/styles/account.scss',
    '@/assets/styles/toast.scss',
    'swiper/css',
    'swiper/css/pagination',
    'swiper/css/mousewheel',
    'swiper/css/free-mode',
    'vue-toastification/dist/index.css',
  ],
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(
            dirname(fileURLToPath(import.meta.url)),
            './translations/*.json'
          ),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/styles/variables.scss"; @import "@/assets/styles/mixins/mixins.scss";',
        },
      },
    },
  },
  build: {
    transpile: ['swiper', '@vueform/slider'],
  },
  modules: ['@pinia/nuxt', '~/modules/sitemap'],
  runtimeConfig: {
    public: {
      apiUrl: 'https://sylius-api.nafnaf.dev/api/v2',
      countryCode: 'ES',
      locale: 'es_ES',
      channelCode: 'SPAIN',
      baseImageUrl: 'https://nafnaf.b-cdn.net/',
      adyenClientKey: 'test_LRW2CEUDUBDIJEPFTI3HUP4DZE43V35T',
      adyenEnv: 'test',
      freeDeliveryPrice: 49.9,
      googleClientId:
        '1057643205690-a04gdvkii6jgfpjpmgvpv2nt0fmhbell.apps.googleusercontent.com',
      facebookAppId: '572750567994608',
    },
  },
  experimental: {
    writeEarlyHints: false,
    treeshakeClientOnly: false,
  },
  nitro: {
    routeRules: {
      '/collections/**': { swr: 3600 },
      '/products/**': { swr: 3600 },
      '/': { static: true },
    },
    minify: true,
    compressPublicAssets: true,
  },
  typescript: {
    strict: false,
  },
  // @ts-ignore
  // sitemap: {
  //   hostname: 'https://localhost:3000/',
  //   exclude: ['account/**'],
  // },
})
