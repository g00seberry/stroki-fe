import { Modal } from 'antd'
import React from 'react'
import { TaxonomiesItemsStore } from '../taxonomiesItemsStore'
import { observer } from 'mobx-react-lite'
import { TaxonomyItemForm } from '../TaxonomyItemForm/TaxonomyItemForm'
import { tForms } from '../../../../../../lang/shortcuts'

interface PropsEditTaxonomyModal {
  open: boolean
  close(): void
  store: TaxonomiesItemsStore
}

export const EditTaxonomyModal: React.FC<PropsEditTaxonomyModal> = observer(
  ({ close, open, store }: PropsEditTaxonomyModal) => {
    return (
      <Modal
        open={open}
        title={tForms('Taxonomy item editing')}
        onCancel={close}
        footer={null}
        destroyOnClose
      >
        <TaxonomyItemForm
          store={store}
          mode="edit"
          onSuccess={close}
          onCancel={close}
        />
      </Modal>
    )
  }
)
