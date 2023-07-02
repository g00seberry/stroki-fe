import React from 'react'
import { observer } from 'mobx-react-lite'
import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { Link, Outlet } from 'react-router-dom'
import { createWithCond, filterWithCond } from '../../../common/createWithCond'
import { PageUrl } from '../../../common/router'
import { PageLayout } from '../../Layout/PageLayout'
import style from './AdminPageLayout.module.less'
import { tPagesTitles } from '../../../lang/shortcuts'

type PropsAdminPageLayout = React.PropsWithChildren & {
  pageTitle?: React.ReactNode
}

export const AdminPageLayout: React.FC<PropsAdminPageLayout> = observer(
  ({ children, pageTitle }: PropsAdminPageLayout) => {
    const menuItems = [
      createWithCond<MenuItemType>({
        key: 'users',
        label: <Link to={PageUrl.Users}>{tPagesTitles('Adimin users')}</Link>,
      }),
      createWithCond<MenuItemType>({
        key: 'roles',
        label: <Link to={PageUrl.Roles}>{tPagesTitles('Adimin roles')}</Link>,
      }),
    ]

    return (
      <PageLayout>
        <Layout>
          <Sider>
            <Menu items={filterWithCond(menuItems)} />
          </Sider>
          <Content className={style.content}>
            {pageTitle && <div className={style.heading}>{pageTitle}</div>}
            {children ? children : <Outlet />}
          </Content>
        </Layout>
      </PageLayout>
    )
  }
)
