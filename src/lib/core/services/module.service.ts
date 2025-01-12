import { Module, NewModule } from '@/types/module'
import { IModuleService } from '../interfaces/service.interfaces'
import { IModuleRepository } from '../interfaces/repository.interfaces'

export class ModuleService implements IModuleService {
  constructor(private readonly repository: IModuleRepository) {}

  async getAll(): Promise<Module[]> {
    return this.repository.findAll()
  }

  async getById(id: string): Promise<Module | null> {
    return this.repository.findById(id)
  }

  async getActive(): Promise<Module[]> {
    return this.repository.findActive()
  }

  async getBySlug(slug: string): Promise<Module | null> {
    return this.repository.findBySlug(slug)
  }

  async getLibraries(): Promise<Module[]> {
    return this.repository.findLibraries()
  }

  async create(data: NewModule): Promise<Module> {
    await this.validateModuleCreation(data)
    return this.repository.create(data)
  }

  async update(id: string, data: Partial<Module>): Promise<Module> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Módulo não encontrado')
    }

    if (data.slug) {
      const existingWithSlug = await this.repository.findBySlug(data.slug)
      if (existingWithSlug && existingWithSlug.id !== id) {
        throw new Error('Já existe um módulo com este slug')
      }
    }

    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Módulo não encontrado')
    }

    return this.repository.delete(id)
  }

  async softDelete(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Módulo não encontrado')
    }

    return this.repository.softDelete(id)
  }

  async validateModuleCreation(module: NewModule): Promise<void> {
    if (!module.name || !module.slug) {
      throw new Error('Nome e slug são obrigatórios')
    }

    // Verificar se já existe um módulo com o mesmo slug
    const existing = await this.repository.findBySlug(module.slug)
    if (existing) {
      throw new Error('Já existe um módulo com este slug')
    }
  }
} 