/* eslint-disable react/jsx-props-no-spreading */
import { FormItemProps, Form } from 'antd'
import React from 'react'
import { FormItemDef } from '../FormStd'

/**
 * Функция, предназначеная для гибкого создания элементов форм.
 * Как правило при помощи нее создаются несложные элементы по типу простых инпутов,
 * а для более сложных элементов необходимо писать свои функции,
 * как например для капчи (src\components\FormStd\formItems\CaptchaFromItem\CaptchaFromItem.tsx)
 */
export const formItemStd = <TProps extends object>(
  name: string,
  label: string,
  Comp: React.FC<TProps> | React.ComponentClass<TProps>,
  compProps?: TProps,
  itemProps?: FormItemProps
): FormItemDef => ({
  render: () => (
    <Form.Item key={name} {...(itemProps || {})} name={name} label={label}>
      <Comp {...(compProps || ({} as TProps))} />
    </Form.Item>
  ),
})
