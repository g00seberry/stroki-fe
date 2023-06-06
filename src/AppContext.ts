import React from 'react'
import { AppStore, appStore } from './components/App/appStore'

type AppState = {
  appStore: AppStore
}
export const AppContext = React.createContext<AppState>({ appStore })
