import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { observer } from 'mobx-react-lite'
import { getAuthToken } from '../../common/api'
import { AuthPages } from '../Auth/AuthPages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NoMatch } from '../pages/NoMatch/NoMatch'
import { SettingsPage } from '../pages/SettingsPage/SettingsPage'
import { LayoutPage } from '../pages/LayoutPage'
import { ProfilePage } from '../pages/ProfilePage/ProfilePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: '/profile', element: <ProfilePage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
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
