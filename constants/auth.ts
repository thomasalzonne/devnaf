export enum EAuth {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  RESET_PASSWORD = 'reset_password',
  PRE_AUTH = 'pre_auth',
}

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])^.{8,}$/

export const NAME_REGEX = /^([a-zA-ZÀ-ÿ\s-]){2,}$/

export enum EAuthProviders {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}
