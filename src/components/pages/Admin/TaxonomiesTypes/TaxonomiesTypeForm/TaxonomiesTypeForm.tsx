import { observer } from 'mobx-react-lite'
import React from 'react'
import { t } from 'i18next'
import { formItemStd } from '../../../../FormStd/formItems/formItemStd'
import { FormItemDef, FormStd } from '../../../../FormStd/FormStd'
import { Input } from 'antd'
import { required } from '../../../../FormStd/antValidators'
import {
  TaxonomyTypeFormData,
  TaxonomiesTypeFormStore,
} from './taxonomiesTypeFormStore'
import { useNavigate } from 'react-router-dom'
import { makeUrl } from '../../../../../common/makeUrl'
import { PageUrl } from '../../../../../common/router'

type PropsTaxonomiesTypeForm = {
  store: TaxonomiesTypeFormStore
}

export const TaxonomiesTypeForm: React.FC<PropsTaxonomiesTypeForm> = observer(
  ({ store }) => {
    const formItems: FormItemDef[] = [
      formItemStd(
        'name',
        t('Types', { count: 1 }),
        Input,
        {},
        { rules: [required()] }
      ),
    ]
    const navigate = useNavigate()

    const create = (values: TaxonomyTypeFormData) =>
      store
        .create(values)
        .then((data) =>
          navigate(makeUrl(PageUrl.TaxonomiesTypesSingle, { id: data?.id }))
        )
    const update = (values: TaxonomyTypeFormData) => store.update(values)
    const actualHandler = store.isNew ? create : update

    return (
      <FormStd<TaxonomyTypeFormData>
        loading={store.loading}
        pending={store.saving}
        initialValues={store.type}
        formItems={formItems}
        submit={actualHandler}
        confirmSubmit={!store.isNew}
      />
    )
  }
)
