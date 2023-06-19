import { TableStore } from '../../../tables/TableStore'
import { z } from 'zod'
import { getTableData, tableLoader } from '../../../tables/tableLoader'
import { getApiUrl } from '../../../../common/getApiUrl'

export const ZUserRow = z.object({
  id: z.number(),
  email: z.string(),
  roles: z
    .object({
      role: z.string(),
    })
    .array(),
})

export type ZUserRow = z.infer<typeof ZUserRow>

export type UserFilters = {
  email?: string
}

export class UsersStore {
  tableStore = new TableStore<ZUserRow, UserFilters>({
    fnLoad: tableLoader<ZUserRow, UserFilters>(
      getApiUrl('searchUsers'),
      ZUserRow,
      getTableData
    ),
  })
}

export const usersStore = new UsersStore()
