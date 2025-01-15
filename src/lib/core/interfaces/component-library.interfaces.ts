import type { Database } from '@/types/supabase'

export type ComponentType = Database['public']['Enums']['componentfieldtype']
export type ComponentCategory = Database['public']['Enums']['ComponentCategory']

export interface ComponentLibrary {
  id: string
  name: string
  description?: string | null
  type: ComponentType
  category: ComponentCategory
  version: string
  is_active: boolean
  is_latest_version: boolean
  config: Record<string, any>
  metadata?: Record<string, any> | null
  validation?: Record<string, any> | null
  default_label?: string | null
  is_required_by_default?: boolean | null
  is_unique_by_default?: boolean | null
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export type ComponentLibraryInsert = Omit<ComponentLibrary, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
export type ComponentLibraryUpdate = Partial<ComponentLibraryInsert> 