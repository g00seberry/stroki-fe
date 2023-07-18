import { ZTreeNode } from '../../types/ZTreeNode'

export const filterWithoutOptionTree = (
  options: ZTreeNode[],
  id: ZTreeNode['id']
): ZTreeNode[] =>
  options
    ?.filter((opt) => opt.id !== id)
    .map((opt) => ({
      ...opt,
      children: filterWithoutOptionTree(opt.children || [], id),
    }))
