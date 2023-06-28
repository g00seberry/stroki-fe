import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { AdminPageLayout } from '../AdminPageLayout'
import { UserForm } from './UserForm/UserForm'
import { useParams } from 'react-router-dom'
import { userFormStore } from './UserForm/userFormStore'

export const UsersPageSingle: React.FC = observer(() => {
  const { t } = useTranslation()
  const { id } = useParams()
  React.useEffect(() => {
    if (id) userFormStore.init(id)
  }, [])

  return (
    <AdminPageLayout
      pageTitle={t('Pages.Admin.Pages.User {email}.Title', {
        email: userFormStore.user?.email,
      })}
    >
      <UserForm store={userFormStore} />
    </AdminPageLayout>
  )
})
