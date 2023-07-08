import confirm from 'antd/es/modal/confirm'
import {
  getActionFromQuery,
  getQueryActionMessage,
} from '../../common/hasActionInQuery'
import { PageUrl } from '../../common/router'
import { RedirectActionTypes } from '../../types/RedirectActions'

const queryActions: Record<RedirectActionTypes, () => void> = {
  activateUser: () => {
    confirm({
      title: getQueryActionMessage(),
      closable: true,
      type: 'success',
      onOk: () => {
        window.location.replace(PageUrl.Root)
      },
    })
  },
  resetPassword: () => {
    confirm({
      title: getQueryActionMessage(),
      closable: true,
      type: 'success',
      onOk: () => {
        window.location.replace(PageUrl.Login)
      },
    })
  },
}

export const onQueryAction = () => {
  const key = getActionFromQuery()
  if (key) queryActions[key]()
}
