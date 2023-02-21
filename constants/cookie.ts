export enum EAppCookie {
  AUTH_TOKEN = 'token',
  USER_ID = 'userId',
  WISHLIST_TOKEN = 'wishlist_token',
  CART_TOKEN = 'cart_token',
}

export const COOKIE_CONFIG = (maxAge = 2629800000, path = '/') => {
  return {
    maxAge,
    path,
  }
}
