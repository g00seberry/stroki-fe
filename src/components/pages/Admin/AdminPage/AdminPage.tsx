import React from 'react'
import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from '../AdminPageLayout'
import { tPagesTitles } from '../../../../lang/shortcuts'

export const AdminPage: React.FC = observer(() => {
  return (
    <AdminPageLayout pageTitle={tPagesTitles('Adimin')}>teset</AdminPageLayout>
  )
})
