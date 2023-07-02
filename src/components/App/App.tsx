import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  createAppRoutes,
  routerNotActivated,
  routerNotAuth,
} from '../../common/router'

export const App = observer(() => {
  const { appStore } = useContext(AppContext)
  const router = createBrowserRouter(createAppRoutes(appStore))
  useEffect(() => {
    appStore.init()
  }, [])
  const notActivatedUser = appStore.isLoggedIn && !appStore.isActivated
  const activatedUser = appStore.isLoggedIn && appStore.isActivated
  const notAuthUser = !appStore.isLoggedIn
  return (
    <React.StrictMode>
      {activatedUser && <RouterProvider router={router} />}
      {notActivatedUser && <RouterProvider router={routerNotActivated} />}
      {notAuthUser && <RouterProvider router={routerNotAuth} />}
    </React.StrictMode>
  )
})
