import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { AdminPageLayout } from '../AdminPageLayout'
import { useParams } from 'react-router-dom'
import { roleFormStore } from './RoleForm/roleFormStore'
import { RoleForm } from './RoleForm/RoleForm'

export const RolesPageSingle: React.FC = observer(() => {
  const { t } = useTranslation()
  const { id } = useParams()
  React.useEffect(() => {
    if (id) roleFormStore.init(id)
    return () => roleFormStore.destroy()
  }, [])
  /**
   * TODO
   * -локализация
   */
  return (
    <AdminPageLayout
      pageTitle={t('Pages.Admin.Pages.Roles {role}.Title', {
        role: roleFormStore.role?.role || 'Создание',
      })}
    >
      <RoleForm store={roleFormStore} />
    </AdminPageLayout>
  )
})
