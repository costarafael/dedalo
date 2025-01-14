import { Provider, ProviderHierarchyRow } from "../interfaces/repository.interfaces"
import { ProviderRepository } from "../repositories/provider.repository"

export class ProviderService {
  private repository: ProviderRepository

  constructor(repository?: ProviderRepository) {
    this.repository = repository || new ProviderRepository()
  }

  async getProviders(): Promise<Provider[]> {
    return this.repository.findAll()
  }

  async getProvidersByClient(clientId: string): Promise<Provider[]> {
    return this.repository.findByClient(clientId)
  }

  async getProvider(id: string): Promise<Provider | null> {
    return this.repository.findById(id)
  }

  async createProvider(data: { name: string; client_id?: string; parent_provider_id?: string }): Promise<Provider> {
    const provider = await this.repository.create({ name: data.name })

    if (data.client_id || data.parent_provider_id) {
      await this.repository.addToHierarchy({
        provider_id: provider.id,
        client_id: data.client_id,
        parent_provider_id: data.parent_provider_id,
      })
    }

    return this.repository.findById(provider.id) as Promise<Provider>
  }

  async updateProvider(id: string, data: Partial<Provider>): Promise<Provider> {
    return this.repository.update(id, data)
  }

  async deleteProvider(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

// Singleton instance
export const providerService = new ProviderService() 