import { Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../types/RegistraionFromData'
import { FormItemDef, FormStd } from '../FormStd/FormStd'
import { formItemStd } from '../FormStd/formItems/formItemStd'

export const Registraion: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)

  const register = (values: RegistraionFromData) =>
    appStore.registration(values)
  const toLoginPage = () => appStore.setOverlay('login')

  const formItems: FormItemDef[] = [
    formItemStd('email', 'Email', Input),
    formItemStd('password', 'Пароль', Input),
  ]
  return (
    <FormStd
      formItems={formItems}
      submit={register}
      submitText="Зарегистрироваться"
      cancelText="Логин"
      cancel={toLoginPage}
    />
  )
})
