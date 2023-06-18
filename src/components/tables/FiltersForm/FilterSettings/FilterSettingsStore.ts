import { z } from 'zod'
import { makeAutoObservable } from 'mobx'
import { onError } from '../../../../common/getErrorMessage'

const zFilterSettings = z.object({
  hidden: z.string().array(),
})
type ZFilterSettings = z.infer<typeof zFilterSettings>

type ShortItemDef = {
  incompatibleKeys?: string[]
  nextKey?: string
}

type Rule = {
  incompatibleKeys: string[]
  nextKey?: string
}

export class FilterSettingsStore {
  private hiddenKeys = new Set<string>()

  private rules: Record<string, Rule> = {}

  constructor(public readonly storageKey: string) {
    this.loadSettings()
    makeAutoObservable(this)
  }

  init(items: Record<string, ShortItemDef>) {
    this.rules = {}
    Object.keys(items).forEach((key) => {
      this.rules[key] = { incompatibleKeys: [] }
    })
    const processedKeys = new Set<string>()
    Object.entries(items).forEach(([key, { incompatibleKeys, nextKey }]) => {
      const addKeys = (k1: string, k2: string) => {
        this.rules[k1]?.incompatibleKeys.push(k2)
        this.rules[k2]?.incompatibleKeys.push(k1)
      }
      const keySet = new Set(incompatibleKeys)
      if (nextKey) {
        addKeys(key, nextKey)
        if (key in this.rules) this.rules[key].nextKey = nextKey
        keySet.add(nextKey)
      }
      Array.from(keySet).forEach((key2) => {
        if (
          this.isVisible(key) &&
          this.isVisible(key2) &&
          processedKeys.has(key2)
        ) {
          this.changeVisible(key, false)
        }
        addKeys(key, key2)
      })
      processedKeys.add(key)
    })
  }

  isVisible(itemKey: string): boolean {
    return !this.hiddenKeys.has(itemKey)
  }

  changeVisible(itemKey: string, visible?: boolean) {
    const needVisible = visible ?? !this.isVisible(itemKey)
    if (needVisible) {
      this.hiddenKeys.delete(itemKey)
      this.rules[itemKey]?.incompatibleKeys.forEach((key2) =>
        this.hiddenKeys.add(key2)
      )
    } else {
      this.hiddenKeys.add(itemKey)
      const nextKey = this.rules[itemKey]?.nextKey
      if (nextKey) this.hiddenKeys.delete(nextKey)
    }
    this.saveSettings()
  }

  loadSettings() {
    try {
      const text = window.localStorage.getItem(this.storageKey)
      if (!text) return
      const obj = JSON.parse(text)
      const settings = zFilterSettings.parse(obj)
      this.hiddenKeys = new Set(settings.hidden)
    } catch (e) {
      onError(e)
    }
  }

  saveSettings() {
    try {
      const settings: ZFilterSettings = {
        hidden: Array.from(this.hiddenKeys),
      }
      window.localStorage.setItem(this.storageKey, JSON.stringify(settings))
    } catch (e) {
      onError(e)
    }
  }
}
