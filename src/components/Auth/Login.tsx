import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../FormStd/FormStd'
import { formItemStd } from '../FormStd/formItems/formItemStd'
import { useTranslation } from 'react-i18next'

export const Login: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const login = (values: RegistraionFromData) => appStore.login(values)
  const toRegistrationPage = () => appStore.setOverlay('registration')
  const formItems: FormItemDef[] = [
    formItemStd('email', t('Forms.Email'), Input),
    formItemStd('password', t('Forms.Password'), Input),
  ]

  return (
    <FormStd
      formItems={formItems}
      submit={login}
      submitText={t('Forms.Enter') || ''}
      cancelText={t('Forms.Registration') || ''}
      cancel={toRegistrationPage}
    />
  )
})
