import { makeAutoObservable } from 'mobx'
import { DefaultOptionType } from 'antd/es/select'
import { t } from 'i18next'
import { notification } from 'antd'
import { UserRole, ZUser } from '../../../../../types/ZUser'
import $api from '../../../../../common/api'
import {
  getApiUrl,
  getApiUrlWithParams,
  getApiUrlWithQuery,
} from '../../../../../common/getApiUrl'
import { onError } from '../../../../../common/getErrorMessage'
import { makeUrl } from '../../../../../common/makeUrl'
import { AuthResponse } from '../../../../../types/AuthResponse'

const userRoles2Options = (roles: UserRole[]): DefaultOptionType[] =>
  roles.map((role) => ({ label: t(`User.Roles.${role}`), value: role }))

export type UserFormData = Partial<ZUser>

export class UserFromStore {
  user: ZUser | undefined = undefined
  setUser(newUser: ZUser) {
    this.user = newUser
  }

  rolesOptions: DefaultOptionType[] = []
  setRolesOptions(list: DefaultOptionType[]) {
    this.rolesOptions = list
  }

  loading = false
  setLoading(loading: boolean) {
    this.loading = loading
  }

  constructor() {
    makeAutoObservable(this)
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      const userResp = await $api.get(getApiUrlWithQuery('getUser', { id }))
      const user = ZUser.parse(userResp.data)
      this.setUser(user)
      const rolesResp = await $api.get(getApiUrl('roles'))
      this.setRolesOptions(userRoles2Options(rolesResp.data))
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }

  async updateUser(values: UserFormData) {
    this.setLoading(true)
    try {
      const res = await $api.put(
        makeUrl(getApiUrl('updateUser'), { id: this.user?.id }),
        values
      )
      const user = ZUser.parse(res.data)
      this.setUser(user)
      /**
       * TODO
       * -локализация
       */
      notification.success({ message: 'Пользователь успешно обновлен' })
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }

  async changeEmail({ email }: UserFormData) {
    this.setLoading(true)
    try {
      const res = await $api.put<AuthResponse>(
        getApiUrlWithParams('changeMail', { id: this.user?.id }),
        { email }
      )
      const user = ZUser.parse(res.data.user)
      this.setUser(user)
      /**
       * TODO
       * -локализация
       */
      notification.success({
        message: `Письмо с подтверждением отправлено на почту ${email}`,
      })
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setLoading(false)
    }
  }
}

export const userFromStore = new UserFromStore()
