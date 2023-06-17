import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { RouterProvider } from 'react-router-dom'
import { router, routerNotActivated, routerNotAuth } from '../../common/router'

export const App = observer(() => {
  const { appStore } = useContext(AppContext)

  useEffect(() => {
    appStore.init()
  }, [])

  return (
    <React.StrictMode>
      {appStore.isLoggedIn && appStore.isActivated && (
        <RouterProvider router={router} />
      )}
      {appStore.isLoggedIn && !appStore.isActivated && (
        <RouterProvider router={routerNotActivated} />
      )}
      {!appStore.isLoggedIn && <RouterProvider router={routerNotAuth} />}
    </React.StrictMode>
  )
})
