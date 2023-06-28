import { TableStore } from '../../../tables/TableStore'
import { getTableData, tableLoader } from '../../../tables/tableLoader'
import { getApiUrl } from '../../../../common/getApiUrl'
import { ZRole } from '../../../../types/ZRole'
import $api from '../../../../common/api'
import { onError } from '../../../../common/getErrorMessage'
import { notification } from 'antd'

export class RolesStore {
  tableStore = new TableStore<ZRole, object>({
    fnLoad: tableLoader<ZRole, object>(
      getApiUrl('rolesSearch'),
      ZRole,
      getTableData
    ),
  })

  async deleteRoles() {
    try {
      await $api.post(getApiUrl('rolesDelete'), {
        rolesIds: this.tableStore.selected.map((role) => role.id),
      })
      /**
       * TODO
       * -локализация
       */
      notification.info({ message: 'Роли удалены' })
    } catch (error) {
      onError(error)
    } finally {
      this.tableStore.reload()
    }
  }
}

export const rolesStore = new RolesStore()
