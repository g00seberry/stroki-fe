/**
 * Минимальная часть описания колонок, не зависящая от реализации компонента таблицы.
 */
import * as React from 'react'

type ColumnVisibilityMode = 'alwaysVisible' | 'defaultHidden'
export type ColumnKey = string

export type ColumnPoor = {
  key: ColumnKey
  title?: React.ReactNode
  visibility?: ColumnVisibilityMode
  condition?(): boolean
}

export const canBeHidden = ({ title, visibility }: ColumnPoor): boolean =>
  !!title && visibility !== 'alwaysVisible'
