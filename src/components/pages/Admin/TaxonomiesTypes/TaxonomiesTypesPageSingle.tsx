import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { tPagesTitles } from '../../../../lang/shortcuts'
import { useParams } from 'react-router-dom'
import { taxonomiesTypeFormStore } from './TaxonomiesTypeForm/taxonomiesTypeFormStore'
import { TaxonomiesTypeForm } from './TaxonomiesTypeForm/TaxonomiesTypeForm'
import { t } from 'i18next'

export const TaxonomiesTypesPageSingle: React.FC = observer(() => {
  const { id } = useParams()
  React.useEffect(() => {
    if (id) taxonomiesTypeFormStore.init(id)
    return () => taxonomiesTypeFormStore.destroy()
  }, [id])

  return (
    <AdminPageLayout
      pageTitle={tPagesTitles('Adimin taxonomies types single', {
        type: taxonomiesTypeFormStore.type?.name || t('Create'),
      })}
    >
      <TaxonomiesTypeForm store={taxonomiesTypeFormStore} />
    </AdminPageLayout>
  )
})
