import { z } from 'zod'

export const zRole = z.object({ id: z.number(), role: z.string() })
export type ZRole = z.infer<typeof zRole>
