import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { useParams } from 'react-router-dom'
import { roleFormStore } from './RoleForm/roleFormStore'
import { RoleForm } from './RoleForm/RoleForm'
import { tPagesTitles } from '../../../../lang/shortcuts'
import { t } from 'i18next'

export const RolesPageSingle: React.FC = observer(() => {
  const { id } = useParams()
  React.useEffect(() => {
    if (id) roleFormStore.init(id)
    return () => roleFormStore.destroy()
  }, [id])
  return (
    <AdminPageLayout
      pageTitle={tPagesTitles('Adimin roles single', {
        role: roleFormStore.role?.role || t('Create'),
      })}
    >
      <RoleForm store={roleFormStore} />
    </AdminPageLayout>
  )
})
