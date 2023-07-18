import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { t } from 'i18next'
import { ButtonWithConfirm } from './ButtonWithConfirm'
import { tConfirms } from '../lang/shortcuts'

type PropsDeleteButton = {
  handleDelete: () => void
  disabled?: boolean
}

export const DeleteButton: React.FC<PropsDeleteButton> = observer(
  ({ handleDelete, disabled }) => {
    const deleteList = () => handleDelete()
    return (
      <ButtonWithConfirm
        danger
        confirmProps={{
          onOk: deleteList,
          title: tConfirms('Confirm action'),
          okText: t('Delete'),
          closable: true,
          type: 'warning',
          okButtonProps: { type: 'primary', danger: true },
        }}
        icon={<DeleteOutlined />}
        disabled={disabled}
      >
        {t('Delete')}
      </ButtonWithConfirm>
    )
  }
)
