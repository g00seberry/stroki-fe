import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { TablePageLayout } from '../../../tables/TablePageLayout'
import { TableFacade } from '../../../tables/TableFacade'
import { AColumn } from '../../../tables/AsyncTable'
import { rolesStore } from './rolesStore'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../../common/router'
import { makeUrl } from '../../../../common/makeUrl'
import { ZRole } from '../../../../types/ZRole'
import { t } from 'i18next'
import { Button, Space } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { DeleteButton } from './DeleteButton'
import { tPagesTitles } from '../../../../lang/shortcuts'

const columns = (): AColumn<ZRole>[] => [
  {
    key: 'id',
    title: 'ID',
    width: '100px',
    dataIndex: 'id',
  },
  {
    key: 'role',
    title: t('Roles', { count: 1 }),
    width: '100px',
    dataIndex: 'role',
  },
]

const RolesTable: React.FC = observer(() => {
  const navigate = useNavigate()
  const toRolePage = (role: ZRole) =>
    navigate(makeUrl(PageUrl.RolesSingle, { id: role.id }))
  const toCreateRolePage = () => navigate(PageUrl.RolesSingleNew)
  return (
    <TablePageLayout>
      <TableFacade
        store={rolesStore.tableStore}
        columns={columns()}
        onRowClick={toRolePage}
        selectionType="checkbox"
        middlePart={
          <Space>
            <Button
              type="primary"
              onClick={toCreateRolePage}
              icon={<PlusCircleOutlined />}
            >
              {t('Create')}
            </Button>
            <DeleteButton store={rolesStore} />
          </Space>
        }
      />
    </TablePageLayout>
  )
})

export const RolesPage: React.FC = observer(() => {
  return (
    <AdminPageLayout pageTitle={tPagesTitles('Adimin roles')}>
      <RolesTable />
    </AdminPageLayout>
  )
})
