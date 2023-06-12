import React from 'react'
import { FormItemDef } from '../FormStd'

type PropsFormBlock = {
  heading: string
  formItems: FormItemDef[]
}

/**
 * Компонент - блок формы
 * по сути это просто некий контейнер, предназначенный для объединения
 * элементов формы в один логический блок, например блок контактов и т.п.
 */
export const FormBlock: React.FC<PropsFormBlock> = ({
  heading,
  formItems,
}: PropsFormBlock) => (
  <div>
    {heading && <h3>{heading}</h3>} {formItems.map((item) => item.render())}
  </div>
)

export const formBlock = (
  key: string,
  heading: string,
  formItems: FormItemDef[]
): FormItemDef => ({
  render: () => <FormBlock key={key} heading={heading} formItems={formItems} />,
})
