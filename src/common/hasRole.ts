import { UserRole, ZUser } from '../types/ZUser'

export const hasRole = (user: Partial<ZUser>, role: UserRole) =>
  user.roles?.find((userRole) => userRole.role === role)

export const hasRolesOR = (user: Partial<ZUser>, roles: UserRole[]) =>
  !!roles.find((r) => hasRole(user, r))
