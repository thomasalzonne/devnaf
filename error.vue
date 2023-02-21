<template>
  <div class="error-page layout">
    <div class="layout__header">
      <AppHeader :is-error-page="true" class="error-page__header" />
    </div>
    <main class="layout__content">
      <div class="error-page__wrapper">
        <div class="error-page__content">
          <div class="error-page__content-wrapper">
            <div class="error-page__img-container">
              <img
                class="error-page__img"
                src="~/assets/images/piggy.png"
                alt=""
              />
            </div>
            <p class="error-page__heading">{{ $t('ErrorPage.heading') }}</p>
            <p class="error-page__message">
              {{ message }}
            </p>
            <div class="error-page__button-container">
              <AppButton
                class="error-page__button"
                :title="$t('ErrorPage.button_title')"
                @click="handleError"
              />
            </div>
          </div>
        </div>
        <div class="error-page__bg">
          <img
            class="error-page__bg-img"
            src="~/assets/images/error_page_img.png"
            alt=""
          />
        </div>
      </div>

      <AppSvgSprite />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AppHeader from '~/components/header/AppHeader.vue'
import AppButton from '~/components/common/AppButton.vue'
import AppSvgSprite from '~/components/common/AppSvgSprite.vue'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})

const { t } = useI18n()

const message = computed(() => {
  switch (+props.error?.statusCode) {
    case 404:
      return t('ErrorPage.page_not_found')
    default:
      return props.error?.statusMessage
        ? props.error?.statusMessage
        : t('ErrorPage.message')
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped>
.error-page {
  height: 100vh;
  overflow: hidden;

  &__header {
    z-index: 2;
    background-color: $color-white;
  }

  &__wrapper {
    height: calc(100vh - $header-height-mobile);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
  }

  &__content {
    padding: 80px 20px 0px 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 338px;
    width: 100%;
    margin: 0 auto;
  }

  &__heading {
    font-weight: 480;
    font-size: 24px;
    line-height: 44px;
    font-family: $font-secondary;
    margin-top: 24px;
    text-align: center;
  }

  &__message {
    font-weight: 400;
    margin-top: 11px;
    color: $color-dark-grey;
    font-size: 13px;
    line-height: 24px;
    text-align: center;
    max-width: 225px;
  }

  &__button-container {
    margin: 26px auto 0 auto;
    width: 100%;
  }

  &__bg {
    display: none;
    height: calc(100vh - $header-height-desktop);
    height: 100%;
    z-index: 0;
    overflow: hidden;
  }

  &__bg-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    overflow: hidden;
  }

  &__img-container {
    width: 180px;
    height: 180px;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  & :deep(.app-button__title) {
    font-size: 16px;
  }
}

@include media-lg {
  .error-page {
    &__wrapper {
      display: grid;
      grid-template-columns: 49% 51%;
      height: calc(100vh - $header-height-desktop);
    }

    &__bg {
      display: block;
    }

    &__content {
      padding: 50px 60px 50px 35px;
    }

    &__content-wrapper {
      align-items: flex-start;
      justify-content: center;
    }

    &__heading {
      text-align: left;
    }

    &__message {
      font-size: 16px;
      line-height: 24px;
      text-align: left;
      max-width: 100%;
    }

    &__button-container {
      margin: 27px auto 0 auto;
    }
  }
}
</style>
