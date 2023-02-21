import { useI18n } from 'vue-i18n'
import { IProfileNavigationItem } from '~~/types/profile.interface'

export const useAccountNavigation = () => {
  const { t } = useI18n()

  const navigation: IProfileNavigationItem[] = [
    {
      title: t('Account.my_orders'),
      iconName: 'bag_outline',
      to: '/account/orders',
      disable: false,
      scope: 'orders',
    },
    {
      title: t('Account.my_profile'),
      iconName: 'account',
      disable: false,
      scope: 'account',
      children: [
        {
          title: t('Account.my_personal_info'),
          to: '/account',
          disable: false,
          scope: 'account',
        },
        {
          title: t('Account.my_addresses'),
          to: '/account/addresses',
          disable: false,
          scope: 'account',
        },
        {
          title: t('Account.my_favourite_store'),
          to: '/account/store',
          disable: true,
          scope: 'account',
        },
        {
          title: t('Account.my_payments'),
          to: '/account/payment',
          disable: false,
          scope: 'account',
        },
        {
          title: t('Account.my_subscriptions'),
          to: '/account/subscriptions',
          disable: false,
          scope: 'account',
        },
      ],
    },
    {
      title: t('Account.my_favourites'),
      iconName: 'heart_nav',
      to: '/account/favourites',
      disable: false,
      scope: 'favourite',
    },
    {
      title: t('Account.need_help'),
      iconName: 'info',
      to: '/account/faq',
      disable: false,
      scope: 'info',
    },
    // {
    //   title: t('Account.logout'),
    //   iconName: 'logout',
    //   callback: logout,
    //   disable: false,
    //   scope: 'logout',
    // },
  ]

  return {
    navigation,
  }
}
