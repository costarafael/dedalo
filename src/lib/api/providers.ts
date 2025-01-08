import { getBrowserClient } from "@/lib/database/supabase"
import { Provider, CreateProviderDTO } from "@/types/provider"
import { Database } from "@/types/supabase"

type Tables = Database["public"]["Tables"]
type EntityInsert = Tables["Entity"]["Insert"]

export async function getProviders(): Promise<Provider[]> {
  const { data, error } = await getBrowserClient()
    .from("Entity")
    .select(`*`)
    .eq("type", "PROVIDER")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as unknown as Provider[]
}

export async function getProvidersByClient(clientId: string): Promise<Provider[]> {
  const { data, error } = await getBrowserClient()
    .from("Entity")
    .select(`*`)
    .eq("type", "PROVIDER")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as unknown as Provider[]
}

export async function getProviderChildren(providerId: string): Promise<Provider[]> {
  const { data, error } = await getBrowserClient()
    .from("Entity")
    .select(`*`)
    .eq("type", "PROVIDER")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as unknown as Provider[]
}

export async function getProvider(id: string): Promise<Provider> {
  const { data, error } = await getBrowserClient()
    .from("Entity")
    .select(`*`)
    .eq("id", id)
    .eq("type", "PROVIDER")
    .single()

  if (error) throw error
  return data as unknown as Provider
}

export async function createProvider(provider: CreateProviderDTO): Promise<Provider> {
  const supabase = getBrowserClient()
  const now = new Date().toISOString()

  try {
    // Cria o provider na tabela Entity
    const entityInsert: EntityInsert = {
      name: provider.name,
      type: "PROVIDER",
      created_at: now,
      updated_at: now
    }

    const { data: entityData, error: entityError } = await supabase
      .from("Entity")
      .insert(entityInsert)
      .select()
      .single()

    if (entityError) throw entityError
    return entityData as unknown as Provider
  } catch (error) {
    console.error("Erro ao criar provider:", error)
    throw error
  }
}

export async function updateProvider(id: string, provider: Partial<CreateProviderDTO>): Promise<Provider> {
  const supabase = getBrowserClient()
  const now = new Date().toISOString()

  // Atualiza os dados básicos do provider
  const { data: entityData, error: entityError } = await supabase
    .from("Entity")
    .update({
      name: provider.name,
      updated_at: now
    })
    .eq("id", id)
    .eq("type", "PROVIDER")
    .select()
    .single()

  if (entityError) throw entityError
  return entityData as unknown as Provider
}

export async function deleteProvider(id: string): Promise<void> {
  const supabase = getBrowserClient()
  const now = new Date().toISOString()

  const { error } = await supabase
    .from("Entity")
    .update({
      deleted_at: now
    })
    .eq("id", id)
    .eq("type", "PROVIDER")

  if (error) throw error
} 