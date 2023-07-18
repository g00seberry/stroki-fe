import React from 'react'
import { Button, ButtonProps, ModalFuncProps } from 'antd'
import { observer } from 'mobx-react-lite'
import confirm from 'antd/es/modal/confirm'

type PropsButtonWithConfirm = {
  confirmProps: ModalFuncProps
} & ButtonProps

export const ButtonWithConfirm: React.FC<PropsButtonWithConfirm> = observer(
  ({ confirmProps, children, ...props }) => {
    const handleClick = () => confirm(confirmProps)
    return (
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>
    )
  }
)
