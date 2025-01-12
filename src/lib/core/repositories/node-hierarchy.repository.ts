import { getBrowserClient } from '@/lib/database/supabase'
import { NodeHierarchy, NewNodeHierarchy } from '@/types/node-hierarchy'
import { INodeHierarchyRepository } from '../interfaces/repository.interfaces'

export class NodeHierarchyRepository implements INodeHierarchyRepository {
  private readonly table = 'node_hierarchy_rules'

  async findAll(): Promise<NodeHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findById(id: string): Promise<NodeHierarchy | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async findByClientId(clientId: string): Promise<NodeHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findActiveByClientId(clientId: string): Promise<NodeHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findByParentNodeId(parentNodeId: string): Promise<NodeHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('parent_node_id', parentNodeId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findByChildNodeId(childNodeId: string): Promise<NodeHierarchy[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('child_node_id', childNodeId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findByNodeIds(parentNodeId: string, childNodeId: string): Promise<NodeHierarchy | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('parent_node_id', parentNodeId)
      .eq('child_node_id', childNodeId)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data
  }

  async create(data: NewNodeHierarchy): Promise<NodeHierarchy> {
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

  async update(id: string, data: Partial<NodeHierarchy>): Promise<NodeHierarchy> {
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
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error
  }
} 