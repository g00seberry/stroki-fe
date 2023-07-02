import { RedirectActionTypes } from '../types/RedirectActions'

export const hasActionInQuery = (
  actionType: RedirectActionTypes,
  params: URLSearchParams
) => params.get('action') === actionType
