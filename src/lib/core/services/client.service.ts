import { Entity, IClientRepository, IClientService } from '../interfaces'

export class ClientService implements IClientService {
  constructor(private readonly clientRepository: IClientRepository) {}

  async findAll(): Promise<Entity[]> {
    return this.clientRepository.findAll()
  }

  async getActiveClients(): Promise<Entity[]> {
    return this.clientRepository.findActive()
  }

  async getById(id: string): Promise<Entity | null> {
    return this.clientRepository.findById(id)
  }

  async create(data: Partial<Entity>): Promise<Entity> {
    // Validações de negócio
    if (!data.name) {
      throw new Error('Nome do cliente é obrigatório')
    }

    return this.clientRepository.create(data)
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity> {
    // Validações de negócio
    const existingClient = await this.clientRepository.findById(id)
    if (!existingClient) {
      throw new Error('Cliente não encontrado')
    }

    return this.clientRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    // Validações de negócio
    const existingClient = await this.clientRepository.findById(id)
    if (!existingClient) {
      throw new Error('Cliente não encontrado')
    }

    // TODO: Verificar dependências antes de deletar
    // - Unidades organizacionais
    // - Provedores vinculados
    // - etc

    return this.clientRepository.delete(id)
  }
} 