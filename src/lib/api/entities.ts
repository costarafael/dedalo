import { createServerClient } from "@/lib/supabase-server"

export type Entity = {
  id: string
  name: string
  type: "ADMIN" | "AGENCY" | "CLIENT" | "PROVIDER" | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type NewEntity = {
  name: string
  type: "CLIENT" | "PROVIDER"
}

export async function getEntities() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("Entity")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching entities:", error)
    return []
  }

  return data as Entity[]
}

export async function getClientEntities() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("Entity")
    .select("*")
    .eq("type", "CLIENT")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching client entities:", error)
    return []
  }

  return data as Entity[]
}

export async function getProviderEntities() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("Entity")
    .select("*")
    .eq("type", "PROVIDER")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching provider entities:", error)
    return []
  }

  return data as Entity[]
}

export async function createEntity(entity: NewEntity) {
  const supabase = createServerClient()

  const id = `${entity.type === "CLIENT" ? "C" : "P"}${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  const { data, error } = await supabase
    .from("Entity")
    .insert({
      id,
      name: entity.name,
      type: entity.type,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating entity:", error)
    throw error
  }

  return data as Entity
} 