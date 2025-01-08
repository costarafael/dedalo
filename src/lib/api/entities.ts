import { getBrowserClient } from '@/lib/database/supabase'

export type Entity = {
  id: string
  name: string
  type: 'CLIENT' | 'PROVIDER'
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export async function getClientEntities(): Promise<Entity[]> {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('Entity')
    .select('*')
    .eq('type', 'CLIENT')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getProviderEntities(): Promise<Entity[]> {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('Entity')
    .select('*')
    .eq('type', 'PROVIDER')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
} 