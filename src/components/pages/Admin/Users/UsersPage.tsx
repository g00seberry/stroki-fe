import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { AdminPageLayout } from '../AdminPageLayout'
import { TablePageLayout } from '../../../tables/TablePageLayout'
import { TableFacade } from '../../../tables/TableFacade'
import { AColumn } from '../../../tables/AsyncTable'
import { UserFilters, usersStore } from './usersStore'
import { FilterFieldsDict, filterItem } from '../../../tables/FiltersForm'
import { Input, Tag } from 'antd'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../../common/router'
import { makeUrl } from '../../../../common/makeUrl'
import { ZUser } from '../../../../types/ZUser'

const columns = (): AColumn<ZUser>[] => [
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
    title: t('Roles'),
    render: (_, row: ZUser) => {
      return row.roles.map((role) => (
        <Tag key={role.id}>{t(`User.Roles.${role.role}`)}</Tag>
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
  const navigate = useNavigate()
  const toUserPage = (user: ZUser) =>
    navigate(makeUrl(PageUrl.UsersSingle, { id: user.id }))

  return (
    <TablePageLayout>
      <TableFacade
        store={usersStore.tableStore}
        columns={columns()}
        filterItems={filterItems()}
        showSettings={true}
        onRowClick={toUserPage}
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
