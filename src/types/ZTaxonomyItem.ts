import { z } from 'zod'
import { ZTaxonomy, zTaxonomy } from './ZTaxonomy'
import { ZTreeNode } from './ZTreeNode'

export type ZTaxonomyItem = Omit<ZTreeNode, 'key' | 'children'> & {
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
