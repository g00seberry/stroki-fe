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
import { equalFields, required } from '../../FormStd/antValidators'

export const SignUp: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const signUp = (values: RegistraionFromData) =>
    appStore
      .signUp(values)
      .then((success) => success && navigate(PageUrl.Login))
  const toPrevPage = () => navigate(-1)
  const { ref, resetCaptcha } = createCapthaHelpers()
  const onFailed = () => resetCaptcha(ref)
  const formItems: FormItemDef[] = [
    formItemStd('email', t('Forms.Email'), Input, {}, { rules: [required()] }),
    formItemStd(
      'password',
      t('Forms.Password'),
      Input.Password,
      { autoComplete: 'off' },
      { rules: [required()], hasFeedback: true }
    ),
    formItemStd(
      'passwordConfirm',
      t('Forms.Confirm password'),
      Input.Password,
      { autoComplete: 'off' },
      {
        rules: [
          required(),
          (formInstance) => equalFields(formInstance, 'password'),
        ],
        hasFeedback: true,
        dependencies: ['password'],
      }
    ),
    captchaFormItem('captcha', t('Forms.Captcha'), ref),
  ]

  return (
    <PageLayout>
      <FormStd
        formItems={formItems}
        submit={signUp}
        onFinishFailed={onFailed}
        submitText={t('Sign up') || ''}
        cancelText={t('Back') || ''}
        cancel={toPrevPage}
      />
    </PageLayout>
  )
})
