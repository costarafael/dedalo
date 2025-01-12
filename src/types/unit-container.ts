import { Database } from './supabase'
import { OrganizationalUnit } from './organizational-unit'

export type UnitContainerItem = {
  id: string
  container_id: string
  unit_id: string
  is_active: boolean
  created_at: string
  updated_at: string | null
  deleted_at: string | null
  unit?: OrganizationalUnit
}

export type NewUnitContainerItem = Omit<UnitContainerItem, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'unit'>

export type UnitContainer = {
  id: string
  client_id: string
  name: string
  container_key: string
  selection_mode: 'SINGLE' | 'MULTIPLE' | 'HIERARCHICAL' | 'CUSTOM'
  is_active: boolean
  created_at: string
  updated_at: string | null
  deleted_at: string | null
  items?: UnitContainerItem[]
}

export type NewUnitContainer = Omit<UnitContainer, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'items'> 