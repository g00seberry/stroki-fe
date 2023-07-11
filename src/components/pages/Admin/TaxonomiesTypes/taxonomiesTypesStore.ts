import { TableStore } from '../../../tables/TableStore'
import { getTableData, tableLoader } from '../../../tables/tableLoader'
import { getApiUrl } from '../../../../common/getApiUrl'
import $api from '../../../../common/api'
import { onError } from '../../../../common/getErrorMessage'
import { notification } from 'antd'
import { tMessages } from '../../../../lang/shortcuts'
import { ZTaxonomyType, zTaxonomyType } from '../../../../types/ZTaxonomyType'

export class TaxonomiesTypesStore {
  tableStore = new TableStore<ZTaxonomyType, object>({
    fnLoad: tableLoader<ZTaxonomyType, object>(
      getApiUrl('taxonomiesTypesSearch'),
      zTaxonomyType,
      getTableData
    ),
  })

  async deleteSelectedTypes() {
    try {
      await $api.post(getApiUrl('taxonomiesTypesDeleteList'), {
        ids: this.tableStore.selected.map(({ id }) => id),
      })
      notification.info({ message: tMessages('Taxonomy types removed') })
    } catch (error) {
      onError(error)
    } finally {
      this.tableStore.reload()
    }
  }
}

export const taxonomiesTypesStore = new TaxonomiesTypesStore()
