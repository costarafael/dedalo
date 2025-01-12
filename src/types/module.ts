import { Database } from './supabase'

export type Module = {
  id: string
  name: string
  version: number
  slug: string
  is_library: boolean
  is_active: boolean
  config: Record<string, any>
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export type NewModule = Omit<Module, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> 