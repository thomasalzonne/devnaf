<template>
  <div class="editable-banner">
    <div class="editable-banner__content">
      <picture class="editable-banner__img-container">
        <source
          media="(max-width: 1269px)"
          srcset="~/assets/images/editable_banner.png"
        />
        <source
          media="(min-width: 1270px)"
          srcset="~/assets/images/editable_banner_big.png"
        />
        <img class="editable-banner__img" alt="Banner" />
      </picture>
      <h2 class="editable-banner__heading">Beauty NAF</h2>
      <p class="editable-banner__text-container">
        <span class="editable-banner__text"
          >Des fragrances qui célèbrent les fondamentaux de NAFNAF :
        </span>
        <span class="editable-banner__text editable-banner__text--bold"
          >l’audace, la couleur et les femmes.</span
        >
      </p>

      <AppButton
        class="editable-banner__button"
        title="découvrir"
        icon-right="arrow_right"
        icon-left="arrow_left"
        size="big"
        :animation="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppButton from '~/components/common/AppButton.vue'

export default defineComponent({
  name: 'EditableBanner',
  components: {
    AppButton,
  },
})
</script>

<style lang="scss" scoped>
.editable-banner {
  position: relative;
  min-height: 569px;
  display: flex;
  margin-top: 43px;

  &__content {
    width: 100%;
    border: 20px solid $color-purple;
    background-color: $color-white;
    padding: 29px 41px;
  }

  &__img-container {
    position: absolute;
    bottom: 16px;
    right: 0;
    z-index: 0;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 400;

    font-size: 50px;
    line-height: 60px;
  }

  &__text-container {
    max-width: 152px;
    margin-top: 10px;
  }

  &__text {
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;

    &--bold {
      font-family: $font-secondary;
      font-size: 24px;
    }
  }

  .app-button {
    position: relative;
    z-index: 10;
    margin-top: 20px;
  }
}

@include media-md {
  .editable-banner {
    &__text-container {
      max-width: 525px;
    }

    &__button {
      width: max-content;
    }
  }
}

@include media-md {
  .editable-banner {
    .app-button {
      margin-top: 79px;
      min-width: 320px;
    }
  }
}

@include media-lg {
  .editable-banner {
    margin-top: 57px;
    min-height: 740px;

    &__content {
      padding: 129px 118px;
    }

    &__heading {
      font-size: 110px;
      line-height: 100px;
    }

    &__text-container {
      max-width: 770px;
      margin-top: 41px;
    }

    &__text {
      font-size: 30px;
      line-height: 52px;

      &--bold {
        font-size: 40px;
      }
    }
  }
}

@media screen and (min-width: 1270px) {
  .editable-banner {
    &__img-container {
      right: 71px;
    }
  }
}

@include media-xxl {
  .editable-banner {
    height: 986px;

    &__content {
      padding: 256px 190px;
    }

    &__img-container {
      width: 704px;
      height: 936px;
      right: 223px;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__text-container {
      margin-bottom: 80px;
    }
  }
}

@include media-xxxl {
  .editable-banner {
    width: 1800px;
    margin: 57px auto 0 auto;

    &__img-container {
      right: 109px;
    }

    &__text-container {
      margin-bottom: 73px;
    }
  }
}
</style>
