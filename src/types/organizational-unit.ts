import { Database } from './supabase'

export type OrganizationalUnit = {
  id: string
  client_id: string
  node_name_id: string
  name: string
  type: 'ROOT' | 'CATEGORY' | 'OPTION'
  depth: number
  is_active: boolean
  metadata: Record<string, any> | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type NewOrganizationalUnit = Omit<OrganizationalUnit, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> 