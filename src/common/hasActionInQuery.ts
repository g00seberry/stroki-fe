import { tMessages } from '../lang/shortcuts'
import { RedirectActionTypes } from '../types/RedirectActions'

const getQueryActionMessages = (): Record<RedirectActionTypes, string> => ({
  activateUser: tMessages('User activated successfully'),
  resetPassword: tMessages('Password changed successfully'),
})

export const hasActionInQuery = (actionType: RedirectActionTypes) => {
  const searchParams = new URLSearchParams(document.location.search)
  return searchParams.get('action') === actionType
}

export const getActionFromQuery = (): RedirectActionTypes | undefined => {
  const searchParams = new URLSearchParams(document.location.search)
  return searchParams.get('action') as RedirectActionTypes
}

export const getQueryActionMessage = () => {
  const key = getActionFromQuery()
  return key ? getQueryActionMessages()[key] : ''
}
