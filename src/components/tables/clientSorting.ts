/**
 * Инструменты сортировки для случая когда формирование табличных данных выполняется на клиенте
 * (т.е. используется singleLoader)
 */
import { SortKey } from './TableStore'
import { FnCmp } from './singleLoader'

export const cmp = <T>(a: T, b: T): -1 | 0 | 1 => {
  if (a < b) return -1
  if (b < a) return 1
  return 0
}

/**
 * Дефолтная сортировка. Предполагается, что sortKey соответствует полю строки.
 * Его можно не указывать для singleLoader, т.к. он будет использован автоматически.
 * @param sortKey
 */
export const defaultSorter =
  <TRow>(sortKey: SortKey): FnCmp<TRow> =>
  (aRow: TRow, bRow: TRow): number => {
    const aVal = aRow[sortKey as keyof TRow]
    const bVal = bRow[sortKey as keyof TRow]
    return typeof aVal === 'number' && typeof bVal === 'number'
      ? aVal - bVal
      : cmp(String(aVal), String(bVal))
  }

/**
 * Сортировка для случая, когда указана функция извлечения string-значений из строки таблицы.
 * @param getValue
 */
export const strSorter =
  <TRow>(getValue: (row: TRow) => string): FnCmp<TRow> =>
  (aRow: TRow, bRow: TRow): number =>
    cmp(getValue(aRow), getValue(bRow))

export type StrConvert = (src: string) => string
export const noCvt: StrConvert = (src: string) => src

export const cvtInsensitive: StrConvert = (src: string) => src.toLowerCase()

/**
 * Сортировка для случая, когда указано поле (string) и функция преобразования
 * @param field
 * @param convert по-умолчанию cvtInsensitive, т.к. если с учетом регистра, то сойдет defaultSorter
 */
export const strFieldSorter = <TRow>(
  field: keyof TRow,
  convert: StrConvert = cvtInsensitive
): FnCmp<TRow> => strSorter((row: TRow) => convert(String(row[field])))

/**
 * Сортировка для случая, когда в колонке используется справочник для преобразования кодов в названия.
 * @param field Либо ключ поля, либо функция. Но в итоге должны получить key для справочника.
 * @param ref Справочник для извлечения по ключу значений, которые будут использованы для сортировки
 * @param convert можно указать cvtInsensitive если нужно сортировать названия из справочника без учета р-ра
 */
export const refSorter = <TRow>(
  field: keyof TRow | ((row: TRow) => string),
  ref: Record<string, string>,
  convert: StrConvert = noCvt
): FnCmp<TRow> =>
  strSorter((row) =>
    convert(
      ref[typeof field === 'function' ? field(row) : String(row[field])] ?? ''
    )
  )
