import React from 'react'
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage'
import { SettingsPage } from '../components/pages/SettingsPage/SettingsPage'
import { NoMatch } from '../components/pages/NoMatch/NoMatch'
import { UserIsNotActivated } from '../components/pages/UserIsNotActivated/UserIsNotActivated'
import { Login } from '../components/pages/Auth/Login'
import { SignUp } from '../components/pages/Auth/SignUp'
import { Home } from '../components/pages/Home/Home'

export enum PageUrl {
  Root = '/',
  // auth
  Login = '/login',
  SignUp = '/sign-up',
  // internal
  Profile = '/profile',
  Settings = '/settings',
}

const createRouteStd = (
  path: string,
  element: React.ReactNode,
  errorElement?: React.ReactNode
): RouteObject => ({
  path,
  element,
  errorElement: errorElement || <NoMatch />,
})

export const router = createBrowserRouter([
  createRouteStd(PageUrl.Root, <ProfilePage />),
  createRouteStd(PageUrl.Settings, <SettingsPage />),
])

export const routerNotActivated = createBrowserRouter([
  createRouteStd(
    PageUrl.Root,
    <UserIsNotActivated />,
    <Navigate to={PageUrl.Root} />
  ),
])

export const routerNotAuth = createBrowserRouter([
  createRouteStd(PageUrl.Root, <Home />),
  createRouteStd(PageUrl.Login, <Login />),
  createRouteStd(PageUrl.SignUp, <SignUp />),
])
