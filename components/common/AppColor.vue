<template>
  <div class="app-color" :style="colorStyle"></div>
</template>

<script lang="ts" setup>
interface IAppColor {
  type: 'file' | 'hexacode'
  value: string
}

interface IProps {
  color: IAppColor
}

const props = defineProps<IProps>()

const colorStyle = computed(() => {
  if (props?.color?.type === 'hexacode') {
    return { 'background-color': props.color?.value }
  }

  return {
    'background-image': "url('" + props.color?.value + "')",
    'background-size': 'cover',
  }
})
</script>

<style lang="scss" scoped>
.app-color {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
