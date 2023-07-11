import { TableStore } from '../../../tables/TableStore'
import { getTableData, tableLoader } from '../../../tables/tableLoader'
import { getApiUrl } from '../../../../common/getApiUrl'
import { ZRole, zRole } from '../../../../types/ZRole'
import $api from '../../../../common/api'
import { onError } from '../../../../common/getErrorMessage'
import { notification } from 'antd'
import { tMessages } from '../../../../lang/shortcuts'

export class RolesStore {
  tableStore = new TableStore<ZRole, object>({
    fnLoad: tableLoader<ZRole, object>(
      getApiUrl('rolesSearch'),
      zRole,
      getTableData
    ),
  })

  async deleteRoles() {
    try {
      await $api.post(getApiUrl('rolesDelete'), {
        rolesIds: this.tableStore.selected.map((role) => role.id),
      })

      notification.info({ message: tMessages('Roles removed') })
    } catch (error) {
      onError(error)
    } finally {
      this.tableStore.reload()
    }
  }
}

export const rolesStore = new RolesStore()
