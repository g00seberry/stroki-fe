import { z } from 'zod'

export const zTaxonomyType = z.object({
  id: z.number(),
  name: z.string(),
})

export type ZTaxonomyType = z.infer<typeof zTaxonomyType>
