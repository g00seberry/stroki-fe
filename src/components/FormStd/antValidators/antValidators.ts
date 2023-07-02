import { Rule } from 'antd/es/form'
import { FormInstance } from 'rc-field-form/lib/interface'
import { tValidation } from '../../../lang/shortcuts'

export const emailValidator = () => ({
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: tValidation('Invalid email format') || '',
})

export const required = (): Rule => ({
  required: true,
  message: tValidation('The field is required') || '',
})

export const digitsCount = (count: number, field: string): Rule => ({
  len: count,
  message:
    tValidation('There must be N digits in the S', {
      num: count,
      field: field,
    }) || '',
})

export const onlyNumbers = (): Rule => ({
  pattern: /^\d*$/,
  message: tValidation('Only numbers') || '',
})

export const equalFields = (
  { getFieldValue }: FormInstance,
  fieldName: string
) => ({
  validator(_: unknown, value: string) {
    if (!value || getFieldValue(fieldName) === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(tValidation("Passwords don't match") || ''))
  },
})
