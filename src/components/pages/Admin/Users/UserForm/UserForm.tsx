import { observer } from 'mobx-react-lite'
import React from 'react'
import { UserFormData, UserFormStore } from './userFormStore'
import { t } from 'i18next'
import { formItemStd } from '../../../../FormStd/formItems/formItemStd'
import { FormItemDef, FormStd } from '../../../../FormStd/FormStd'
import { Select } from 'antd'
import { required } from '../../../../FormStd/antValidators'

type PropsUsersForm = {
  store: UserFormStore
}

export const UserForm: React.FC<PropsUsersForm> = observer(({ store }) => {
  const formItems: FormItemDef[] = [
    formItemStd(
      'rolesIds',
      t('Roles'),
      Select,
      {
        options: store.rolesOptions,
        mode: 'multiple',
      },
      { rules: [required()] }
    ),
  ]

  const updateUser = (values: UserFormData) => store.updateUser(values)

  return (
    <FormStd<UserFormData>
      loading={store.loading}
      pending={store.saving}
      initialValues={store.initialFormData}
      formItems={formItems}
      submit={updateUser}
    />
  )
})
