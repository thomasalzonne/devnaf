<template>
  <div class="badge">
    <div class="badge__value">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string
}

withDefaults(defineProps<IProps>(), {
  title: '',
})
</script>

<style lang="scss" scoped>
.badge {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  color: $color-white;
  background-color: $color-black;
  min-width: 41px;
  padding: 3px 6px;
  min-height: 20px;
  width: max-content;

  &__value {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
}

@include media-lg {
  .badge {
    border-radius: 10px;
    padding: 2px 10px;
    min-height: 26px;

    &__value {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
