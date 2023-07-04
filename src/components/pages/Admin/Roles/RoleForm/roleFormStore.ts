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
  roleId: string | undefined = undefined
  setRoleId(roleId: string | undefined) {
    this.roleId = roleId
  }

  role: ZRole | undefined = undefined
  setRole(role: ZRole | undefined) {
    this.role = role
  }

  get isNew() {
    return !this.roleId
  }

  loading = false
  setLoading(loading: boolean) {
    this.loading = loading
  }

  saving = false
  setSaving(saving: boolean) {
    this.saving = saving
  }

  constructor() {
    makeAutoObservable(this)
  }

  destroy() {
    this.setRole(undefined)
    this.setRoleId(undefined)
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      this.setRoleId(id)
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
    this.setSaving(true)
    try {
      const roleResp = await $api.put(
        getApiUrlWithParams('role', { id: this.roleId }),
        values
      )
      const role = ZRole.parse(roleResp.data)
      this.setRole(role)
      notification.success({ message: tMessages('Role updated') })
    } catch (error) {
      onError(error)
    } finally {
      this.setSaving(false)
    }
  }

  async create(values: RoleFormData) {
    this.setSaving(true)
    try {
      const roleResp = await $api.post(getApiUrl('roleNew'), values)
      const role = ZRole.parse(roleResp.data)
      this.setRole(role)
      notification.success({ message: tMessages('Role created') })
      return role
    } catch (error) {
      onError(error)
    } finally {
      this.setSaving(false)
    }
  }
}

export const roleFormStore = new RoleFormStore()
