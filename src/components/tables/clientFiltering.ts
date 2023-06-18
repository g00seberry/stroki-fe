/**
 * Инструменты фильтрации для случая когда формирование табличных данных выполняется на клиенте
 * (т.е. используется singleLoader)
 */

import { StrConvert, cvtInsensitive, noCvt } from './clientSorting'
import { FnIsFiltered } from './singleLoader'

export type FnTestFilter<
  TRow,
  TFilters extends object,
  FK extends keyof TFilters
> = (row: TRow, filterValue: Required<TFilters>[FK]) => boolean

export type FiltersFactory<TRow, TFilters extends object> = {
  [P in keyof TFilters]-?: FnTestFilter<TRow, TFilters, P>
}

/**
 * Собрать общую функцию фильтрации строки из функций тестирования для каждого поля формы фильтра.
 * @param filtersFactory
 */
export const makeFilters =
  <TRow, TFilters extends object, FK extends keyof TFilters = keyof TFilters>(
    filtersFactory: FiltersFactory<TRow, TFilters>
  ): FnIsFiltered<TRow, TFilters> =>
  (filters: TFilters, row: TRow): boolean => {
    // eslint-disable-next-line  no-restricted-syntax
    for (const filterName of Object.keys(filtersFactory)) {
      const filterValue = filters[filterName as FK]
      const fn = filtersFactory[filterName as FK]
      if (filterValue && fn && !fn(row, filterValue)) {
        return false
      }
    }
    return true
  }

type TField<TRow> = keyof TRow | ((row: TRow) => string)

export const testStr =
  <TRow>(
    field: TField<TRow>,
    testFn: (rowValue: string, filterValue: string) => boolean,
    convert: StrConvert = noCvt
  ) =>
  (row: TRow, filterValue: string) =>
    testFn(
      convert(typeof field === 'function' ? field(row) : String(row[field])),
      convert(filterValue)
    )

/**
 * Проверить, является ли значение фильтра частью поля (или вычисленного значения) строки таблицы.
 * @param rowField Поле строки или функция для вычисления значения.
 * @param insensitive
 */
export const testStrPart = <TRow>(
  rowField: TField<TRow>,
  insensitive?: boolean
) =>
  testStr(
    rowField,
    (s, part) => s.indexOf(part) >= 0,
    insensitive ? cvtInsensitive : noCvt
  )

/**
 * Проверить, начинается ли указанное поле (или вычисленное значение) строки таблицы с того, что указано в фильтре
 * @param rowField Поле строки или функция для вычисления значения.
 * @param insensitive
 */
export const testStrStart = <TRow>(
  rowField: TField<TRow>,
  insensitive?: boolean
) =>
  testStr(
    rowField,
    (s, part) => s.startsWith(part),
    insensitive ? cvtInsensitive : noCvt
  )

/**
 * Проверить, входит ли значение указанного поля строки в мультиселектном поле фильтра
 * @param field Имя поля строки
 */
export const testList =
  <TRow, Key extends keyof TRow = keyof TRow>(field: Key) =>
  (row: TRow, filterValue: TRow[Key][]) =>
    filterValue.includes(row[field])
