/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodObject, z } from 'zod'
import $api from '../../common/api'
import { FnLoad, TableLoadParams, TableResponse } from './TableStore'
import qs from 'query-string'

type TableDataProvider = <TFilters extends object>(
  url: string,
  { filters, page, pageSize, sort, sortOrder }: TableLoadParams<TFilters>,
  extraFilters: TFilters
) => Promise<{ data: unknown }>

export const getTableData: TableDataProvider = <TFilters extends object>(
  url: string,
  { filters, page, pageSize, sort, sortOrder }: TableLoadParams<TFilters>,
  extraFilters: TFilters
): Promise<{ data: unknown }> => {
  const params: Record<string, unknown> = {
    ...(extraFilters ?? {}),
    ...filters,
    page,
    pageSize,
  }
  if (sort && sortOrder) {
    params.sort = `${sort},${sortOrder === 'descend' ? 'desc' : 'asc'}`
  }
  return $api.get(url, {
    params,
    paramsSerializer: (p: any) => qs.stringify(p),
  })
}

export const tableLoader =
  <TRow extends object, TFilters extends object>(
    url: string,
    rowSchema: ZodObject<any>,
    dataProvider: TableDataProvider,
    extraFilters?: TFilters
  ): FnLoad<TRow, TFilters> =>
  async (params: TableLoadParams<TFilters>): Promise<TableResponse<TRow>> => {
    const resp = await dataProvider(url, params, extraFilters || {})
    const Schema = z.object({
      total: z.number(),
      data: rowSchema.array(),
    })
    const data = Schema.parse(resp.data)
    return {
      totalItems: data.total,
      rows: data.data as TRow[],
    }
  }
