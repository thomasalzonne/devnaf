<template>
  <div class="contact">
    <div class="contact__icon-container">
      <SvgIcon class="contact__icon" :name="icon" />
    </div>
    <div class="contact__content">
      <component
        :is="link ? 'a' : 'p'"
        target="_blank"
        :href="link"
        class="contact__title"
      >
        {{ title }}
      </component>
      <div class="contact__text-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string
  icon: string
  link: string
}

withDefaults(defineProps<IProps>(), {
  title: '',
  icon: '',
  link: '',
})
</script>

<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-columns: 60px auto;
  gap: 20px;

  a {
    text-decoration: underline;
  }

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
  }

  &__icon {
    width: 100%;
    height: 100%;
  }

  &__content {
    margin-top: 0px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    color: $color-pink;
  }

  &__text-container {
    margin-top: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: $color-dark-grey;
    max-width: 340px;

    & :deep(a) {
      color: $color-dark-grey;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
    }
  }
}

@include media-lg {
  .contact {
    grid-template-columns: 99px auto;
    gap: 40px;

    &__title {
      font-size: 24px;
      line-height: 24px;
    }

    &__icon-container {
      width: 99px;
      height: 99px;
    }

    &__content {
      margin-top: 30px;
    }
  }
}
</style>
