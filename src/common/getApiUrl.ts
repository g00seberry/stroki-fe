import { makeUrl } from './makeUrl'
import { makeUrlWithParams as makeUrlWithQuery } from './makeUrlWithParams'

export const apiUrls = {
  // auth
  signUp: '/auth/sign-up',
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  // users
  usersSearch: '/users/search',
  getUser: '/users/user/:id',
  updateUser: '/users/user/:id',
  changeMail: '/users/user/:id/mail/change',
  //roles
  roles: '/roles',
  role: '/roles/role/:id',
  roleNew: '/roles/role/new',
  rolesSearch: '/roles/search',
  rolesDelete: '/roles/delete',
}

export const getApiUrl = (url: keyof typeof apiUrls) =>
  `/api${apiUrls[url as keyof typeof apiUrls]}`

export const getApiUrlWithQuery = (
  url: keyof typeof apiUrls,
  params: Record<string, string | number | undefined>
) => makeUrlWithQuery(getApiUrl(url), params)

export const getApiUrlWithParams = (
  url: keyof typeof apiUrls,
  params: Record<string, string | number | undefined>
) => makeUrl(getApiUrl(url), params)
