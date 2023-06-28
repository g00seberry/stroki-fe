import { makeAutoObservable } from 'mobx'
import { DefaultOptionType } from 'antd/es/select'
import { t } from 'i18next'
import { notification } from 'antd'
import { ZUser } from '../../../../../types/ZUser'
import $api from '../../../../../common/api'
import { getApiUrl, getApiUrlWithParams } from '../../../../../common/getApiUrl'
import { onError } from '../../../../../common/getErrorMessage'
import { makeUrl } from '../../../../../common/makeUrl'
import { AuthResponse } from '../../../../../types/AuthResponse'
import { ZRole } from '../../../../../types/ZRole'

const userRoles2Options = (roles: ZRole[]): DefaultOptionType[] =>
  roles.map((role) => ({ label: t(`User.Roles.${role.role}`), value: role.id }))

export type UserFormData = { rolesIds: number[]; email: string }

const zUser2FormData = (user: ZUser): UserFormData => ({
  rolesIds: user.roles.map((role) => role.id),
  email: user.email,
})

export class UserFormStore {
  userId: number | undefined
  setUserId(userId: number) {
    this.userId = userId
  }

  user: UserFormData | undefined = undefined
  setUser(newUser: UserFormData) {
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
      this.setUserId(Number(id))
      const userResp = await $api.get(getApiUrlWithParams('getUser', { id }))
      const user = ZUser.parse(userResp.data)
      this.setUser(zUser2FormData(user))
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
        makeUrl(getApiUrl('updateUser'), { id: this.userId }),
        values
      )
      const user = ZUser.parse(res.data)
      this.setUser(zUser2FormData(user))
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
        getApiUrlWithParams('changeMail', { id: this.userId }),
        { email }
      )
      const user = ZUser.parse(res.data.user)
      this.setUser(zUser2FormData(user))
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

export const userFormStore = new UserFormStore()
