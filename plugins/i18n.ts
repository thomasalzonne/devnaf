/* eslint-disable camelcase */
import { createI18n } from 'vue-i18n'

import es from '../translations/es_ES.json'
import en from '../translations/en_EN.json'
import fr from '../translations/fr_FR.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig()

  const localesMap = {
    es_ES: 'es',
    en_EN: 'en',
    fr_FR: 'fr',
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localesMap[config.public.locale],
    messages: {
      es,
      en,
      fr,
    },
    numberFormats: {
      es: {
        EUR: {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'EUR',
          minimumFractionDigits: 2,
        },
      },
      en: {
        EUR: {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'EUR',
          minimumFractionDigits: 2,
        },
      },
      fr: {
        EUR: {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'EUR',
          minimumFractionDigits: 2,
        },
      },
    },
  })

  vueApp.use(i18n)
})
