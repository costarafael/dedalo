import { IModuleService } from '../interfaces/module.interfaces'
import { ModuleRepository } from '../repositories/module.repository'
import type { ModuleRow, ModuleInsert, ModuleUpdate, ModuleInstanceRow, ModuleInstanceUpdate } from '../interfaces/module.interfaces'

export class ModuleService implements IModuleService {
  constructor(private repository: ModuleRepository) {}

  async findAll(): Promise<ModuleRow[]> {
    return this.repository.findAll()
  }

  async findActive(): Promise<ModuleRow[]> {
    return this.repository.findActive()
  }

  async findById(id: string): Promise<ModuleRow | null> {
    return this.repository.findById(id)
  }

  async findByClient(clientId: string): Promise<ModuleRow[]> {
    return this.repository.findByClient(clientId)
  }

  async create(data: Partial<ModuleInsert>): Promise<ModuleRow> {
    return this.repository.create(data)
  }

  async update(id: string, data: Partial<ModuleUpdate>): Promise<ModuleRow> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async createInstance(moduleId: string, clientId: string, config?: any): Promise<ModuleInstanceRow> {
    return this.repository.createInstance(moduleId, clientId, config)
  }

  async updateInstance(instanceId: string, data: Partial<ModuleInstanceUpdate>): Promise<ModuleInstanceRow> {
    return this.repository.updateInstance(instanceId, data)
  }

  async deleteInstance(instanceId: string): Promise<void> {
    return this.repository.deleteInstance(instanceId)
  }

  async findInstancesByClient(clientId: string): Promise<ModuleInstanceRow[]> {
    return this.repository.findInstancesByClient(clientId)
  }
} 