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

export const Login: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const login = (values: RegistraionFromData) =>
    appStore.login(values).then((seccess) => seccess && navigate(PageUrl.Root))

  const navigate = useNavigate()
  const toPrevPage = () => navigate(-1)
  const formItems: FormItemDef[] = [
    formItemStd('email', t('Forms.Email'), Input),
    formItemStd('password', t('Forms.Password'), Input),
  ]

  return (
    <PageLayout>
      <FormStd
        formItems={formItems}
        submit={login}
        submitText={t('Forms.Enter') || ''}
        cancelText={t('Back') || ''}
        cancel={toPrevPage}
      />
    </PageLayout>
  )
})
