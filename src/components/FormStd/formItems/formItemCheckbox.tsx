/* eslint-disable react/jsx-props-no-spreading */
import { FormItemProps, Form, Checkbox } from 'antd'
import React from 'react'
import { FormItemDef } from '../FormStd'
import { CheckboxProps } from 'antd/lib/checkbox'

export const formItemCheckbox = (
  name: string,
  label: string,
  compProps?: CheckboxProps,
  itemProps?: FormItemProps
): FormItemDef => ({
  render: () => (
    <Form.Item
      key={name}
      {...(itemProps || {})}
      name={name}
      valuePropName="checked"
    >
      <Checkbox {...compProps}>{label}</Checkbox>
    </Form.Item>
  ),
})
