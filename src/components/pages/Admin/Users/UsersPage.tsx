import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { AdminPageLayout } from '../AdminPageLayout'

export const UsersPage: React.FC = observer(() => {
  const { t } = useTranslation()
  return (
    <AdminPageLayout pageTitle={t('Pages.Admin.Pages.Users.Title')}>
      teset
    </AdminPageLayout>
  )
})
