<template>
  <div>
    <div class="product-morphology__morphology">
      <div class="product-morphology__morphology-header">
        <p class="product-morphology__morphology-label">
          {{ $t('Common.morphology') }} :
        </p>
        <a
          class="product-morphology__link product-morphology__link--desktop"
          href="#"
          ><span>{{ $t('Common.find_my_morphology') }}</span>
          <SvgIcon class="product-morphology__link-icon" name="arrow" />
        </a>
      </div>
      <div class="product-morphology__morphology-items">
        <div class="product-morphology__morphology-item">
          <SvgIcon
            class="product-morphology__morphology-img"
            name="morphology_sablier"
          />
          <p class="product-morphology__morphology-name">Sablier</p>
        </div>
        <div class="product-morphology__morphology-item">
          <SvgIcon
            class="product-morphology__morphology-img"
            name="morphology_triangle"
          />

          <p class="product-morphology__morphology-name">Triangle</p>
        </div>
        <div class="product-morphology__morphology-item">
          <SvgIcon
            class="product-morphology__morphology-img"
            name="morphology_rectangle"
          />

          <p class="product-morphology__morphology-name">Rectangle</p>
        </div>
      </div>
    </div>
    <a
      class="product-morphology__link product-morphology__link--mobile"
      href="#"
      ><span>{{ $t('Common.find_my_morphology') }}</span>
      <SvgIcon class="product-morphology__link-icon" name="arrow" />
    </a>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.product-morphology {
  &__morphology-label {
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    margin-bottom: 13px;
  }

  &__morphology-items {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  &__morphology-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 72px;
  }

  &__morphology-img {
    width: 38px;
    height: 38px;
    object-fit: cover;
  }

  &__morphology-name {
    color: $color-dark-grey;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }

  &__link {
    color: $color-pink;
    text-decoration: underline;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    margin: 8px 0 16px 0;

    &--desktop {
      display: none;
    }
  }

  &__link-icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
}

@include media-lg {
  .product-morphology {
    &__morphology {
      padding: 31px 0 40px 0;
      border-top: 1px solid $color-pink;
    }

    &__morphology-label {
      font-family: $font-secondary;
      font-weight: 400;
      font-size: 22px;
      line-height: 20px;
      margin-bottom: 0;
    }

    &__morphology-items {
      margin-top: 15px;
      gap: 28px;
    }

    &__morphology-item {
      flex-direction: row;
      min-width: 103px;
    }

    &__morphology-img {
      width: 54px;
      height: 54px;
    }

    &__morphology-name {
      font-size: 16px;
      line-height: 24px;
      text-align: left;
    }

    &__morphology-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .product-morphology__link {
        margin: 0;
      }
    }

    &__link {
      &--mobile {
        display: none;
      }

      &--desktop {
        display: inline;
      }
    }

    &__link-icon {
      display: none;
    }
  }
}

@media screen and (min-width: 1400px) {
  .product-morphology {
    &__morphology-item {
      flex-direction: row;
      min-width: 103px;

      &:last-child {
        margin-left: 7px;
      }

      &:not(:first-child) {
        gap: 5px;
      }
    }
  }
}
</style>
