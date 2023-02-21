<template>
  <div class="advantages-block">
    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <img
              src="~/assets/svg/paiements.svg"
              alt="Paiement en 3x"
              class="advantages-block__icon"
            />
          </div>
          <p class="advantages-block__title">
            {{ $t('AdvantagesBlock.item_1.title') }}
          </p>
        </div>
        <p class="advantages-block__description">
          {{ $t('AdvantagesBlock.item_1.description') }}
        </p>
      </div>
    </div>
    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <img
              src="~/assets/svg/free-shipping.svg"
              alt="Livraison gratuite"
              class="advantages-block__icon"
            />
          </div>
          <p class="advantages-block__title">
            {{ $t('AdvantagesBlock.item_2.title') }}
          </p>
        </div>
        <p class="advantages-block__description">
          {{ $t('AdvantagesBlock.item_2.description') }}
        </p>
      </div>
    </div>
    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <img
              src="~/assets/svg/free-return.svg"
              alt="Retours gratuits"
              class="advantages-block__icon"
            />
          </div>
          <p class="advantages-block__title">
            {{ $t('AdvantagesBlock.item_3.title') }}
          </p>
        </div>
        <p class="advantages-block__description advantages-block__description">
          {{ $t('AdvantagesBlock.item_3.description') }}
        </p>
      </div>
    </div>

    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <img
              src="~/assets/svg/support.svg"
              alt="Service client"
              class="advantages-block__icon"
            />
          </div>
          <p class="advantages-block__title">
            {{ $t('AdvantagesBlock.item_4.title') }}
          </p>
        </div>
        <p class="advantages-block__description advantages-block__description">
          {{ $t('AdvantagesBlock.item_4.description') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdvantagesBlock',
})
</script>

<style lang="scss" scoped>
.advantages-block {
  padding: 32px 40px 38px 38px;
  width: 100%;
  max-width: 1500px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px 60px;
  margin: auto;

  &__item-container {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__icon-container {
    height: 30px;
    width: max-content;
    display: flex;
    justify-content: center;
  }

  &__icon {
    object-fit: contain;
    width: auto;
    height: 100%;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__item-header {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  &__title {
    font-weight: 460;
    font-size: 14px;
    line-height: 18px;
    font-family: $font-secondary;
  }

  &__description {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    max-width: 165px;
    color: $color-black;
  }
}

@include media-md {
  .advantages-block {
    display: flex;
    gap: 28px;
    justify-content: space-between;
    max-width: 1440px;
    padding: 60px 60px 70px 60px;

    &__icon-container {
      height: 27px;
    }

    &__item-header {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }

    &__item-container {
      gap: 6px;
    }

    &__title {
      font-weight: 460;
      font-size: 16px;
      line-height: 21px;
    }

    &__description {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
    }
  }
}

@include media-xl {
  .advantages-block {
    padding: 60px 146px 70px 125px;
  }
}
</style>
