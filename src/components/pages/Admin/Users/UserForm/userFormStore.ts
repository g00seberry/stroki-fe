import { makeAutoObservable } from 'mobx'
import { DefaultOptionType } from 'antd/es/select'
import { notification } from 'antd'
import { ZUser, zUser } from '../../../../../types/ZUser'
import $api from '../../../../../common/api'
import { getApiUrl, getApiUrlWithParams } from '../../../../../common/getApiUrl'
import { onError } from '../../../../../common/getErrorMessage'
import { makeUrl } from '../../../../../common/makeUrl'
import { userRoles2Options } from '../../../../../common/transforms'
import { tMessages } from '../../../../../lang/shortcuts'

export type UserFormData = { rolesIds: number[] }

const zUser2FormData = (user: ZUser): UserFormData => ({
  rolesIds: user.roles.map((role) => role.id),
})

export class UserFormStore {
  userId: string | undefined = undefined
  setUserId(userId: string) {
    this.userId = userId
  }

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

  saving = false
  setSaving(saving: boolean) {
    this.saving = saving
  }

  get initialFormData() {
    return this.user ? zUser2FormData(this.user) : undefined
  }

  constructor() {
    makeAutoObservable(this)
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      this.setUserId(id)
      const userResp = await $api.get(getApiUrlWithParams('getUser', { id }))
      const user = zUser.parse(userResp.data)
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
    this.setSaving(true)
    try {
      const res = await $api.put(
        makeUrl(getApiUrl('updateUser'), { id: this.userId }),
        values
      )
      const user = zUser.parse(res.data)
      this.setUser(user)
      notification.success({ message: tMessages('User updated successfully') })
    } catch (error) {
      onError(error)
    } finally {
      this.setSaving(false)
    }
  }
}

export const userFormStore = new UserFormStore()
