import { api } from '@/lib/http/config/axios.config'
import type { ApiResponse } from '@/lib/http/types/api.types'
import { 
  Entity, 
  EntityInsert,
  EntityUpdate,
  IClientRepository, 
  TABLES,
  CONTEXT_TYPES 
} from '../interfaces'

export class ClientRepository implements IClientRepository {
  private endpoint = '/api/clients'

  async findAll(): Promise<Entity[]> {
    const { data } = await api.get<ApiResponse<Entity[]>>(this.endpoint)
    return data.data
  }

  async findActive(): Promise<Entity[]> {
    const { data } = await api.get<ApiResponse<Entity[]>>(`${this.endpoint}/active`)
    return data.data
  }

  async findById(id: string): Promise<Entity | null> {
    const { data } = await api.get<ApiResponse<Entity>>(`${this.endpoint}/${id}`)
    return data.data
  }

  async create(data: Partial<EntityInsert>): Promise<Entity> {
    // Validar nome único
    const exists = await this.validateUniqueName(data.name!)
    if (exists) {
      throw new Error("Já existe um cliente com este nome")
    }

    const payload = {
      ...data,
      type: CONTEXT_TYPES.CLIENT,
      status: data.status || 'ACTIVE'
    }

    const response = await api.post<ApiResponse<Entity>>(this.endpoint, payload)
    return response.data.data
  }

  async update(id: string, data: Partial<EntityUpdate>): Promise<Entity> {
    // Validar nome único se estiver sendo atualizado
    if (data.name) {
      const exists = await this.validateUniqueName(data.name, id)
      if (exists) {
        throw new Error("Já existe um cliente com este nome")
      }
    }

    const response = await api.put<ApiResponse<Entity>>(`${this.endpoint}/${id}`, data)
    return response.data.data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`${this.endpoint}/${id}`)
  }

  // Métodos auxiliares
  private async validateUniqueName(name: string, excludeId?: string): Promise<boolean> {
    const query = new URLSearchParams({ name })
    if (excludeId) query.append('excludeId', excludeId)

    const { data } = await api.get<ApiResponse<boolean>>(`${this.endpoint}/validate-name?${query}`)
    return data.data
  }
} 