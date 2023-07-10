import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { PageUrl } from '../common/router'
import { AppContext } from '../AppContext'
import { observer } from 'mobx-react-lite'

type PropsCondition = {
  cond: boolean
  to: string
  children: React.ReactNode
}

export const Condition: React.FC<PropsCondition> = ({
  cond,
  to,
  children,
}: PropsCondition) => {
  if (cond) return <>{children}</>
  return <Navigate to={to} replace />
}

export const IsLoggedIn = observer(({ children }: React.PropsWithChildren) => {
  const { appStore } = useContext(AppContext)
  const isLoggedIn = appStore.isLoggedIn
  return (
    <Condition cond={isLoggedIn} to={PageUrl.Login}>
      {children}
    </Condition>
  )
})

export const IsAdmin = observer(({ children }: React.PropsWithChildren) => {
  const { appStore } = useContext(AppContext)
  const isAdmin = appStore.isLoggedIn && appStore.isAdmin
  return (
    <Condition cond={isAdmin} to={PageUrl.Root}>
      {children}
    </Condition>
  )
})

export const NotLoggedIn = observer(({ children }: React.PropsWithChildren) => {
  const { appStore } = useContext(AppContext)
  const notLoggedIn = !appStore.isLoggedIn
  return (
    <Condition cond={notLoggedIn} to={PageUrl.Root}>
      {children}
    </Condition>
  )
})
