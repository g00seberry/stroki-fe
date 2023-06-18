import * as React from 'react'
import { Button, Checkbox, Dropdown } from 'antd'
import { FunnelPlotOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { FilterSettingsStore } from './FilterSettingsStore'
import { FilterFieldsDict } from '../FiltersForm'
import { FiltersFormItem } from '../FiltersFormItem'
import styles from './FilterSettingsButton.module.less'
import { MenuItemType } from 'rc-menu/lib/interface'

type PropsFilterSettingsButton = {
  store: FilterSettingsStore | null
  filterItems?: FilterFieldsDict<object>
  onChange: () => void
}

export const FilterSettingsButton: React.FC<PropsFilterSettingsButton> =
  observer((props: PropsFilterSettingsButton) => {
    const { store, filterItems, onChange } = props
    const [open, setOpen] = React.useState(false)
    const handleOpenChange = (flag: boolean) => {
      setOpen(flag)
    }
    React.useEffect(() => {
      if (filterItems && store) store.init(filterItems)
    }, [])
    if (!store || !filterItems) return null
    const menuItems: MenuItemType[] = Object.entries<FiltersFormItem>(
      filterItems
    ).map(([key, { label }]) => ({
      key,
      label: (
        <label key={key} className={styles.itemInfo}>
          <Checkbox
            checked={store.isVisible(key)}
            onClick={() => {
              store.changeVisible(key)
              onChange()
            }}
          />
          <span>{label ?? key}</span>
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
        <Button icon={<FunnelPlotOutlined />} />
      </Dropdown>
    )
  })
