<template>
  <div class="empty-page-content">
    <div class="empty-page-content__img-container">
      <img
        class="empty-page-content__img"
        src="~/assets/images/empty.png"
        alt="Empty"
      />
    </div>
    <div class="empty-page-content__content">
      <p v-if="title" class="empty-page-content__title">{{ title }},</p>
      <p v-if="text" class="empty-page-content__text">
        {{ text }}
      </p>
      <div v-if="buttonTitle" class="empty-page-content__button-container">
        <AppButton
          class="empty-page-content__button"
          :title="buttonTitle"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'

interface IProps {
  title: string
  text: string
  buttonTitle: string
}

withDefaults(defineProps<IProps>(), {
  title: '',
  text: '',
  buttonTitle: '',
})

const emit = defineEmits(['buttonClick'])

const handleClick = () => {
  emit('buttonClick')
}
</script>

<style lang="scss" scoped>
.empty-page-content {
  height: auto;
  width: 100%;

  &__img-container {
    width: 100%;
    height: 392px;
  }

  &__img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
    text-align: center;
    margin-top: 29px;
  }

  &__text {
    margin: 0 auto;
    margin-top: 10px;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    text-align: center;
    max-width: 347px;
  }

  &__button-container {
    padding: 0 6px;
    margin: 0 auto;
    margin-top: 32px;
    width: 100%;
    max-width: 375px;
  }

  &__content {
    padding: 0 14px;
  }
}

@include media-lg {
  .empty-page-content {
    margin-top: 34px;

    &__img-container {
      width: 334px;
      height: auto;
      margin: 0 auto;
    }

    &__content {
      min-width: 483px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 35px;
      margin-top: 16px;
    }

    &__title {
      font-weight: 480;
      font-size: 24px;
      line-height: 44px;
      margin-top: 0;
    }

    &__text {
      font-weight: 440;
      font-size: 16px;
      line-height: 21px;
      margin-top: 10px;
      max-width: 395px;
    }

    &__button-container {
      margin-top: 24px;
      width: 100%;
      max-width: 209px;
      padding: 0;
    }

    &__button {
      min-height: 37px;
      height: 37px;

      &:deep() {
        .app-button__title {
          font-weight: 460;
          font-size: 14px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
