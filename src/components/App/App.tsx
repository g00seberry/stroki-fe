import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { Route, Routes } from 'react-router-dom'
import { appRoutes } from '../../common/router'
import { onQueryAction } from './onQueryAction'
import { NoMatch } from '../pages/NoMatch/NoMatch'

export const App = observer(() => {
  const { appStore } = useContext(AppContext)
  const routes = appRoutes(appStore)

  useEffect(() => {
    appStore.init()
    /**
     * обработка событий, закодированных в url
     */
    onQueryAction()
  }, [])
  return (
    <React.StrictMode>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.StrictMode>
  )
})
