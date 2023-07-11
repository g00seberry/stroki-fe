import { makeAutoObservable } from 'mobx'
import $api from '../../../../../common/api'
import { getApiUrl, getApiUrlWithParams } from '../../../../../common/getApiUrl'
import { onError } from '../../../../../common/getErrorMessage'
import { notification } from 'antd'
import { tMessages } from '../../../../../lang/shortcuts'
import {
  ZTaxonomyType,
  zTaxonomyType,
} from '../../../../../types/ZTaxonomyType'

export type TaxonomyTypeFormData = { name: string }

export class TaxonomiesTypeFormStore {
  typeId: string | undefined = undefined
  setTypeId(roleId: string | undefined) {
    this.typeId = roleId
  }

  type: ZTaxonomyType | undefined = undefined
  setType(role: ZTaxonomyType | undefined) {
    this.type = role
  }

  get isNew() {
    return !this.typeId
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
    this.setType(undefined)
    this.setTypeId(undefined)
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      this.setTypeId(id)
      const resp = await $api.get(getApiUrlWithParams('taxonomiesType', { id }))
      const type = zTaxonomyType.parse(resp.data)
      this.setType(type)
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }

  async update(values: TaxonomyTypeFormData) {
    this.setSaving(true)
    try {
      const roleResp = await $api.put(
        getApiUrlWithParams('taxonomiesType', { id: this.typeId }),
        values
      )
      const updated = zTaxonomyType.parse(roleResp.data)
      this.setType(updated)
      notification.success({ message: tMessages('Taxonomy type updated') })
    } catch (error) {
      onError(error)
    } finally {
      this.setSaving(false)
    }
  }

  async create(values: TaxonomyTypeFormData) {
    this.setSaving(true)
    try {
      const roleResp = await $api.post(getApiUrl('taxonomiesTypesNew'), values)
      const created = zTaxonomyType.parse(roleResp.data)
      this.setType(created)
      notification.success({ message: tMessages('Taxonomy type created') })
      return created
    } catch (error) {
      onError(error)
    } finally {
      this.setSaving(false)
    }
  }
}

export const taxonomiesTypeFormStore = new TaxonomiesTypeFormStore()
