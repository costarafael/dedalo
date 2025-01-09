import { getBrowserClient } from '@/lib/database/supabase'
import { Entity, IClientRepository, ContextType } from '../interfaces'

export class ClientRepository implements IClientRepository {
  async findAll(): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('type', ContextType.CLIENT)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findActive(): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('type', ContextType.CLIENT)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<Entity | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('id', id)
      .eq('type', ContextType.CLIENT)
      .single()

    if (error) throw error
    return data
  }

  async create(data: Partial<Entity>): Promise<Entity> {
    const supabase = getBrowserClient()
    const { data: newClient, error } = await supabase
      .from('Entity')
      .insert({
        name: data.name,
        type: ContextType.CLIENT,
        metadata: data.metadata || {},
        parent_id: data.parent_id || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
        deleted_at: null
      })
      .select()
      .single()

    if (error) throw error
    return newClient
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity> {
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

  async delete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from('Entity')
      .update({ 
        is_active: false,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('type', ContextType.CLIENT)

    if (error) throw error
  }
} 