import React from 'react'
import { Button, Card, Space } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { AppContext } from '../../../AppContext'
import { tMessages } from '../../../lang/shortcuts'
import { t } from 'i18next'
import { observer } from 'mobx-react-lite'

export const UserIsNotActivated: React.FC = observer(() => {
  const { appStore } = React.useContext(AppContext)
  const [open, setOpen] = React.useState(!appStore.isActivated)
  const close = () => setOpen(false)
  const resetActivationLink = () => appStore.resetActivationLink()
  if (!open || !appStore.isLoggedIn) return null
  return (
    <Card
      type="inner"
      title={tMessages('User is not activated')}
      extra={
        <Button type="text" onClick={close} icon={<CloseCircleOutlined />} />
      }
    >
      <Space>
        {tMessages('An email with instructions has been sent to your email')}
        <Button
          onClick={resetActivationLink}
          type="primary"
          loading={appStore.pending}
        >
          {t('Resend')}
        </Button>
      </Space>
    </Card>
  )
})
