import { observer } from 'mobx-react-lite'
import React from 'react'
import { t } from 'i18next'
import { formItemStd } from '../../../../FormStd/formItems/formItemStd'
import { FormItemDef, FormStd } from '../../../../FormStd/FormStd'
import { Input } from 'antd'
import { required } from '../../../../FormStd/antValidators'
import { RoleFormData, RoleFormStore } from './roleFormStore'
import { useNavigate } from 'react-router-dom'
import { PageUrl } from '../../../../../common/router'
import { makeUrl } from '../../../../../common/makeUrl'

type PropsRoleForm = {
  store: RoleFormStore
}

export const RoleForm: React.FC<PropsRoleForm> = observer(({ store }) => {
  const formItems: FormItemDef[] = [
    formItemStd(
      'role',
      t('Roles', { count: 1 }),
      Input,
      {},
      { rules: [required()] }
    ),
  ]

  const navigate = useNavigate()
  const createRole = (values: RoleFormData) =>
    store.create(values).then((role) => {
      {
        if (role) navigate(makeUrl(PageUrl.RolesSingle, { id: role?.id }))
      }
    })
  const updateRole = (values: RoleFormData) => store.update(values)
  const actualHandler = store.isNew ? createRole : updateRole

  return (
    <FormStd<RoleFormData>
      loading={store.loading}
      pending={store.saving}
      initialValues={store.role}
      formItems={formItems}
      submit={actualHandler}
    />
  )
})
