import { Col, Layout, Row } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { TopMenu } from './TopMenu/TopMenu'
import { AppContext } from '../../AppContext'
import { createWithCond, filterWithCond } from '../../common/createWithCond'
import { PageUrl } from '../../common/router'
import { UserMenu } from './UserMenu/UserMenu'
import style from './PageLayout.module.less'
import { tPagesTitles } from '../../lang/shortcuts'
import { t } from 'i18next'
import { UserIsNotActivated } from '../pages/UserIsNotActivated/UserIsNotActivated'

type PropsPageLayout = React.PropsWithChildren & {
  pageTitle?: React.ReactNode
}

export const PageLayout: React.FC<PropsPageLayout> = ({
  children,
  pageTitle,
}: PropsPageLayout) => {
  const { appStore } = useContext(AppContext)
  const navigate = useNavigate()
  const isLoggedIn = () => appStore.isLoggedIn
  const isNotLoggedIn = () => !isLoggedIn()
  const isAdmin = () => appStore.isAdmin
  const userMenuItems = [
    createWithCond<MenuItemType>(
      {
        key: 'setting',
        label: <Link to={PageUrl.Settings}>{tPagesTitles('Settings')}</Link>,
      },
      isLoggedIn
    ),
    createWithCond<MenuItemType>(
      {
        key: 'admin',
        label: <Link to={PageUrl.Admin}>{tPagesTitles('Adimin')}</Link>,
      },
      isAdmin
    ),
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
  const topMenuItems = [
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
  ]

  return (
    <Layout>
      <Header>
        <Row justify="end">
          <Col span={6}>
            <TopMenu menuItems={filterWithCond(topMenuItems)} />
          </Col>
          {appStore.isLoggedIn && (
            <Col flex="none">
              <UserMenu menuItems={filterWithCond(userMenuItems)} />
            </Col>
          )}
        </Row>
      </Header>
      <UserIsNotActivated />
      <Content className={style.content}>
        {pageTitle && <div>{pageTitle}</div>}
        {children ? children : <Outlet />}
      </Content>
    </Layout>
  )
}
