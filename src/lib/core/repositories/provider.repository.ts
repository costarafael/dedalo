import { SupabaseClient } from "@supabase/supabase-js"
import { supabase } from "@/lib/database/supabase"
import { Provider, ProviderHierarchyRow, CONTEXT_TYPES } from "@/lib/core/interfaces/repository.interfaces"

export class ProviderRepository {
  private supabase: SupabaseClient
  private table = "entity"
  private hierarchyTable = "provider_hierarchies"

  constructor() {
    this.supabase = supabase
  }

  private transformProvider(data: any): Provider {
    return {
      id: data.id,
      name: data.name,
      status: data.status,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  async findAll(): Promise<Provider[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("type", CONTEXT_TYPES.PROVIDER)
      .is("deleted_at", null)
      .order("name")

    if (error) throw error
    return (data || []).map(this.transformProvider)
  }

  async findByClient(clientId: string): Promise<Provider[]> {
    const { data, error } = await this.supabase
      .from(this.hierarchyTable)
      .select(`
        provider:entity!provider_hierarchies_provider_id_fkey(*)
      `)
      .eq("client_id", clientId)
      .eq("provider.type", CONTEXT_TYPES.PROVIDER)
      .is("provider.deleted_at", null)
      .order("created_at")

    if (error) throw error
    return (data?.map((row: any) => this.transformProvider(row.provider)) || [])
  }

  async findById(id: string): Promise<Provider | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .eq("type", CONTEXT_TYPES.PROVIDER)
      .is("deleted_at", null)
      .single()

    if (error) throw error
    return data ? this.transformProvider(data) : null
  }

  async create(data: { name: string }): Promise<Provider> {
    const now = new Date().toISOString()

    const { data: provider, error } = await this.supabase
      .from(this.table)
      .insert({
        id: crypto.randomUUID(),
        name: data.name,
        type: CONTEXT_TYPES.PROVIDER,
        status: "RUNNING",
        is_active: true,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) throw error
    return this.transformProvider(provider)
  }

  async addToHierarchy(data: { provider_id: string; client_id?: string; parent_provider_id?: string }): Promise<ProviderHierarchyRow> {
    const now = new Date().toISOString()

    // Se não tiver client_id nem parent_provider_id, lança erro
    if (!data.client_id && !data.parent_provider_id) {
      throw new Error("Provider must be linked to a client or another provider")
    }

    // Se tiver parent_provider_id, busca a hierarquia do provider pai para pegar o client_id
    let clientId = data.client_id
    let rootProviderId = data.provider_id
    let level = 1

    if (data.parent_provider_id) {
      const { data: parentHierarchy, error: parentError } = await this.supabase
        .from(this.hierarchyTable)
        .select("*")
        .eq("provider_id", data.parent_provider_id)
        .single()

      if (parentError) throw parentError
      if (!parentHierarchy) throw new Error("Parent provider hierarchy not found")

      clientId = parentHierarchy.client_id
      rootProviderId = parentHierarchy.root_provider_id
      level = (parentHierarchy.level || 1) + 1
    }

    const { data: hierarchy, error } = await this.supabase
      .from(this.hierarchyTable)
      .insert({
        id: crypto.randomUUID(),
        provider_id: data.provider_id,
        client_id: data.parent_provider_id ? null : clientId, // Se tiver parent_provider_id, não envia client_id
        parent_provider_id: data.parent_provider_id,
        root_provider_id: rootProviderId,
        is_active: true,
        level,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) throw error
    return hierarchy
  }

  async update(id: string, data: Partial<Provider>): Promise<Provider> {
    const { data: provider, error } = await this.supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("type", CONTEXT_TYPES.PROVIDER)
      .select()
      .single()

    if (error) throw error
    return this.transformProvider(provider)
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.table)
      .update({
        deleted_at: new Date().toISOString(),
        is_active: false,
      })
      .eq("id", id)
      .eq("type", CONTEXT_TYPES.PROVIDER)

    if (error) throw error
  }
} 