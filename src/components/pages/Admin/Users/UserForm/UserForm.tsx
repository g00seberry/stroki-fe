import { observer } from 'mobx-react-lite'
import React from 'react'
import { UserFormData, UserFromStore } from './userFromStore'
import { t } from 'i18next'
import { formItemStd } from '../../../../FormStd/formItems/formItemStd'
import { FormItemDef, FormStd } from '../../../../FormStd/FormStd'
import { Button, Select, Space } from 'antd'
import { Loading } from '../../../../Loading/Loading'
import { ChangeEmailModal } from './ChangeEmailModal'
import { required } from '../../../../FormStd/antValidators'

type PropsUsersFromStore = {
  store: UserFromStore
}

export const UserForm: React.FC<PropsUsersFromStore> = observer(
  ({ store }: PropsUsersFromStore) => {
    const [open, setOpen] = React.useState(false)
    const closeModal = () => setOpen(false)
    const openModal = () => setOpen(true)

    const formItems: FormItemDef[] = [
      formItemStd(
        'roles',
        t('Forms.Roles'),
        Select,
        {
          options: store.rolesOptions,
          mode: 'tags',
        },
        { rules: [required()] }
      ),
    ]

    const updateUser = (values: UserFormData) => store.updateUser(values)

    return (
      <Loading store={store}>
        <ChangeEmailModal open={open} close={closeModal} store={store} />
        <Space>
          {/**
           * TODO
           * -локализация
           */}
          <Button onClick={openModal}>Изменить email</Button>
        </Space>
        <FormStd
          initialValues={store.user}
          formItems={formItems}
          submit={updateUser}
        />
      </Loading>
    )
  }
)
