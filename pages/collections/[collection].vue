<template>
  <div class="page-catalog">
    <div class="page-catalog__header">
      <img
        class="page-catalog__header-image"
        src="~/assets/images/catalog_header.png"
      />
      <div class="page-catalog__header-background"></div>
      <div class="page-catalog__header-second-background"></div>
      <div class="page-catalog__carousel carousel page-catalog__header-title">
        <div class="carousel__wrapper">
          <div class="carousel__title">
            {{ category?.title ?? '' }}
          </div>
          <div>
            Nos produits sont 100% français et fait à partir de matières de très
            bonne qualité
          </div>
        </div>
      </div>
    </div>

    <CatalogWrapper :category="category?.title" />

    <AppBreadcrumbs class="breadcrumbs" />

    <div class="page-catalog__text-container">
      <h2 class="page-catalog__heading">{{ category?.title }}</h2>
      <div class="page-catalog__corpus" v-html="category?.content"></div>
    </div>
    <div class="page-catalog__join-fidelity-program">
      <div class="page-catalog__fidelity-program-content">
        <span class="page-catalog__fidelity-program-title">
          Rejoignez le programme de fidélité <br />
          <span class="page-catalog__fidelity-program-title-important"
            >NAF GOLD</span
          >
        </span>
        <div class="page-catalog__fidelity-program-cta">
          <button class="button page-catalog__button">ADHERER</button>
          <button class="button page-catalog__button">DECOUVRIR</button>
        </div>
      </div>
    </div>

    <AdvantagesBlock />
  </div>
</template>

<script lang="ts" setup>
import AppBreadcrumbs from '~/components/common/AppBreadcrumbs.vue'
import AdvantagesBlock from '~~/components/common/AdvantagesBlock.vue'
import CatalogWrapper from '~~/components/catalog/CatalogWrapper.vue'
import ICategory from '~/types/category.interface'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'
import { IPIMError } from '~~/types/error.interface'
import { useLayoutStore } from '~~/store/layout'

const route = useRoute()
const breadcrumbsStore = useBreadcrumbsStore()

const { data: category } = await useFetch<ICategory & IPIMError>(
  `https://divat.nafnaf.io/api/v1/${
    useRuntimeConfig().public.channelCode
  }/related/${route?.params?.collection}`,
  {
    onResponse({ response }) {
      return response?._data
    },
  }
)

if (category.value?.error) {
  throw createError({
    statusCode: +category.value.error,
    statusMessage: category.value.message,
  })
}
const seo = category.value?.seo || {}
const title = seo?.title || ''
const description = seo?.description || ''
const sharingImage = category.value?.picture || ''
const layoutStore = useLayoutStore()

useHead({
  title,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: description },

    // @ts-ignore
    { itemprop: 'name', content: title },
    // @ts-ignore
    { itemprop: 'description', content: description },
    // @ts-ignore
    { itemprop: 'image', content: sharingImage },

    { property: 'og:title', content: title },
    { property: 'og:url', content: route?.path },
    { property: 'og:description', content: description },
    { property: 'og:image', content: sharingImage },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'es_ES' },
    { property: 'og:og:site_name', content: 'Naf Naf' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:url', content: route?.path },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: sharingImage },
  ],
})

onMounted(() => {
  breadcrumbsStore.updateBreadcrumbs([
    {
      name: category.value?.name || '',
      path: '/',
    },
  ])

  window.addEventListener('scroll', handleScroll)

  nextTick(() => {
    handleScroll()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

  layoutStore.collectionTopPercentage = 0
})

const handleScroll = () => {
  const layout: HTMLElement = document.querySelector('main.layout__content')
  const header: HTMLElement = document.querySelector('.page-catalog__header')
  const background: HTMLElement = document.querySelector(
    '.page-catalog__header-background'
  )
  const secondbackground: HTMLElement = document.querySelector(
    '.page-catalog__header-second-background'
  )
  const img: HTMLElement = document.querySelector(
    'img.page-catalog__header-image'
  )
  const headerRect = header?.getBoundingClientRect()

  const scroll = window.scrollY
  const top =
    headerRect?.top +
    window?.pageYOffset -
    header?.ownerDocument?.documentElement?.clientTop
  const percentage = ((scroll - top / headerRect?.height) / 1000) * 2

  let percentagebody = 1
  let percentageWhite = 0

  if (percentage > 1) {
    percentageWhite = percentage - 1
    percentagebody = 1 - percentageWhite
  }

  const scale = 1 + percentage / 4
  const translate = percentage * 10

  background.style.opacity = percentage?.toString()
  secondbackground.style.opacity = percentageWhite?.toString()
  img.style.transform =
    'translateX(-50%) scale(' + scale + ') translateY(' + translate + 'vh)'

  if (percentageWhite > 0) {
    layout.style.backgroundColor = 'rgb(1, 95, 118,' + percentagebody + ')'
  }

  layoutStore.collectionTopPercentage = percentageWhite
}
</script>

<style lang="scss" scoped>
.page-catalog {
  position: relative;

  &__carousel {
    margin-top: 10px;
  }
  &__header {
    position: relative;
    display: flex;
    height: 900px;
    overflow: hidden;
  }
  &__header-background {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: #015f76;
    opacity: 0;
  }
  &__header-second-background {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: #ffffff;
    opacity: 0;
  }
  &__header-title {
    z-index: 3;
    text-align: center;
    color: white;
    height: fit-content;
    margin-top: auto !important;
    margin-bottom: 10%;
  }
  &__text-container {
    margin: 65px 20px 47px 20px;
  }

  &__heading {
    font-family: $font-secondary;
    font-size: 30px;
    line-height: 36px;
    margin-bottom: 26px;
    font-weight: 480;
    text-transform: uppercase;
  }

  &__join-fidelity-program {
    background: url(../../assets/images/catalog_fidelity_program.png) center;
    width: 100%;
    min-height: 487px;
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__fidelity-program-content {
    top: 192px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
  }

  &__button {
    max-width: 209px;
  }
  &__fidelity-program-cta {
    display: flex;
    gap: 16px;

    button:first-of-type {
      background-color: $color-pink;

      &:hover {
        box-shadow: 4px 4px 1px 0px $color-black;
      }
      &:active {
        color: $color-black;
      }
    }
    button:nth-of-type(2) {
      background-color: $color-white;
      color: $color-black;

      &:hover {
        box-shadow: 4px 4px 1px 0px $color-black;
      }
      &:active {
        color: $color-pink;
      }
    }
  }
  &__fidelity-program-title {
    font-family: $font-secondary;
    color: $color-white;
    font-weight: 460;
    line-height: 35px;
    font-size: 24px;
    text-transform: uppercase;
    text-shadow: -1px 0 $color-black, 0 1px $color-black, 1px 0 $color-black,
      0 -1px $color-black;
  }

  &__fidelity-program-title-important {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 48px;
  }

  &__text {
    margin-top: 24px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;

    &--desktop {
      display: none;
    }
  }
  &__marquee {
    background-color: $color-green;
    height: 68px;
    display: flex;
    align-items: center;
    margin-top: 50px;
  }

  &__marquee-text {
    display: flex;
    align-items: center;
    gap: 4px;
    color: $color-white;
    text-transform: uppercase;
    font-size: 28px;
    line-height: 32px;
    font-weight: 400;
    white-space: nowrap;
  }

  &__corpus {
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      font-weight: 400;
      font-family: $font-secondary;
      font-size: 30px;
      line-height: 40px;
      margin-bottom: 43px;
      margin-top: 40px;
    }

    :deep(p) {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 15px;
    }

    :deep(a) {
      font-weight: 500;
      text-decoration: underline;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
    }
  }
}
img.page-catalog__header-image {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
}
.carousel {
  &__title {
    font-family: $font-secondary;
    font-size: 30px;
    line-height: 40px;
    margin: 0 20px 3px 20px;
  }

  &__wrapper {
    width: 100%;
  }

  &__container {
    width: 100%;
  }
}

.breadcrumbs {
  display: none;
}

@include media-lg {
  .page-catalog {
    &__carousel {
      display: flex;
      align-items: center;
    }

    &__text-container {
      padding: 0 60px;
      width: 900px;
      margin: 60px auto 150px auto;
    }

    &__heading {
      font-size: 36px;
      line-height: 36px;
      text-align: center;

      &--mobile {
        display: none;
      }

      &__marquee {
        margin-top: 155px;
      }
    }

    &__text {
      font-size: 28px;
      line-height: 38px;
      font-weight: 400;
      margin-top: 20px;

      &--desktop {
        display: block;
      }
    }

    &__corpus {
      :deep(h1),
      :deep(h2),
      :deep(h3),
      :deep(h4),
      :deep(h5),
      :deep(h6) {
        font-weight: 400;
        font-size: 28px;
        line-height: 38px;
        margin-bottom: 20px;
        margin-top: 20px;
      }

      :deep(p) {
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 30px;
      }

      :deep(a) {
        text-decoration: underline;
        font-size: 18px;
      }
    }
  }

  .carousel {
    padding: 18px 0px 8px 0px;
    margin-top: 0;
    width: 100%;

    &.border {
      border-bottom: 2px solid $color-black;
    }

    &__title {
      font-size: 60px;
      line-height: 80px;
      margin-bottom: 30px;
      margin-left: 0;
    }

    &__wrapper {
      max-width: 1800px;
      margin: 0 auto;
      padding: 0 0px 0 60px;
      column-gap: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &.no-products {
        display: block;
        .carousel__title {
          margin-bottom: 10px;
        }
      }
    }
  }

  .breadcrumbs {
    margin: 40px auto 60px auto;
    display: flex;
    max-width: 1800px;

    & :deep(.app-breadcrumbs__item) {
      font-size: 18px;

      &:not(:first-child) {
        margin-left: 18px;
      }

      &:last-child {
        font-size: 18px;
      }
    }

    & :deep(.app-breadcrumbs__arrow) {
      margin-left: 18px;
    }
  }
}

@include media-xxl {
  .page-catalog {
    &__text-container {
      max-width: 1800px;
      padding: 0;
    }
  }
  .carousel {
    &__wrapper {
      max-width: 1800px;
      padding: 0;
    }
  }

  .breadcrumbs {
    max-width: 1800px;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
