import {
  FnLoad,
  SortKey,
  SortOrder,
  TableLoadParams,
  TableResponse,
} from './TableStore'
import { defaultSorter } from './clientSorting'

export type FnCmp<TRow> = (a: TRow, b: TRow) => number

export type FnIsFiltered<TRow, TFilters> = (
  filters: TFilters,
  row: TRow
) => boolean

const sortRows = <TRow>(
  rows: TRow[],
  sort: SortKey,
  sortOrder: SortOrder,
  sorters?: Record<SortKey, FnCmp<TRow>>
): void => {
  const cmp: (a: TRow, b: TRow) => number =
    sorters?.[sort] ?? defaultSorter(sort)
  rows.sort((aRow, bRow) => {
    const cmpRes = cmp(aRow, bRow)
    return sortOrder === 'descend' ? cmpRes * -1 : cmpRes
  })
}

const applyParams = <TRow, TFilters extends object>(
  srcRows: TRow[],
  params: TableLoadParams<TFilters>,
  isFiltered: (filters: TFilters, row: TRow) => boolean,
  sorters?: Record<SortKey, (a: TRow, b: TRow) => number>
): TableResponse<TRow> => {
  const { page, sort, sortOrder, pageSize, filters } = params
  const rows = filters
    ? srcRows.filter((row) => isFiltered(filters, row))
    : [...srcRows]
  const totalItems = rows.length
  if (sort && sortOrder) {
    sortRows(rows, sort, sortOrder, sorters)
  }
  const start = page * pageSize
  return { rows: rows.slice(start, start + pageSize), totalItems }
}

/**
 * Специальный случай, если запрос сразу возвращает все данные.
 * Тогда сортировка и фильтрация происходят на клиенте.
 * @param task Запрос выполняется при первом обращении
 * @param isFiltered функция для фильтрации. Рекомендуется использовать makeFilters
 * @param sorters
 */
export const singleLoader = <TRow, TFilters extends object>(
  task: () => Promise<TRow[]>,
  isFiltered: FnIsFiltered<TRow, TFilters>,
  sorters?: Record<SortKey, (a: TRow, b: TRow) => number>
): FnLoad<TRow, TFilters> => {
  let srcRows: TRow[] | undefined
  return async (params) => {
    if (!srcRows) {
      srcRows = await task()
    }
    return applyParams(srcRows, params, isFiltered, sorters)
  }
}
