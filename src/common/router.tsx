import React from 'react'
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import { NoMatch } from '../components/pages/NoMatch/NoMatch'
import { createWithCond, filterWithCond } from './WithCond'
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage'
import { SettingsPage } from '../components/pages/SettingsPage/SettingsPage'
import { AdminPage } from '../components/pages/Admin/AdminPage/AdminPage'
import { AppStore } from '../components/App/appStore'
import { Home } from '../components/pages/Home/Home'
import { Login } from '../components/pages/Auth/Login'
import { SignUp } from '../components/pages/Auth/SignUp'
import { UserIsNotActivated } from '../components/pages/UserIsNotActivated/UserIsNotActivated'
import { UsersPage } from '../components/pages/Admin/Users/UsersPage'

export enum PageUrl {
  Root = '/',
  // auth
  Login = '/login',
  SignUp = '/sign-up',
  // internal
  Profile = '/profile',
  Settings = '/settings',
  // admin
  Admin = '/admin',
  Users = '/admin/users',
  UsersSingle = '/admin/users/:id',
}

export const createRouteStd = (
  path: string,
  element: React.ReactNode,
  errorElement?: React.ReactNode
): RouteObject => ({
  path,
  element,
  errorElement: errorElement || <NoMatch />,
})

export const createAppRoutes = (appStore: AppStore): RouteObject[] => {
  const isAdmin = () => appStore.isAdmin

  const routesWithcond = [
    createWithCond(createRouteStd(PageUrl.Root, <ProfilePage />)),
    createWithCond(createRouteStd(PageUrl.Settings, <SettingsPage />)),
    createWithCond(createRouteStd(PageUrl.Admin, <AdminPage />), isAdmin),
    createWithCond(createRouteStd(PageUrl.Users, <UsersPage />), isAdmin),
  ]

  return filterWithCond(routesWithcond)
}

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
