import React from 'react'
import { observer } from 'mobx-react-lite'
import { Breadcrumb, Layout, Menu } from 'antd'
import { AppContext } from '../../../AppContext'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'

export const ProfilePage: React.FC = observer(() => {
  const { appStore } = React.useContext(AppContext)
  const menuItems: MenuItemType[] = [
    { key: 'logout', label: 'Выйти', onClick: () => appStore.logout() },
  ]
  return (
    <Layout className="layout">
      <Header>
        <div className="Строки" />
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <div>Profile</div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
})
