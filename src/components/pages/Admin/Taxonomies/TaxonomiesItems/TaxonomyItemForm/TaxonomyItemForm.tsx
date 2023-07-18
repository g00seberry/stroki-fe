import { Input } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { tForms } from '../../../../../../lang/shortcuts'
import { FormItemDef, FormStd } from '../../../../../FormStd/FormStd'
import { required } from '../../../../../FormStd/antValidators'
import { formItemStd } from '../../../../../FormStd/formItems/formItemStd'
import {
  TaxonomiesItemsStore,
  TaxonomyItemFormData,
} from '../taxonomiesItemsStore'
import { filterWithoutOptionTree } from '../../../../../../common/tree/filterWithoutOptionTree'
import { formItemTreeSelectStd } from '../../../../../FormStd/formItems/formItemTreeSelect'

type PropsTaxonomyItemForm = {
  store: TaxonomiesItemsStore
  mode: 'create' | 'edit'
  onSuccess: () => void
  onCancel: () => void
}

export const TaxonomyItemForm: React.FC<PropsTaxonomyItemForm> = observer(
  ({ store, mode, onCancel, onSuccess }) => {
    const filtered = store.current
      ? filterWithoutOptionTree(store.taxonomiesOptions, store.current.id)
      : []

    const actualOptions = mode === 'create' ? store.taxonomiesOptions : filtered
    const formItems: FormItemDef[] = [
      formItemStd('title', tForms('Title'), Input, {}, { rules: [required()] }),
      formItemStd('name', tForms('Name'), Input, {}, { rules: [required()] }),
      formItemTreeSelectStd('parentId', tForms('Parent element'), {
        treeData: actualOptions,
        allowClear: true,
      }),
    ]

    const actualTask =
      mode === 'create'
        ? (values: TaxonomyItemFormData) => store.addNew(values)
        : (values: TaxonomyItemFormData) => store.updateCurrent(values)

    const actualInitial =
      mode === 'create'
        ? store.addFormInitialValues
        : store.editFormInitialValues

    const handleSubmit = (values: TaxonomyItemFormData) => {
      actualTask(values).then((success) => {
        if (success) {
          onSuccess()
        }
      })
    }

    return (
      <FormStd
        loading={store.loading}
        pending={store.saving}
        initialValues={actualInitial}
        formItems={formItems}
        submit={handleSubmit}
        cancel={onCancel}
      />
    )
  }
)
