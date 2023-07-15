import React from 'react'
import { observer } from 'mobx-react-lite'
import { TaxonomiesItemsStore } from './taxonomiesItemsStore'
import Tree from 'antd/es/tree/Tree'
import { Empty } from 'antd'
import { Loading } from '../../../../Loading/Loading'

type PropsTaxonomiesItemPage = { store: TaxonomiesItemsStore }

export const TaxonomiesItemPage: React.FC<PropsTaxonomiesItemPage> = observer(
  ({ store }) => {
    return (
      <Loading loading={store.loading}>
        {store.taxonomies ? <Tree treeData={store.taxonomies} /> : <Empty />}
      </Loading>
    )
  }
)
