import React from 'react'
import { RouteObject } from 'react-router-dom'
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
import { IsAdmin, IsLoggedIn, NotLoggedIn } from '../components/Condition'
import { TaxonomiesPageSingle } from '../components/pages/Admin/Taxonomies/TaxonomiesPageSingle'
import { TaxonomiesPage } from '../components/pages/Admin/Taxonomies/TaxonomiesPage'

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
  // roles
  Roles = '/admin/roles',
  RolesSingle = '/admin/roles/:id',
  RolesSingleNew = '/admin/roles/new',
  // taxonomies
  Taxonomies = '/admin/taxonomies',
  TaxonomiesSingle = '/admin/taxonomies/:id',
  TaxonomiesNew = '/admin/taxonomies/new',
  // taxonomy items
  TaxonomiesItems = '/admin/taxonomies/items',
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

export const appRoutes = (appStore: AppStore) => {
  const isAdmin = () => appStore.isAdmin
  const routesWithcond = [
    createWithCond(createRouteStd(PageUrl.Root, <Home />)),
    // auth
    createWithCond(
      createRouteStd(
        PageUrl.Login,
        <NotLoggedIn>
          <Login />
        </NotLoggedIn>
      )
    ),
    createWithCond(
      createRouteStd(
        PageUrl.SignUp,
        <NotLoggedIn>
          <SignUp />
        </NotLoggedIn>
      )
    ),
    createWithCond(
      createRouteStd(
        PageUrl.ResetPassword,
        <NotLoggedIn>
          <ResetPassword />
        </NotLoggedIn>
      )
    ),
    // internal
    createWithCond(
      createRouteStd(
        PageUrl.Profile,
        <IsLoggedIn>
          <ProfilePage />
        </IsLoggedIn>
      )
    ),
    createWithCond(
      createRouteStd(
        PageUrl.Settings,
        <IsLoggedIn>
          <SettingsPage />
        </IsLoggedIn>
      )
    ),
    /**
     * Admin routes
     * Создание происходит через createWithCond с функцией проерки isAdmin() потому что в случае админки
     * мы вообще не хотим, чтобы эти роуты существовали. Если бы роуты админа создавались только
     * с оберткой <IsAdmin>, то при попытке перехода на админский страницы произошел бы редирект
     * на дефолтную страницу, что само по себе служило бы подсказкой к тому, что эти страницы есть
     */
    createWithCond(
      createRouteStd(
        PageUrl.Admin,
        <IsAdmin>
          <AdminPage />
        </IsAdmin>
      ),
      isAdmin
    ),
    // Users
    createWithCond(
      createRouteStd(
        PageUrl.Users,
        <IsAdmin>
          <UsersPage />
        </IsAdmin>
      ),
      isAdmin
    ),
    createWithCond(
      createRouteStd(
        PageUrl.UsersSingle,
        <IsAdmin>
          <UsersPageSingle />
        </IsAdmin>
      ),
      isAdmin
    ),
    // Roles
    createWithCond(
      createRouteStd(
        PageUrl.Roles,
        <IsAdmin>
          <RolesPage />
        </IsAdmin>
      ),
      isAdmin
    ),
    createWithCond(
      createRouteStd(
        PageUrl.RolesSingle,
        <IsAdmin>
          <RolesPageSingle />
        </IsAdmin>
      ),
      isAdmin
    ),
    createWithCond(
      createRouteStd(
        PageUrl.RolesSingleNew,
        <IsAdmin>
          <RolesPageSingle />
        </IsAdmin>
      ),
      isAdmin
    ),
    // taxonomies
    createWithCond(
      createRouteStd(
        PageUrl.Taxonomies,
        <IsAdmin>
          <TaxonomiesPage />
        </IsAdmin>
      ),
      isAdmin
    ),
    createWithCond(
      createRouteStd(
        PageUrl.TaxonomiesSingle,
        <IsAdmin>
          <TaxonomiesPageSingle />
        </IsAdmin>
      ),
      isAdmin
    ),
    createWithCond(
      createRouteStd(
        PageUrl.TaxonomiesNew,
        <IsAdmin>
          <TaxonomiesPageSingle />
        </IsAdmin>
      ),
      isAdmin
    ),
  ]

  return filterWithCond(routesWithcond)
}
