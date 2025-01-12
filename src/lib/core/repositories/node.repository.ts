import { getBrowserClient } from '@/lib/database/supabase'
import { INodeRepository, NodeName, NewNodeName, HierarchyValidationType } from '../interfaces'

export class NodeRepository implements INodeRepository {
  async findAll(): Promise<NodeName[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('node_names')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<NodeName | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('node_names')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async findByClientId(clientId: string): Promise<NodeName[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('node_names')
      .select('*')
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('order')

    if (error) throw error
    return data || []
  }

  async findActiveByClientId(clientId: string): Promise<NodeName[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('node_names')
      .select('*')
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('order')

    if (error) throw error
    return data || []
  }

  async create(node: NewNodeName): Promise<NodeName> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from('node_names')
      .insert({
        client_id: node.client_id,
        name: node.name,
        description: node.description,
        metadata: node.metadata,
        order: node.order,
        is_root: node.is_root,
        is_required: node.is_required,
        validationType: node.validationType || HierarchyValidationType.FLEXIBLE,
        unit_selection_mode: node.unit_selection_mode,
        id: crypto.randomUUID(),
        unit_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async update(id: string, node: Partial<NodeName>): Promise<NodeName> {
    if ('is_root' in node) {
      delete node.is_root
    }

    const existing = await this.findById(id)
    if (existing?.is_root && 'order' in node) {
      delete node.order
    }

    const supabase = getBrowserClient()
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

  async updateOrder(nodes: Pick<NodeName, 'id' | 'client_id' | 'name' | 'order' | 'is_root'>[]): Promise<void> {
    const supabase = getBrowserClient()
    const updates = nodes.map(node => ({
      id: node.id,
      client_id: node.client_id,
      name: node.name,
      order: node.is_root ? 0 : node.order,
      updated_at: new Date().toISOString()
    }))

    const { error } = await supabase
      .from('node_names')
      .upsert(updates)

    if (error) throw error
  }

  async delete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from('node_names')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error
  }
} 