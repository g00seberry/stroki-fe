import { ZTreeNode } from '../../types/ZTreeNode'

export const findNode = (
  nodes: ZTreeNode[],
  key: string
): ZTreeNode | undefined => {
  for (const node of nodes) {
    if (node.key === key) return node
    if (node.children) {
      const res = findNode(node.children, key)
      if (res) return res
    }
  }
  return undefined
}
