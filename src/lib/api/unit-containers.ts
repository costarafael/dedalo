import { getBrowserClient } from '@/lib/database/supabase'
import type { Database } from '@/types/supabase'

export type UnitContainer = Database['public']['Tables']['unit_containers']['Row'] & {
  items?: Array<UnitContainerItem & {
    unit: Database['public']['Tables']['organizational_units']['Row']
  }>
}
export type NewUnitContainer = Database['public']['Tables']['unit_containers']['Insert']
export type UnitContainerItem = Database['public']['Tables']['unit_container_items']['Row']
export type NewUnitContainerItem = Database['public']['Tables']['unit_container_items']['Insert']

export async function createUnitContainer(container: Partial<NewUnitContainer>, unitIds: string[]) {
  const supabase = getBrowserClient()
  try {
    // Inicia uma transação
    const { data: insertData, error: insertError } = await supabase
      .from('unit_containers')
      .insert({
        ...container,
        id: crypto.randomUUID(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })
      .select()
      .single()

    console.log('Insert container result:', { data: insertData, error: insertError })

    if (insertError) {
      console.error('Error inserting unit container:', insertError)
      throw insertError
    }

    // Cria os itens do container
    const items = unitIds.map(unitId => ({
      id: crypto.randomUUID(),
      container_id: insertData.id,
      unit_id: unitId,
      updated_at: new Date().toISOString(),
      deleted_at: null,
    }))

    const { error: itemsError } = await supabase
      .from('unit_container_items')
      .insert(items)

    console.log('Insert items result:', { error: itemsError })

    if (itemsError) {
      console.error('Error inserting unit container items:', itemsError)
      throw itemsError
    }

    return insertData
  } catch (error) {
    console.error("Erro na transação:", error)
    throw error
  }
}

export async function getUnitContainers(clientId: string) {
  const supabase = getBrowserClient()
  
  console.log('Fetching unit containers for client:', clientId)
  
  const { data, error } = await supabase
    .from('unit_containers')
    .select(`
      *,
      items:unit_container_items(
        *,
        unit:organizational_units(*)
      )
    `)
    .eq('client_id', clientId)
    .is('deleted_at', null)
    .order('name')

  console.log('Unit containers query:', supabase
    .from('unit_containers')
    .select(`
      *,
      items:unit_container_items(
        *,
        unit:organizational_units(*)
      )
    `)
    .eq('client_id', clientId)
    .is('deleted_at', null)
    .order('name').toString())

  console.log('Unit containers result:', { data, error })

  if (error) throw error
  return data
}

export async function updateUnitContainer(id: string, container: Partial<UnitContainer>) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('unit_containers')
    .update(container)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteUnitContainer(id: string) {
  const supabase = getBrowserClient()
  const { error } = await supabase
    .from('unit_containers')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export async function addUnitToContainer(containerId: string, unitId: string) {
  const supabase = getBrowserClient()
  const newItem: NewUnitContainerItem = {
    id: crypto.randomUUID(),
    container_id: containerId,
    unit_id: unitId,
    is_active: true,
    updated_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('unit_container_items')
    .insert(newItem)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeUnitFromContainer(containerId: string, unitId: string) {
  const supabase = getBrowserClient()
  const { error } = await supabase
    .from('unit_container_items')
    .delete()
    .eq('container_id', containerId)
    .eq('unit_id', unitId)

  if (error) throw error
} 