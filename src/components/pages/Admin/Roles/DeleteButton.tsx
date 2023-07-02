import React from 'react'
import { RolesStore } from './rolesStore'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { t } from 'i18next'

type PropsDeleteButton = {
  store: RolesStore
}

export const DeleteButton: React.FC<PropsDeleteButton> = observer(
  ({ store }) => {
    const deleteList = () => store.deleteRoles()
    return (
      <Button
        danger
        onClick={deleteList}
        icon={<DeleteOutlined />}
        disabled={!store.tableStore.selected.length}
      >
        {t('Delete')}
      </Button>
    )
  }
)
