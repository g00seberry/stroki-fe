/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { CtrlFiltration } from '../TableStore'
import { FiltersFormItem } from './FiltersFormItem'
import styles from './FiltersForm.module.less'

export type FilterFieldsDict<TFilters> = Partial<
  Record<keyof TFilters, FiltersFormItem>
>

type PropsFiltersForm<TFilters extends object> = {
  store: CtrlFiltration<TFilters>
  children?: React.ReactNode
  items?: FilterFieldsDict<TFilters>
}

export const FiltersForm = observer(
  <TFilters extends object>(
    props: PropsFiltersForm<TFilters>
  ): React.ReactElement => {
    const { store, children, items } = props
    const [form] = Form.useForm<TFilters>()
    const onChange = async () => {
      let values: TFilters
      try {
        values = await form.validateFields()
      } catch (e) {
        const err = e as Record<string, unknown>
        if (
          'errorFields' in err &&
          Array.isArray(err.errorFields) &&
          err.errorFields.length === 0
        ) {
          values = err.values as TFilters
        } else return
      }
      const out = { ...values }
      if (items)
        Object.entries(items).forEach(([fieldName, item]) => {
          const itemDef = item as FiltersFormItem
          if (!itemDef) return
          const key = fieldName as keyof TFilters
          const v = values[key]
          if (v !== undefined && v !== null) {
            if (itemDef.toSave) {
              out[key] = itemDef.toSave(
                v,
                fieldName
              ) as TFilters[keyof TFilters]
            } else {
              itemDef.save?.(out as Record<string, unknown>, v, fieldName)
            }
          }
        })
      store.setFilters(out)
    }
    const drawItems = () => {
      type Pair = [string, FiltersFormItem]
      const drawItem = ([name, { render, itemProps }]: Pair) => (
        <Form.Item key={name} name={name} {...(itemProps || {})}>
          {render()}
        </Form.Item>
      )
      const fullList = (Object.entries(items ?? {}) as Pair[]).filter(
        ([, it]) => !!it
      )
      const mainList = fullList.filter(([, it]) => !it.separated)
      const separated = fullList.filter(([, it]) => it.separated)
      return (
        <div className={styles.itemsBlock}>
          {mainList.length > 0 && (
            <div className={styles.items}>{mainList.map(drawItem)}</div>
          )}
          {separated.length > 0 &&
            separated.map((pair) => <div key={pair[0]}>{drawItem(pair)}</div>)}
        </div>
      )
    }

    return (
      <Form<TFilters>
        className={styles.box}
        layout="inline"
        form={form}
        initialValues={store.initialFilters || {}}
        size="small"
        onValuesChange={onChange}
      >
        {items ? drawItems() : <div className={styles.items}>{children}</div>}
        <Button
          htmlType="reset"
          type="primary"
          size="middle"
          icon={<CloseOutlined />}
          onClick={() => {
            form.resetFields()
            store.setFilters(store.initialFilters)
          }}
        />
      </Form>
    )
  }
)
