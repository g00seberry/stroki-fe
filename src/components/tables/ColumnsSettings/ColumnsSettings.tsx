import * as React from 'react'
import { Button, Checkbox, Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import styles from './ColumnsSettings.module.less'
import { CtrlColumns } from '../TableStore'
import { SettingOutlined } from '@ant-design/icons'
import { MenuItemType } from 'rc-menu/lib/interface'

type PropsColumnsSettings = {
  store: CtrlColumns
}

export const ColumnsSettings: React.FC<PropsColumnsSettings> = observer(
  ({ store }: PropsColumnsSettings) => {
    const [open, setOpen] = React.useState(false)
    const handleOpenChange = (flag: boolean) => {
      setOpen(flag)
    }

    const menuItems: MenuItemType[] = store.columns
      .filter(({ condition }) => !condition || condition())
      .map((col) => ({
        key: col.key,
        label: (
          <label key={col.key} className={styles.columnInfo}>
            <Checkbox
              checked={store.isColumnVisible(col.key)}
              onChange={(e) =>
                store.setColumnVisible(col.key, e.target.checked)
              }
              disabled={!store.canColumnHide(col.key)}
            />
            <span>{col.title}</span>
          </label>
        ),
      }))
    return (
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        onOpenChange={handleOpenChange}
        open={open}
        placement="bottomRight"
      >
        <Button>
          <SettingOutlined />
        </Button>
      </Dropdown>
    )
  }
)
