import { z } from 'zod'
import { zRole } from './ZRole'
export type UserRole = 'draft' | 'user' | 'admin' | 'super'

export const zUser = z.object({
  id: z.number(),
  email: z.string(),
  roles: zRole.array(),
})

export type ZUser = z.infer<typeof zUser>
