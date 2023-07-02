import { Rule } from 'antd/es/form'
import { FormInstance } from 'rc-field-form/lib/interface'
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

export const equalFields = (
  { getFieldValue }: FormInstance,
  fieldName: string
) => ({
  validator(_: unknown, value: string) {
    if (!value || getFieldValue(fieldName) === value) {
      return Promise.resolve()
    }
    return Promise.reject(
      new Error(t("Validation.Passwords don't match") || '')
    )
  },
})
