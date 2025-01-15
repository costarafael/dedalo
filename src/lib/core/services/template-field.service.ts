import type { TemplateFieldRow, TemplateFieldInsert, TemplateFieldUpdate } from '../interfaces/template-field.interfaces'
import { TemplateFieldRepository } from '../repositories/template-field.repository'
import { validateTemplateField } from '../validations/template-field.validation'

export class TemplateFieldService {
  constructor(private readonly repository = new TemplateFieldRepository()) {}

  async findAll(): Promise<TemplateFieldRow[]> {
    return this.repository.findAll()
  }

  async findActive(): Promise<TemplateFieldRow[]> {
    return this.repository.findActive()
  }

  async findById(id: string): Promise<TemplateFieldRow | null> {
    return this.repository.findById(id)
  }

  async create(data: Partial<TemplateFieldInsert>): Promise<TemplateFieldRow> {
    const validatedData = validateTemplateField(data)
    return this.repository.create(validatedData)
  }

  async update(id: string, data: Partial<TemplateFieldUpdate>): Promise<TemplateFieldRow> {
    const validatedData = validateTemplateField({ ...data, id })
    return this.repository.update(id, validatedData)
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
} 