import { getBrowserClient } from '@/lib/database/supabase'
import { Entity, IProviderRepository, ContextType } from '../interfaces'

export class ProviderRepository implements IProviderRepository {
  async findAll(): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('type', ContextType.PROVIDER)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findActive(): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('type', ContextType.PROVIDER)
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
      .eq('type', ContextType.PROVIDER)
      .single()

    if (error) throw error
    return data
  }

  async findByClient(clientId: string): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('provider_hierarchies')
      .select(`
        provider:Entity!provider_hierarchies_provider_id_fkey (
          id,
          name,
          type,
          created_at,
          updated_at,
          deleted_at
        )
      `)
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data?.map(item => item.provider) || []
  }

  async findChildren(providerId: string): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select(`
        *,
        provider_hierarchies!provider_hierarchies_provider_id_fkey(
          client_id,
          parent_provider_id,
          root_provider_id
        )
      `)
      .eq('type', ContextType.PROVIDER)
      .eq('provider_hierarchies.parent_provider_id', providerId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async create(data: Partial<Entity>): Promise<Entity> {
    const supabase = getBrowserClient()
    const { data: newProvider, error } = await supabase
      .from('Entity')
      .insert({
        name: data.name,
        type: ContextType.PROVIDER,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      })
      .select()
      .single()

    if (error) throw error
    return newProvider
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity> {
    const supabase = getBrowserClient()
    const { data: updatedProvider, error } = await supabase
      .from('Entity')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('type', ContextType.PROVIDER)
      .select()
      .single()

    if (error) throw error
    return updatedProvider
  }

  async delete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from('Entity')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('type', ContextType.PROVIDER)

    if (error) throw error
  }
} 