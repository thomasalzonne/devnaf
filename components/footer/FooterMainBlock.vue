<template>
  <div class="footer-main-block">
    <div class="footer-main-block__container">
      <div class="footer-main-block__links footer-main-block__links--mobile">
        <FooterAccordion
          v-for="accordion in footerLinks"
          :key="`accordion-${accordion.title}`"
          :title="accordion.title"
        >
          <ul class="footer-main-block__list-links">
            <li
              v-for="link in accordion.links"
              :key="link.title"
              class="footer-main-block__link"
            >
              {{ link.title }}
            </li>
          </ul>
        </FooterAccordion>
      </div>

      <div class="footer-main-block__links footer-main-block__links--desktop">
        <div
          v-for="block in footerLinks"
          :key="`block-${block.title}`"
          class="footer-main-block__links-block"
        >
          <p class="footer-main-block__links-block-title">{{ block.title }}</p>
          <ul class="footer-main-block__list-links">
            <li
              v-for="link in block.links"
              :key="link.title"
              class="footer-main-block__link"
            >
              {{ link.title }}
            </li>
          </ul>
        </div>
      </div>
      <FooterContact />
    </div>
    <div class="footer-main-block__follow-us">
      <h4 class="footer-main-block__contact-title">
        {{ $t('Footer.follow_us') }}
      </h4>
      <ul class="footer-main-block__social-networks">
        <li class="footer-main-block__social-networks-link">Instagram</li>
        <li class="footer-main-block__social-networks-link">TikTok</li>
        <li class="footer-main-block__social-networks-link">Pinterest</li>
        <li class="footer-main-block__social-networks-link">Youtube</li>
        <li class="footer-main-block__social-networks-link">Facebook</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FooterContact from '~/components/footer/FooterContact.vue'
import FooterAccordion from '~/components/footer/FooterAccordion.vue'

interface IFooterLink {
  title: string
  links: {
    title: string
    url: string
  }[]
}

const footerLinks: IFooterLink[] = [
  {
    title: 'Nos services',
    links: [
      {
        title: 'Nos boutiques',
        url: '',
      },
      {
        title: 'E-réservation',
        url: '',
      },
      {
        title: 'FAQ',
        url: '',
      },
      {
        title: 'Contact',
        url: '',
      },
    ],
  },
  {
    title: 'Naf Naf',
    links: [
      {
        title: 'La marque',
        url: '',
      },
      {
        title: 'My Fashion Thérapy',
        url: '',
      },
      {
        title: 'Naf Naf parfums',
        url: '',
      },
      {
        title: 'Recycler vos vêtements',
        url: '',
      },
      {
        title: 'Notre démarche responsable',
        url: '',
      },
    ],
  },
  {
    title: 'Informations',
    links: [
      {
        title: 'CGV',
        url: '',
      },
      {
        title: 'Mentions legales',
        url: '',
      },
      {
        title: 'Données personnelles',
        url: '',
      },
      {
        title: 'Gestion des cookies',
        url: '',
      },
      {
        title: 'Nous rejoindre ',
        url: '',
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
.footer-main-block {
  border-top: 5px solid $color-footer-border;
  border-bottom: 12px solid $color-pink;
  margin-bottom: 75px;

  &__container {
    padding: 33px 20px 37px 20px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    gap: 37px;
    margin: auto;
  }

  &__social-networks-link {
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: $color-pink;
    }
  }

  &__list-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0 2px 0;
  }

  &__link {
    font-weight: 400;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: $color-pink;
    }
  }
  &__contact-title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 26px;
    text-transform: uppercase;
  }

  &__follow-us {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 20px 22px 20px;
    max-width: 486px;
  }

  &__social-networks {
    display: flex;
    gap: 18px;
  }

  &__links {
    border-top: 1px solid $color-grey-lighten;
    display: flex;
    flex-direction: column;

    &--desktop {
      display: none;
    }
  }
}

@include media-md {
  .footer-main-block {
    &__container {
      width: 100%;
    }

    &__links {
      flex-direction: row;
      justify-content: center;
      border: none;
      width: 100%;
      gap: 60px;

      &--mobile {
        display: none;
      }

      &--desktop {
        display: flex;
      }
    }

    &__follow-us {
      padding-left: 0;
      padding-right: 0;
      margin: 0 auto;
    }

    &__list-links {
      padding-top: 18px;
      gap: 12px;
    }

    &__links-block-title {
      font-family: $font-secondary;
      font-weight: 460;
      font-size: 16px;
      line-height: 21px;
      text-transform: uppercase;
    }
  }
}

@include media-lg {
  .footer-main-block {
    margin-bottom: 0px;

    &__container {
      flex-direction: row;
      justify-content: space-between;
      padding: 60px 60px 80px 60px;
      max-width: 1440px;
      gap: 60px;
    }

    &__follow-us {
      margin: 0;
      margin-top: 30px;
      display: none;
    }

    &__links-block {
      width: max-content;
    }

    &__links {
      gap: 40px;
      width: 50%;
      justify-content: flex-start;
    }

    &__contact-title {
      text-align: left;
    }

    &__social-networks {
      justify-content: unset;
    }
  }
}

@include media-xl {
  .footer-main-block {
    &__container {
      padding: 60px 124px 80px 122px;
      max-width: 1440px;
      gap: 165px;
    }

    &__links {
      gap: 89px;
    }
  }
}
</style>
