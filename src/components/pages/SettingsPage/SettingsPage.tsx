import React from 'react'
import { observer } from 'mobx-react-lite'
import { PageLayout } from '../../Layout/PageLayout'
import { tPagesTitles } from '../../../lang/shortcuts'

export const SettingsPage: React.FC = observer(() => {
  return (
    <PageLayout>
      <h1>{tPagesTitles('Settings')}</h1>
    </PageLayout>
  )
})
