<template>
  <div>
    <div class="blogs__hero">
      <div class="blogs__hero-container">
        <span class="blogs__hero-title">Blog NAF NAF</span>
        <span class="blogs__hero-text"
          >Découvrez toutes nos nouveautés et les dernières tendances grâce au
          blog NAF NAF.
        </span>
      </div>
    </div>

    <div class="blogs-articles">
      <div class="blogs-articles__container">
        <div class="blogs-articles__article-container">
          <img
            src="../../assets/images/blogs-article-1-mobile.png"
            alt=""
            class="blogs-articles__img article-img-mobile"
          />
          <img
            src="../../assets/images/blogs-article-1.png"
            alt=""
            class="blogs-articles__img article-img-large-screen"
          />
          <div class="blogs-articles__container-box-text">
            <div class="blogs-articles__box-text">
              <span class="blogs-articles__title-article"
                >Titre de l’article juste ici</span
              >
              <span class="blogs-articles__description-article"
                >La piel es un material que evoluciona a lo largo de toda su
                vida. ...</span
              >
            </div>
          </div>
        </div>

        <div class="blogs-articles__article-container">
          <img
            src="../../assets/images/blogs-article-2-mobile.png"
            alt=""
            class="blogs-articles__img article-img-mobile"
          />
          <img
            src="../../assets/images/blogs-article-2.png"
            alt=""
            class="blogs-articles__img article-img-large-screen"
          />
          <div class="blogs-articles__container-box-text">
            <div class="blogs-articles__box-text">
              <span class="blogs-articles__title-article"
                >Titre de l’article juste ici</span
              >
              <span class="blogs-articles__description-article"
                >La piel es un material que evoluciona a lo largo de toda su
                vida. ...</span
              >
            </div>
          </div>
        </div>

        <div class="blogs-articles__article-container">
          <img
            src="../../assets/images/blogs-article-3-mobile.png"
            alt=""
            class="blogs-articles__img article-img-mobile"
          />
          <img
            src="../../assets/images/blogs-article-3.png"
            alt=""
            class="blogs-articles__img article-img-large-screen"
          />
          <div class="blogs-articles__container-box-text">
            <div class="blogs-articles__box-text">
              <span class="blogs-articles__title-article"
                >Titre de l’article juste ici</span
              >
              <span class="blogs-articles__description-article"
                >La piel es un material que evoluciona a lo largo de toda su
                vida. ...</span
              >
            </div>
          </div>
        </div>

        <div
          class="blogs-articles__article-container blogs-articles__large-article-container"
        >
          <img
            src="../../assets/images/blogs-article-4-mobile.png"
            alt=""
            class="blogs-articles__img article-img-mobile"
          />
          <img
            src="../../assets/images/blogs-article-4.png"
            alt=""
            class="blogs-articles__img article-img-large-screen"
          />
          <div class="blogs-articles__container-box-text">
            <div class="blogs-articles__box-text">
              <span class="blogs-articles__title-article"
                >Titre de l’article juste ici</span
              >
              <span class="blogs-articles__description-article"
                >La piel es un material que evoluciona a lo largo de toda su
                vida. Modelada durante su fabricación, eres tú quien le dará su
                sello y su propia personalidad.Modelada durante su fabricación,
                eres tú quien le dará su sello y su propia personalidad.</span
              >
            </div>
          </div>
        </div>

        <div class="blogs-articles__article-container">
          <img
            src="../../assets/images/blogs-article-5-mobile.png"
            alt=""
            class="blogs-articles__img article-img-mobile"
          />
          <img
            src="../../assets/images/blogs-article-5.png"
            alt=""
            class="blogs-articles__img article-img-large-screen"
          />
          <div class="blogs-articles__container-box-text">
            <div class="blogs-articles__box-text">
              <span class="blogs-articles__title-article"
                >Titre de l’article juste ici</span
              >
              <span class="blogs-articles__description-article"
                >La piel es un material que evoluciona a lo largo de toda su
                vida. ...</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.blogs {
  &__hero {
    background: url('../../assets/images/blogs-hero-image-mobile.png') center;
    height: 100vh;
    max-height: 700px;
    display: flex;
    align-items: center;
    position: relative;
    background-size: cover;

    &::after {
      position: absolute;
      content: '';
      background: linear-gradient(
        180deg,
        #6f3874 29.17%,
        rgba(111, 56, 116, 0) 100%
      );
      transform: rotate(-180deg);
      width: 100%;
      height: 400px;
      bottom: 0;
    }
  }

  &__hero-container {
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-white;
    gap: 20px;
    padding: 0 20px;
    text-align: center;
  }

  &__hero-title {
    font-size: 48px;
    font-weight: 500;
    font-family: $font-secondary;
  }

  &__hero-text {
    font-size: 16px;
  }
}

.blogs-articles {
  .article-img-large-screen {
    display: none;
  }
  &__container {
    width: 100%;
    padding: 40px 20px 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
  }

  &__container-box-text {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 25px 20px;
    display: flex;
    align-items: flex-end;
  }

  &__article-container {
    width: 100%;
    position: relative;
    cursor: pointer;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__box-text {
    background-color: $color-white;
    color: $color-black;
    display: flex;
    flex-direction: column;
    padding: 12px 10px;
    gap: 6px;
    width: 100%;
  }

  &__title-article {
    font-size: 18px;
    font-family: $font-secondary;
    text-transform: uppercase;
    font-weight: 500;
    line-height: 1;
  }

  &__description-article {
    font-size: 13px;
    color: $color-dark-grey;
    display: flex;
    flex-wrap: wrap;
    max-height: 2.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 20em; /* 20em corresponds to 20 words of an average text */
  }
}

@include media-md {
  .blogs {
    &__hero {
      background: url('../../assets/images/blogs-hero-image.png') center;
      background-size: cover;
      align-items: flex-end;
    }

    &__hero-container {
      gap: 30px;
      margin-bottom: 100px;
    }
  }

  .blogs-articles {
    &__container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 15px;
      grid-row-gap: 25px;
    }
  }
}

@include media-lg {
  .blogs-articles {
    .article-img-large-screen {
      display: block;
    }
    .article-img-mobile {
      display: none;
    }

    &__description-article {
      font-size: 13px;
      color: $color-dark-grey;
      max-height: none;
      overflow: unset;
      text-overflow: unset;
      width: unset;
    }

    &__box-text {
      max-width: 475px;
      padding: 30px 20px;
    }

    &__title-article {
      font-size: 24px;
    }

    &__description-article {
      font-size: 16px;
    }
    &__container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 40px;
    }

    &__large-article-container {
      grid-column: span 2;
    }
  }
}
</style>
