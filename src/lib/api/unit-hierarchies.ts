import { getBrowserClient } from '@/lib/database/supabase'
import type { Database } from '@/types/supabase'

export type UnitHierarchy = Database['public']['Tables']['unit_hierarchies']['Row']
export type NewUnitHierarchy = Database['public']['Tables']['unit_hierarchies']['Insert']

export async function createUnitHierarchy(hierarchy: NewUnitHierarchy) {
  const supabase = getBrowserClient()
  
  // Se for uma hierarquia primária, desativar outras hierarquias primárias
  if (hierarchy.is_primary) {
    const { data: existingPrimaryHierarchies } = await supabase
      .from('unit_hierarchies')
      .select('*')
      .eq('child_id', hierarchy.child_id)
      .eq('is_primary', true)
      .eq('is_active', true)
      .is('deleted_at', null)

    if (existingPrimaryHierarchies?.length) {
      await supabase
        .from('unit_hierarchies')
        .update({ is_primary: false })
        .in('id', existingPrimaryHierarchies.map(h => h.id))
    }
  }

  // Buscar o path_from_root do pai
  const { data: parentHierarchy } = await supabase
    .from('unit_hierarchies')
    .select('path_from_root, depth')
    .eq('child_id', hierarchy.parent_id)
    .eq('is_primary', true)
    .eq('is_active', true)
    .is('deleted_at', null)
    .maybeSingle()

  // Criar a nova hierarquia
  const { data, error } = await supabase
    .from('unit_hierarchies')
    .insert({
      ...hierarchy,
      path_from_root: parentHierarchy 
        ? `${parentHierarchy.path_from_root}/${hierarchy.parent_id}/${hierarchy.child_id}`
        : `/${hierarchy.parent_id}/${hierarchy.child_id}`,
      depth: parentHierarchy ? parentHierarchy.depth + 1 : 1,
      is_active: true,
      deleted_at: null
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUnitHierarchies(clientId: string): Promise<UnitHierarchy[]> {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('unit_hierarchies')
    .select(`
      *,
      parent:organizational_units!parent_id(*),
      child:organizational_units!child_id(*)
    `)
    .eq('is_active', true)
    .is('deleted_at', null)

  if (error) throw error
  return data || []
}

export async function updateUnitHierarchy(id: string, hierarchy: Partial<UnitHierarchy>) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('unit_hierarchies')
    .update(hierarchy)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteUnitHierarchy(id: string) {
  const supabase = getBrowserClient()
  const { error } = await supabase
    .from('unit_hierarchies')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
} 