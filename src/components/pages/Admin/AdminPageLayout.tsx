import React from 'react'
import { observer } from 'mobx-react-lite'
import { Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { Link, Outlet } from 'react-router-dom'
import { createWithCond, filterWithCond } from '../../../common/createWithCond'
import { PageUrl } from '../../../common/router'
import { PageLayout } from '../../Layout/PageLayout'
import style from './AdminPageLayout.module.less'
import { tPagesTitles } from '../../../lang/shortcuts'
import Title from 'antd/es/typography/Title'
import {
  ApartmentOutlined,
  IdcardOutlined,
  TeamOutlined,
} from '@ant-design/icons'

type PropsAdminPageLayout = React.PropsWithChildren & {
  pageTitle?: React.ReactNode
}

export const AdminPageLayout: React.FC<PropsAdminPageLayout> = observer(
  ({ children, pageTitle }: PropsAdminPageLayout) => {
    const menuItems = [
      createWithCond<MenuItemType>({
        key: 'users',
        label: <Link to={PageUrl.Users}>{tPagesTitles('Adimin users')}</Link>,
        icon: <TeamOutlined />,
      }),
      createWithCond<MenuItemType>({
        key: 'roles',
        label: <Link to={PageUrl.Roles}>{tPagesTitles('Adimin roles')}</Link>,
        icon: <IdcardOutlined />,
      }),
      createWithCond<MenuItemType>({
        key: 'taxonomies',
        label: (
          <Link to={PageUrl.Taxonomies}>
            {tPagesTitles('Adimin taxonomies')}
          </Link>
        ),
        icon: <ApartmentOutlined />,
      }),
    ]

    return (
      <PageLayout>
        <div className={style.layout}>
          <div className={style.sider}>
            <Menu items={filterWithCond(menuItems)} />
          </div>
          <div className={style.content}>
            {pageTitle && <Title>{pageTitle}</Title>}
            {children ? children : <Outlet />}
          </div>
        </div>
      </PageLayout>
    )
  }
)
