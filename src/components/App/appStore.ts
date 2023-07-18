import { makeAutoObservable } from 'mobx'
import { onError } from '../../common/getErrorMessage'
import { ZUser, zUser } from '../../types/ZUser'
import $api, { getAuthToken, setAuthToken } from '../../common/api'
import { RegistraionFromData } from '../../types/RegistraionFromData'
import { AuthService } from '../../services/AuthService'
import { hasRole, hasRolesOR } from '../../common/hasRole'
import confirm from 'antd/es/modal/confirm'
import { tErrors, tMessages } from '../../lang/shortcuts'
import { getApiUrl } from '../../common/getApiUrl'

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

  pending = false
  setPending(pending: boolean) {
    this.pending = pending
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
    this.setPending(true)
    try {
      const authData = await AuthService.signUp(email, password)
      const user = zUser.parse(authData.user)
      this.setUser(user)
      setAuthToken(authData.accessToken)
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setPending(false)
    }
  }

  async login({ email, password }: RegistraionFromData) {
    this.setPending(true)
    try {
      const authData = await AuthService.login(email, password)
      const user = zUser.parse(authData.user)
      this.setUser(user)
      setAuthToken(authData.accessToken)
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setPending(false)
    }
  }

  async resetPassword({ email, password }: RegistraionFromData) {
    this.setPending(true)
    try {
      await AuthService.resetPassword(email, password)
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setPending(false)
    }
  }

  async resetActivationLink() {
    this.setPending(true)
    try {
      await $api.get(getApiUrl('resetActivationLink'))
      confirm({
        title: tErrors('Attention'),
        content: tMessages(
          'An email with instructions has been sent to your email'
        ),
        cancelText: undefined,
        okText: undefined,
        closable: true,
        type: 'warning',
      })
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setPending(false)
    }
  }

  async logout() {
    this.setPending(true)
    try {
      AuthService.logout()
      this.setUser({} as ZUser)
      setAuthToken()
    } catch (error) {
      onError(error)
    } finally {
      this.setPending(false)
    }
  }

  async refreshAuth() {
    this.setPending(true)
    try {
      const authData = await AuthService.refreshAuth()
      const user = zUser.parse(authData.user)
      this.setUser(user)
      setAuthToken(authData.accessToken)
      return authData
    } catch (error) {
      onError(error)
    } finally {
      this.setPending(false)
    }
  }
}

export const appStore = new AppStore()
export const refreshAuth = () => appStore.refreshAuth()
export const logout = () => appStore.logout()
