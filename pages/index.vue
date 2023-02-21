<template>
  <div class="page-index">
    <HeroBanner />
    <!-- <NoveltyBlock />
    <LooksBlock /> -->
    <InstaBlock />
    <AdvantagesBlock />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeroBanner from '~/components/blocks/HeroBanner.vue'
// import NoveltyBlock from '~/components/blocks/NoveltyBlock.vue'
// import LooksBlock from '~/components/blocks/LooksBlock.vue'
import InstaBlock from '~/components/blocks/InstaBlock.vue'
import AdvantagesBlock from '~/components/common/AdvantagesBlock.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    HeroBanner,
    // NoveltyBlock,
    // LooksBlock,
    InstaBlock,
    AdvantagesBlock,
  },
  setup() {
    useHead({
      title:
        'NAF DAYS | -30% Selección | Tienda Online Ropa Mujer' + ' | NafNaf',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
      meta: [
        {
          name: 'description',
          content:
            'Entra en la tienda online oficial de NAF NAF España y descubre las últimas tendencias en ropa de mujer. ▷ Envío gratuito.',
        },
      ],
    })
  },
})
</script>

<style lang="scss" scoped>
.page-index {
  overflow: hidden;
}
</style>
