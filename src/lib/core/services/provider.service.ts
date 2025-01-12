import { Entity, IProviderRepository, IProviderService } from '../interfaces'
import { getBrowserClient } from '@/lib/database/supabase'

export class ProviderService implements IProviderService {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async getAll(): Promise<Entity[]> {
    return this.providerRepository.findAll()
  }

  async getActive(): Promise<Entity[]> {
    return this.providerRepository.findActive()
  }

  async getById(id: string): Promise<Entity | null> {
    return this.providerRepository.findById(id)
  }

  async getByClient(clientId: string): Promise<Entity[]> {
    return this.providerRepository.findByClient(clientId)
  }

  async getChildren(providerId: string): Promise<Entity[]> {
    return this.providerRepository.findChildren(providerId)
  }

  async validateProviderCreation(data: Partial<Entity>): Promise<void> {
    // Validações de negócio
    if (!data.name) {
      throw new Error('Nome do provider é obrigatório')
    }

    // TODO: Adicionar outras validações conforme necessário
    // - Verificar se já existe provider com mesmo nome
    // - Verificar limites de hierarquia
    // - etc
  }

  async create(data: Partial<Entity> & { client_id: string; parent_provider_id?: string }): Promise<Entity> {
    // Validações de negócio
    await this.validateProviderCreation(data)

    const provider = await this.providerRepository.create(data)

    // Criar hierarquia do provider
    const supabase = getBrowserClient()

    // Se tiver parent_provider_id, busca o root_provider_id e client_id do pai
    let root_provider_id = provider.id
    let hierarchy_client_id = data.client_id
    let level = 0

    if (data.parent_provider_id) {
      const { data: parentHierarchy } = await supabase
        .from('provider_hierarchies')
        .select('root_provider_id, client_id, level')
        .eq('provider_id', data.parent_provider_id)
        .single()
      
      if (parentHierarchy) {
        root_provider_id = parentHierarchy.root_provider_id
        hierarchy_client_id = parentHierarchy.client_id // Usa o client_id do pai
        level = parentHierarchy.level + 1
      }
    }

    // Cria a hierarquia
    const { error: hierarchyError } = await supabase
      .from('provider_hierarchies')
      .insert({
        provider_id: provider.id,
        client_id: data.parent_provider_id ? null : hierarchy_client_id, // Se tem pai, não seta client_id
        parent_provider_id: data.parent_provider_id || null,
        root_provider_id,
        level,
        is_active: true,
        version: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        hierarchy_path: data.parent_provider_id ? [data.parent_provider_id, provider.id] : [provider.id]
      })

    if (hierarchyError) {
      // Se falhar ao criar a hierarquia, deleta o provider criado
      await this.providerRepository.delete(provider.id)
      throw hierarchyError
    }

    return provider
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity> {
    // Validações de negócio
    const existingProvider = await this.providerRepository.findById(id)
    if (!existingProvider) {
      throw new Error('Provider não encontrado')
    }

    return this.providerRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    // Validações de negócio
    const existingProvider = await this.providerRepository.findById(id)
    if (!existingProvider) {
      throw new Error('Provider não encontrado')
    }

    // TODO: Verificar dependências antes de deletar
    // - Providers filhos
    // - Hierarquias vinculadas
    // - etc

    return this.providerRepository.delete(id)
  }
} 