import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { TablePageLayout } from '../../../tables/TablePageLayout'
import { TableFacade } from '../../../tables/TableFacade'
import { AColumn } from '../../../tables/AsyncTable'
import { taxonomiesStore } from './taxonomiesStore'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../../common/router'
import { makeUrl } from '../../../../common/makeUrl'
import { tForms, tPagesTitles } from '../../../../lang/shortcuts'
import { ZTaxonomy } from '../../../../types/ZTaxonomy'
import { Button, Space } from 'antd'
import { t } from 'i18next'
import { PlusCircleOutlined } from '@ant-design/icons'
import { DeleteButton } from '../../../DeleteButton'

const columns = (): AColumn<ZTaxonomy>[] => [
  {
    key: 'id',
    title: 'ID',
    width: '100px',
    dataIndex: 'id',
  },
  {
    key: 'title',
    title: tForms('Title'),
    width: '100px',
    dataIndex: 'title',
  },
  {
    key: 'name',
    title: tForms('Name'),
    width: '100px',
    dataIndex: 'name',
  },
  {
    key: 'type',
    title: tForms('Types_one'),
    width: '100px',
    dataIndex: 'type',
  },
]

const TaxonomiesTable: React.FC = observer(() => {
  const navigate = useNavigate()
  const toSinglePage = ({ id }: ZTaxonomy) =>
    navigate(makeUrl(PageUrl.TaxonomiesSingle, { id }))
  const toNewPage = () => navigate(PageUrl.TaxonomiesNew)
  return (
    <TablePageLayout>
      <TableFacade
        store={taxonomiesStore.tableStore}
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
              handleDelete={() => taxonomiesStore.deleteSelected()}
              disabled={!taxonomiesStore.canDelete}
            />
          </Space>
        }
      />
    </TablePageLayout>
  )
})

export const TaxonomiesPage: React.FC = observer(() => {
  return (
    <AdminPageLayout pageTitle={tPagesTitles('Adimin taxonomies')}>
      <TaxonomiesTable />
    </AdminPageLayout>
  )
})
