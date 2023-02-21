<template>
  <div class="page-tiendas">
    <MapBlock :search="search" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapBlock from '~/components/blocks/MapBlock.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    MapBlock,
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
  data() {
    return {
      search: '',
    }
  },
  created() {
    this.search = this.$route.query?.search
  },
})
</script>

<style lang="scss" scoped>
.page-index {
  overflow: hidden;
}
</style>
