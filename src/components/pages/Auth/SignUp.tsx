import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../../FormStd/FormStd'
import { formItemStd } from '../../FormStd/formItems/formItemStd'
import { useTranslation } from 'react-i18next'
import {
  captchaFormItem,
  createCapthaHelpers,
} from '../../FormStd/formItems/CaptchaFromItem/CaptchaFromItem'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../common/router'
import { PageLayout } from '../../Layout/PageLayout'

export const SignUp: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const signUp = (values: RegistraionFromData) =>
    appStore
      .signUp(values)
      .then((success) => success && navigate(PageUrl.Login))
  const navigate = useNavigate()
  const toPrevPage = () => navigate(-1)
  const { ref } = createCapthaHelpers()

  const formItems: FormItemDef[] = [
    formItemStd('email', t('Forms.Email'), Input),
    formItemStd('password', t('Forms.Password'), Input),
    captchaFormItem('captcha', t('Forms.Captcha'), ref),
  ]

  return (
    <PageLayout>
      <FormStd
        formItems={formItems}
        submit={signUp}
        submitText={t('Forms.Sign up') || ''}
        cancelText={t('Back') || ''}
        cancel={toPrevPage}
      />
    </PageLayout>
  )
})
