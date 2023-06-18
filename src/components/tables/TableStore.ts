/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { z } from 'zod'
import { makeAutoObservable } from 'mobx'

import { notification } from 'antd'
import { ColumnKey, ColumnPoor, canBeHidden } from './ColumnPoor'
import { getErrorMessage } from '../../common/getErrorMessage'
import { DebounceCounter, debounce } from '../../common/debounce'
import { FilterSettingsStore } from './FiltersForm/FilterSettings'

export type SortOrder = 'descend' | 'ascend' // совместимо с ant
export type SortKey = string

export type TableLoadParams<TFilters extends object> = {
  page: number // zero based
  pageSize: number
  sort?: SortKey
  sortOrder?: SortOrder
  filters?: TFilters
}

export type TableResponse<TRow> = {
  readonly rows: TRow[]
  readonly totalItems: number
}

export type FnLoad<TRow, TFilters extends object> = (
  params: TableLoadParams<TFilters>
) => Promise<TableResponse<TRow>>

export const stubLoader = async () => ({ totalItems: 0, rows: [] })

export type CtrlFiltration<TFilters extends object> = {
  readonly filters: TFilters | undefined
  readonly initialFilters: TFilters
  readonly filterSettings: FilterSettingsStore | null
  reload(): Promise<void>
  setFilters(newFilters: TFilters): void
}

export type CtrlPagination = {
  readonly page: number
  setPage(newPage: number): void
  readonly pageSize: number
  setPageSize(newPageSize: number): void
  readonly totalItems: number
}

export type CtrlSort = {
  readonly sort?: SortKey
  readonly sortOrder?: SortOrder
  setSorting(sort?: SortKey, sortOrder?: SortOrder): void
}

export type CtrlColumns = {
  readonly columns: ColumnPoor[]
  readonly finalColumns: ColumnPoor[]
  isColumnVisible(key: ColumnKey): boolean
  setColumnVisible(key: ColumnKey, visible: boolean): void
  canColumnHide(key: ColumnKey): boolean
}

const Settings = z.object({
  hiddenColumns: z.string().array(),
  pageSize: z.optional(z.number()),
})
// eslint-disable-next-line no-redeclare
type Settings = z.infer<typeof Settings>

type ParamsTableStore<TRow, TFilters extends object> = {
  fnLoad: FnLoad<TRow, TFilters>
  initialParams?: Partial<TableLoadParams<TFilters>>
  settingsKey?: string
  keepSelected?: boolean
  onLoad?(): void
  filterSettingsKey?: string
}

export class TableStore<TRow, TFilters extends object>
  implements CtrlFiltration<TFilters>, CtrlPagination, CtrlColumns, CtrlSort
{
  fnLoad: FnLoad<TRow, TFilters>

  // ключ для хранения настроек столбцов в localStorage
  readonly settingsKey?: string

  readonly initialFilters: TFilters

  readonly keepSelected: boolean

  private onLoad?: () => void

  readonly filterSettings: FilterSettingsStore | null

  constructor({
    fnLoad,
    initialParams,
    settingsKey,
    keepSelected = false,
    onLoad,
    filterSettingsKey,
  }: ParamsTableStore<TRow, TFilters>) {
    this.keepSelected = keepSelected
    this.fnLoad = fnLoad
    this.settingsKey = settingsKey
    this.onLoad = onLoad
    this.params = {
      page: 0,
      pageSize: 10,
      ...initialParams,
    }
    this.initialFilters = initialParams?.filters ?? ({} as TFilters)
    this.result = {
      rows: [],
      totalItems: 0,
    }
    this.filterSettings = filterSettingsKey
      ? new FilterSettingsStore(filterSettingsKey)
      : null
    makeAutoObservable(this)
  }

  params: TableLoadParams<TFilters>

  setParams(newParams: TableLoadParams<TFilters>) {
    this.params = newParams
  }

  result: TableResponse<TRow>

  setResult(newResult: TableResponse<TRow>) {
    this.result = newResult
    this.onLoad?.()
  }

  get rows(): TRow[] {
    return this.result.rows
  }

  loading = false

  setLoading(loading: boolean) {
    this.loading = loading
  }

  columns: ColumnPoor[] = []

  setColumns(newColumns: ColumnPoor[]) {
    this.columns = newColumns
  }

  // Иногда список колонок формируется внутри компонента таблицы,
  // т.к. используется render ячеек, зависящий от внутреннего состояния.
  // Поэтому список колонок приходит при монтировании компонента таблицы.
  async init(columns: ColumnPoor[]) {
    this.setSelected([])
    this.setColumns(columns)
    this.loadSettings()
    await this.load({})
  }

  clear() {
    this.setSelected([])
    this.setResult({ totalItems: 0, rows: [] })
  }

  private visibleFiltersOnly(srcFilters: TFilters): TFilters {
    const { filterSettings } = this
    if (!filterSettings) return srcFilters
    return Object.keys(srcFilters).reduce(
      (dstFilters, key) =>
        filterSettings.isVisible(key)
          ? { ...dstFilters, [key]: srcFilters[key as keyof TFilters] }
          : dstFilters,
      {} as TFilters
    )
  }

  async reload() {
    return this.load(this.params)
  }

  async load(params: Partial<TableLoadParams<TFilters>>) {
    const newParams = {
      ...this.params,
      ...params,
      filters: { ...this.initialFilters, ...params.filters },
    }
    const requestParams = {
      ...newParams,
      filters: this.visibleFiltersOnly(newParams.filters),
    }

    const oldSelected = new Set(this.selected.map((row) => JSON.stringify(row)))

    this.setLoading(true)
    this.fnLoad(requestParams)
      .then((response) => {
        this.setParams(newParams)
        this.safeSelect(
          response.rows.filter((row) => oldSelected.has(JSON.stringify(row)))
        )
        this.setResult(response)
        this.setLoading(false)
      })
      .catch((e) => notification.error(getErrorMessage(e)))
      .finally(() => this.setLoading(false))
  }

  updateCounter: DebounceCounter = {}

  updateParams: Partial<TableLoadParams<TFilters>> = {}

  update(params: Partial<TableLoadParams<TFilters>>) {
    this.updateParams = { ...this.params, ...this.updateParams, ...params }
    debounce(this.updateCounter, 200, () => {
      this.load(this.updateParams)
      this.clearUpdateParams()
    })
  }

  clearUpdateParams() {
    this.updateParams = {}
  }

  get sort(): SortKey | undefined {
    return this.params.sort
  }

  get sortOrder(): SortOrder | undefined {
    return this.params.sortOrder
  }

  setSorting(sortField?: SortKey, sortOrder?: SortOrder) {
    this.update({ sort: sortField, sortOrder })
  }

  loadSettings() {
    let settings: Settings = {
      hiddenColumns: this.columns
        .filter(({ visibility }) => visibility === 'defaultHidden')
        .map(({ key }) => key),
    }
    if (this.settingsKey) {
      try {
        const text = localStorage.getItem(this.settingsKey)
        if (text) {
          const json = JSON.parse(text)
          settings = Settings.parse(json)
        }
      } catch (e) {
        notification.error({
          message: 'Ошибка загрузки настроек таблицы',
          description: getErrorMessage(e as Error).message,
        })
      }
    }
    this.invisibleColumnsKeys = new Set(settings.hiddenColumns)
    if (settings.pageSize) this.params.pageSize = settings.pageSize
  }

  saveSettings() {
    if (!this.settingsKey) return
    try {
      const settings: Settings = {
        hiddenColumns: Array.from(this.invisibleColumnsKeys),
        pageSize: this.pageSize,
      }
      localStorage.setItem(this.settingsKey, JSON.stringify(settings))
    } catch (e) {
      notification.error({
        message: 'Ошибка сохранения настроек таблицы',
        description: getErrorMessage(e as Error).message,
      })
    }
  }

  // implementation of ColumnsVisibility
  invisibleColumnsKeys = new Set<ColumnKey>()

  get finalColumns(): ColumnPoor[] {
    return this.columns.filter(({ key }) => this.isColumnVisible(key))
  }

  isColumnVisible(key: ColumnKey): boolean {
    return !this.invisibleColumnsKeys.has(key)
  }

  setColumnVisible(colKey: ColumnKey, visible: boolean) {
    const column = this.columns.find(({ key }) => colKey === key)
    if (!column || !canBeHidden(column)) return
    if (visible) {
      this.invisibleColumnsKeys.delete(colKey)
    } else {
      this.invisibleColumnsKeys.add(colKey)
    }
    this.saveSettings()
  }

  canColumnHide(colKey: ColumnKey): boolean {
    const column = this.columns.find(({ key }) => colKey === key)
    if (!column || !canBeHidden(column)) return false
    // нельзя скрывать последний видимый столбец
    return !(
      this.isColumnVisible(colKey) &&
      this.invisibleColumnsKeys.size + 1 === this.columns.length
    )
  }

  // implementation of Pagination
  get page(): number {
    return this.params.page
  }

  setPage(page: number) {
    if (page !== this.page) this.update({ page })
  }

  get pageSize(): number {
    return this.params.pageSize
  }

  get totalItems(): number {
    return this.result.totalItems
  }

  setPageSize(pageSize: number) {
    if (pageSize !== this.pageSize) {
      this.params.pageSize = pageSize
      this.saveSettings()
      this.update({ pageSize, page: 0 })
    }
  }

  // implementation of Filtration
  get filters(): TFilters | undefined {
    return this.params.filters
  }

  setFilters(filters: TFilters) {
    if (JSON.stringify(filters) !== JSON.stringify(this.filters)) {
      // При изменении фильтров перезод на первую страницу
      this.update({ filters, page: 0 })
    }
  }

  // implementation of Selection
  selected: TRow[] = []

  setSelected(rows: TRow[]) {
    this.selected = rows
  }

  disabledSelections = new Set<unknown>()

  setDisabledSelections(keys: unknown[]) {
    this.disabledSelections = new Set(keys)
  }

  safeSelect(list: TRow[]) {
    if (this.keepSelected) {
      // Сначала нужно сохранить те строки, которые не относятся к текущей странице
      const curPageRowsSet = new Set(
        this.rows.map((row) => JSON.stringify(row))
      )
      const outPage = this.selected.filter(
        (row) => !curPageRowsSet.has(JSON.stringify(row))
      )
      // Теперь совокупность выделенных строк получается из входного списка плюс те, которые не с этой страницы
      this.setSelected([...outPage, ...list])
    } else {
      this.setSelected(list)
    }
  }
}
