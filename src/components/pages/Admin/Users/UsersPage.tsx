import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { AdminPageLayout } from '../AdminPageLayout'
import { TablePageLayout } from '../../../tables/TablePageLayout'
import { TableFacade } from '../../../tables/TableFacade'
import { AColumn } from '../../../tables/AsyncTable'
import { UserFilters, ZUserRow, usersStore } from './usersStore'
import { FilterFieldsDict, filterItem } from '../../../tables/FiltersForm'
import { Input, Tag } from 'antd'
import { t } from 'i18next'

const columns = (): AColumn<ZUserRow>[] => [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: '100px',
  },
  {
    key: 'email',
    title: t('Email'),
    dataIndex: 'email',
    sorter: true,
  },
  {
    key: 'roles',
    title: t('Forms.Roles'),
    render: (_, row: ZUserRow) => {
      return row.roles.map(({ role }) => (
        <Tag key={role}>{t(`User.Roles.${role}`)}</Tag>
      ))
    },
  },
]

const filterItems = (): FilterFieldsDict<UserFilters> => ({
  email: filterItem(Input, {
    placeholder: t('Forms.Email'),
    allowClear: true,
    style: { width: 400 },
    size: 'middle',
  }),
})

const UsersTable: React.FC = observer(() => {
  return (
    <TablePageLayout>
      <TableFacade
        store={usersStore.tableStore}
        columns={columns()}
        filterItems={filterItems()}
        showSettings={true}
      />
    </TablePageLayout>
  )
})

export const UsersPage: React.FC = observer(() => {
  const { t } = useTranslation()
  return (
    <AdminPageLayout pageTitle={t('Pages.Admin.Pages.Users.Title')}>
      <UsersTable />
    </AdminPageLayout>
  )
})
