import { makeAutoObservable } from 'mobx'
import { onError } from '../../common/getErrorMessage'
import { User } from '../../types/User'
import { authService } from '../../services/AuthService'
import { setAuthToken } from '../../common/api'
import { RegistraionFromData } from '../../types/RegistraionFromData'

export type OverlayName = 'login' | 'registration'

export class AppStore {
  user = {} as User

  get isLoggedIn() {
    return !!this.user.id
  }

  overlay: OverlayName = 'login'

  setOverlay(name: OverlayName) {
    this.overlay = name
  }

  constructor() {
    makeAutoObservable(this)
  }

  setUser(newUser: User) {
    this.user = newUser
  }

  async registration({ email, password }: RegistraionFromData) {
    try {
      await authService.registration(email, password)
    } catch (error) {
      onError(error)
    }
  }

  async login({ email, password }: RegistraionFromData) {
    try {
      const authData = await authService.login(email, password)
      this.setUser(authData.user)
      setAuthToken(authData.accessToken)
    } catch (error) {
      onError(error)
    }
  }

  async logout() {
    try {
      await authService.logout()
      this.setUser({} as User)
      setAuthToken()
    } catch (error) {
      onError(error)
    }
  }

  async refreshAuth() {
    try {
      const authData = await authService.refreshAuth()
      this.setUser(authData.user)
      setAuthToken(authData.accessToken)
      return authData
    } catch (error) {
      onError(error)
    }
  }

  async getUsers() {
    try {
      return await authService.getUsers()
    } catch (error) {
      onError(error)
    }
  }
}

export const appStore = new AppStore()
export const refreshAuth = () => appStore.refreshAuth()
export const logout = () => appStore.logout()
