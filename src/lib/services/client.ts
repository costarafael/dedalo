import { ClientRepository } from '@/lib/core/repositories'
import { ClientService } from '@/lib/core/services'

// Singleton do ClientService
let clientService: ClientService | null = null

export const getClientService = () => {
  if (!clientService) {
    const repository = new ClientRepository()
    clientService = new ClientService(repository)
  }
  return clientService
} 