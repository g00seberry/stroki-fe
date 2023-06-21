import { makeAutoObservable } from 'mobx'
import { onError } from '../../common/getErrorMessage'
import { ZUser } from '../../types/ZUser'
import { getAuthToken, setAuthToken } from '../../common/api'
import { RegistraionFromData } from '../../types/RegistraionFromData'
import { AuthService } from '../../services/AuthService'
import { hasRole, hasRolesOR } from '../../common/user'

export class AppStore {
  user = {} as ZUser
  setUser(newUser: ZUser) {
    this.user = newUser
  }

  get isLoggedIn() {
    return !!this.user.id
  }

  get isActivated() {
    return !hasRole(this.user, 'draft')
  }

  get isAdmin() {
    return hasRolesOR(this.user, ['admin', 'super'])
  }

  loading = false
  setLoading(loading: boolean) {
    this.loading = loading
  }

  constructor() {
    makeAutoObservable(this)
  }

  async init() {
    try {
      if (getAuthToken()) await this.refreshAuth()
    } catch (error) {
      onError(error)
    }
  }

  async signUp({ email, password }: RegistraionFromData) {
    try {
      const authData = await AuthService.signUp(email, password)
      const user = ZUser.parse(authData.user)
      this.setUser(user)
      setAuthToken(authData.accessToken)
      return true
    } catch (error) {
      onError(error)
      return false
    }
  }

  async login({ email, password }: RegistraionFromData) {
    try {
      const authData = await AuthService.login(email, password)
      const user = ZUser.parse(authData.user)
      this.setUser(user)
      setAuthToken(authData.accessToken)
      return true
    } catch (error) {
      onError(error)
      return false
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      this.setUser({} as ZUser)
      setAuthToken()
    } catch (error) {
      onError(error)
    }
  }

  async refreshAuth() {
    try {
      const authData = await AuthService.refreshAuth()
      const user = ZUser.parse(authData.user)
      this.setUser(user)
      setAuthToken(authData.accessToken)
      return authData
    } catch (error) {
      onError(error)
    }
  }
}

export const appStore = new AppStore()
export const refreshAuth = () => appStore.refreshAuth()
export const logout = () => appStore.logout()
