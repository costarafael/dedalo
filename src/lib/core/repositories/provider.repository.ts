import { getBrowserClient } from '@/lib/database/supabase'
import { 
  Provider,
  EntityInsert,
  EntityUpdate,
  IProviderRepository, 
  TABLES,
  CONTEXT_TYPES,
  ProviderHierarchyRow,
  CreateProviderDTO
} from '../interfaces'

export class ProviderRepository implements IProviderRepository {
  private supabase = getBrowserClient()

  async findAll(): Promise<Provider[]> {
    const { data, error } = await this.supabase
      .from(TABLES.ENTITY)
      .select(`
        *,
        provider_hierarchies:provider_hierarchies!provider_hierarchies_provider_id_fkey(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:entity!provider_hierarchies_client_id_fkey(
            id,
            name
          )
        )
      `)
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data?.map(entity => ({
      ...entity,
      type: CONTEXT_TYPES.PROVIDER,
      metadata: {
        document: '',
        email: '',
      }
    })) || []
  }

  async findByClient(clientId: string): Promise<Provider[]> {
    const { data, error } = await this.supabase
      .from(TABLES.ENTITY)
      .select(`
        *,
        provider_hierarchies:provider_hierarchies!provider_hierarchies_provider_id_fkey(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:entity!provider_hierarchies_client_id_fkey(
            id,
            name
          )
        )
      `)
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .eq('provider_hierarchies.client_id', clientId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data?.map(entity => ({
      ...entity,
      type: CONTEXT_TYPES.PROVIDER,
      metadata: {
        document: '',
        email: '',
      }
    })) || []
  }

  async findChildren(providerId: string): Promise<Provider[]> {
    const { data, error } = await this.supabase
      .from(TABLES.ENTITY)
      .select(`
        *,
        provider_hierarchies:provider_hierarchies!provider_hierarchies_provider_id_fkey(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:entity!provider_hierarchies_client_id_fkey(
            id,
            name
          )
        )
      `)
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .eq('provider_hierarchies.parent_provider_id', providerId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data?.map(entity => ({
      ...entity,
      type: CONTEXT_TYPES.PROVIDER,
      metadata: {
        document: '',
        email: '',
      }
    })) || []
  }

  async findHierarchy(providerId: string): Promise<ProviderHierarchyRow[]> {
    const { data, error } = await this.supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .select('*')
      .eq('provider_id', providerId)
      .is('deleted_at', null)

    if (error) throw error
    return data || []
  }

  async findById(id: string): Promise<Provider | null> {
    const { data, error } = await this.supabase
      .from(TABLES.ENTITY)
      .select(`
        *,
        provider_hierarchies:provider_hierarchies!provider_hierarchies_provider_id_fkey(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:entity!provider_hierarchies_client_id_fkey(
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
    if (!data) return null

    return {
      ...data,
      type: CONTEXT_TYPES.PROVIDER,
      metadata: {
        document: '',
        email: '',
      }
    }
  }

  async create(data: Partial<EntityInsert>): Promise<Provider> {
    const now = new Date().toISOString()
    const payload: EntityInsert = {
      id: data.id || `PV${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      name: data.name,
      type: CONTEXT_TYPES.PROVIDER,
      status: 'RUNNING',
      created_at: now,
      updated_at: now,
      is_active: true,
      deleted_at: null
    }

    const { data: provider, error } = await this.supabase
      .from(TABLES.ENTITY)
      .insert(payload)
      .select(`
        *,
        provider_hierarchies:provider_hierarchies!provider_hierarchies_provider_id_fkey(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:entity!provider_hierarchies_client_id_fkey(
            id,
            name
          )
        )
      `)
      .single()

    if (error) throw error

    // Se tiver parent_provider_id ou client_id, adiciona à hierarquia
    if (data.parent_provider_id || data.client_id) {
      await this.addToHierarchy(provider.id, data.parent_provider_id!, data.client_id)
    }

    return {
      ...provider,
      type: CONTEXT_TYPES.PROVIDER,
      metadata: {
        document: '',
        email: '',
      }
    }
  }

  async update(id: string, data: Partial<EntityUpdate>): Promise<Provider> {
    // Validar nome único se estiver sendo atualizado
    if (data.name) {
      const exists = await this.validateUniqueName(data.name, id)
      if (exists) {
        throw new Error("Já existe um provider com este nome")
      }
    }

    const payload = {
      ...data,
      updated_at: new Date().toISOString()
    }

    const { data: provider, error } = await this.supabase
      .from(TABLES.ENTITY)
      .update(payload)
      .eq('id', id)
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .select(`
        *,
        provider_hierarchies:provider_hierarchies!provider_hierarchies_provider_id_fkey(
          client_id,
          parent_provider_id,
          root_provider_id,
          client:entity!provider_hierarchies_client_id_fkey(
            id,
            name
          )
        )
      `)
      .single()

    if (error) throw error
    return {
      ...provider,
      type: CONTEXT_TYPES.PROVIDER,
      metadata: {
        document: '',
        email: '',
      }
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(TABLES.ENTITY)
      .update({
        is_active: false,
        deleted_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('type', CONTEXT_TYPES.PROVIDER)

    if (error) throw error
  }

  async addToHierarchy(providerId: string, parentId: string, clientId?: string): Promise<ProviderHierarchyRow> {
    const { data, error } = await this.supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .insert({
        provider_id: providerId,
        parent_provider_id: parentId,
        client_id: clientId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async removeFromHierarchy(providerId: string, parentId: string): Promise<void> {
    const { error } = await this.supabase
      .from(TABLES.PROVIDER_HIERARCHIES)
      .update({
        is_active: false,
        deleted_at: new Date().toISOString()
      })
      .eq('provider_id', providerId)
      .eq('parent_provider_id', parentId)

    if (error) throw error
  }

  // Métodos auxiliares
  private async validateUniqueName(name: string, excludeId?: string): Promise<boolean> {
    const query = this.supabase
      .from(TABLES.ENTITY)
      .select('id')
      .eq('type', CONTEXT_TYPES.PROVIDER)
      .eq('name', name)
      .is('deleted_at', null)

    if (excludeId) {
      query.neq('id', excludeId)
    }

    const { data, error } = await query.single()
    if (error && error.code === 'PGRST116') return false // No rows returned
    if (error) throw error
    return !!data
  }
} 