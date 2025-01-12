import { getBrowserClient } from '@/lib/database/supabase'
import { IUnitRepository, OrganizationalUnit, NewOrganizationalUnit } from '../interfaces'

export class UnitRepository implements IUnitRepository {
  async findAll(): Promise<OrganizationalUnit[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<OrganizationalUnit | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async findByClientId(clientId: string): Promise<OrganizationalUnit[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findActiveByClientId(clientId: string): Promise<OrganizationalUnit[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('client_id', clientId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

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
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) return null
    return data
  }

  async findActiveRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('*')
      .eq('client_id', clientId)
      .eq('type', 'ROOT')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) return null
    return data
  }

  async validateUnitType(unit: NewOrganizationalUnit): Promise<void> {
    // Se for ROOT, verificar se já existe
    if (unit.type === "ROOT") {
      const { data: existingRoot } = await getBrowserClient()
        .from('organizational_units')
        .select('*')
        .eq('client_id', unit.client_id)
        .eq('type', 'ROOT')
        .eq('is_active', true)
        .is('deleted_at', null)
        .maybeSingle()

      if (existingRoot) {
        throw new Error("Já existe uma unidade root para este cliente")
      }
    }
  }

  async create(unit: NewOrganizationalUnit): Promise<OrganizationalUnit> {
    const supabase = getBrowserClient()

    // Se for ROOT, depth = 0 e order_index = 0
    const depth = unit.type === 'ROOT' ? 0 : unit.depth || 1
    const order_index = unit.type === 'ROOT' ? 0 : await this.getNextOrderIndex(unit.client_id, unit.node_name_id)

    const { data, error } = await supabase
      .from('organizational_units')
      .insert({
        ...unit,
        id: crypto.randomUUID(),
        depth,
        order_index,
        is_active: true,
        deleted_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  private async getNextOrderIndex(clientId: string, nodeNameId: string): Promise<number> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .select('order_index')
      .eq('client_id', clientId)
      .eq('node_name_id', nodeNameId)
      .is('deleted_at', null)
      .order('order_index', { ascending: false })
      .limit(1)
      .single()

    if (error) return 0
    return (data?.order_index || 0) + 1
  }

  async update(id: string, unit: Partial<OrganizationalUnit>): Promise<OrganizationalUnit> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('organizational_units')
      .update({
        ...unit,
        updated_at: new Date().toISOString()
      })
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
      .update({
        is_active: false,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error
  }
} 