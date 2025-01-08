import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

const supabase = createClientComponentClient<Database>()

export type NodeName = Database['public']['Tables']['node_names']['Row']
export type NewNodeName = Database['public']['Tables']['node_names']['Insert']

export async function createNodeName(node: Partial<NewNodeName> & { client_id: string, name: string }) {
  const { data, error } = await supabase
    .from('node_names')
    .insert({
      client_id: node.client_id,
      name: node.name,
      description: node.description,
      metadata: node.metadata,
      id: crypto.randomUUID(),
      order: 0,
      updated_at: new Date().toISOString(),
      deleted_at: null,
      is_required: false,
      validationType: "FLEXIBLE",
      unit_selection_mode: node.unit_selection_mode
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getNodeNames(clientId: string): Promise<NodeName[]> {
  const { data, error } = await supabase
    .from('node_names')
    .select('*')
    .eq('client_id', clientId)
    .is('deleted_at', null)
    .order('order')

  if (error) throw error
  return data || []
}

export async function updateNodeOrder(nodes: NodeName[]) {
  const updates = nodes.map((node, index) => ({
    id: node.id,
    client_id: node.client_id,
    name: node.name,
    order: node.is_root ? 0 : index + 1,
    updated_at: new Date().toISOString()
  }))

  const { error } = await supabase
    .from('node_names')
    .upsert(updates)

  if (error) throw error
}

export async function updateNodeName(id: string, node: Partial<NodeName>) {
  const { data, error } = await supabase
    .from('node_names')
    .update({
      ...node,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteNodeName(id: string) {
  const { error } = await supabase
    .from('node_names')
    .update({
      deleted_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) throw error
} 