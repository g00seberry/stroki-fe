import { Spin } from 'antd'
import React from 'react'
import style from './Loading.module.less'
import { observer } from 'mobx-react-lite'

interface StoreWithLoding {
  loading: boolean
}

type PropsLoading = {
  store: StoreWithLoding
} & React.PropsWithChildren

export const Loading: React.FC<PropsLoading> = observer(
  ({ children, store }: PropsLoading) => (
    <>
      {store.loading ? (
        <div className={style.container}>
          <Spin />
        </div>
      ) : (
        children
      )}
    </>
  )
)
