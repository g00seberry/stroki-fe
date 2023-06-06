import { Button, Form, Space, Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../types/RegistraionFromData'

export const Registraion: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)

  const register = (values: RegistraionFromData) =>
    appStore.registration(values)
  const toLoginPage = () => appStore.setOverlay('login')

  return (
    <Form<RegistraionFromData> onFinish={register} layout="vertical">
      <Form.Item name="userName" label="Имя или псевдоним">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Пароль">
        <Input />
      </Form.Item>
      <Space>
        <Button htmlType="submit">Регистрация</Button>
        <Button onClick={toLoginPage}>Логин</Button>
      </Space>
    </Form>
  )
})
