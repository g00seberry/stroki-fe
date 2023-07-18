import React from 'react'
import { observer } from 'mobx-react-lite'
import { TaxonomiesItemsStore } from './taxonomiesItemsStore'
import { Button, Empty, Space, Tree } from 'antd'
import { Loading } from '../../../../Loading/Loading'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { DeleteButton } from '../../../../DeleteButton'
import { t } from 'i18next'
import { ContentLayout } from '../../../../Layout/ContentLayout/ContentLayout'
import { AddTaxonomyModal } from './modals/AddTaxonomyModal'
import { DeleteTaxonomyItemModal } from './modals/DeleteTaxonomyItemModal'
import { EditTaxonomyModal } from './modals/EditTaxonomyModal'
import { ZTreeNode } from '../../../../../types/ZTreeNode'

type PropsTaxonomiesItemPage = { store: TaxonomiesItemsStore }
type ModalKey = 'add' | 'delete' | 'edit' | null

export const TaxonomiesItemPage: React.FC<PropsTaxonomiesItemPage> = observer(
  ({ store }) => {
    const [modalKey, setModalKey] = React.useState<ModalKey>(null)
    const close = () => setModalKey(null)
    return (
      <Loading loading={store.loading}>
        <ContentLayout>
          <Space>
            <Button
              onClick={() => {
                setModalKey('add')
              }}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              {t('Create')}
            </Button>
            <Button
              onClick={() => {
                setModalKey('edit')
              }}
              icon={<EditOutlined />}
              disabled={!store.canEdit}
            >
              {t('Edit')}
            </Button>
            <DeleteButton
              handleDelete={() => {
                setModalKey('delete')
              }}
              disabled={!store.canDelete}
            />
          </Space>
          {store.taxonomyItems ? (
            <Tree<ZTreeNode>
              treeData={store.taxonomyItems}
              onSelect={(_, { selectedNodes }) => {
                store.setCurrent(selectedNodes[0])
              }}
              selectedKeys={store.selectedKeys}
              expandedKeys={store.expandedKeys}
              onExpand={(keys) => store.setExpandedKeys(keys)}
            />
          ) : (
            <Empty />
          )}
          <AddTaxonomyModal
            store={store}
            close={close}
            open={modalKey === 'add'}
          />
          <EditTaxonomyModal
            store={store}
            close={close}
            open={modalKey === 'edit'}
          />
          <DeleteTaxonomyItemModal
            store={store}
            close={close}
            open={modalKey === 'delete'}
          />
        </ContentLayout>
      </Loading>
    )
  }
)
