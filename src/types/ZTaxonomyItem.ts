import { z } from 'zod'
import { ZTaxonomy, zTaxonomy } from './ZTaxonomy'

export type ZTaxonomyItem = {
  id: number
  parentId: number | null
  name: string
  title: string
  taxonomy: ZTaxonomy
  children: ZTaxonomyItem[]
}

export const zTaxonomyItem: z.ZodType<ZTaxonomyItem> = z.lazy(() =>
  z.object({
    id: z.number(),
    parentId: z.number().nullable(),
    name: z.string(),
    title: z.string(),
    taxonomy: zTaxonomy,
    children: zTaxonomyItem.array(),
  })
)
