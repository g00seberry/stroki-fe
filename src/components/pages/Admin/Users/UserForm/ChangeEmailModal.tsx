import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { FormItemDef, FormStd } from '../../../../FormStd/FormStd'
import { t } from 'i18next'
import { UserFormData, UserFromStore } from './userFromStore'
import { formItemEmailStd } from '../../../../FormStd/formItems/formItemEmail'

interface PropsChangeEmailModal {
  open: boolean
  close(): void
  store: UserFromStore
}

export const ChangeEmailModal: React.FC<PropsChangeEmailModal> = observer(
  ({ open, close, store }) => {
    const formItems: FormItemDef[] = [
      formItemEmailStd('email', t('Forms.Email')),
    ]
    const changeMail = (values: UserFormData) => {
      store.changeEmail(values).then((success) => {
        if (success) close()
      })
    }

    return (
      <Modal open={open} onCancel={close} centered footer={null}>
        <FormStd
          initialValues={store.user}
          formItems={formItems}
          submit={changeMail}
          /**
           * TODO
           * -локализация
           */
          submitText="Изменить почту"
        />
      </Modal>
    )
  }
)
