<template>
  <div class="app-loader" :class="[`app-loader--${type}`]"></div>
</template>

<script lang="ts" setup>
interface IProps {
  type?: 'grey' | 'white'
}

withDefaults(defineProps<IProps>(), {
  type: 'grey',
})
</script>

<style lang="scss" scoped>
.app-loader {
  width: 24px;
  height: 24px;
  border: 3px solid $color-medium-grey;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: loader-animation 1s infinite linear;

  &--grey {
    border-color: $color-medium-grey;
    border-bottom-color: transparent;
  }

  &--white {
    border-color: $color-white;
    border-bottom-color: transparent;
  }
}

@keyframes loader-animation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
