/* eslint-disable react/jsx-props-no-spreading */
import { FormItemProps, Input, InputProps } from 'antd'
import { FormItemDef } from '../FormStd'
import { formItemStd } from './formItemStd'
import { emailValidator, required } from '../antValidators'

export const formItemEmailStd = (
  name: string,
  label: string,
  compProps?: InputProps,
  itemProps?: FormItemProps
): FormItemDef =>
  formItemStd(name, label, Input, compProps, {
    ...(itemProps || {}),
    rules: [required(), emailValidator()],
  })
