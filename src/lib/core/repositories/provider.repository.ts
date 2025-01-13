import { supabase } from '@/lib/database/supabase'
import { IProviderRepository, Provider, CreateProviderDTO, ProviderHierarchyRow, TABLES, CONTEXT_TYPES } from '../interfaces/repository.interfaces'

export class ProviderRepository implements IProviderRepository {
  async findAll(): Promise<Provider[]> {
    const { data, error } = await supabase
      .from(TABLES.ENTITY)
      .select(`
        *,
        provider_hierarchies:${TABLES.PROVIDER_HIERARCHIES}(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:${TABLES.ENTITY}(
            id,
            name
          )
        )
      `)
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Provider[]
  }

  async findById(id: string): Promise<Provider | null> {
    const { data, error } = await supabase
      .from(TABLES.ENTITY)
      .select(`
        *,
        provider_hierarchies:${TABLES.PROVIDER_HIERARCHIES}(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:${TABLES.ENTITY}(
            id,
            name
          )
        )
      `)
      .eq('id', id)
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data as Provider
  }

  async findByClient(clientId: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .select(`
        provider:${TABLES.ENTITY}!provider_id(
          *,
          provider_hierarchies:${TABLES.PROVIDER_HIERARCHIES}(
            client_id,
            parent_provider_id,
            root_provider_id,
            client:${TABLES.ENTITY}(
              id,
              name
            )
          )
        )
      `)
      .eq('client_id', clientId)
      .is('deleted_at', null)

    if (error) throw error
    return data.map(item => item.provider) as Provider[]
  }

  async findChildren(providerId: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .select(`
        provider:${TABLES.ENTITY}!provider_id(
          *,
          provider_hierarchies:${TABLES.PROVIDER_HIERARCHIES}(
            client_id,
            parent_provider_id,
            root_provider_id,
            client:${TABLES.ENTITY}(
              id,
              name
            )
          )
        )
      `)
      .eq('parent_provider_id', providerId)
      .is('deleted_at', null)

    if (error) throw error
    return data.map(item => item.provider) as Provider[]
  }

  async findHierarchy(providerId: string): Promise<ProviderHierarchyRow[]> {
    const { data, error } = await supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .select('*')
      .eq('provider_id', providerId)
      .is('deleted_at', null)
      .order('level', { ascending: true })

    if (error) throw error
    return data
  }

  async create(data: CreateProviderDTO): Promise<Provider> {
    const now = new Date().toISOString()

    // Criar o provider na tabela Entity
    const { data: provider, error: providerError } = await supabase
      .from(TABLES.ENTITY)
      .insert({
        name: data.name,
        type: CONTEXT_TYPES.PROVIDER,
        created_at: now,
        updated_at: now,
        is_active: true
      })
      .select()
      .single()

    if (providerError) throw providerError

    // Se tiver parent_provider_id, criar a hierarquia
    if (data.parent_provider_id) {
      await this.addToHierarchy(provider.id, data.parent_provider_id, data.client_id)
    }

    return provider as Provider
  }

  async update(id: string, data: Partial<CreateProviderDTO>): Promise<Provider> {
    const { data: provider, error } = await supabase
      .from(TABLES.ENTITY)
      .update({
        name: data.name,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .select()
      .single()

    if (error) throw error
    return provider as Provider
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.ENTITY)
      .update({
        deleted_at: new Date().toISOString(),
        is_active: false
      })
      .eq('id', id)
      .eq('type', CONTEXT_TYPES.PROVIDER)

    if (error) throw error
  }

  async addToHierarchy(providerId: string, parentId: string, clientId?: string): Promise<ProviderHierarchyRow> {
    // Buscar informações do parent
    const { data: parentHierarchy } = await supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .select('*')
      .eq('provider_id', parentId)
      .is('deleted_at', null)
      .maybeSingle()

    const now = new Date().toISOString()
    const hierarchy = {
      provider_id: providerId,
      parent_provider_id: parentId,
      root_provider_id: parentHierarchy?.root_provider_id || parentId,
      client_id: clientId || parentHierarchy?.client_id || null,
      level: (parentHierarchy?.level || 0) + 1,
      created_at: now,
      updated_at: now,
      is_active: true,
      hierarchy_path: parentHierarchy?.hierarchy_path 
        ? [...parentHierarchy.hierarchy_path, providerId]
        : [parentId, providerId]
    }

    const { data, error } = await supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .insert(hierarchy)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async removeFromHierarchy(providerId: string, parentId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .update({
        deleted_at: new Date().toISOString(),
        is_active: false
      })
      .eq('provider_id', providerId)
      .eq('parent_provider_id', parentId)

    if (error) throw error
  }
} 