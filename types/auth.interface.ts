import { EAuthProviders } from '~~/constants/auth'

export interface ILoginForm {
  email: string
  password: string
}

export interface IRegistrationStepOneForm {
  firstName: string
  lastName: string
}

export interface IRegistrationStepTwoForm {
  email: string
  password: string
  subscribedToNewsletter: boolean
  accept_privacy?: boolean
}

export interface IRegistrationForm
  extends IRegistrationStepOneForm,
    IRegistrationStepTwoForm {}

export interface IRequestResetPasswordForm {
  email: string
}

export interface IResetPasswordForm {
  password: string
}

export interface IResetPasswordPayload {
  newPassword: string
  confirmNewPassword: string
}

export interface ILoginWithSocialsBody {
  service: EAuthProviders
  accessToken: string
}

export interface IGoogleCredentialResponse {
  access_token: string
  authuser: string
  expires_in: number
  prompt: string
  scope: string
  token_type: string
}

export enum EFacebookStatus {
  CONNECTED = 'connected',
  UNKNOWN = 'unknown',
  NOT_AUHTORIZED = 'not_authorized',
}

export interface IFacebookCredentialResponse {
  status: EFacebookStatus
  authResponse: {
    accessToken: string
    expiresIn: number
    reauthorize_required_in: number
    signedRequest: string
    userID: string
  }
}
