import { getBrowserClient } from "@/lib/database/supabase"
import { OrganizationalUnitRow, OrganizationalUnitInsert, OrganizationalUnitUpdate } from "../interfaces/repository.interfaces"

export class UnitRepository {
  private readonly table = "organizational_units"
  private readonly supabase = getBrowserClient()

  async findByClientId(clientId: string): Promise<OrganizationalUnitRow[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("client_id", clientId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<OrganizationalUnitRow | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  async findRootUnit(clientId: string): Promise<OrganizationalUnitRow | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("client_id", clientId)
      .is("node_name_id", null)
      .is("deleted_at", null)
      .single()

    if (error) throw error
    return data
  }

  async create(data: OrganizationalUnitInsert): Promise<OrganizationalUnitRow> {
    const { id, ...rest } = data
    const { data: unit, error } = await this.supabase
      .from(this.table)
      .insert({
        id: crypto.randomUUID(),
        ...rest,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return unit
  }

  async update(id: string, data: OrganizationalUnitUpdate): Promise<OrganizationalUnitRow> {
    const { data: unit, error } = await this.supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return unit
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