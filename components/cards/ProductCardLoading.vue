<template>
  <div class="product-card">
    <div class="product-card__container card-loading">
      <SvgIcon class="card-loading__logo" name="logo" />
    </div>
    <div class="card-loading product-content--loading"></div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ProductCardLoading',
})
</script>

<style lang="scss" scoped>
.card-loading {
  min-height: 25px;
  position: relative;
  background-color: rgb(227, 227, 227);

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  &__logo {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    animation: logo-shimmer 4s infinite;

    @keyframes logo-shimmer {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.2;
      }
    }
  }
}

.product-content--loading {
  width: 80%;
  margin-top: 15px;
  border-radius: 7px;
}
.product-card {
  min-width: 152px;

  &__container {
    width: 100%;
    width: 152px;
    height: 204px;
    overflow: hidden;
  }
}

@include media-lg {
  .product-card {
    min-width: 354px;

    &__container {
      width: 311px;
      height: 418px;

      &.card-loading {
        border-radius: 10px;
      }
    }
  }
}

@include media-xxxl {
  .product-card {
    min-width: auto;
  }
}
</style>
