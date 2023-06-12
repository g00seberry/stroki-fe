import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

export const SettingsPage: React.FC = observer(() => {
  const { t } = useTranslation()
  return <h1>{t('Pages.Settings.Title')}</h1>
})
