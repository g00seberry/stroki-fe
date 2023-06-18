import * as React from 'react'
import { FormItemProps } from 'antd/lib/form/FormItem'

export type FiltersFormItem = {
  render(): React.ReactElement
  itemProps?: FormItemProps
  // toSave более приоритетно, чем save
  toSave?: (value: unknown | undefined, key: string) => unknown
  save?: (
    output: Record<string, unknown>,
    value: unknown | undefined,
    key: string
  ) => void
  defaultValue?: unknown
  separated?: boolean
  label?: string
  incompatibleKeys?: string[]
  nextKey?: string
}

export const filterItem = <Props extends object>(
  Comp: React.FC<Props> | React.ComponentClass<Props>,
  compProps: Props,
  itemProps?: FormItemProps,
  rest?: Omit<FiltersFormItem, 'render' | 'itemProps'>
): FiltersFormItem => ({
  itemProps,
  render: () => <Comp {...compProps} />,
  label: findLabel(compProps, itemProps),
  ...(rest ?? {}),
})

type PropsWithPlaceholder = {
  placeholder?: unknown
}
const findLabel = <Props extends PropsWithPlaceholder>(
  compProps: Props,
  itemProps?: FormItemProps
): string | undefined => {
  if ('placeholder' in compProps && typeof compProps.placeholder === 'string')
    return compProps.placeholder
  if (typeof itemProps?.label === 'string') return itemProps?.label
  return undefined
}
