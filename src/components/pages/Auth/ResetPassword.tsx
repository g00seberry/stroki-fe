import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../../FormStd/FormStd'
import { formItemStd } from '../../FormStd/formItems/formItemStd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../common/router'
import { PageLayout } from '../../Layout/PageLayout'
import { equalFields, required } from '../../FormStd/antValidators'
import confirm from 'antd/es/modal/confirm'
import {
  captchaFormItem,
  createCapthaHelpers,
} from '../../FormStd/formItems/CaptchaFromItem/CaptchaFromItem'

export const ResetPassword: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const { ref, resetCaptcha } = createCapthaHelpers()
  const onFailed = () => resetCaptcha(ref)
  const resetPassword = (values: RegistraionFromData) =>
    appStore.resetPassword(values).then((success) => {
      if (success) {
        navigate(PageUrl.Root)
        confirm({
          title: t('Errors.Attention'),
          content: t('An email with instructions has been sent to your email'),
          cancelText: undefined,
          type: 'info',
        })
      }
    })

  const navigate = useNavigate()
  const toPrevPage = () => navigate(-1)
  const formItems: FormItemDef[] = [
    formItemStd(
      'email',
      t('Forms.Email'),
      Input,
      { autoComplete: 'off' },
      { rules: [required()] }
    ),
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
        submit={resetPassword}
        onFinishFailed={onFailed}
        submitText={t('Reset password') || ''}
        cancelText={t('Back') || ''}
        cancel={toPrevPage}
      />
    </PageLayout>
  )
})
