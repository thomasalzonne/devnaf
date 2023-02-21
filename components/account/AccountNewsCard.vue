<template>
  <div class="account-news-card">
    <div class="account-news-card__content">
      <div class="account-news-card__header">
        <p class="account-news-card__title">Un coach pour un look unique !</p>
      </div>

      <button class="account-news-card__button" @click="openNews">
        Prendre rdv
      </button>
    </div>
    <div class="account-news-card__img-container">
      <img
        class="account-news-card__img"
        src="~/assets/images/product_image.png"
        alt="Image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const $route = useRoute()
const $router = useRouter()

const openNews = () => {
  const query = { ...$route.query }

  query.news = (+(query?.news || 0) + 1).toString()

  $router.push({ query })
}
</script>

<style lang="scss" scoped>
.account-news-card {
  display: grid;
  grid-template-columns: 1fr 111px;
  gap: 11px;
  padding: 20px 0;
  border-bottom: 1px solid $color-medium-grey;

  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 198px;
  }

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__img-container {
    width: 111px;
    height: 147px;
  }

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: $color-pink;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-pink;
    color: $color-white;
    border-radius: 50px;
    padding: 15px;
    height: 46px;
    margin-top: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 14px;
    text-align: center;
    text-transform: uppercase;
    max-width: 168px;
  }

  &__badge {
    background-color: $color-light-grey;
    color: $color-dark-grey;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    padding: 2px 10px 4px 10px;
    border-radius: 30px;
    margin-right: 4px;
  }
}

@include media-xl {
  .account-news-card {
    grid-template-columns: 111px 1fr;
    gap: 30px;

    &__content {
      order: 2;
    }
  }
}
</style>
