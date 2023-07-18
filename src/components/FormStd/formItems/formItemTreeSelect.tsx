/* eslint-disable react/jsx-props-no-spreading */
import { FormItemProps, Form, TreeSelectProps, TreeSelect } from 'antd'
import React from 'react'
import { FormItemDef } from '../FormStd'

export const formItemTreeSelectStd = (
  name: string,
  label: string,
  compProps?: TreeSelectProps,
  itemProps?: FormItemProps
): FormItemDef => ({
  render: () => (
    <Form.Item key={name} {...(itemProps || {})} name={name} label={label}>
      <TreeSelect {...compProps} fieldNames={{ value: 'id', label: 'title' }} />
    </Form.Item>
  ),
})
