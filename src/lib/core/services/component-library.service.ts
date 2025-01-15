import { ComponentLibraryRepository } from '../repositories/component-library.repository'
import { validateComponentLibrary } from '../validations/component-library.validation'
import type { ComponentLibraryInsert, ComponentLibraryUpdate } from '../interfaces/component-library.interfaces'

export class ComponentLibraryService {
  constructor(private readonly repository: ComponentLibraryRepository) {}

  async findAll() {
    return this.repository.findAll()
  }

  async findActive() {
    return this.repository.findActive()
  }

  async findById(id: string) {
    return this.repository.findById(id)
  }

  async create(data: ComponentLibraryInsert) {
    const validatedData = validateComponentLibrary(data)
    return this.repository.create(validatedData)
  }

  async update(id: string, data: ComponentLibraryUpdate) {
    const validatedData = validateComponentLibrary({ ...data, id })
    return this.repository.update(id, validatedData)
  }

  async delete(id: string) {
    return this.repository.delete(id)
  }
}

export const componentLibraryService = new ComponentLibraryService(
  new ComponentLibraryRepository()
) 