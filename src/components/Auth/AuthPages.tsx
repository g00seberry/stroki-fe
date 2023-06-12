import { observer } from 'mobx-react-lite'
import React from 'react'
import { OverlayName } from '../App/appStore'
import { Login } from './Login'
import { Registraion } from './Registraion'
import { AppContext } from '../../AppContext'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'

const authPagesMap: Record<OverlayName, React.ReactElement> = {
  login: <Login />,
  registration: <Registraion />,
}

export const AuthPages: React.FC = observer(() => {
  const { appStore } = React.useContext(AppContext)
  return (
    <div>
      <LangSwitcher />
      {authPagesMap[appStore.overlay]}
    </div>
  )
})
