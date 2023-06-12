import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { appStore } from './components/App/appStore'
import { AppContext } from './AppContext'
import { App } from './components/App/App'
import { initLang } from './lang/initLang'
initLang()
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <AppContext.Provider value={{ appStore }}>
      <App />
    </AppContext.Provider>
  )
}
