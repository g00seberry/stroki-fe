import React from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { NoMatch } from '../components/pages/NoMatch/NoMatch'
import { createWithCond, filterWithCond } from './createWithCond'
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage'
import { SettingsPage } from '../components/pages/SettingsPage/SettingsPage'
import { AdminPage } from '../components/pages/Admin/AdminPage/AdminPage'
import { AppStore } from '../components/App/appStore'
import { Home } from '../components/pages/Home/Home'
import { Login } from '../components/pages/Auth/Login'
import { SignUp } from '../components/pages/Auth/SignUp'
import { UsersPage } from '../components/pages/Admin/Users/UsersPage'
import { UsersPageSingle } from '../components/pages/Admin/Users/UsersPageSingle'
import { RolesPage } from '../components/pages/Admin/Roles/RolesPage'
import { RolesPageSingle } from '../components/pages/Admin/Roles/RolesPageSingle'
import { ResetPassword } from '../components/pages/Auth/ResetPassword'

export enum PageUrl {
  Root = '/',
  // auth
  Login = '/login',
  SignUp = '/sign-up',
  ResetPassword = '/password/reset',
  // internal
  Profile = '/profile',
  Settings = '/settings',
  // admin
  Admin = '/admin',
  Users = '/admin/users',
  UsersSingle = '/admin/users/:id',
  Roles = '/admin/roles',
  RolesSingle = '/admin/roles/:id',
  RolesSingleNew = '/admin/roles/new',
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
    /**
     * Admin routes
     */
    createWithCond(createRouteStd(PageUrl.Admin, <AdminPage />), isAdmin),
    // Users
    createWithCond(createRouteStd(PageUrl.Users, <UsersPage />), isAdmin),
    createWithCond(
      createRouteStd(PageUrl.UsersSingle, <UsersPageSingle />),
      isAdmin
    ),
    // Roles
    createWithCond(createRouteStd(PageUrl.Roles, <RolesPage />), isAdmin),
    createWithCond(
      createRouteStd(PageUrl.RolesSingle, <RolesPageSingle />),
      isAdmin
    ),
    createWithCond(
      createRouteStd(PageUrl.RolesSingleNew, <RolesPageSingle />),
      isAdmin
    ),
  ]

  return filterWithCond(routesWithcond)
}

export const routerNotAuth = createBrowserRouter([
  createRouteStd(PageUrl.Root, <Home />),
  createRouteStd(PageUrl.Login, <Login />),
  createRouteStd(PageUrl.SignUp, <SignUp />),
  createRouteStd(PageUrl.ResetPassword, <ResetPassword />),
])
