import { UnitContainerRepository } from '@/lib/core/repositories'
import { UnitContainerService } from '@/lib/core/services'

// Singleton do UnitContainerService
let unitContainerService: UnitContainerService | null = null

export const getUnitContainerService = () => {
  if (!unitContainerService) {
    const repository = new UnitContainerRepository()
    unitContainerService = new UnitContainerService(repository)
  }
  return unitContainerService
} 