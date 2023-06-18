import { Avatar, Dropdown } from 'antd'
import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import style from './UserMenu.module.less'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'

type PropsUserMenu = {
  menuItems: MenuItemType[]
}

export const UserMenu: React.FC<PropsUserMenu> = ({
  menuItems,
}: PropsUserMenu) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag)
  }
  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <Avatar className={style.bg} size="large" icon={<UserOutlined />} />
    </Dropdown>
  )
}
