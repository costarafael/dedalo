import { ProviderRepository } from '@/lib/core/repositories/provider.repository'
import { ProviderService } from '@/lib/core/services/provider.service'

// Singleton do ProviderService
let providerService: ProviderService | null = null

export const getProviderService = () => {
  if (!providerService) {
    const repository = new ProviderRepository()
    providerService = new ProviderService(repository)
  }
  return providerService
} 