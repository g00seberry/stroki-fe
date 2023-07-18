import { z } from 'zod'

export type ZTreeNode = {
  id: number
  key: string
  parentId: number | null
  name: string
  title: string
  children: ZTreeNode[]
}

export const zTreeNode: z.ZodType<ZTreeNode> = z.lazy(() =>
  z.object({
    id: z.number(),
    key: z.string(),
    parentId: z.number().nullable(),
    name: z.string(),
    title: z.string(),
    children: zTreeNode.array(),
  })
)
