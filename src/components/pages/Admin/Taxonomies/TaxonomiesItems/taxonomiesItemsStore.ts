import { getApiUrlWithParams } from '../../../../../common/getApiUrl'
import {
  zTaxonomyItem,
  ZTaxonomyItem,
} from '../../../../../types/ZTaxonomyItem'
import $api from '../../../../../common/api'
import { makeAutoObservable } from 'mobx'
import { onError } from '../../../../../common/getErrorMessage'

export type TaxonomyTreeNode = ZTaxonomyItem & {
  key: string
  children: TaxonomyTreeNode[]
}
const Items2TreeDataCompatible = (list: ZTaxonomyItem[]) => {
  return list.map((item): TaxonomyTreeNode => {
    return {
      ...item,
      key: String(item.id),
      children: Items2TreeDataCompatible(item.children),
    }
  })
}

export class TaxonomiesItemsStore {
  taxonomies: TaxonomyTreeNode[] | null = null
  setTaxonomies(data: TaxonomyTreeNode[] | null) {
    this.taxonomies = data
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
    this.taxonomies = null
  }

  async init(id: string) {
    this.setLoading(true)
    try {
      const res = await $api.get(getApiUrlWithParams('taxonomyItems', { id }))
      const data = zTaxonomyItem.array().parse(res.data)
      const nodes = Items2TreeDataCompatible(data)
      this.setTaxonomies(nodes.length ? nodes : null)
    } catch (error) {
      onError(error)
    } finally {
      this.setLoading(false)
    }
  }
}

export const taxonomiesItemsStore = new TaxonomiesItemsStore()
