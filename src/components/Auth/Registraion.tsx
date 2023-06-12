import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../FormStd/FormStd'
import { formItemStd } from '../FormStd/formItems/formItemStd'
import { useTranslation } from 'react-i18next'
import {
  captchaFormItem,
  createCapthaHelpers,
} from '../FormStd/formItems/CaptchaFromItem/CaptchaFromItem'

export const Registraion: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const register = (values: RegistraionFromData) =>
    appStore.registration(values)
  const toLoginPage = () => appStore.setOverlay('login')
  const { ref } = createCapthaHelpers()

  const formItems: FormItemDef[] = [
    formItemStd('email', t('Forms.Email'), Input),
    formItemStd('password', t('Forms.Password'), Input),
    captchaFormItem('captcha', t('Forms.Captcha'), ref),
  ]

  return (
    <FormStd
      formItems={formItems}
      submit={register}
      submitText={t('Forms.Registration') || ''}
      cancelText={t('Forms.Login') || ''}
      cancel={toLoginPage}
    />
  )
})
