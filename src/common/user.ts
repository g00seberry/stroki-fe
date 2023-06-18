import { User, UserRole } from '../types/User'

export const hasRole = (user: Partial<User>, role: UserRole) =>
  user.roles?.includes(role)
export const hasRolesOR = (user: Partial<User>, roles: UserRole[]) =>
  !!roles.find((r) => hasRole(user, r))
