import { z } from 'zod'

export const zTaxonomy = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  type: z.string(),
})

export type ZTaxonomy = z.infer<typeof zTaxonomy>
