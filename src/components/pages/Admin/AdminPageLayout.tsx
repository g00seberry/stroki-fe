import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { Link, Outlet } from 'react-router-dom'
import { createWithCond, filterWithCond } from '../../../common/WithCond'
import { PageUrl } from '../../../common/router'
import { PageLayout } from '../../Layout/PageLayout'

type PropsAdminPageLayout = React.PropsWithChildren & {
  pageTitle?: React.ReactNode
}

export const AdminPageLayout: React.FC<PropsAdminPageLayout> = observer(
  ({ children, pageTitle }: PropsAdminPageLayout) => {
    const { t } = useTranslation()
    const menuItems = [
      createWithCond<MenuItemType>({
        key: 'users',
        label: (
          <Link to={PageUrl.Users}>{t('Pages.Admin.Pages.Users.Title')}</Link>
        ),
      }),
    ]

    return (
      <PageLayout>
        <Layout>
          <Sider width={200}>
            <Menu items={filterWithCond(menuItems)} />
          </Sider>
          <Content>
            {pageTitle && <div>{pageTitle}</div>}
            {children ? children : <Outlet />}
          </Content>
        </Layout>
      </PageLayout>
    )
  }
)
