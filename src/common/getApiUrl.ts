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
  taxonomiesSearch: '/taxonomies/search',
  taxonomiesDeleteList: '/taxonomies/delete/list',
  taxonomiesNew: '/taxonomies/new',
  taxonomy: '/taxonomies/:id',
  //taxonomy items
  taxonomyItems: '/taxonomies/:id/items',
  taxonomyItemsNew: '/taxonomies/:id/items/new',
  taxonomyItemsUpdate: '/taxonomies/:id/items/:itemId',
  taxonomyItemsDelete: '/taxonomies/:id/items/:itemId/delete',
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
