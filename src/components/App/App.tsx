import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { getAuthToken } from '../../common/api'
import { AuthPages } from '../Auth/AuthPages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProfilePage } from '../pages/ProfilePage/ProfilePage'
import { NoMatch } from '../pages/NoMatch/NoMatch'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProfilePage />,
    errorElement: <NoMatch />,
  },
])

export const App = observer(() => {
  const { appStore } = useContext(AppContext)

  useEffect(() => {
    if (getAuthToken()) appStore.refreshAuth()
  }, [])

  if (!appStore.isLoggedIn) return <AuthPages />

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
})
