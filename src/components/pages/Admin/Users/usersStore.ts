import { TableStore } from '../../../tables/TableStore'
import { getTableData, tableLoader } from '../../../tables/tableLoader'
import { getApiUrl } from '../../../../common/getApiUrl'
import { ZUser, zUser } from '../../../../types/ZUser'
import { makeAutoObservable } from 'mobx'

export type UserFilters = {
  email?: string
}

export class UsersStore {
  tableStore = new TableStore<ZUser, UserFilters>({
    fnLoad: tableLoader<ZUser, UserFilters>(
      getApiUrl('usersSearch'),
      zUser,
      getTableData
    ),
  })
  constructor() {
    makeAutoObservable(this)
  }
}

export const usersStore = new UsersStore()
