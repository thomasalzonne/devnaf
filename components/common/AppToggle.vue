<template>
  <div
    class="toggle"
    :class="[{ 'toggle--active': active }]"
    @click="handleToggle"
  >
    <div class="toggle__circle"></div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AppToggle',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emit: ['update:modelValue'],
  computed: {
    active: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    handleToggle(): void {
      this.active = !this.active
    },
  },
})
</script>

<style lang="scss" scoped>
.toggle {
  height: 20px;
  width: 36px;
  padding: 2px;
  background-color: $color-light-grey;
  border-radius: 12px;
  transition: all 200ms;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;

  &--active {
    background-color: $color-pink;

    &.toggle {
      .toggle__circle {
        margin-left: calc(100% - 16px);
      }
    }
  }

  &__circle {
    width: 16px;
    height: 16px;
    background-color: $color-white;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
      0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 50%;
    transition: all 200ms;
    margin-left: 0;
  }
}
</style>
