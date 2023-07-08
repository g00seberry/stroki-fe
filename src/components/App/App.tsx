import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createAppRoutes, routerNotAuth } from '../../common/router'
import { onQueryAction } from './onQueryAction'

export const App = observer(() => {
  const { appStore } = useContext(AppContext)
  const router = createBrowserRouter(createAppRoutes(appStore))
  useEffect(() => {
    appStore.init()
    /**
     * обработка событий, закодированных в url
     */
    onQueryAction()
  }, [])
  return (
    <React.StrictMode>
      {appStore.isLoggedIn ? (
        <RouterProvider router={router} />
      ) : (
        <RouterProvider router={routerNotAuth} />
      )}
    </React.StrictMode>
  )
})
