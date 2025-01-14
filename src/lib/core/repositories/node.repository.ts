import { getBrowserClient } from "@/lib/database/supabase"
import { NodeName } from "../interfaces/repository.interfaces"

export class NodeRepository {
  private readonly table = "node_names"
  private readonly supabase = getBrowserClient()

  private mapToNodeName(data: any): NodeName {
    return {
      ...data,
      is_root: data.is_root ?? false,
      is_required: data.is_required ?? false,
      unit_count: data.unit_count ?? 0,
      order: data.order ?? 0,
      metadata: data.metadata ?? {},
      validationType: data.validationType ?? "FLEXIBLE",
      unit_selection_mode: data.unit_selection_mode ?? "single"
    }
  }

  async findByClientId(clientId: string): Promise<NodeName[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("client_id", clientId)
      .is("deleted_at", null)
      .order("order", { ascending: true })

    if (error) throw error
    return (data || []).map(this.mapToNodeName)
  }

  async findById(id: string): Promise<NodeName | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data ? this.mapToNodeName(data) : null
  }

  async findRootNode(clientId: string): Promise<NodeName | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("client_id", clientId)
      .eq("is_root", true)
      .is("deleted_at", null)
      .single()

    if (error) throw error
    return data ? this.mapToNodeName(data) : null
  }

  async create(data: { client_id: string; name: string; unit_selection_mode: "single" | "multiple" }): Promise<NodeName> {
    const { data: node, error } = await this.supabase
      .from(this.table)
      .insert({
        id: crypto.randomUUID(),
        ...data,
        description: null,
        is_required: false,
        unit_count: 0,
        validationType: "FLEXIBLE",
        metadata: {},
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return this.mapToNodeName(node)
  }

  async update(id: string, data: Partial<NodeName>): Promise<NodeName> {
    const { data: node, error } = await this.supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return this.mapToNodeName(node)
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