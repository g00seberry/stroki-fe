import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './ContentLayout.module.less'

export const ContentLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => <div className={style.layout}>{children || <Outlet />}</div>
