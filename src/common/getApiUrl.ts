import { makeUrl } from './makeUrl'
import { makeUrlWithParams as makeUrlWithQuery } from './makeUrlWithParams'

export const apiUrls = {
  // auth
  signUp: '/auth/sign-up',
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  resetPassword: '/auth/password/reset',
  resetActivationLink: '/auth/activate/reset',
  // users
  usersSearch: '/users/search',
  getUser: '/users/user/:id',
  updateUser: '/users/user/:id',
  //roles
  roles: '/roles',
  role: '/roles/role/:id',
  roleNew: '/roles/role/new',
  rolesSearch: '/roles/search',
  rolesDelete: '/roles/delete',
  //taxonomies
  taxonomiesTypesSearch: '/taxonomies/types/search',
  taxonomiesTypesDeleteList: '/taxonomies/types/list/delete',
  taxonomiesTypesNew: '/taxonomies/types/new',
  taxonomiesType: '/taxonomies/types/:id',
}

export const getApiUrl = (url: keyof typeof apiUrls) => `/api${apiUrls[url]}`

export const getApiUrlWithQuery = (
  url: keyof typeof apiUrls,
  params: Record<string, string | number | undefined>
) => makeUrlWithQuery(getApiUrl(url), params)

export const getApiUrlWithParams = (
  url: keyof typeof apiUrls,
  params: Record<string, string | number | undefined>
) => makeUrl(getApiUrl(url), params)
