import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { TopMenu } from './TopMenu/TopMenu'
import { AppContext } from '../../AppContext'
import { createWithCond, filterWithCond } from '../../common/WithCond'
import { PageUrl } from '../../common/router'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'

type PropsLayoutPage = React.PropsWithChildren

export const PageLayout: React.FC<PropsLayoutPage> = ({
  children,
}: PropsLayoutPage) => {
  const { appStore } = useContext(AppContext)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isLoggedIn = () => appStore.isLoggedIn
  const isNotLoggedIn = () => !isLoggedIn()

  const menuItemsWithCond = [
    createWithCond<MenuItemType>({
      key: 'home',
      label: <Link to={PageUrl.Root}>Logo</Link>,
    }),
    createWithCond<MenuItemType>(
      {
        key: 'setting',
        label: <Link to={PageUrl.Settings}>{t('Pages.Settings.Title')}</Link>,
      },
      isLoggedIn
    ),
    // not logged in
    createWithCond<MenuItemType>(
      {
        key: 'login',
        label: <Link to={PageUrl.Login}>{t('Login')}</Link>,
      },
      isNotLoggedIn
    ),
    createWithCond<MenuItemType>(
      {
        key: 'signUp',
        label: <Link to={PageUrl.SignUp}>{t('Sign up')}</Link>,
      },
      isNotLoggedIn
    ),
    createWithCond<MenuItemType>({
      key: 'lang',
      label: <LangSwitcher />,
    }),
    createWithCond<MenuItemType>(
      {
        key: 'logout',
        label: t('Logout'),
        onClick: () => appStore.logout().then(() => navigate(PageUrl.Root)),
        danger: true,
      },
      isLoggedIn
    ),
  ]

  const getMenuItems = () => filterWithCond(menuItemsWithCond)

  return (
    <Layout>
      <Header>
        <TopMenu menuItems={getMenuItems()} />
      </Header>
      <Content>{children ? children : <Outlet />}</Content>
    </Layout>
  )
}
