import { getBrowserClient } from '@/lib/database/supabase'
import { 
  Client,
  EntityInsert,
  EntityUpdate,
  IClientRepository, 
  TABLES,
  CONTEXT_TYPES 
} from '../interfaces'

export class ClientRepository implements IClientRepository {
  private supabase = getBrowserClient()

  async findAll(): Promise<Client[]> {
    const { data, error } = await this.supabase
      .from(TABLES.ENTITY)
      .select('*')
      .eq('type', CONTEXT_TYPES.CLIENT)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data?.map(entity => ({
      ...entity,
      type: CONTEXT_TYPES.CLIENT,
      metadata: {
        document: '',
        email: '',
      }
    })) || []
  }

  async findActive(): Promise<Client[]> {
    const { data, error } = await this.supabase
      .from(TABLES.ENTITY)
      .select('*')
      .eq('type', CONTEXT_TYPES.CLIENT)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data?.map(entity => ({
      ...entity,
      type: CONTEXT_TYPES.CLIENT,
      metadata: {
        document: '',
        email: '',
      }
    })) || []
  }

  async findById(id: string): Promise<Client | null> {
    const { data, error } = await this.supabase
      .from(TABLES.ENTITY)
      .select('*')
      .eq('id', id)
      .eq('type', CONTEXT_TYPES.CLIENT)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    if (!data) return null

    return {
      ...data,
      type: CONTEXT_TYPES.CLIENT,
      metadata: {
        document: '',
        email: '',
      }
    }
  }

  async create(data: Partial<EntityInsert>): Promise<Client> {
    // Validar nome único
    const exists = await this.validateUniqueName(data.name!)
    if (exists) {
      throw new Error("Já existe um cliente com este nome")
    }

    const now = new Date().toISOString()

    const payload: EntityInsert = {
      id: data.id || `CL${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      name: data.name!,
      type: CONTEXT_TYPES.CLIENT,
      status: 'RUNNING',
      created_at: now,
      updated_at: now,
      is_active: true,
      deleted_at: null
    }

    const { data: client, error } = await this.supabase
      .from(TABLES.ENTITY)
      .insert(payload)
      .select()
      .single()

    if (error) throw error
    return {
      ...client,
      type: CONTEXT_TYPES.CLIENT,
      metadata: {
        document: '',
        email: '',
      }
    }
  }

  async update(id: string, data: Partial<EntityUpdate>): Promise<Client> {
    // Validar nome único se estiver sendo atualizado
    if (data.name) {
      const exists = await this.validateUniqueName(data.name, id)
      if (exists) {
        throw new Error("Já existe um cliente com este nome")
      }
    }

    const payload = {
      ...data,
      updated_at: new Date().toISOString()
    }

    const { data: client, error } = await this.supabase
      .from(TABLES.ENTITY)
      .update(payload)
      .eq('id', id)
      .eq('type', CONTEXT_TYPES.CLIENT)
      .select()
      .single()

    if (error) throw error
    return {
      ...client,
      type: CONTEXT_TYPES.CLIENT,
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
      .eq('type', CONTEXT_TYPES.CLIENT)

    if (error) throw error
  }

  // Métodos auxiliares
  private async validateUniqueName(name: string, excludeId?: string): Promise<boolean> {
    const query = this.supabase
      .from(TABLES.ENTITY)
      .select('id')
      .eq('type', CONTEXT_TYPES.CLIENT)
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