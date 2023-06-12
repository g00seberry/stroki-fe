import i18next from 'i18next'
import ruLang from './ru'
import enLang from './en'
import { initReactI18next } from 'react-i18next'
export type LangType = 'ru' | 'en'

const langKey = 'appLang'

export const saveAppLang = (lang: LangType) => {
  try {
    localStorage.setItem(langKey, lang)
  } catch (e) {
    console.error(e)
  }
}

export const getAppLang = (): LangType =>
  (localStorage.getItem(langKey) as LangType) || 'ru'

export const initLang = () => {
  return i18next.use(initReactI18next).init({
    lng: getAppLang(),
    resources: {
      ru: ruLang,
      en: enLang,
    },
  })
}
