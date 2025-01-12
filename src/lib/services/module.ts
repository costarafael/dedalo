import { ModuleRepository } from '@/lib/core/repositories'
import { ModuleService } from '@/lib/core/services'

// Singleton do ModuleService
let moduleService: ModuleService | null = null

export const getModuleService = () => {
  if (!moduleService) {
    const repository = new ModuleRepository()
    moduleService = new ModuleService(repository)
  }
  return moduleService
} 