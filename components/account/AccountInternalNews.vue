<template>
  <div class="news-internal">
    <div class="news-internal__line">
      <span class="news-internal__line-text">Testez et gagnez</span>
      <span class="news-internal__line-text news-internal__line-text--accent"
        >20 points</span
      >
      <span class="news-internal__line-text">de fidélité !</span>
    </div>

    <div class="news-internal__content">
      <p class="news-internal__text">
        Notre styliste Anna et notre responsable de collection Aude souhaitent
        recueillir vos avis sur les futurs articles de la collection. <br />
        Nous avons à coeur de vous livrer des produits de qualité. 💛 <br />
        Inscrivez-vous et vous serez sélectionné(e) en fonction de votre profil.
      </p>

      <div class="news-internal__grid">
        <div>
          <p class="news-internal__heading">Profils recherchés</p>
          <p class="news-internal__text news-internal__text--secondary">
            Toutes les femmes fétichistes de chaussures de la taille 36 à 40 !
          </p>
        </div>
        <div class="news-internal__img-container"></div>
      </div>

      <div class="news-internal__grid news-internal__grid--last">
        <div>
          <p class="news-internal__heading">Nombre de testeuses</p>
          <p class="news-internal__text news-internal__text--secondary">
            Au maximum 8
          </p>
        </div>
      </div>

      <div class="news-internal__footer">
        <button class="news-internal__submit-button">
          proposer mon profil
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.news-internal {
  position: fixed;
  top: 60px;
  background-color: $color-white;
  height: calc(100vh - 60px);
  overflow: auto;
  width: 100%;

  &__line {
    background-color: $color-green;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: 7px 13px;
    gap: 8px;
    width: 100%;
    margin-top: 12px;
  }

  &__line-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-black;

    &--accent {
      font-weight: 700;
      font-size: 20px;
      color: $color-yellow;
      text-transform: uppercase;
    }
  }

  &__content {
    margin: 34px 20px 16px 20px;
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

    &--secondary {
      font-size: 14px;
      line-height: 22px;
    }
  }

  &__grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 13px;
    margin-top: 36px;
  }

  &__heading {
    font-weight: 400;
    font-size: 25px;
    line-height: 30px;
    font-family: $font-secondary;
    margin-bottom: 6px;
  }

  &__img-container {
    max-width: 100px;
    max-height: 71px;
    margin-top: 14px;
    margin-right: 12px;
  }

  &__img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  &__footer {
    margin-top: 133px;
  }

  &__submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: $color-pink;
    background-color: $color-pink-light;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    border-radius: 40px;
    height: 58px;
    padding: 19px 25px;
  }
}

@include media-lg {
  .news-internal {
    padding-top: 10px;
    position: static;
    height: auto;
    &__header {
      display: none;
    }

    &__content {
      margin: 35px 0 0;
    }

    &__grid {
      justify-content: flex-start;
      gap: 32px;
      margin-top: 60px;

      &--last {
        margin-top: 38px;
      }
    }

    &__footer {
      margin-top: 54px;
    }
  }
}

@include media-xxl {
  .news-internal {
    max-width: 850px;
  }
}
</style>
