import { getBrowserClient } from "@/lib/database/supabase"
import { NodeHierarchyRule } from "../interfaces/repository.interfaces"

export class NodeHierarchyRepository {
  private readonly table = "node_hierarchy_rules"
  private readonly supabase = getBrowserClient()

  async findAll(): Promise<NodeHierarchyRule[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<NodeHierarchyRule | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  async findByParentId(parentId: string): Promise<NodeHierarchyRule[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("parent_node_id", parentId)
      .is("deleted_at", null)

    if (error) throw error
    return data || []
  }

  async findByChildId(childId: string): Promise<NodeHierarchyRule[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("child_node_id", childId)
      .is("deleted_at", null)

    if (error) throw error
    return data || []
  }

  async create(data: { parent_node_id: string, child_node_id: string }): Promise<NodeHierarchyRule> {
    const { data: rule, error } = await this.supabase
      .from(this.table)
      .insert({
        id: crypto.randomUUID(),
        ...data,
        is_active: true,
        metadata: {},
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return rule
  }

  async update(id: string, data: Partial<NodeHierarchyRule>): Promise<NodeHierarchyRule> {
    const { data: rule, error } = await this.supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return rule
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.table)
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw error
  }
} 