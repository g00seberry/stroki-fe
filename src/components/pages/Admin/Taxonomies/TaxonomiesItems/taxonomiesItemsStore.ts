import { getApiUrlWithParams } from '../../../../../common/getApiUrl'
import {
  zTaxonomyItem,
  ZTaxonomyItem,
} from '../../../../../types/ZTaxonomyItem'
import $api from '../../../../../common/api'
import { makeAutoObservable } from 'mobx'
import { onError } from '../../../../../common/getErrorMessage'
import { notification } from 'antd'
import { tMessages } from '../../../../../lang/shortcuts'
import { ZTreeNode } from '../../../../../types/ZTreeNode'
import { findNode } from '../../../../../common/tree/findNode'

const single2TreeCompatible = ({
  children,
  id,
  name,
  parentId,
  title,
}: ZTaxonomyItem): ZTreeNode => {
  return {
    id,
    name,
    title,
    parentId,
    key: String(id),
    children: Items2TreeCompatible(children),
  }
}

const Items2TreeCompatible = (list: ZTaxonomyItem[]) => {
  return list.map((item): ZTreeNode => single2TreeCompatible(item))
}

export type AddFormInitialData = {
  parentId: string | undefined
}

export type TaxonomyItemFormData = {
  title: string
  name: string
  parentId: string | undefined
}

export type DeleteFormData = { newParentId: number; deleteChildren: boolean }

const node2AddInitial = ({ id }: ZTreeNode): AddFormInitialData => ({
  parentId: String(id),
})

const node2EditInitial = ({
  title,
  name,
  parentId,
}: ZTreeNode): TaxonomyItemFormData => ({
  title,
  name,
  parentId: parentId === null ? undefined : String(parentId),
})

export class TaxonomiesItemsStore {
  taxonomyId: string | null = null
  setTaxonomyId(data: string | null) {
    this.taxonomyId = data
  }

  taxonomyItems: ZTreeNode[] | null = null
  setTaxonomyItems(data: ZTreeNode[] | null) {
    this.taxonomyItems = data
  }

  get taxonomiesOptions() {
    return this.taxonomyItems ?? []
  }

  current: ZTreeNode | null = null
  setCurrent(data: ZTreeNode | null) {
    this.current = data
  }

  get isNew() {
    return !this.current
  }

  get selectedKeys() {
    return this.current ? [this.current.key] : []
  }

  get addFormInitialValues() {
    return this.current ? node2AddInitial(this.current) : undefined
  }

  get editFormInitialValues() {
    return this.current ? node2EditInitial(this.current) : undefined
  }

  get canDelete() {
    return !!this.current
  }

  get canEdit() {
    return !!this.current
  }

  expandedKeys: (string | number)[] = []
  setExpandedKeys(keys: (string | number)[]) {
    this.expandedKeys = keys
  }

  expandByKey(key: string, open: boolean) {
    const pos = this.expandedKeys.findIndex((item) => item === key)
    if (open && pos < 0) {
      this.setExpandedKeys([...this.expandedKeys, key])
    } else if (!open && pos >= 0) {
      const keys = [...this.expandedKeys]
      keys.splice(pos, 1)
      this.setExpandedKeys(keys)
    }
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
    this.taxonomyItems = null
    this.taxonomyId = null
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      this.setTaxonomyId(id)
      const res = await $api.get(getApiUrlWithParams('taxonomyItems', { id }))
      const data = zTaxonomyItem.array().parse(res.data)
      const nodes = Items2TreeCompatible(data)
      this.setTaxonomyItems(nodes.length ? nodes : null)
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }

  async reload() {
    if (this.taxonomyId) this.init(this.taxonomyId)
    if (this.current) {
      this.expandByKey(this.current.key, true)
    }
  }

  findItem(key: string) {
    return findNode(this.taxonomyItems ?? [], key)
  }

  async addNew(values: TaxonomyItemFormData) {
    if (!this.taxonomyId) return false
    this.setSaving(true)
    try {
      const res = await $api.post(
        getApiUrlWithParams('taxonomyItemsNew', {
          id: this.taxonomyId,
        }),
        values
      )
      const data = zTaxonomyItem.parse(res.data)
      this.setCurrent(single2TreeCompatible(data))
      this.reload()
      notification.success({ message: tMessages('Taxonomy item created') })
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setSaving(false)
    }
  }

  async updateCurrent({ parentId, ...values }: TaxonomyItemFormData) {
    if (!this.taxonomyId || !this.current) return false
    this.setSaving(true)
    try {
      await $api.put(
        getApiUrlWithParams('taxonomyItemsUpdate', {
          id: this.taxonomyId,
          itemId: this.current.id,
        }),
        { ...values, parentId: parentId || null }
      )
      await this.reload()
      this.setCurrent(this.findItem(this.current.key) || null)
      notification.success({ message: tMessages('Taxonomy item updated') })
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setSaving(false)
    }
  }

  async deleteCurent(values: DeleteFormData) {
    this.setSaving(true)
    try {
      await $api.post(
        getApiUrlWithParams('taxonomyItemsDelete', {
          id: String(this.taxonomyId),
          itemId: this.current?.id,
        }),
        values
      )
      this.setCurrent(null)
      this.reload()
      notification.info({ message: tMessages('Taxonomy item removed') })
      return true
    } catch (error) {
      onError(error)
      return false
    } finally {
      this.setSaving(false)
    }
  }
}

export const taxonomiesItemsStore = new TaxonomiesItemsStore()
