<template>
  <div class="footer-contact">
    <div class="footer-contact__newsletter">
      <h4 class="footer-contact__title">{{ $t('Footer.newsletter_title') }}</h4>
      <p class="footer-contact__newsletter-text">
        {{ $t('Footer.newsletter_description') }}
      </p>
      <div class="footer-contact__box-email-newsletter">
        <SvgIcon class="footer-contact__email-icon" name="email" />
        <input
          type="email"
          :placeholder="$t('Footer.newsletter_placeholder')"
          class="footer-contact__input-email-newsletter"
        />
      </div>
    </div>
    <div class="footer-contact__follow-us">
      <h4 class="footer-contact__title">{{ $t('Footer.follow_us') }}</h4>
      <ul class="footer-contact__social-networks">
        <li class="footer-contact__social-networks-link">Instagram</li>
        <li class="footer-contact__social-networks-link">TikTok</li>
        <li class="footer-contact__social-networks-link">Pinterest</li>
        <li class="footer-contact__social-networks-link">Youtube</li>
        <li class="footer-contact__social-networks-link">Facebook</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.footer-contact {
  &__social-networks-link {
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: $color-pink;
    }
  }

  &__newsletter {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 486px;
  }

  &__box-email-newsletter {
    position: relative;
    margin-top: 10px;
  }

  &__email-icon {
    position: absolute;
    width: 20px;
    height: 15px;
    top: 16px;
    left: 15px;
    border: 14px;
  }

  &__input-email-newsletter {
    height: 45px;
    border: 1px solid $color-black;
    width: 100%;
    padding-left: 50px;

    &::placeholder {
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      color: $color-medium-grey;
    }
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 26px;
    text-transform: uppercase;
  }

  &__newsletter-text {
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
  }

  &__follow-us {
    display: flex;
    flex-direction: column;
    gap: 10px;
    display: none;
  }

  &__social-networks {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
}

@include media-md {
  .footer-contact {
    &__box-email-newsletter {
      width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    &__follow-us {
      max-width: 486px;
      margin: 0 auto;
      margin-top: 30px;
    }

    &__newsletter {
      margin: 0 auto;
    }
  }
}

@include media-lg {
  .footer-contact {
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 0;

    &__box-email-newsletter {
      width: unset;
      margin-left: 0;
      margin-right: 0;
    }

    &__newsletter-text {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
    }

    &__newsletter {
      gap: 7px;
      margin: 0;
    }

    &__title {
      font-weight: 480;
      font-size: 20px;
      line-height: 26px;
    }

    &__social-networks {
      justify-content: unset;
      gap: 18px;
    }

    &__social-networks-link {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
    }

    &__follow-us {
      display: flex;
      margin: 0;
      margin-top: 27px;
      gap: 6px;
    }
  }
}
</style>
