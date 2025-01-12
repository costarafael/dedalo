import { getBrowserClient } from '@/lib/database/supabase'
import { UnitContainer, NewUnitContainer, UnitContainerItem, NewUnitContainerItem } from '@/types/unit-container'
import { IUnitContainerRepository } from '../interfaces/repository.interfaces'

export class UnitContainerRepository implements IUnitContainerRepository {
  private readonly table = 'unit_containers'
  private readonly itemsTable = 'unit_container_items'

  async findAll(): Promise<UnitContainer[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('name')

    if (error) throw error
    return data
  }

  async findById(id: string): Promise<UnitContainer | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async findByClientId(clientId: string): Promise<UnitContainer[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('name')

    if (error) throw error
    return data
  }

  async findWithItems(clientId: string): Promise<UnitContainer[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select(`
        *,
        items:${this.itemsTable}(
          *,
          unit:organizational_units(*)
        )
      `)
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('name')

    if (error) throw error
    return data
  }

  async create(data: NewUnitContainer): Promise<UnitContainer> {
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

  async update(id: string, data: Partial<UnitContainer>): Promise<UnitContainer> {
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

  async addItem(item: NewUnitContainerItem): Promise<UnitContainerItem> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.itemsTable)
      .insert({
        ...item,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async removeItem(containerId: string, unitId: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from(this.itemsTable)
      .delete()
      .eq('container_id', containerId)
      .eq('unit_id', unitId)

    if (error) throw error
  }
} 