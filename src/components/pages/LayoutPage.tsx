import { Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../../AppContext'

export const LayoutPage: React.FC = () => {
  const { appStore } = useContext(AppContext)
  const menuItems: MenuItemType[] = [
    { key: 'logout', label: 'Выйти', onClick: () => appStore.logout() },
    { key: 'profile', label: <Link to="/profile">Профиль</Link> },
    { key: 'setting', label: <Link to="/settings">Настройки</Link> },
  ]
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}
