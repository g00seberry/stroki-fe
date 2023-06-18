import * as React from 'react'
import styles from './TablePageLayout.module.less'

type PropsTablePageLayout = {
  children?: React.ReactNode
}

export const TablePageLayout: React.FC<PropsTablePageLayout> = ({
  children,
}: PropsTablePageLayout) => <div className={styles.layout}>{children}</div>

TablePageLayout.defaultProps = {
  children: null,
}
