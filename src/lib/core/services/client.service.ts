import { IClientService } from '../interfaces/service.interfaces'
import { IClientRepository } from '../interfaces/repository.interfaces'
import type { Client, Entity } from '../interfaces/repository.interfaces'

export class ClientService implements IClientService {
  constructor(private clientRepository: IClientRepository) {}

  validateClient(data: Partial<Client>): boolean {
    if (!data) return false
    
    // Validações básicas
    if (data.name && data.name.length < 3) return false
    if (data.document && data.document.length < 11) return false
    if (data.email && !this.validateEmail(data.email)) return false
    
    return true
  }

  validateClientData(data: any): boolean {
    if (!data) return false
    
    // Validar estrutura básica
    const requiredFields = ['name', 'document', 'email']
    return requiredFields.every(field => field in data)
  }

  transformClientData(data: any): Client {
    if (!this.validateClientData(data)) {
      throw new Error('Invalid client data structure')
    }

    return {
      id: data.id,
      name: data.name,
      document: data.document,
      email: data.email,
      phone: data.phone || null,
      address: data.address || null,
      metadata: data.metadata || {},
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
      deleted_at: data.deleted_at || null,
      is_active: data.is_active ?? true
    }
  }

  transformToEntity(client: Client): Entity {
    return {
      id: client.id,
      name: client.name,
      type: 'CLIENT',
      metadata: {
        document: client.document,
        email: client.email,
        phone: client.phone,
        address: client.address,
        ...client.metadata
      },
      created_at: client.created_at,
      updated_at: client.updated_at,
      deleted_at: client.deleted_at,
      is_active: client.is_active
    }
  }

  transformFromEntity(entity: Entity): Client {
    if (entity.type !== 'CLIENT') {
      throw new Error('Invalid entity type')
    }

    return {
      id: entity.id,
      name: entity.name,
      document: entity.metadata?.document || '',
      email: entity.metadata?.email || '',
      phone: entity.metadata?.phone || null,
      address: entity.metadata?.address || null,
      metadata: entity.metadata || {},
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
      is_active: entity.is_active
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
} 