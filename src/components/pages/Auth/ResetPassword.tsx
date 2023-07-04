import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../../FormStd/FormStd'
import { formItemStd } from '../../FormStd/formItems/formItemStd'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../common/router'
import { PageLayout } from '../../Layout/PageLayout'
import {
  emailValidator,
  equalFields,
  required,
} from '../../FormStd/antValidators'
import confirm from 'antd/es/modal/confirm'
import {
  captchaFormItem,
  createCapthaHelpers,
} from '../../FormStd/formItems/CaptchaFromItem/CaptchaFromItem'
import { tErrors, tForms, tMessages } from '../../../lang/shortcuts'
import { t } from 'i18next'

export const ResetPassword: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const { ref, resetCaptcha } = createCapthaHelpers()
  const onFailed = () => resetCaptcha(ref)
  const resetPassword = (values: RegistraionFromData) =>
    appStore.resetPassword(values).then((success) => {
      if (success) {
        navigate(PageUrl.Root)
        confirm({
          title: tErrors('Attention'),
          content: tMessages(
            'An email with instructions has been sent to your email'
          ),
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
      tForms('Email'),
      Input,
      { autoComplete: 'off' },
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
        pending={appStore.pending}
        submit={resetPassword}
        onFinishFailed={onFailed}
        submitText={t('Reset password') || ''}
        cancelText={t('Back') || ''}
        cancel={toPrevPage}
      />
    </PageLayout>
  )
})
