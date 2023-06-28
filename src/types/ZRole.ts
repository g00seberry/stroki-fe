import { z } from 'zod'

export const ZRole = z.object({ id: z.number(), role: z.string() })
export type ZRole = z.infer<typeof ZRole>
