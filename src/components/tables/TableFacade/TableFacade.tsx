import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { TableStore } from '../TableStore'
import { AColumn, AsyncTable, TRowKey } from '../AsyncTable'
import styles from './TableFacade.module.less'
import { FilterFieldsDict, FiltersForm } from '../FiltersForm'
import { ColumnsSettings } from '../ColumnsSettings'

type PropsBase<TRow, TFilters extends object> = {
  store: TableStore<TRow, TFilters>
  columns: AColumn<TRow>[]
  filterItems?: FilterFieldsDict<TFilters>
  selectionType?: 'checkbox' | 'radio'
  showSettings?: boolean
  onRowClick?(row: TRow, index?: number): void
  middlePart?: React.ReactNode // Элементы между фильтрами и таблицей
  size?: SizeType
}

type PropsTableFacade<TRow, TFilters extends object> = PropsBase<
  TRow,
  TFilters
> &
  TRowKey<TRow>

export const TableFacade = observer(
  <TRow extends object, TFilters extends object = object>(
    props: PropsTableFacade<TRow, TFilters>
  ): React.ReactElement => {
    const {
      store,
      columns,
      filterItems,
      rowKey,
      selectionType,
      showSettings,
      onRowClick,
      middlePart,
      size,
    } = props
    const filtersVisible = !!filterItems
    const settingsVisible =
      typeof showSettings === 'boolean' ? showSettings : !!store.settingsKey
    const toolsVisible = filtersVisible || settingsVisible
    return (
      <>
        {toolsVisible && (
          <div className={styles.filersRow}>
            <div>
              {filtersVisible && (
                <FiltersForm<TFilters> store={store} items={filterItems} />
              )}
            </div>
            <div>{settingsVisible && <ColumnsSettings store={store} />}</div>
          </div>
        )}
        {middlePart}
        <AsyncTable<TRow, TFilters>
          store={store}
          columns={columns}
          rowKey={rowKey}
          selectionType={selectionType}
          onRowClick={onRowClick}
          usePagination
          size={size}
        />
      </>
    )
  }
)
