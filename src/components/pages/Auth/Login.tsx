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
import { Link } from 'react-router-dom'
import { emailValidator, required } from '../../FormStd/antValidators'
import { tForms } from '../../../lang/shortcuts'
import { t } from 'i18next'

export const Login: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const login = (values: RegistraionFromData) =>
    appStore.login(values).then((success) => success && navigate(PageUrl.Root))

  const navigate = useNavigate()
  const toPrevPage = () => navigate(-1)
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
      {},
      { rules: [required()] }
    ),
  ]

  return (
    <PageLayout>
      <FormStd
        formItems={formItems}
        submit={login}
        submitText={t('Login') || ''}
        cancelText={t('Back') || ''}
        cancel={toPrevPage}
        extraButtons={[
          <Link to={PageUrl.ResetPassword} key="resetPassword">
            {t('Forgot your password?')}
          </Link>,
        ]}
      />
    </PageLayout>
  )
})
