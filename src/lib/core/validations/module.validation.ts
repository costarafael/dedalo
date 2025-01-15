import { z } from 'zod'
import type { ModuleInsert } from '../interfaces/module.interfaces'

const moduleSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  slug: z.string(),
  version: z.number(),
  is_active: z.boolean(),
  is_library: z.boolean(),
  metadata: z.record(z.any()).optional()
})

export type ModuleFormData = z.infer<typeof moduleSchema>

export function validateModuleName(name: string): string | null {
  try {
    moduleSchema.pick({ name: true }).parse({ name })
    return null
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message
    }
    return 'Erro ao validar nome do módulo'
  }
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function createModuleData(name: string): Partial<ModuleInsert> {
  const error = validateModuleName(name)
  if (error) throw new Error(error)

  return {
    name,
    slug: slugify(name),
    version: 1,
    is_active: true,
    is_library: true,
    metadata: {}
  }
} 