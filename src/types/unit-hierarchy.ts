import { Database } from './supabase'

export type UnitHierarchy = {
  id: string
  parent_id: string
  child_id: string
  is_primary: boolean
  is_active: boolean
  path_from_root: string
  depth: number
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export type NewUnitHierarchy = Omit<UnitHierarchy, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'path_from_root' | 'depth'> 