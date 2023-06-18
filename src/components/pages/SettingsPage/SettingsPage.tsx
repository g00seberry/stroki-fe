import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { PageLayout } from '../../Layout/PageLayout'

export const SettingsPage: React.FC = observer(() => {
  const { t } = useTranslation()
  return (
    <PageLayout>
      <h1>{t('Pages.Settings.Title')}</h1>
    </PageLayout>
  )
})
