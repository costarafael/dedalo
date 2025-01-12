import { Entity, IEntityRepository, IEntityService, ContextType } from '../interfaces'

export class EntityService implements IEntityService {
  constructor(private readonly entityRepository: IEntityRepository) {}

  async getAll(): Promise<Entity[]> {
    return this.entityRepository.findAll()
  }

  async getById(id: string): Promise<Entity | null> {
    return this.entityRepository.findById(id)
  }

  async getByType(type: ContextType): Promise<Entity[]> {
    return this.entityRepository.findByType(type)
  }

  async getActiveByType(type: ContextType): Promise<Entity[]> {
    return this.entityRepository.findActiveByType(type)
  }

  async create(data: Partial<Entity>): Promise<Entity> {
    // Validações de negócio
    if (!data.name) {
      throw new Error('Nome é obrigatório')
    }
    if (!data.type) {
      throw new Error('Tipo é obrigatório')
    }
    if (!data.entity_type) {
      data.entity_type = 'INTERNAL'
    }

    return this.entityRepository.create(data)
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity> {
    // Validações de negócio
    const existingEntity = await this.entityRepository.findById(id)
    if (!existingEntity) {
      throw new Error('Entidade não encontrada')
    }

    return this.entityRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    // Validações de negócio
    const existingEntity = await this.entityRepository.findById(id)
    if (!existingEntity) {
      throw new Error('Entidade não encontrada')
    }

    // TODO: Verificar dependências antes de deletar
    // - Unidades organizacionais
    // - Provedores vinculados
    // - etc

    return this.entityRepository.delete(id)
  }
} 