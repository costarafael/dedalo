import { UnitHierarchyRepository } from '@/lib/core/repositories'
import { UnitHierarchyService } from '@/lib/core/services'

// Singleton do UnitHierarchyService
let unitHierarchyService: UnitHierarchyService | null = null

export const getUnitHierarchyService = () => {
  if (!unitHierarchyService) {
    const repository = new UnitHierarchyRepository()
    unitHierarchyService = new UnitHierarchyService(repository)
  }
  return unitHierarchyService
} 