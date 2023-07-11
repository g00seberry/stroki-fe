import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { tPagesTitles } from '../../../../lang/shortcuts'
import { useParams } from 'react-router-dom'
import { taxonomiesTypeFormStore } from './TaxonomiesTypeForm/taxonomiesTypeFormStore'
import { TaxonomiesTypeForm } from './TaxonomiesTypeForm/TaxonomiesTypeForm'

export const TaxonomiesTypesPageSingle: React.FC = observer(() => {
  const { id } = useParams()
  React.useEffect(() => {
    if (id) taxonomiesTypeFormStore.init(id)
    return () => taxonomiesTypeFormStore.destroy()
  }, [])

  return (
    <AdminPageLayout
      pageTitle={tPagesTitles('Adimin taxonomies types single', {
        type: taxonomiesTypeFormStore.type?.name,
      })}
    >
      <TaxonomiesTypeForm store={taxonomiesTypeFormStore} />
    </AdminPageLayout>
  )
})
