import { TableStore } from '../../../tables/TableStore'
import { getTableData, tableLoader } from '../../../tables/tableLoader'
import { getApiUrl } from '../../../../common/getApiUrl'
import { ZUser } from '../../../../types/ZUser'

export type UserFilters = {
  email?: string
}

export class UsersStore {
  tableStore = new TableStore<ZUser, UserFilters>({
    fnLoad: tableLoader<ZUser, UserFilters>(
      getApiUrl('usersSearch'),
      ZUser,
      getTableData
    ),
  })
}

export const usersStore = new UsersStore()
