import { getBrowserClient } from '@/lib/database/supabase'
import type { Database } from '@/types/supabase'

export type NodeHierarchyRule = Database['public']['Tables']['node_hierarchy_rules']['Row']
export type NewNodeHierarchyRule = Database['public']['Tables']['node_hierarchy_rules']['Insert']

export async function createNodeHierarchyRule(rule: NewNodeHierarchyRule) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('node_hierarchy_rules')
    .insert(rule)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getNodeHierarchyRules(clientId: string) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('node_hierarchy_rules')
    .select(`
      *,
      parent_node:node_names!node_hierarchy_rules_parent_node_id_fkey(*),
      child_node:node_names!node_hierarchy_rules_child_node_id_fkey(*)
    `)
    .is('deleted_at', null)
    .eq('is_active', true)

  if (error) throw error
  return data
}

export async function updateNodeHierarchyRule(id: string, rule: Partial<NodeHierarchyRule>) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('node_hierarchy_rules')
    .update(rule)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteNodeHierarchyRule(id: string) {
  const supabase = getBrowserClient()
  const { error } = await supabase
    .from('node_hierarchy_rules')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
} 