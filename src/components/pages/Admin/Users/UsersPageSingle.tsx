import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { UserForm } from './UserForm/UserForm'
import { useParams } from 'react-router-dom'
import { userFormStore } from './UserForm/userFormStore'
import { tPagesTitles } from '../../../../lang/shortcuts'

export const UsersPageSingle: React.FC = observer(() => {
  const { id } = useParams()
  React.useEffect(() => {
    if (id) userFormStore.init(id)
  }, [])

  return (
    <AdminPageLayout
      pageTitle={tPagesTitles('Adimin users single', {
        email: userFormStore.user?.email,
      })}
    >
      <UserForm store={userFormStore} />
    </AdminPageLayout>
  )
})
