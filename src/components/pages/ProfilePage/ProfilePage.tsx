import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

export const ProfilePage: React.FC = observer(() => {
  const { t } = useTranslation()
  return <h1>{t('Pages.Profile.Title')}</h1>
})
