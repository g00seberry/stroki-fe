/* eslint-disable react/jsx-props-no-spreading */
import { Button, Form, FormInstance, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import style from './FormStd.module.less'
import { tConfirms, tForms } from '../../lang/shortcuts'
import { Loading } from '../Loading/Loading'
import { ButtonWithConfirm } from '../ButtonWithConfirm'
import { useForm } from 'antd/es/form/Form'

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
  /**
   * чтобы понимать, что идет подгрузка ресурсов
   * от которых зависит инициализация
   */
  loading?: boolean
  /**
   * чтобы понимать, что идет какое-то ожидание, например
   * сохранение данных
   */
  pending?: boolean
  heading?: string
  confirmSubmit?: boolean
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
    loading,
    pending,
    confirmSubmit,
    submit,
    cancel,
    ...props
  }: PropsFormStd<TFormData>) => {
    const [form] = useForm<TFormData>()
    return (
      <Loading loading={!!loading}>
        <Form<TFormData>
          size="large"
          layout="vertical"
          scrollToFirstError
          {...props}
          onFinish={(values: TFormData) => submit(values)}
          disabled={pending}
          form={form}
        >
          {heading && <div className={style.heading}>{heading}</div>}
          {formItems.map((item) => item.render())}
          <Space>
            {confirmSubmit ? (
              <ButtonWithConfirm
                type="primary"
                loading={pending}
                confirmProps={{
                  onOk: () => {
                    form.submit()
                  },
                  title: tConfirms('Confirm action'),
                  type: 'warning',
                  okButtonProps: { danger: true },
                  okText: submitText || tForms('Submit'),
                }}
              >
                {submitText || tForms('Submit')}
                {submitIcon}
              </ButtonWithConfirm>
            ) : (
              <Button htmlType="submit" type="primary" loading={pending}>
                {submitText || tForms('Submit')}
                {submitIcon}
              </Button>
            )}

            <Button onClick={() => cancel?.()} icon={cancelIcon}>
              {cancelText || tForms('Cancel')}
            </Button>
            {extraButtons}
          </Space>
        </Form>
      </Loading>
    )
  }
)
