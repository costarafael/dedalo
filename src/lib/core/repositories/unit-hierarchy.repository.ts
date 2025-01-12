import { getBrowserClient } from '@/lib/database/supabase'
import { UnitHierarchy, NewUnitHierarchy } from '@/types/unit-hierarchy'
import { IUnitHierarchyRepository } from '../interfaces/repository.interfaces'

export class UnitHierarchyRepository implements IUnitHierarchyRepository {
  private readonly table = 'unit_hierarchies'

  async findAll(): Promise<UnitHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findById(id: string): Promise<UnitHierarchy | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async findByChildId(childId: string): Promise<UnitHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('child_id', childId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findPrimaryByChildId(childId: string): Promise<UnitHierarchy | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('child_id', childId)
      .eq('is_primary', true)
      .eq('is_active', true)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data
  }

  async findActiveByClientId(clientId: string): Promise<UnitHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findWithRelations(): Promise<UnitHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select(`
        *,
        parent:organizational_units!parent_id(*),
        child:organizational_units!child_id(*)
      `)
      .eq('is_active', true)
      .is('deleted_at', null)

    if (error) throw error
    return data
  }

  async create(data: NewUnitHierarchy): Promise<UnitHierarchy> {
    const supabase = getBrowserClient()
    const { data: created, error } = await supabase
      .from(this.table)
      .insert({
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      })
      .select()
      .single()

    if (error) throw error
    return created
  }

  async update(id: string, data: Partial<UnitHierarchy>): Promise<UnitHierarchy> {
    const supabase = getBrowserClient()
    const { data: updated, error } = await supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return updated
  }

  async delete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async softDelete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from(this.table)
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error
  }

  async deactivatePrimaryHierarchies(childId: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from(this.table)
      .update({ is_primary: false })
      .eq('child_id', childId)
      .eq('is_primary', true)
      .eq('is_active', true)
      .is('deleted_at', null)

    if (error) throw error
  }
} 