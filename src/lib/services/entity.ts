import { EntityRepository } from '@/lib/core/repositories/entity.repository'
import { EntityService } from '@/lib/core/services/entity.service'

// Singleton do EntityService
let entityService: EntityService | null = null

export const getEntityService = () => {
  if (!entityService) {
    const repository = new EntityRepository()
    entityService = new EntityService(repository)
  }
  return entityService
} 