import { getBrowserClient } from '@/lib/database/supabase'
import { IUnitRepository, OrganizationalUnit, NewOrganizationalUnit } from '../interfaces'

export class UnitRepository implements IUnitRepository {
  async findAll(): Promise<OrganizationalUnit[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findByClientId(clientId: string): Promise<OrganizationalUnit[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('client_id', clientId)
      .eq('is_active', true)
      .is('deleted_at', null)

    if (error) throw error
    return data || []
  }

  async findRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('client_id', clientId)
      .eq('type', 'ROOT')
      .eq('is_active', true)
      .is('deleted_at', null)
      .single()

    if (error) return null
    return data
  }

  async findById(id: string): Promise<OrganizationalUnit | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .is('deleted_at', null)
      .single()

    if (error) return null
    return data
  }

  async create(unit: NewOrganizationalUnit): Promise<OrganizationalUnit> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .insert({
        ...unit,
        is_active: true,
        deleted_at: null
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async update(id: string, unit: Partial<OrganizationalUnit>): Promise<OrganizationalUnit> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .update(unit)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async delete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from('organizational_units')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  }
} 