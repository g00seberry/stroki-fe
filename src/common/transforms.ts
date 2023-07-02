import { DefaultOptionType } from 'antd/es/select'
import { ZRole } from '../types/ZRole'
import { t } from 'i18next'

export const userRoles2Options = (roles: ZRole[]): DefaultOptionType[] =>
  roles.map((role) => ({ label: t(`RoleLabels.${role.role}`), value: role.id }))
