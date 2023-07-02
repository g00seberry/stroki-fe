import React from 'react'
import { observer } from 'mobx-react-lite'
import { PageLayout } from '../../Layout/PageLayout'
import { tPagesTitles } from '../../../lang/shortcuts'

export const ProfilePage: React.FC = observer(() => {
  return (
    <PageLayout>
      <h1>{tPagesTitles('Profile')}</h1>
    </PageLayout>
  )
})
