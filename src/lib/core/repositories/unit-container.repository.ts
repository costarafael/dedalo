import { getBrowserClient } from "@/lib/database/supabase"
import { OrganizationalUnit, UnitContainer, UnitContainerItem } from "../interfaces/repository.interfaces"

export class UnitContainerRepository {
  private readonly table = "unit_containers"
  private readonly itemsTable = "unit_container_items"
  private readonly supabase = getBrowserClient()

  async findByClientId(clientId: string): Promise<UnitContainer[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("client_id", clientId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<UnitContainer | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  async create(data: { client_id: string; name: string; node_name_id: string }): Promise<UnitContainer> {
    const { data: container, error } = await this.supabase
      .from(this.table)
      .insert({
        id: crypto.randomUUID(),
        ...data,
        container_key: data.name.toLowerCase().replace(/\s+/g, "-"),
        is_active: true,
        item_count: 0,
        metadata: {},
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return container
  }

  async update(id: string, data: Partial<UnitContainer>): Promise<UnitContainer> {
    const { data: container, error } = await this.supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return container
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

  async addUnit(containerId: string, unitId: string): Promise<UnitContainerItem> {
    const { data: item, error } = await this.supabase
      .from(this.itemsTable)
      .insert({
        id: crypto.randomUUID(),
        container_id: containerId,
        unit_id: unitId,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return item
  }

  async removeUnit(containerId: string, unitId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.itemsTable)
      .delete()
      .eq("container_id", containerId)
      .eq("unit_id", unitId)

    if (error) throw error
  }

  async getUnits(containerId: string): Promise<OrganizationalUnit[]> {
    const { data, error } = await this.supabase
      .from(this.itemsTable)
      .select(`
        unit:unit_id (*)
      `)
      .eq("container_id", containerId)
      .is("deleted_at", null)

    if (error) throw error
    return (data || []).map(item => item.unit)
  }
} 