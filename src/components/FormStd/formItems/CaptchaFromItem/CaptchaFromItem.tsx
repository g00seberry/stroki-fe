/* eslint-disable react/jsx-props-no-spreading */
import { Captcha } from '@nabidam/react-captcha'
import { Form, Input } from 'antd'
import React from 'react'
import { Rule } from 'antd/es/form'
import { FormItemDef } from '../../FormStd'
import style from './CaptchaFromItem.module.less'
import { digitsCount, required } from '../../antValidators'
import { useTranslation } from 'react-i18next'
import { t as getTranslate } from 'i18next'

export type CaptchaRefType = { initializeCaptcha: () => void }

export type CaptchaRefObject = React.RefObject<CaptchaRefType>

export const createCapthaHelpers = () => ({
  ref: React.useRef<CaptchaRefType>(null),
  resetCaptcha: (captchaRef: CaptchaRefObject) =>
    captchaRef.current?.initializeCaptcha(),
})

export const captchaValidator = (userInput: string): Rule => ({
  validator: (_, value: string) => {
    if (value !== userInput) {
      return Promise.reject(
        new Error(getTranslate('Validation.Wrong code from picture') || '')
      )
    }
    return Promise.resolve()
  },
})

type PropsCaptchaFormItem = {
  name: string
  label: string
  captchaRef: CaptchaRefObject
}

/**
 * Компонент - элемент формы капча
 */
export const CaptchaFormItem: React.FC<PropsCaptchaFormItem> = ({
  name,
  label,
  captchaRef,
}: PropsCaptchaFormItem) => {
  const [captcha, setCaptcha] = React.useState('')
  const { t } = useTranslation()
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        required(),
        digitsCount(4, t('Forms.Captcha')),
        captchaValidator(captcha),
      ]}
    >
      <div className={style.container}>
        <Input />
        <Captcha
          setWord={setCaptcha}
          ref={captchaRef}
          inputEl={undefined}
          reloadText={t('Forms.Reload captcha') || ''}
          backgroundColor="#c9deff"
          fontColor="#000"
        />
      </div>
    </Form.Item>
  )
}

export const captchaFormItem = (
  name: string,
  label: string,
  captchaRef: CaptchaRefObject
): FormItemDef => ({
  render: () => (
    <CaptchaFormItem
      key={name}
      captchaRef={captchaRef}
      name={name}
      label={label}
    />
  ),
})
