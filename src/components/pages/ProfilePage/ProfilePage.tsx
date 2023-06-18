import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { PageLayout } from '../../Layout/PageLayout'

export const ProfilePage: React.FC = observer(() => {
  const { t } = useTranslation()
  return (
    <PageLayout>
      <h1>{t('Pages.Profile.Title')}</h1>
    </PageLayout>
  )
})
