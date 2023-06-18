import { Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import React from 'react'

type PropsTopMenu = {
  menuItems: MenuItemType[]
}

export const TopMenu: React.FC<PropsTopMenu> = ({
  menuItems,
}: PropsTopMenu) => <Menu theme="dark" mode="horizontal" items={menuItems} />
