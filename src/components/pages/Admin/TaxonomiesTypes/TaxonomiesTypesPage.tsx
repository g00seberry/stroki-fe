import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { TablePageLayout } from '../../../tables/TablePageLayout'
import { TableFacade } from '../../../tables/TableFacade'
import { AColumn } from '../../../tables/AsyncTable'
import { taxonomiesTypesStore } from './taxonomiesTypesStore'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../../common/router'
import { makeUrl } from '../../../../common/makeUrl'
import { tForms, tPagesTitles } from '../../../../lang/shortcuts'
import { ZTaxonomyType } from '../../../../types/ZTaxonomyType'
import { Button, Space } from 'antd'
import { t } from 'i18next'
import { PlusCircleOutlined } from '@ant-design/icons'
import { DeleteButton } from '../../../DeleteButton'

const columns = (): AColumn<ZTaxonomyType>[] => [
  {
    key: 'id',
    title: 'ID',
    width: '100px',
    dataIndex: 'id',
  },
  {
    key: 'name',
    title: tForms('Name'),
    width: '100px',
    dataIndex: 'name',
  },
]

const TaxonomiesTypesTable: React.FC = observer(() => {
  const navigate = useNavigate()
  const toSinglePage = ({ id }: ZTaxonomyType) =>
    navigate(makeUrl(PageUrl.TaxonomiesTypesSingle, { id }))
  const toNewPage = () => navigate(PageUrl.TaxonomiesTypesNew)
  return (
    <TablePageLayout>
      <TableFacade
        store={taxonomiesTypesStore.tableStore}
        columns={columns()}
        onRowClick={toSinglePage}
        selectionType="checkbox"
        middlePart={
          <Space>
            <Button
              onClick={toNewPage}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              {t('Create')}
            </Button>
            <DeleteButton
              handleDelete={() => taxonomiesTypesStore.deleteSelectedTypes()}
              disabled={!taxonomiesTypesStore.tableStore.selected.length}
            />
          </Space>
        }
      />
    </TablePageLayout>
  )
})

export const TaxonomiesTypesPage: React.FC = observer(() => {
  return (
    <AdminPageLayout pageTitle={tPagesTitles('Adimin taxonomies types')}>
      <TaxonomiesTypesTable />
    </AdminPageLayout>
  )
})
