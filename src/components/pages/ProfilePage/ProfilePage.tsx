import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { User } from '../../../types/User'
import { UserService } from '../../../services/UserService'
import { PageLayout } from '../../Layout/PageLayout'

export const ProfilePage: React.FC = observer(() => {
  const { t } = useTranslation()
  const [users, setUsers] = React.useState<User[]>([])
  React.useEffect(() => {
    UserService.getUsers().then(setUsers)
  }, [])
  return (
    <PageLayout>
      <h1>{t('Pages.Profile.Title')}</h1>
      <div>
        {users.map((u) => (
          <div key={u.email}>{u.email}</div>
        ))}
      </div>
    </PageLayout>
  )
})
