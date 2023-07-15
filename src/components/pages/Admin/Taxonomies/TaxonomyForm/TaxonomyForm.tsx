import { observer } from 'mobx-react-lite'
import React from 'react'
import { formItemStd } from '../../../../FormStd/formItems/formItemStd'
import { FormItemDef, FormStd } from '../../../../FormStd/FormStd'
import { Input } from 'antd'
import { required } from '../../../../FormStd/antValidators'
import { TaxonomyFormData, TaxonomyFormStore } from './taxonomyFormStore'
import { useNavigate } from 'react-router-dom'
import { makeUrl } from '../../../../../common/makeUrl'
import { PageUrl } from '../../../../../common/router'
import { tForms } from '../../../../../lang/shortcuts'

type PropsTaxonomyForm = {
  store: TaxonomyFormStore
}

export const TaxonomyForm: React.FC<PropsTaxonomyForm> = observer(
  ({ store }) => {
    const formItems: FormItemDef[] = [
      formItemStd('title', tForms('Title'), Input, {}, { rules: [required()] }),
      formItemStd('name', tForms('Name'), Input, {}, { rules: [required()] }),
      formItemStd(
        'type',
        tForms('Types_one'),
        Input,
        {},
        { rules: [required()] }
      ),
    ]
    const navigate = useNavigate()

    const create = (values: TaxonomyFormData) =>
      store.create(values).then((data) => {
        if (data) navigate(makeUrl(PageUrl.TaxonomiesSingle, { id: data?.id }))
      })
    const update = (values: TaxonomyFormData) => store.update(values)
    const actualHandler = store.isNew ? create : update

    return (
      <FormStd<TaxonomyFormData>
        loading={store.loading}
        pending={store.saving}
        initialValues={store.taxonomy}
        formItems={formItems}
        submit={actualHandler}
        confirmSubmit={!store.isNew}
      />
    )
  }
)
