import { UnitService } from '@/lib/core/services/unit.service'
import { UnitRepository } from '@/lib/core/repositories/unit.repository'

let unitService: UnitService | null = null

export function getUnitService(): UnitService {
  if (!unitService) {
    const repository = new UnitRepository()
    unitService = new UnitService(repository)
  }
  return unitService
} 