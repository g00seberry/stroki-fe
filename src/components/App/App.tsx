import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { AuthPages } from '../Auth/AuthPages'
import { RouterProvider } from 'react-router-dom'
import { router, routerNotActivated } from '../../common/router'

export const App = observer(() => {
  const { appStore } = useContext(AppContext)

  useEffect(() => {
    appStore.init()
  }, [])

  if (!appStore.isLoggedIn) return <AuthPages />

  return (
    <React.StrictMode>
      <RouterProvider
        router={appStore.isActivated ? router : routerNotActivated}
      />
    </React.StrictMode>
  )
})
