import { makeAutoObservable } from 'mobx'
import { onError } from '../../common/getErrorMessage'
import { User } from '../../types/User'
import { getAuthToken, setAuthToken } from '../../common/api'
import { RegistraionFromData } from '../../types/RegistraionFromData'
import { AuthService } from '../../services/AuthService'
import { UserService } from '../../services/UserService'
import { hasRole, hasRolesOR } from '../../common/user'

export class AppStore {
  user = {} as User
  setUser(newUser: User) {
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
      if (getAuthToken()) await appStore.refreshAuth()
    } catch (error) {
      onError(error)
    }
  }

  async signUp({ email, password }: RegistraionFromData) {
    try {
      const authData = await AuthService.signUp(email, password)
      this.setUser(authData.user)
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
      this.setUser(authData.user)
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
      this.setUser({} as User)
      setAuthToken()
    } catch (error) {
      onError(error)
    }
  }

  async refreshAuth() {
    try {
      const authData = await AuthService.refreshAuth()
      this.setUser(authData.user)
      setAuthToken(authData.accessToken)
      return authData
    } catch (error) {
      onError(error)
    }
  }

  async getUsers() {
    try {
      return await UserService.getUsers()
    } catch (error) {
      onError(error)
    }
  }
}

export const appStore = new AppStore()
export const refreshAuth = () => appStore.refreshAuth()
export const logout = () => appStore.logout()
