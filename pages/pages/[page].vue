<template>
  <div>
    <div class="section_pages--section">
      <div v-if="page?.content">
        <div v-html="page.content"></div>
      </div>
    </div>
    <BaseMarqueeLine />
    <AdvantagesBlock />
  </div>
</template>

<script lang="ts" setup>
import AdvantagesBlock from '~/components/common/AdvantagesBlock.vue'
import BaseMarqueeLine from '~/components/common/BaseMarqueeLine.vue'
import IPageContent from '~/types/page.interface'
const route = useRoute()

const { data: page } = await useFetch<IPageContent>(
  `https://divat.nafnaf.io/api/v1/${
    useRuntimeConfig().public.channelCode
  }/page/${route.params.page}`,
  {
    initialCache: false,
  }
).then((result) => {
  return result
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '',
  })
}

useHead({
  title: page?.value?.title,
  meta: [
    { name: 'description', content: page?.value?.details?.seo_description },
  ],
})
</script>

<style lang="scss" scoped>
.section_pages {
  &--section {
    width: 100%;
    max-width: 1320px;
    padding: 60px 20px;
    margin-left: auto;
    margin-right: auto;
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 15px;

    :deep(h1) {
      font-weight: 700;
      font-size: 30px;
      line-height: 40px;
      margin-bottom: 30px;
    }

    :deep(h2) {
      font-weight: 700;
      font-size: 24px;
      line-height: 34px;
      margin-bottom: 20px;
      margin-top: 20px;
    }

    :deep(h3) {
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
      margin-bottom: 10px;
    }

    :deep(a) {
      text-decoration: underline;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
    }
  }
}

@include media-lg {
  .section_pages {
    &--section {
      padding: 100px 60px;
      font-size: 18px;
      line-height: 30px;

      :deep(h1) {
        font-weight: 700;
        font-size: 42px;
        line-height: 52px;
        margin-bottom: 60px;
      }

      :deep(h2) {
        font-weight: 700;
        font-size: 34px;
        line-height: 44px;
        margin-bottom: 40px;
        margin-top: 40px;
      }

      :deep(h3) {
        font-weight: 700;
        font-size: 28px;
        line-height: 38px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
