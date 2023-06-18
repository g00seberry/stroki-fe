import * as React from 'react'

import { Table, TablePaginationConfig } from 'antd'
import {
  ColumnType,
  FilterValue,
  SorterResult,
  TableRowSelection,
} from 'antd/lib/table/interface'

import { observer } from 'mobx-react-lite'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import styles from './AsyncTable.module.less'
import { CtrlPagination, CtrlSort, TableStore } from '../TableStore'
import { ColumnPoor } from '../ColumnPoor'

export type RowWithId = {
  id: number | string
}

// Совмещает тип колонки для ant-таблицы и для настроек
export type AColumn<TRow> = Omit<ColumnType<TRow>, 'key' | 'title'> & ColumnPoor

type PropsAsyncTable<TRow, TFilters extends object> = {
  store: TableStore<TRow, TFilters>
  columns: AColumn<TRow>[]
  selected?: TRow[]
  usePagination?: boolean
  rowKey?: unknown
  rowClassName?: (row: TRow, index: number) => string
  selectionType?: 'checkbox' | 'radio'
  onRowClick?(row: TRow, index?: number): void
  size?: SizeType
}

export type TRowKey<TRow> = TRow extends RowWithId
  ? { rowKey?: keyof TRow }
  : { rowKey: keyof TRow }

// Если есть поле id, то оно будет использовано по-умолчанию как rowKey. Иначе его надо явно указать.
// export type PropsAsyncTable<TRow, TFilters> =
//     PropsBase<TRow, TFilters> & TRowKey<TRow>;

const applySorting = <TRow,>(
  store: CtrlSort,
  columns: AColumn<TRow>[]
): AColumn<TRow>[] => {
  const { sort, sortOrder } = store
  return columns.map((col) => (col.key === sort ? { ...col, sortOrder } : col))
}

export const onPagination = (
  store: CtrlPagination,
  p: TablePaginationConfig
) => {
  if (p.current) store.setPage(p.current - 1)
  if (p.pageSize) store.setPageSize(p.pageSize)
}

export const AsyncTable = observer(
  <TRow extends object, TFilters extends object>(
    props: PropsAsyncTable<TRow, TFilters>
  ): React.ReactElement => {
    const {
      store,
      rowKey: rowKeyOpt,
      columns,
      usePagination,
      selectionType,
      onRowClick,
      rowClassName,
      size,
    } = props

    React.useEffect(() => {
      store.init(columns)
    }, [store])

    const onChange = (
      pagination: TablePaginationConfig,
      _: Record<string, FilterValue | null>,
      sorter?: SorterResult<TRow> | SorterResult<TRow>[]
    ) => {
      onPagination(store, pagination)
      if (sorter) {
        if (!Array.isArray(sorter)) {
          store.setSorting(String(sorter.columnKey), sorter.order ?? undefined)
        }
      }
    }

    const rowKey = (rowKeyOpt ?? 'id') as keyof TRow

    const selection: TableRowSelection<TRow> | undefined = selectionType
      ? {
          type: selectionType,
          onChange: (_, rows) => {
            store.safeSelect(rows)
          },
          selectedRowKeys: [
            ...store.selected.map((row) => row[rowKey] as React.Key),
          ],
          getCheckboxProps: store.disabledSelections
            ? (row: TRow) => {
                const disabled = store.disabledSelections.has(row[rowKey])
                return { disabled, indeterminate: disabled }
              }
            : undefined,
        }
      : undefined

    const pagination: TablePaginationConfig | boolean = usePagination
      ? {
          current: store.page + 1,
          pageSize: store.pageSize,
          showSizeChanger: true,
          total: store.totalItems,
          position: ['bottomCenter'],
        }
      : false

    const classes: string[] = []
    if (onRowClick) classes.push(styles.rowsClickable)

    return (
      <Table<TRow>
        className={classes.join(' ')}
        columns={applySorting(
          store,
          columns.filter(
            ({ key, condition }) =>
              (!condition || condition()) && store.isColumnVisible(key)
          )
        )}
        dataSource={store.result.rows}
        rowKey={String(rowKey)}
        rowClassName={rowClassName}
        loading={store.loading}
        onChange={onChange}
        pagination={pagination}
        rowSelection={selection}
        onRow={(row, index) => ({
          onClick: () => onRowClick?.(row, index),
        })}
        components={{
          header: {
            cell: CustomHeaderCell,
          },
        }}
        size={size}
      />
    )
  }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomHeaderCell = (props: any) => {
  const { children, className, ...rest } = props
  const classes = [className, styles.hd]
  /* eslint-disable react/destructuring-assignment */
  if (props['aria-sort'] === 'ascending') classes.push(styles.asc)
  if (props['aria-sort'] === 'descending') classes.push(styles.desc)

  return (
    <th className={classes.join(' ')} {...rest}>
      {children}
    </th>
  )
}
