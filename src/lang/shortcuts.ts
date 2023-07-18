import { TOptions, t } from 'i18next'
import keys from './ru'

export const tMessages = (
  key: keyof typeof keys.translation.Messages,
  opt: TOptions = {}
) => t(`Messages.${key}`, opt)

export const tErrors = (
  key: keyof typeof keys.translation.Errors,
  opt: TOptions = {}
) => t(`Errors.${key}`, opt)

export const tForms = (
  key: keyof typeof keys.translation.Forms,
  opt: TOptions = {}
) => t(`Forms.${key}`, opt)

export const tValidation = (
  key: keyof typeof keys.translation.Validation,
  opt: TOptions = {}
) => t(`Validation.${key}`, opt)

export const tPagesTitles = (
  key: keyof (typeof keys.translation)['Pages titles'],
  opt: TOptions = {}
) => t(`Pages titles.${key}`, opt)

export const tConfirms = (
  key: keyof (typeof keys.translation)['Confirm'],
  opt: TOptions = {}
) => t(`Confirm.${key}`, opt)
