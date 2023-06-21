/* eslint-disable react/jsx-props-no-spreading */
import { Button, Form, FormInstance, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import style from './FormStd.module.less'
import { useTranslation } from 'react-i18next'

export type FormItemDef = {
  render: (ctx?: FormInstance) => React.ReactNode
}

type PropsFormStd<TFormData> = Omit<
  React.ComponentProps<typeof Form<TFormData>>,
  'onFinish' | 'layout' | 'scrollToFirstError'
> & {
  formItems: FormItemDef[]
  submitText?: string
  submitIcon?: React.ReactNode
  cancelText?: string
  cancelIcon?: React.ReactNode
  extraButtons?: React.ReactNode[]
  heading?: string
  submit: (values: TFormData) => void
  cancel?: () => void
}

export const FormStd = observer(
  <TFormData,>({
    formItems,
    submitText,
    cancelText,
    submitIcon,
    cancelIcon,
    extraButtons,
    heading,
    submit,
    cancel,
    ...props
  }: PropsFormStd<TFormData>) => {
    const { t } = useTranslation()
    return (
      <Form
        size="large"
        layout="vertical"
        scrollToFirstError
        {...props}
        onFinish={(values: TFormData) => submit(values)}
      >
        {heading && <div className={style.heading}>{heading}</div>}

        {formItems.map((item) => item.render())}

        <Space>
          <Button htmlType="submit" type="primary">
            {submitText || t('Forms.Submit')}
            {submitIcon}
          </Button>
          <Button onClick={() => cancel?.()} icon={cancelIcon}>
            {cancelText || t('Forms.Cancel')}
          </Button>
          {extraButtons}
        </Space>
      </Form>
    )
  }
)
