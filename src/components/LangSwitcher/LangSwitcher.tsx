import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LangType, getAppLang, saveAppLang } from '../../lang/initLang'
import { DefaultOptionType } from 'antd/es/select'

export const langOptions: DefaultOptionType[] = [
  { label: 'Ру', value: 'ru' },
  { label: 'En', value: 'en' },
]
export const LangSwitcher = observer(() => {
  const { i18n } = useTranslation()

  const changeAppLang = (lang: LangType) => {
    saveAppLang(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <Select
      options={langOptions}
      onChange={changeAppLang}
      defaultValue={getAppLang()}
    />
  )
})
