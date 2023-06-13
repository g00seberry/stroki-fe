import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
import { PageUrl } from '../../common/router'
import { useTranslation } from 'react-i18next'

type PropsLayoutPage = React.PropsWithChildren

export const LayoutPage: React.FC<PropsLayoutPage> = ({
  children,
}: PropsLayoutPage) => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const menuItems: MenuItemType[] = [
    { key: 'logout', label: t('Logout'), onClick: () => appStore.logout() },
    {
      key: 'profile',
      label: <Link to={PageUrl.ProfilePage}>{t('Pages.Profile.Title')}</Link>,
    },
    {
      key: 'setting',
      label: <Link to={PageUrl.SettingsPage}>{t('Pages.Settings.Title')}</Link>,
    },
    {
      key: 'lang',
      label: <LangSwitcher />,
    },
  ]
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <Content>{children ? children : <Outlet />}</Content>
    </Layout>
  )
}
