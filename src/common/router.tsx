import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { LayoutPage } from '../components/pages/LayoutPage'
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage'
import { SettingsPage } from '../components/pages/SettingsPage/SettingsPage'
import { NoMatch } from '../components/pages/NoMatch/NoMatch'
import { UserIsNotActivated } from '../components/pages/UserIsNotActivated/UserIsNotActivated'

export enum PageUrl {
  Root = '/',
  ProfilePage = '/profile',
  SettingsPage = '/settings',
}

export const router = createBrowserRouter([
  {
    path: PageUrl.Root,
    element: <LayoutPage />,
    children: [
      { path: PageUrl.ProfilePage, element: <ProfilePage /> },
      { path: PageUrl.SettingsPage, element: <SettingsPage /> },
    ],
    errorElement: (
      <LayoutPage>
        <NoMatch />
      </LayoutPage>
    ),
  },
])

export const routerNotActivated = createBrowserRouter([
  {
    path: PageUrl.Root,
    element: (
      <LayoutPage>
        <UserIsNotActivated />
      </LayoutPage>
    ),
    errorElement: <Navigate to={PageUrl.Root} />,
  },
])
