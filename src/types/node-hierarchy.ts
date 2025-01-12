import { HierarchyValidationType } from '@/lib/core/interfaces'

export interface NodeHierarchy {
  id: string
  parent_node_id: string
  child_node_id: string
  is_required: boolean
  is_active: boolean
  metadata: Record<string, any> | null
  validationType: HierarchyValidationType
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type NewNodeHierarchy = Omit<NodeHierarchy, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> 