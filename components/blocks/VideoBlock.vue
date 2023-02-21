<template>
  <div class="video-block">
    <h2 class="video-block__heading">Live shopping NAFNAF !</h2>
    <div class="video-block__video-wrapper">
      <video src="#"></video>
    </div>
    <div class="video-block__content">
      <p class="video-block__text">
        Mardi 21 juin à 18H, NAF NAF invite l’influenceuse Mayadorable pour un
        live shopping spécial Festival ! 💕
      </p>
      <div class="video-block__button-container">
        <AppButton
          class="video-block__button"
          size="big"
          title="rejoindre le live"
          :animation="true"
          icon-right="arrow_right"
          icon-left="arrow_left"
        />
      </div>
    </div>
    <a class="video-block__link" href="#">
      <span class="video-block__link-title">Voir les replay</span>
      <SvgIcon class="video-block__link-icon" name="arrow_right" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppButton from '~/components/common/AppButton.vue'

export default defineComponent({
  name: 'VideoBlock',
  components: {
    AppButton,
  },
})
</script>

<style lang="scss" scoped>
.video-block {
  &__heading {
    font-family: $font-secondary;
    font-size: 50px;
    line-height: 60px;
    font-weight: 400;
    margin: 33px 20px 4px 33px;
  }

  &__video-wrapper {
    width: 100%;
    height: 203px;
    background-color: $color-medium-grey;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  &__text {
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    margin: 22px 20px 0 20px;
  }

  &__button-container {
    margin: 0px 20px 0 20px;
  }

  &__button {
    width: 100%;
  }

  &__link {
    text-align: center;
    text-decoration: underline;
    color: $color-pink;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    margin-top: 17px;
  }

  &__link-title {
    font-size: 18px;
    line-height: 30px;
    font-weight: 500;
  }

  &__link-icon {
    width: 20px;
    height: 20px;
  }
}

@include media-sm {
  .video-block {
    .app-button--big {
      max-width: 100%;
    }
  }
}

@include media-lg {
  .video-block {
    &__heading {
      font-size: 80px;
      line-height: 80px;
      margin: 80px 60px 36px 60px;
    }

    &__video-wrapper {
      margin: 0 60px;
      height: 712px;
      width: auto;
    }

    &__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      margin: 24px 60px 0 60px;
    }

    &__text {
      font-size: 30px;
      line-height: 42px;
      margin: 0px;
      max-width: 850px;
    }

    &__button-container {
      margin: 0;
      margin-bottom: 10px;
      width: 429px;

      & :deep(.app-button--big) {
        max-width: 100%;
      }
    }

    &__button {
      max-width: 424px;
      width: 100%;
      margin-top: 5px;
    }

    &__link {
      gap: 10px;
      justify-content: flex-start;
      margin: 18px 60px;
    }

    &__link-title {
      font-size: 25px;
    }

    &__link-icon {
      width: 30px;
      height: 30px;
    }
  }
}

@include media-xxl {
  .video-block {
    &__video-wrapper {
      height: 972px;
    }
  }
}

@include media-xxxl {
  .video-block {
    max-width: 1800px;
    margin: 0 auto;

    &__video-wrapper {
      margin: 0;
    }

    &__heading {
      margin-left: 0;
      margin-right: 0;
    }

    &__content {
      margin-left: 0;
      margin-right: 0;
      margin-top: 31px;
    }

    &__text {
      max-width: 1232px;
    }

    &__link {
      margin-left: 0;
    }
  }
}
</style>
