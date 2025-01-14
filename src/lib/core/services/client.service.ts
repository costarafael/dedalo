import { Client } from "../interfaces/repository.interfaces"
import { ClientRepository } from "../repositories/client.repository"

export class ClientService {
  constructor(private readonly repository: ClientRepository = new ClientRepository()) {}

  async getClient(id: string): Promise<Client> {
    const client = await this.repository.findById(id)
    if (!client) throw new Error("Cliente não encontrado")
    return client
  }

  async getActiveClients(): Promise<Client[]> {
    return this.repository.findActive()
  }

  async getAllClients(): Promise<Client[]> {
    return this.repository.findAll()
  }

  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    const client = await this.getClient(id)
    if (!client) throw new Error("Cliente não encontrado")
    
    return this.repository.update(id, data)
  }

  async deleteClient(id: string): Promise<void> {
    const client = await this.getClient(id)
    if (!client) throw new Error("Cliente não encontrado")
    
    await this.repository.delete(id)
  }
}

// Singleton instance
export const clientService = new ClientService() 