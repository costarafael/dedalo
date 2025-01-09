import { getBrowserClient } from '@/lib/database/supabase'
import { ContextType } from '@/lib/core/interfaces'

export async function getClients() {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('Entity')
    .select('*')
    .eq('type', ContextType.CLIENT)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getClient(id: string) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('Entity')
    .select('*')
    .eq('id', id)
    .eq('type', ContextType.CLIENT)
    .is('deleted_at', null)
    .single()

  if (error) throw error
  return data
}

export async function createClient(data: any) {
  const supabase = getBrowserClient()
  
  const { data: newClient, error } = await supabase
    .from('Entity')
    .insert({
      name: data.name,
      type: ContextType.CLIENT,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null
    })
    .select()
    .single()

  if (error) throw error
  return newClient
}

export async function updateClient(id: string, data: any) {
  const supabase = getBrowserClient()
  const { data: updatedClient, error } = await supabase
    .from('Entity')
    .update({
      ...data,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('type', ContextType.CLIENT)
    .select()
    .single()

  if (error) throw error
  return updatedClient
}

export async function deleteClient(id: string) {
  const supabase = getBrowserClient()
  // Soft delete
  const { error } = await supabase
    .from('Entity')
    .update({ 
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('type', ContextType.CLIENT)

  if (error) throw error
} 