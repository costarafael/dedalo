import { getBrowserClient } from '@/lib/database/supabase'
import { Entity, IEntityRepository, ContextType } from '../interfaces'

export class EntityRepository implements IEntityRepository {
  async findAll(): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
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
      .single()

    if (error) throw error
    return data
  }

  async findByType(type: ContextType): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findActiveByType(type: ContextType): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('type', type)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async create(data: Partial<Entity>): Promise<Entity> {
    const supabase = getBrowserClient()
    const { data: newEntity, error } = await supabase
      .from('Entity')
      .insert({
        name: data.name,
        type: data.type,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      })
      .select()
      .single()

    if (error) throw error
    return newEntity
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity> {
    const supabase = getBrowserClient()
    const { data: updatedEntity, error } = await supabase
      .from('Entity')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return updatedEntity
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

    if (error) throw error
  }
} 