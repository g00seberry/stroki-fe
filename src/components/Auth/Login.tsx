import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../FormStd/FormStd'
import { formItemStd } from '../FormStd/formItems/formItemStd'

export const Login: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)

  const login = (values: RegistraionFromData) => appStore.login(values)
  const toRegistrationPage = () => appStore.setOverlay('registration')
  const formItems: FormItemDef[] = [
    formItemStd('email', 'Email', Input),
    formItemStd('password', 'Пароль', Input),
  ]
  return (
    <>
      <FormStd
        formItems={formItems}
        submit={login}
        submitText="Войти"
        cancelText="Регистрация"
        cancel={toRegistrationPage}
      />
    </>
  )
})
