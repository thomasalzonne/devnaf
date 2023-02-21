<template>
  <svg class="icon">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.app-icon {
  width: 30px;
  height: 30px;
}
</style>
