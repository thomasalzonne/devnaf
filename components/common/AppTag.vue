<template>
  <div v-if="title" class="app-tag">
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
.app-tag {
  padding: 2px 10px 4px 10px;
  background-color: $color-light-grey;
  color: $color-dark-grey;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  border-radius: 30px;
}

@include media-lg {
  .app-tag {
    padding: 5px 17px 7px 17px;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
