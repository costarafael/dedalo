import { getSupabaseClient } from "@/lib/supabase"
import { Provider, CreateProviderDTO } from "@/types/provider"
import { Database } from "@/types/supabase"

type Tables = Database["public"]["Tables"]
type EntityInsert = Tables["Entity"]["Insert"]
type ProviderHierarchyInsert = Tables["provider_hierarchies"]["Insert"]

export async function getProviders(): Promise<Provider[]> {
  const { data, error } = await getSupabaseClient()
    .from("Entity")
    .select(`
      *,
      provider_hierarchies!provider_hierarchies_provider_id_fkey (
        client_id,
        parent_provider_id,
        root_provider_id,
        client:client_id (
          id,
          name
        )
      )
    `)
    .eq("type", "PROVIDER")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as unknown as Provider[]
}

export async function getProvidersByClient(clientId: string): Promise<Provider[]> {
  const { data, error } = await getSupabaseClient()
    .from("Entity")
    .select(`
      *,
      provider_hierarchies!provider_hierarchies_provider_id_fkey!inner (
        client_id,
        parent_provider_id,
        root_provider_id,
        client:client_id (
          id,
          name
        )
      )
    `)
    .eq("type", "PROVIDER")
    .eq("provider_hierarchies.client_id", clientId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as unknown as Provider[]
}

export async function getProviderChildren(providerId: string): Promise<Provider[]> {
  const { data, error } = await getSupabaseClient()
    .from("Entity")
    .select(`
      *,
      provider_hierarchies!provider_hierarchies_provider_id_fkey (
        client_id,
        parent_provider_id,
        root_provider_id,
        client:client_id (
          id,
          name
        )
      )
    `)
    .eq("type", "PROVIDER")
    .eq("provider_hierarchies.parent_provider_id", providerId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as unknown as Provider[]
}

export async function getProvider(id: string): Promise<Provider> {
  const { data, error } = await getSupabaseClient()
    .from("Entity")
    .select(`
      *,
      provider_hierarchies!provider_hierarchies_provider_id_fkey (
        client_id,
        parent_provider_id,
        root_provider_id,
        client:client_id (
          id,
          name
        )
      )
    `)
    .eq("id", id)
    .eq("type", "PROVIDER")
    .single()

  if (error) throw error
  return data as unknown as Provider
}

export async function createProvider(provider: CreateProviderDTO): Promise<Provider> {
  const supabase = getSupabaseClient()
  const now = new Date().toISOString()

  try {
    // Primeiro, gera o ID usando a função do banco
    const { data: generatedId, error: idError } = await supabase
      .rpc('generate_entity_id', {
        name: provider.name,
        entity_type: 'PROVIDER'
      })

    if (idError) throw idError

    // Cria o provider na tabela Entity
    const entityInsert: EntityInsert = {
      id: generatedId,
      name: provider.name,
      type: "PROVIDER",
      created_at: now,
      updated_at: now
    }

    const { data: entityData, error: entityError } = await supabase
      .from("Entity")
      .insert(entityInsert)
      .select(`
        *,
        provider_hierarchies!provider_hierarchies_provider_id_fkey (
          client_id,
          parent_provider_id,
          root_provider_id,
          client:client_id (
            id,
            name
          )
        )
      `)
      .single()

    if (entityError) throw entityError

    // Se tiver client_id ou parent_provider_id, cria a hierarquia
    if (provider.client_id || provider.parent_provider_id) {
      const hierarchyId = crypto.randomUUID()

      // Se tiver parent_provider_id, não envia client_id pois herda do pai
      const hierarchyData: Partial<ProviderHierarchyInsert> = {
        id: hierarchyId,
        provider_id: entityData.id,
        parent_provider_id: provider.parent_provider_id || undefined,
        root_provider_id: provider.parent_provider_id ? undefined : entityData.id,
        is_active: true,
        version: 1,
        created_at: now,
        updated_at: now,
        hierarchy_path: null,
        level: 1,
        metadata: null
      }

      // Só adiciona client_id se não tiver parent_provider_id
      if (!provider.parent_provider_id && provider.client_id) {
        hierarchyData.client_id = provider.client_id
      }

      const { error: hierarchyError } = await supabase
        .from("provider_hierarchies")
        .insert(hierarchyData as ProviderHierarchyInsert)

      if (hierarchyError) {
        // Se falhar ao criar a hierarquia, remove a entidade criada
        await supabase
          .from("Entity")
          .delete()
          .eq("id", entityData.id)

        throw hierarchyError
      }

      // Busca o provider atualizado com a hierarquia
      const { data: updatedData, error: getError } = await supabase
        .from("Entity")
        .select(`
          *,
          provider_hierarchies!provider_hierarchies_provider_id_fkey (
            client_id,
            parent_provider_id,
            root_provider_id,
            client:client_id (
              id,
              name
            )
          )
        `)
        .eq("id", entityData.id)
        .single()

      if (getError) throw getError
      return updatedData as unknown as Provider
    }

    return entityData as unknown as Provider
  } catch (error) {
    console.error("Erro ao criar provider:", error)
    throw error
  }
}

export async function updateProvider(id: string, provider: Partial<CreateProviderDTO>): Promise<Provider> {
  const supabase = getSupabaseClient()
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
    .select(`
      *,
      provider_hierarchies!provider_hierarchies_provider_id_fkey (
        client_id,
        parent_provider_id,
        root_provider_id,
        client:client_id (
          id,
          name
        )
      )
    `)
    .single()

  if (entityError) throw entityError

  // Se tiver alterações na hierarquia
  if (provider.client_id || provider.parent_provider_id) {
    const { error: hierarchyError } = await supabase
      .from("provider_hierarchies")
      .update({
        client_id: provider.client_id || undefined,
        parent_provider_id: provider.parent_provider_id || undefined,
        root_provider_id: provider.parent_provider_id ? undefined : id,
        updated_at: now
      })
      .eq("provider_id", id)

    if (hierarchyError) throw hierarchyError
  }

  return entityData as unknown as Provider
}

export async function deleteProvider(id: string): Promise<void> {
  const supabase = getSupabaseClient()

  // Remove primeiro as hierarquias
  await supabase
    .from("provider_hierarchies")
    .delete()
    .eq("provider_id", id)

  // Depois remove a entidade
  const { error } = await supabase
    .from("Entity")
    .delete()
    .eq("id", id)
    .eq("type", "PROVIDER")

  if (error) throw error
} 