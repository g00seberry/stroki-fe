import { TableStore } from '../../../tables/TableStore'
import { getTableData, tableLoader } from '../../../tables/tableLoader'
import { getApiUrl } from '../../../../common/getApiUrl'
import $api from '../../../../common/api'
import { onError } from '../../../../common/getErrorMessage'
import { notification } from 'antd'
import { tMessages } from '../../../../lang/shortcuts'
import { ZTaxonomy, zTaxonomy } from '../../../../types/ZTaxonomy'
import { makeAutoObservable } from 'mobx'

export class TaxonomiesStore {
  tableStore = new TableStore<ZTaxonomy, object>({
    fnLoad: tableLoader<ZTaxonomy, object>(
      getApiUrl('taxonomiesSearch'),
      zTaxonomy,
      getTableData
    ),
  })
  constructor() {
    makeAutoObservable(this)
  }

  get canDelete() {
    return this.tableStore.selected.length
  }

  async deleteSelected() {
    try {
      await $api.post(getApiUrl('taxonomiesDeleteList'), {
        ids: this.tableStore.selected.map(({ id }) => id),
      })
      notification.info({ message: tMessages('Taxonomy removed') })
    } catch (error) {
      onError(error)
    } finally {
      this.tableStore.reload()
    }
  }
}

export const taxonomiesStore = new TaxonomiesStore()
