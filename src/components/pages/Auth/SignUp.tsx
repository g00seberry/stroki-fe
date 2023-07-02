import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../../FormStd/FormStd'
import { formItemStd } from '../../FormStd/formItems/formItemStd'
import {
  captchaFormItem,
  createCapthaHelpers,
} from '../../FormStd/formItems/CaptchaFromItem/CaptchaFromItem'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../common/router'
import { PageLayout } from '../../Layout/PageLayout'
import {
  emailValidator,
  equalFields,
  required,
} from '../../FormStd/antValidators'
import { tForms } from '../../../lang/shortcuts'
import { t } from 'i18next'

export const SignUp: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const navigate = useNavigate()
  const signUp = (values: RegistraionFromData) =>
    appStore
      .signUp(values)
      .then((success) => success && navigate(PageUrl.Login))
  const toPrevPage = () => navigate(-1)
  const { ref, resetCaptcha } = createCapthaHelpers()
  const onFailed = () => resetCaptcha(ref)
  const formItems: FormItemDef[] = [
    formItemStd(
      'email',
      tForms('Email'),
      Input,
      {},
      { rules: [required(), emailValidator()] }
    ),
    formItemStd(
      'password',
      tForms('Password'),
      Input.Password,
      { autoComplete: 'off' },
      { rules: [required()], hasFeedback: true }
    ),
    formItemStd(
      'passwordConfirm',
      tForms('Confirm password'),
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
    captchaFormItem('captcha', tForms('Captcha'), ref),
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
