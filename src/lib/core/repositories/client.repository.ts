import { SupabaseClient } from "@supabase/supabase-js"
import { supabase } from "@/lib/database/supabase"
import { Client, CONTEXT_TYPES } from "@/lib/core/interfaces/repository.interfaces"

export class ClientRepository {
  private supabase: SupabaseClient
  private table = "entity"

  constructor() {
    this.supabase = supabase
  }

  private transformClient(data: any): Client {
    return {
      id: data.id,
      name: data.name,
      status: data.status,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data.updated_at,
      version: data.version || 1,
    }
  }

  async findAll(): Promise<Client[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("type", CONTEXT_TYPES.CLIENT)
      .is("deleted_at", null)
      .order("name")

    if (error) throw error
    return (data || []).map(this.transformClient)
  }

  async findById(id: string): Promise<Client | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .eq("type", CONTEXT_TYPES.CLIENT)
      .is("deleted_at", null)
      .single()

    if (error) throw error
    return data ? this.transformClient(data) : null
  }

  async create(data: { name: string }): Promise<Client> {
    const now = new Date().toISOString()

    const { data: client, error } = await this.supabase
      .from(this.table)
      .insert({
        id: crypto.randomUUID(),
        name: data.name,
        type: CONTEXT_TYPES.CLIENT,
        status: "RUNNING",
        is_active: true,
        created_at: now,
        updated_at: now,
        version: 1,
      })
      .select()
      .single()

    if (error) throw error
    return this.transformClient(client)
  }

  async update(id: string, data: Partial<Client>): Promise<Client> {
    const { data: client, error } = await this.supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("type", CONTEXT_TYPES.CLIENT)
      .select()
      .single()

    if (error) throw error
    return this.transformClient(client)
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.table)
      .update({
        deleted_at: new Date().toISOString(),
        is_active: false,
      })
      .eq("id", id)
      .eq("type", CONTEXT_TYPES.CLIENT)

    if (error) throw error
  }
} 