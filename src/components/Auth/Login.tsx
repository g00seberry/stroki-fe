import { Button, Form, Space, Input } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RegistraionFromData } from '../../types/RegistraionFromData'

export const Login: React.FC = observer(() => {
  const { appStore } = useContext(AppContext)

  const login = (values: RegistraionFromData) => appStore.login(values)
  const toRegistrationPage = () => appStore.setOverlay('registration')

  return (
    <Form<RegistraionFromData> onFinish={login} layout="vertical">
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Пароль">
        <Input />
      </Form.Item>
      <Space>
        <Button htmlType="submit" type="primary">
          Войти
        </Button>
        <Button onClick={toRegistrationPage}>Регистрация</Button>
      </Space>
    </Form>
  )
})
