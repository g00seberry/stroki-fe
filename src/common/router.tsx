import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LayoutPage } from '../components/pages/LayoutPage'
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage'
import { SettingsPage } from '../components/pages/SettingsPage/SettingsPage'
import { NoMatch } from '../components/pages/NoMatch/NoMatch'

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
