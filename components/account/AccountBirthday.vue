<template>
  <div class="account-birthday">
    <div>
      <SvgIcon class="account-birthday__icon" name="gift" />
    </div>
    <a class="account-birthday__link link" href="#">{{
      $t('Account.add_birthday_date')
    }}</a>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.account-birthday {
  display: flex;
  align-items: center;
  margin-top: 2px;
  &__icon {
    width: 18px;
    height: 17px;
  }

  &__link {
    margin-left: 5px;
    font-size: 14px;
    line-height: 30px;
  }
}

@include media-xl {
  .account-birthday {
    margin-top: 28px;

    &__icon {
      width: 34px;
      height: 32px;
    }

    &__link {
      margin-left: 9px;
      font-size: 18px;
    }
  }
}
</style>
