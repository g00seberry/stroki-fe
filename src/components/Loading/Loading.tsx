import { Spin } from 'antd'
import React from 'react'
import style from './Loading.module.less'
import { observer } from 'mobx-react-lite'

type PropsLoading = {
  loading: boolean
} & React.PropsWithChildren

export const Loading: React.FC<PropsLoading> = observer(
  ({ children, loading }: PropsLoading) => (
    <>
      {loading ? (
        <div className={style.container}>
          <Spin />
        </div>
      ) : (
        children
      )}
    </>
  )
)
