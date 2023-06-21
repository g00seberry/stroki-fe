import { z } from 'zod'
export type UserRole = 'draft' | 'user' | 'admin' | 'super'

export const ZUser = z.object({
  id: z.number(),
  email: z.string(),
  roles: z.enum(['draft', 'user', 'admin', 'super']).array(),
})

export type ZUser = z.infer<typeof ZUser>
