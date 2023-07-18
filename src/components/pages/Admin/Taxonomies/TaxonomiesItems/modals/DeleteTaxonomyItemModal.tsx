import { Modal } from 'antd'
import React from 'react'
import { FormItemDef, FormStd } from '../../../../../FormStd/FormStd'
import { DeleteFormData, TaxonomiesItemsStore } from '../taxonomiesItemsStore'
import { observer } from 'mobx-react-lite'
import { filterWithoutOptionTree } from '../../../../../../common/tree/filterWithoutOptionTree'
import { formItemCheckbox } from '../../../../../FormStd/formItems/formItemCheckbox'
import { ifs } from '../../../../../../common/ifs'
import { tForms } from '../../../../../../lang/shortcuts'
import { t } from 'i18next'
import { formItemTreeSelectStd } from '../../../../../FormStd/formItems/formItemTreeSelect'

interface PropsDeleteTaxonomyItemModal {
  open: boolean
  close(): void
  store: TaxonomiesItemsStore
}

export const DeleteTaxonomyItemModal: React.FC<PropsDeleteTaxonomyItemModal> =
  observer(({ close, open, store }: PropsDeleteTaxonomyItemModal) => {
    const [needNewParent, setNeedNewParent] = React.useState(true)

    const hasChildren = !!(store.current && store.current?.children?.length > 0)
    const filtered = store.current
      ? filterWithoutOptionTree(store.taxonomiesOptions, store.current.id)
      : []

    const formItems: FormItemDef[] = ifs(
      [
        [
          hasChildren && needNewParent,
          [
            formItemCheckbox(
              'deleteChildren',
              tForms('Remove child elements'),
              {
                onChange(e) {
                  setNeedNewParent(!e.target.checked)
                },
              }
            ),
            formItemTreeSelectStd('newParentId', tForms('Parent element'), {
              treeData: filtered,
              allowClear: true,
              disabled: !needNewParent,
            }),
          ],
        ],
        [
          hasChildren,
          [
            formItemCheckbox(
              'deleteChildren',
              tForms('Remove child elements'),
              {
                onChange(e) {
                  setNeedNewParent(!e.target.checked)
                },
              }
            ),
          ],
        ],
      ],
      []
    )

    const handleSubmit = (values: DeleteFormData) => {
      store.deleteCurent(values).then((success) => {
        if (success) {
          close()
        }
      })
    }
    return (
      <Modal
        open={open}
        title={tForms('Taxonomy item removing')}
        onCancel={close}
        footer={null}
        destroyOnClose
      >
        <FormStd
          loading={store.loading}
          pending={store.saving}
          formItems={formItems}
          submit={handleSubmit}
          submitText={t('Delete') ?? ''}
          cancel={close}
        />
      </Modal>
    )
  })
