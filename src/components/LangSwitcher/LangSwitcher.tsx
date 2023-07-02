import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { LangType, getAppLang, saveAppLang } from '../../lang/initLang'
import { DefaultOptionType } from 'antd/es/select'

export const langOptions: DefaultOptionType[] = [
  { label: 'Ру', value: 'ru' },
  { label: 'En', value: 'en' },
]
export const LangSwitcher = observer(() => {
  const changeAppLang = (lang: LangType) => {
    saveAppLang(lang)
    window.location.reload()
  }

  return (
    <Select
      options={langOptions}
      onChange={changeAppLang}
      defaultValue={getAppLang()}
    />
  )
})
