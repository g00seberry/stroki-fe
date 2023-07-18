import { Modal } from 'antd'
import React from 'react'
import { TaxonomiesItemsStore } from '../taxonomiesItemsStore'
import { observer } from 'mobx-react-lite'
import { TaxonomyItemForm } from '../TaxonomyItemForm/TaxonomyItemForm'
import { tForms } from '../../../../../../lang/shortcuts'

interface PropsAddTaxonomyModal {
  open: boolean
  close(): void
  store: TaxonomiesItemsStore
}

export const AddTaxonomyModal: React.FC<PropsAddTaxonomyModal> = observer(
  ({ close, open, store }: PropsAddTaxonomyModal) => {
    return (
      <Modal
        open={open}
        title={tForms('Taxonomy item adding')}
        onCancel={close}
        footer={null}
        destroyOnClose
      >
        <TaxonomyItemForm
          store={store}
          mode="create"
          onSuccess={close}
          onCancel={close}
        />
      </Modal>
    )
  }
)
