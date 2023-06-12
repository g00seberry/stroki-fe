import { Rule } from 'antd/es/form'
import { t } from 'i18next'

export const emailValidator = () => ({
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: t('Validation.Invalid email format') || '',
})

export const required = (): Rule => ({
  required: true,
  message: t('Validation.The field is required') || '',
})

export const digitsCount = (count: number, field: string): Rule => ({
  len: count,
  message:
    t('Validation.There must be N digits in the S', {
      num: count,
      field: field,
    }) || '',
})

export const onlyNumbers = (): Rule => ({
  pattern: /^\d*$/,
  message: t('Validation.Only numbers') || '',
})
