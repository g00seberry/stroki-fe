import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { appStore } from './components/App/appStore'
import { AppContext } from './AppContext'
import { App } from './components/App/App'
import { initLang } from './lang/initLang'
import { BrowserRouter } from 'react-router-dom'
import './style.less'

initLang()
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <AppContext.Provider value={{ appStore }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContext.Provider>
  )
}
