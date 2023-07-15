import { makeAutoObservable } from 'mobx'
import $api from '../../../../../common/api'
import { getApiUrl, getApiUrlWithParams } from '../../../../../common/getApiUrl'
import { onError } from '../../../../../common/getErrorMessage'
import { notification } from 'antd'
import { tMessages } from '../../../../../lang/shortcuts'
import { ZTaxonomy, zTaxonomy } from '../../../../../types/ZTaxonomy'

export type TaxonomyFormData = { name: string; title: string; type: string }

export class TaxonomyFormStore {
  id: string | undefined = undefined
  setId(id: string | undefined) {
    this.id = id
  }

  taxonomy: ZTaxonomy | undefined = undefined
  setTaxonomy(data: ZTaxonomy | undefined) {
    this.taxonomy = data
  }

  get isNew() {
    return !this.id
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
    this.setTaxonomy(undefined)
    this.setId(undefined)
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      this.setId(id)
      const resp = await $api.get(getApiUrlWithParams('taxonomy', { id }))
      const type = zTaxonomy.parse(resp.data)
      this.setTaxonomy(type)
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }

  async update(values: TaxonomyFormData) {
    this.setSaving(true)
    try {
      const resp = await $api.put(
        getApiUrlWithParams('taxonomy', { id: this.id }),
        values
      )
      const updated = zTaxonomy.parse(resp.data)
      this.setTaxonomy(updated)
      notification.success({ message: tMessages('Taxonomy updated') })
    } catch (error) {
      onError(error)
    } finally {
      this.setSaving(false)
    }
  }

  async create(values: TaxonomyFormData) {
    this.setSaving(true)
    try {
      const resp = await $api.post(getApiUrl('taxonomiesNew'), values)
      const created = zTaxonomy.parse(resp.data)
      this.setTaxonomy(created)
      notification.success({ message: tMessages('Taxonomy created') })
      return created
    } catch (error) {
      onError(error)
    } finally {
      this.setSaving(false)
    }
  }
}

export const taxonomyFormStore = new TaxonomyFormStore()
