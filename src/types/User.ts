export type UserRole = 'draft' | 'user' | 'admin' | 'super'
export type UserRoleResponse = { role: UserRole }

export type User = {
  id: number
  email: string
  userName: string
  roles: UserRole[]
}
