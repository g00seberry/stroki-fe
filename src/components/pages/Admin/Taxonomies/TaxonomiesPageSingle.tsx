import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { tForms, tPagesTitles } from '../../../../lang/shortcuts'
import { useParams } from 'react-router-dom'
import { taxonomyFormStore } from './TaxonomyForm/taxonomyFormStore'
import { TaxonomyForm } from './TaxonomyForm/TaxonomyForm'
import { t } from 'i18next'
import { TaxonomiesItemPage } from './TaxonomiesItems/TaxonomiesItemPage'
import { taxonomiesItemsStore } from './TaxonomiesItems/taxonomiesItemsStore'
import { Tabs, TabsProps } from 'antd'

export const TaxonomiesPageSingle: React.FC = observer(() => {
  const { id } = useParams()
  React.useEffect(() => {
    if (id) {
      taxonomyFormStore.init(id)
      taxonomiesItemsStore.init(id)
    }
    return () => {
      taxonomyFormStore.destroy()
      taxonomiesItemsStore.destroy()
    }
  }, [id])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: tForms('Basic information'),
      children: <TaxonomyForm store={taxonomyFormStore} />,
    },
    {
      key: '2',
      label: tPagesTitles('Adimin taxonomies items'),
      children: <TaxonomiesItemPage store={taxonomiesItemsStore} />,
    },
  ]

  return (
    <AdminPageLayout
      pageTitle={tPagesTitles('Adimin taxonomies single', {
        type: taxonomyFormStore.taxonomy?.name || t('Create'),
      })}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </AdminPageLayout>
  )
})
