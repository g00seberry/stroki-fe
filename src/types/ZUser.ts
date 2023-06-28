import { z } from 'zod'
import { ZRole } from './ZRole'
export type UserRole = 'draft' | 'user' | 'admin' | 'super'

export const ZUser = z.object({
  id: z.number(),
  email: z.string(),
  roles: ZRole.array(),
})

export type ZUser = z.infer<typeof ZUser>
