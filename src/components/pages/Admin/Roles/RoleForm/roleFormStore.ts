import { makeAutoObservable } from 'mobx'
import { UserRole } from '../../../../../types/ZUser'
import $api from '../../../../../common/api'
import { getApiUrl, getApiUrlWithParams } from '../../../../../common/getApiUrl'
import { onError } from '../../../../../common/getErrorMessage'
import { ZRole } from '../../../../../types/ZRole'
import { notification } from 'antd'
import { tMessages } from '../../../../../lang/shortcuts'

export type RoleFormData = { role: UserRole }

export class RoleFormStore {
  role: ZRole | undefined = undefined
  setRole(role: ZRole) {
    this.role = role
  }

  get isNew() {
    return !this.role?.id
  }

  loading = false
  setLoading(loading: boolean) {
    this.loading = loading
  }

  constructor() {
    makeAutoObservable(this)
  }

  destroy() {
    this.role = undefined
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      const roleResp = await $api.get(getApiUrlWithParams('role', { id }))
      const role = ZRole.parse(roleResp.data)
      this.setRole(role)
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }

  async update(values: RoleFormData) {
    this.setLoading(true)
    try {
      const roleResp = await $api.put(
        getApiUrlWithParams('role', { id: this.role?.id }),
        values
      )
      const role = ZRole.parse(roleResp.data)
      this.setRole(role)
      notification.success({ message: tMessages('Role updated') })
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }

  async create(values: RoleFormData) {
    this.setLoading(true)
    try {
      const roleResp = await $api.post(getApiUrl('roleNew'), values)
      const role = ZRole.parse(roleResp.data)
      this.setRole(role)
      notification.success({ message: tMessages('Role created') })
      return role
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }
}

export const roleFormStore = new RoleFormStore()
