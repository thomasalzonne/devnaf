<template>
  <div class="point-item">
    <div class="point-item__grid">
      <div class="point-item__img-container"></div>
      <div class="point-item__content">
        <p class="point-item__heading">
          {{ `${internalPoints} ${$t('Account.points')}` }}
        </p>
        <p class="point-item__text">
          Je m’offre un foulard sur une sélection d’articles.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  points: {
    type: Number,
    default: 0,
  },
})

const internalPoints = ref(80)
</script>

<style lang="scss" scoped>
.point-item {
  border-bottom: 1px solid $color-medium-grey;
  padding: 20px 0;

  &:not(:first-child) {
    padding: 30px 0 20px 0;
  }

  &__grid {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__img-container {
    width: 42px;
    height: 68px;
  }

  &__img {
    object-fit: contain;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  &__content {
    width: 222px;
  }

  &__heading {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
  }

  &__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  &__button {
    margin-top: 18px;
    display: none;
  }
}

@include media-xl {
  .point-item {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    &__grid {
      width: 100%;
    }

    &__content {
      width: 301px;
    }

    &__text {
      font-size: 16px;
    }

    &__button {
      display: flex;
      margin-top: 16px;
      max-width: 178px;
      font-size: 16px;
      height: 39px;
      margin-right: 30px;
    }
  }
}
</style>
