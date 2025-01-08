import { getBrowserClient } from '@/lib/database/supabase'
import type { Database } from '@/types/supabase'

export type OrganizationalUnit = Database['public']['Tables']['organizational_units']['Row']
export type NewOrganizationalUnit = Database['public']['Tables']['organizational_units']['Insert']

export async function getRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('organizational_units')
    .select('*')
    .eq('client_id', clientId)
    .eq('type', 'ROOT')
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('updated_at', { ascending: true })
    .limit(1)
    .single()

  if (error) {
    console.error("Erro ao buscar unidade root:", error)
    return null
  }

  return data
}

export async function createOrganizationalUnit(unit: NewOrganizationalUnit) {
  const supabase = getBrowserClient()
  
  // Se for ROOT, verificar se já existe
  if (unit.type === "ROOT") {
    const { data: existingRoot } = await supabase
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

  // Para OPTION e CATEGORY, permitir múltiplas unidades
  const { data, error } = await supabase
    .from('organizational_units')
    .insert({
      id: unit.id,
      client_id: unit.client_id,
      name: unit.name,
      node_name_id: unit.node_name_id,
      type: unit.type as 'ROOT' | 'CATEGORY' | 'OPTION',
      updated_at: unit.updated_at,
      is_active: unit.is_active,
      deleted_at: null
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getOrganizationalUnits(clientId: string): Promise<OrganizationalUnit[]> {
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

export async function updateOrganizationalUnit(id: string, unit: Partial<OrganizationalUnit>) {
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

export async function deleteOrganizationalUnit(id: string) {
  const supabase = getBrowserClient()
  const { error } = await supabase
    .from('organizational_units')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}