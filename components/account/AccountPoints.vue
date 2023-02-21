<template>
  <div class="account-points">
    <p class="account-points__text">
      {{ `${points || 0} ${$t('Account.loyalty_points')}` }}
    </p>
    <NuxtLink to="/account/club" class="account-points__link link">{{
      $t('Common.see')
    }}</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  points: number
}

withDefaults(defineProps<IProps>(), {
  points: 0,
})
</script>

<style lang="scss" scoped>
.account-points {
  background-color: $color-pink-light;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 224px;
  min-height: 37px;
  padding: 4px 22px 3px 24px;
  margin-top: 17px;

  &__link {
    font-size: 14px;
    line-height: 30px;
  }

  &__text {
    color: $color-pink;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    text-align: center;
    text-transform: uppercase;
  }
}

@include media-xl {
  .account-points {
    border-radius: 30px;
    max-width: 289px;
    min-height: 58px;
    padding: 7px 30px;
    margin-top: 47px;

    &__link {
      font-size: 18px;
    }

    &__text {
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
